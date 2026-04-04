export type AssessmentInput = {
  lifeStage: string;
  ageRange: string;
  paycheckStatus: string;
  confidenceLevel: string;
  emotionalStates: string[];
  helpAreas: string[];
  freeTextGoal?: string;
};

export type MoneywiseProfile = {
  firstName?: string;
  email?: string;
  createdAt?: string;
};
