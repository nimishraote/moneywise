import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  FUTURE_AI_PLAN_SUMMARY_PROMPT,
  type FutureAIPlanRequest,
  type FutureAIPlanSummaryResponse,
} from "@/lib/ai/plan-contract";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildFallbackSummary(
  input: FutureAIPlanRequest
): FutureAIPlanSummaryResponse {
  const firstName = input.profile?.firstName?.trim();
  const namePart = firstName ? `, ${firstName}` : "";

  let title = `You are starting in the right place${namePart}.`;
  let paragraphOne =
    "Money can feel confusing when nobody has explained it simply. The good news is that you are looking at it now instead of waiting until it feels bigger.";
  let paragraphTwo = `The best place to start is ${input.recommendedModuleTitle.toLowerCase()}. It gives you a clearer base for calmer and smarter decisions from here.`;

  if (input.assessment.lifeStage === "Pre-college / high school") {
    title = `Starting early really helps${namePart}.`;
    paragraphOne =
      "A lot of people do not learn this until much later. You are looking at it earlier, which gives you more time to understand the basics before life gets more expensive.";
  }

  if (
    input.assessment.stressLevel === "Very stressed" ||
    input.assessment.stressLevel === "Somewhat stressed"
  ) {
    title = `This can feel heavy, but it can get clearer${namePart}.`;
    paragraphOne =
      "When money already feels stressful, the most useful next step is not more noise. It is one simple starting point that makes things feel more understandable.";
  }

  if (
    input.assessment.basicsStocks === "No" ||
    input.assessment.basicsIndexFunds === "No" ||
    input.assessment.basicsStockMarket === "No"
  ) {
    paragraphTwo = `The best place to start is ${input.recommendedModuleTitle.toLowerCase()}. Before you make money decisions, it helps to understand the basics in plain language.`;
  }

  return { title, paragraphOne, paragraphTwo };
}

function safeParseJson(text: string): FutureAIPlanSummaryResponse | null {
  try {
    const parsed = JSON.parse(text);
    if (
      parsed &&
      typeof parsed.title === "string" &&
      typeof parsed.paragraphOne === "string" &&
      typeof parsed.paragraphTwo === "string"
    ) {
      return {
        title: parsed.title.trim(),
        paragraphOne: parsed.paragraphOne.trim(),
        paragraphTwo: parsed.paragraphTwo.trim(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FutureAIPlanRequest;

    if (!body?.assessment || !body?.recommendedModuleTitle) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { summary: buildFallbackSummary(body), source: "fallback" },
        { status: 200 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-5.4",
      instructions: FUTURE_AI_PLAN_SUMMARY_PROMPT,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(
                {
                  firstName: body.profile?.firstName ?? "",
                  recommendedModule: body.recommendedModule,
                  recommendedModuleTitle: body.recommendedModuleTitle,
                  assessment: body.assessment,
                },
                null,
                2
              ),
            },
          ],
        },
      ],
    });

    const outputText = response.output_text?.trim() || "";
    const parsed = safeParseJson(outputText);

    if (!parsed) {
      return NextResponse.json(
        { summary: buildFallbackSummary(body), source: "fallback" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { summary: parsed, source: "ai" },
      { status: 200 }
    );
  } catch {
    try {
      const body = (await request.clone().json()) as FutureAIPlanRequest;
      return NextResponse.json(
        { summary: buildFallbackSummary(body), source: "fallback" },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { error: "Unable to generate summary." },
        { status: 500 }
      );
    }
  }
}