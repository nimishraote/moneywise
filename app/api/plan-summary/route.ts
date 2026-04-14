import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { AssessmentInput } from "@/lib/types/assessment";
import type { RecommendedModule } from "@/lib/types/personalized-plan";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { moduleTitles } from "@/lib/content/lesson-content";

type PlanSummaryRequest = {
  assessment: AssessmentInput;
  profile?: {
    firstName?: string;
  };
  recommendedModule: RecommendedModule;
  recommendedModuleTitle: string;
};

function buildFallbackSummary(payload: PlanSummaryRequest) {
  const plan = buildPersonalizedPlan(payload.assessment);
  const firstName = payload.profile?.firstName?.trim();
  const introName = firstName ? `${firstName}, ` : "";
  const recommendedTitle =
    payload.recommendedModuleTitle || moduleTitles[payload.recommendedModule];

  return {
    summary: {
      title: `${introName}this is a strong place to begin`,
      paragraphOne: `Your answers suggest that ${recommendedTitle.toLowerCase()} is the best starting point right now. The goal is not to learn everything at once. It is to focus on the one area that will make the rest of money feel clearer and easier to handle.`,
      paragraphTwo: `${plan.firstLessonReason} Start there first, then build from that foundation instead of trying to fix everything at the same time.`,
    },
  };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PlanSummaryRequest;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(buildFallbackSummary(payload));
    }

    const client = new OpenAI({ apiKey });

    const firstName = payload.profile?.firstName?.trim();
    const recommendedTitle =
      payload.recommendedModuleTitle || moduleTitles[payload.recommendedModule];

    const prompt = `
You are writing for a young adult using a financial literacy app.

Write a short personalized summary in very simple English.
Tone:
- calm
- clear
- supportive
- not robotic
- not too formal
- not too long

Audience:
- beginner
- likely age 16 to 29
- may feel confused or stressed about money
- needs practical clarity

Rules:
- return valid JSON only
- JSON shape:
{
  "title": "...",
  "paragraphOne": "...",
  "paragraphTwo": "..."
}
- title should be short
- each paragraph should be 2 to 4 sentences max
- do not use jargon
- do not use bullet points
- do not use markdown

Context:
- user first name: ${firstName || "Unknown"}
- recommended starting topic: ${recommendedTitle}
- assessment data: ${JSON.stringify(payload.assessment)}
`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    const rawText = response.output_text?.trim();

    if (!rawText) {
      return NextResponse.json(buildFallbackSummary(payload));
    }

    try {
      const parsed = JSON.parse(rawText);

      if (
        typeof parsed?.title === "string" &&
        typeof parsed?.paragraphOne === "string" &&
        typeof parsed?.paragraphTwo === "string"
      ) {
        return NextResponse.json({ summary: parsed });
      }

      return NextResponse.json(buildFallbackSummary(payload));
    } catch {
      return NextResponse.json(buildFallbackSummary(payload));
    }
  } catch {
    return NextResponse.json(
      {
        summary: {
          title: "A clear place to begin",
          paragraphOne:
            "We picked a starting point based on your answers so you do not have to figure everything out at once.",
          paragraphTwo:
            "Start with the first recommended lesson and build from there one step at a time.",
        },
      },
      { status: 200 }
    );
  }
}