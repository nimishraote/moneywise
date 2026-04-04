export type AssessmentInput = {
  lifeStage: string;
  ageRange: string;
  livingSituation: string;

  primaryMoneySource: string;
  incomePattern: string;
  endOfMonthSituation: string;
  mainSpendingCategory: string;
  hasCreditCard: string;

  moneyCheckFrequency: string;
  moneyHabitStyle: string;
  stressLevel: string;
  confidenceLevel: string;

  basicsStocks: string;
  basicsIndexFunds: string;
  basicsStockMarket: string;
  basicsInterest: string;
  basicsCredit: string;
  basicsBudgeting: string;

  topPriority: string[];
};

export type MoneywiseProfile = {
  firstName?: string;
  email?: string;
  createdAt?: string;
};