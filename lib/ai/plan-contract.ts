import type { AssessmentInput } from "@/lib/types/assessment";
import type { PersonalizedPlan } from "@/lib/types/personalized-plan";

export type FutureAIPlanRequest = {
  assessment: AssessmentInput;
  profile?: { firstName?: string };
};

export type FutureAIPlanResponse = PersonalizedPlan & {
  explanationStyle?: "calm" | "direct" | "encouraging";
  followupPrompts?: string[];
};

export const FUTURE_AI_PROMPT_NOTES = {
  goal: "Generate a personalized starting plan for a young adult financial literacy app.",
  tone: "Simple English, calm, supportive, practical, and non-judgmental.",
  outputRequirements: [
    "A short encouragement block",
    "Three real strengths based on the assessment",
    "One main focus area with explanation",
    "A recommended module order",
    "A first-step CTA",
    "Two to four follow-up prompts for later conversation",
  ],
};
