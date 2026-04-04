import type { AssessmentInput } from "@/lib/types/assessment";

export type FutureAIPlanRequest = {
  assessment: AssessmentInput;
  profile?: { firstName?: string };
  recommendedModule: string;
  recommendedModuleTitle: string;
};

export type FutureAIPlanSummaryResponse = {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
};

export const FUTURE_AI_PLAN_SUMMARY_PROMPT = `
You are writing the top summary section for a young adult financial literacy app called MoneyWise.

Your job:
Write a personalized summary for the user's "starting plan" page based only on their structured assessment answers and the recommended first topic.

What this section must do:
- feel specific to the user, not generic
- reflect their stage of life
- reflect whether they feel stressed, confused, or fairly steady
- reflect whether they are a beginner with money basics
- identify why the recommended first topic matters now
- sound warm, calm, direct, and age-appropriate
- use very simple English
- use short sentences
- avoid jargon
- avoid preaching
- avoid fake enthusiasm
- never mention AI
- never say "based on your responses"
- never sound like a therapist
- never sound corporate

Output format:
Return valid JSON with exactly these keys:
- title
- paragraphOne
- paragraphTwo

Writing guidance:
- title should be short and supportive
- paragraphOne should reflect the user's life stage and current money feeling
- paragraphTwo should explain why the recommended first topic is the right place to start now
- each paragraph should be 2 or 3 short sentences
- do not invent facts not present in the input
- if the user looks like a beginner, keep the explanation especially simple and grounding

Assessment fields available:
- lifeStage
- ageRange
- livingSituation
- primaryMoneySource
- incomePattern
- endOfMonthSituation
- mainSpendingCategory
- hasCreditCard
- moneyCheckFrequency
- moneyHabitStyle
- stressLevel
- confidenceLevel
- basicsStocks
- basicsIndexFunds
- basicsStockMarket
- basicsInterest
- basicsCredit
- basicsBudgeting
- topPriority
`.trim();