export type RecommendedModule =
  | "budgeting-and-cash-flow"
  | "saving-starting-early-and-long-term-impact"
  | "credit-scores-and-credit-cards"
  | "investing-basics-and-first-stocks";

export type UserPersona =
  | "teen-supported"
  | "student-dependent"
  | "student-earning"
  | "working-tight"
  | "working-steady"
  | "general";

export type PersonalizedPlan = {
  persona: UserPersona;
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