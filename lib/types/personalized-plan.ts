export type RecommendedModule =
  | "money-101-foundations"
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
  | "between-jobs"
  | "general";

export type FocusArea = {
  module: RecommendedModule;
  title: string;
  whyNow: string;
  actionNow: string;
  score: number;
};

export type PersonalizedPlan = {
  persona: UserPersona;
  encouragement: {
    title: string;
    body: string;
  };
  snapshot: {
    title: string;
    body: string;
  };
  strengths: string[];
  focus: {
    title: string;
    body: string;
  };
  firstLessonReason: string;
  immediateActions: string[];
  focusAreas: FocusArea[];
  recommendedPath: {
    modules: RecommendedModule[];
  };
};