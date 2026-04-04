import type { AssessmentInput } from "@/lib/types/assessment";
import type {
  PersonalizedPlan,
  RecommendedModule,
  UserPersona,
} from "@/lib/types/personalized-plan";

function isStudent(input: AssessmentInput) {
  return (
    input.lifeStage === "Pre-college / high school" ||
    input.lifeStage === "College student"
  );
}

function detectPersona(input: AssessmentInput): UserPersona {
  const supportedByFamily =
    input.primaryMoneySource === "Parents or family" ||
    input.primaryMoneySource === "Mostly family support";

  const mixedStudentMoney =
    input.primaryMoneySource === "Part-time work and family support" ||
    input.primaryMoneySource === "Part-time work";

  if (input.lifeStage === "Pre-college / high school") {
    return supportedByFamily ? "teen-supported" : "student-earning";
  }

  if (input.lifeStage === "College student") {
    if (supportedByFamily) return "student-dependent";
    if (mixedStudentMoney) return "student-earning";
    return "student-earning";
  }

  const financiallyTight =
    input.endOfMonthSituation === "I usually run low before the month ends" ||
    input.endOfMonthSituation === "I often do not know where my money went" ||
    input.stressLevel === "Very stressed" ||
    input.stressLevel === "Somewhat stressed";

  if (financiallyTight) return "working-tight";

  if (
    input.lifeStage === "Working part time" ||
    input.lifeStage === "Working full time"
  ) {
    return "working-steady";
  }

  return "general";
}

function knowledgeIsVeryLow(input: AssessmentInput) {
  const fields = [
    input.basicsStocks,
    input.basicsIndexFunds,
    input.basicsStockMarket,
    input.basicsInterest,
    input.basicsCredit,
    input.basicsBudgeting,
  ];

  const lowCount = fields.filter(
    (item) => item === "No" || item === "A little"
  ).length;

  return lowCount >= 5;
}

function knowledgeIsLow(input: AssessmentInput) {
  const fields = [
    input.basicsStocks,
    input.basicsIndexFunds,
    input.basicsStockMarket,
    input.basicsInterest,
    input.basicsCredit,
    input.basicsBudgeting,
  ];

  const lowCount = fields.filter(
    (item) => item === "No" || item === "A little"
  ).length;

  return lowCount >= 3;
}

function rankRequestedModules(input: AssessmentInput): RecommendedModule[] {
  const picks = input.topPriority || [];
  const ranked: RecommendedModule[] = [];

  const add = (module: RecommendedModule) => {
    if (!ranked.includes(module)) ranked.push(module);
  };

  if (picks.includes("Learning the basic 101 of money")) {
    add("money-101-foundations");
  }

  if (
    picks.includes("Bank accounts and debit cards") ||
    picks.includes("Credit cards and how they work")
  ) {
    add(
      input.basicsCredit === "No" ? "money-101-foundations" : "credit-scores-and-credit-cards"
    );
  }

  if (
    picks.includes("Budgeting and spending control") ||
    picks.includes("Debt and repayment basics")
  ) {
    add("budgeting-and-cash-flow");
  }

  if (
    picks.includes("Saving money") ||
    picks.includes("Emergency fund basics")
  ) {
    add("saving-starting-early-and-long-term-impact");
  }

  if (
    picks.includes("How investing works in very simple terms") ||
    picks.includes("Stocks and investing")
  ) {
    add(
      input.basicsStocks === "No" ||
        input.basicsIndexFunds === "No" ||
        input.basicsStockMarket === "No"
        ? "money-101-foundations"
        : "investing-basics-and-first-stocks"
    );
  }

  if (picks.includes("Paychecks, taxes, and first-job money basics")) {
    add("money-101-foundations");
  }

  return ranked;
}

