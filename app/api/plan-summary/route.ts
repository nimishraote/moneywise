import { NextResponse } from "next/server";
import OpenAI from "openai";
import { FUTURE_AI_PLAN_SUMMARY_PROMPT, type FutureAIPlanRequest, type FutureAIPlanSummaryResponse } from "@/lib/ai/plan-contract";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildFallbackSummary(input: FutureAIPlanRequest): FutureAIPlanSummaryResponse {
  const firstName = input.profile?.firstName?.trim();
  const namePart = firstName ? `, ${firstName}` : "";

  let title = `You are starting in the right place${namePart}.`;
  let paragraphOne =
    "Money can feel confusing when life is already moving fast. The important thing is that you are looking at it directly now instead of pushing it away.";
  let paragraphTwo = `The best place to start is ${input.recommendedModuleTitle.toLowerCase()}. It gives you a clearer base to make calmer and more useful decisions from here.`;

  if (input.assessment.lifeStage === "Pre-college / high school") {
    title = `Starting early can really help${namePart}.`;
    paragraphOne =
      "A lot of people do not think seriously about money until pressure builds later. You are looking at it earlier, which gives you more room to build understanding before life gets more expensive.";
  }

  if (input.assessment.emotionalStates.includes("I feel stressed about money")) {
    title = `This can feel heavy, but it can get clearer${namePart}.`;
    paragraphOne =
      "When money already feels stressful, the most useful thing is not more noise. It is having one calmer place to start so things feel more understandable and less overwhelming.";
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

    return NextResponse.json({ summary: parsed, source: "ai" }, { status: 200 });
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