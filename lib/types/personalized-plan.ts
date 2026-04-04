export type RecommendedModule =
  | "budgeting-and-cash-flow"
  | "saving-starting-early-and-long-term-impact"
  | "credit-scores-and-credit-cards";

export type PersonalizedPlan = {
  encouragement: {
    title: string;
    body: string;
  };
  strengths: string[];
  focus: {
    title: string;
    body: string;
  };
  recommendedPath: {
    modules: RecommendedModule[];
  };
};