function detectTopModule(input: AssessmentInput): RecommendedModule {
  const ranked = rankRequestedModules(input);
  if (ranked.length > 0) return ranked[0];

  if (knowledgeIsVeryLow(input)) {
    return "money-101-foundations";
  }

  if (
    input.endOfMonthSituation === "I usually run low before the month ends" ||
    input.moneyHabitStyle === "I spend first and think later" ||
    input.moneyHabitStyle === "I want to improve but do not know where to start"
  ) {
    return "budgeting-and-cash-flow";
  }

  if (
    input.hasCreditCard === "Credit card but I am not fully sure how it works" ||
    input.hasCreditCard === "I am not sure how they work" ||
    input.basicsCredit === "No"
  ) {
    return "money-101-foundations";
  }

  if (isStudent(input) && knowledgeIsLow(input)) {
    return "money-101-foundations";
  }

  return "saving-starting-early-and-long-term-impact";
}

function getOrderedModules(
  input: AssessmentInput,
  top: RecommendedModule,
  persona: UserPersona
): RecommendedModule[] {
  const requested = rankRequestedModules(input);

  let ordered: RecommendedModule[] = [
    "money-101-foundations",
    "budgeting-and-cash-flow",
    "saving-starting-early-and-long-term-impact",
    "credit-scores-and-credit-cards",
    "investing-basics-and-first-stocks",
  ];

  if (persona === "working-tight") {
    ordered = [
      "budgeting-and-cash-flow",
      "money-101-foundations",
      "saving-starting-early-and-long-term-impact",
      "credit-scores-and-credit-cards",
      "investing-basics-and-first-stocks",
    ];
  }

  const merged = [top, ...requested, ...ordered];
  return [...new Set(merged)];
}

function buildEncouragement(
  input: AssessmentInput,
  persona: UserPersona
): { title: string; body: string } {
  if (
    input.stressLevel === "Very stressed" ||
    input.stressLevel === "Somewhat stressed"
  ) {
    return {
      title: "This can feel heavy, and that is normal.",
      body: "When money feels stressful, the best next move is not more noise. It is one clear starting point that makes things feel simpler and less overwhelming.",
    };
  }

  if (persona === "teen-supported" || persona === "student-dependent") {
    return {
      title: "Starting early gives you a real advantage.",
      body: "A lot of people do not learn this stuff until life is already more expensive. You are looking at it earlier, which gives you more time to understand the basics before the pressure gets bigger.",
    };
  }

  return {
    title: "You are starting in the right place.",
    body: "A lot of people avoid money until it becomes a bigger problem. You are looking at it now, which makes it easier to build better habits step by step.",
  };
}

function buildFocus(
  topModule: RecommendedModule
): { title: string; body: string } {
  if (topModule === "money-101-foundations") {
    return {
      title: "Your clearest next move is to build the basic 101 first.",
      body: "Before getting into deeper topics, it helps to understand the core building blocks. That means bank accounts, debit versus credit, budgeting, saving, interest, and the most basic money rules.",
    };
  }

  if (topModule === "investing-basics-and-first-stocks") {
    return {
      title: "Your clearest next move is to learn the basics of stocks and markets.",
      body: "Before anyone buys anything, it helps to understand what a stock is, what the market is, what an index fund is, and how to start in a calmer way.",
    };
  }

  if (topModule === "budgeting-and-cash-flow") {
    return {
      title: "Your clearest next move is to understand where your money goes.",
      body: "A simple budget is not about restriction. It is about reducing surprises, making choices clearer, and creating a little more breathing room.",
    };
  }

  if (topModule === "credit-scores-and-credit-cards") {
    return {
      title: "Your clearest next move is to understand how cards and credit really work.",
      body: "Debit and credit can look similar on the surface, but they behave very differently. Learning the basic rules early can prevent expensive mistakes later.",
    };
  }

  return {
    title: "Your clearest next move is to build a simple saving habit.",
    body: "Saving is not just about discipline. It is about creating a little stability, a little choice, and a little less pressure over time.",
  };
}

export function buildPersonalizedPlan(input: AssessmentInput): PersonalizedPlan {
  const persona = detectPersona(input);
  const topModule = detectTopModule(input);

  return {
    persona,
    encouragement: buildEncouragement(input, persona),
    strengths: [],
    focus: buildFocus(topModule),
    recommendedPath: {
      modules: getOrderedModules(input, topModule, persona),
    },
  };
}