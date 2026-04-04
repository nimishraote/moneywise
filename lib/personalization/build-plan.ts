import type { AssessmentInput } from "@/lib/types/assessment";
import type {
  FocusArea,
  PersonalizedPlan,
  RecommendedModule,
  UserPersona,
} from "@/lib/types/personalized-plan";

type CanonicalNeed =
  | "foundations"
  | "budgeting"
  | "saving"
  | "credit"
  | "investing"
  | "paychecks"
  | "banking"
  | "debt";

type NeedScoreMap = Record<CanonicalNeed, number>;

type KnowledgeLevel = "none" | "little" | "clear";

type PlanContext = {
  persona: UserPersona;
  scores: NeedScoreMap;
  topModule: RecommendedModule;
  topCanonicalNeed: CanonicalNeed;
  mappedScores: Record<RecommendedModule, number>;
};

const knowledgeValue: Record<KnowledgeLevel, number> = {
  none: 2,
  little: 1,
  clear: 0,
};

const moduleTitles: Record<RecommendedModule, string> = {
  "money-101-foundations": "Money basics 101",
  "budgeting-and-cash-flow": "Budgeting and cash flow",
  "saving-starting-early-and-long-term-impact":
    "Saving, starting early, and long-term impact",
  "credit-scores-and-credit-cards": "Credit scores and credit cards",
  "investing-basics-and-first-stocks": "Investing basics and first stocks",
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function isStudentLike(input: AssessmentInput) {
  return (
    input.lifeStage === "Pre-college / high school" ||
    input.lifeStage === "College student" ||
    input.lifeStage === "Mostly supported by family"
  );
}

function isWorkingLike(input: AssessmentInput) {
  return (
    input.lifeStage === "Working full time" ||
    input.lifeStage === "Working part time" ||
    input.lifeStage === "Between jobs"
  );
}

function toKnowledgeLevel(value: string): KnowledgeLevel {
  if (value === "No") return "none";
  if (value === "A little") return "little";
  return "clear";
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

  if (input.lifeStage === "Between jobs") {
    return "between-jobs";
  }

  const financiallyTight =
    input.endOfMonthSituation === "I usually run low before the month ends" ||
    input.endOfMonthSituation === "I often do not know where my money went" ||
    input.endOfMonthSituation === "Rarely" ||
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

function blankScores(): NeedScoreMap {
  return {
    foundations: 0,
    budgeting: 0,
    saving: 0,
    credit: 0,
    investing: 0,
    paychecks: 0,
    banking: 0,
    debt: 0,
  };
}

function add(scoreMap: NeedScoreMap, need: CanonicalNeed, points: number) {
  scoreMap[need] += points;
}

function applyLifeStageSignals(input: AssessmentInput, scores: NeedScoreMap) {
  if (input.lifeStage === "Pre-college / high school") {
    add(scores, "foundations", 25);
    add(scores, "banking", 14);
    add(scores, "saving", 10);
    add(scores, "credit", 8);
  }

  if (input.lifeStage === "College student") {
    add(scores, "budgeting", 14);
    add(scores, "saving", 12);
    add(scores, "credit", 11);
    add(scores, "foundations", 10);
  }

  if (input.lifeStage === "Working part time") {
    add(scores, "budgeting", 15);
    add(scores, "saving", 12);
    add(scores, "paychecks", 10);
  }

  if (input.lifeStage === "Working full time") {
    add(scores, "budgeting", 12);
    add(scores, "saving", 12);
    add(scores, "paychecks", 15);
    add(scores, "investing", 8);
  }

  if (input.lifeStage === "Between jobs") {
    add(scores, "budgeting", 22);
    add(scores, "saving", 18);
    add(scores, "foundations", 8);
  }

  if (input.lifeStage === "Mostly supported by family") {
    add(scores, "foundations", 18);
    add(scores, "banking", 12);
    add(scores, "saving", 10);
  }
}

function applyMoneySituationSignals(input: AssessmentInput, scores: NeedScoreMap) {
  if (input.incomePattern === "Regular paycheck") {
    add(scores, "paychecks", 16);
    add(scores, "budgeting", 8);
  }

  if (input.incomePattern === "Irregular income") {
    add(scores, "budgeting", 22);
    add(scores, "saving", 10);
  }

  if (input.incomePattern === "Both") {
    add(scores, "budgeting", 18);
    add(scores, "paychecks", 8);
    add(scores, "saving", 8);
  }

  if (input.incomePattern === "Not earning right now") {
    add(scores, "budgeting", 16);
    add(scores, "saving", 10);
    add(scores, "foundations", 6);
  }

  if (
    input.endOfMonthSituation === "I usually run low before the month ends" ||
    input.endOfMonthSituation === "Rarely"
  ) {
    add(scores, "budgeting", 28);
    add(scores, "saving", 12);
    add(scores, "debt", 8);
  }

  if (
    input.endOfMonthSituation === "I often do not know where my money went" ||
    input.endOfMonthSituation === "I am not sure"
  ) {
    add(scores, "budgeting", 30);
    add(scores, "foundations", 10);
  }

  if (
    input.endOfMonthSituation === "Sometimes" ||
    input.endOfMonthSituation === "I usually have enough left" ||
    input.endOfMonthSituation === "Yes, usually"
  ) {
    add(scores, "saving", 10);
    add(scores, "investing", 6);
  }

  if (
    input.primaryMoneySource === "Parents or family" ||
    input.primaryMoneySource === "Mostly family support"
  ) {
    add(scores, "foundations", 8);
    add(scores, "banking", 8);
    add(scores, "saving", 8);
  }

  if (
    input.primaryMoneySource === "Mainly salary or wages" ||
    input.primaryMoneySource === "Part-time work" ||
    input.primaryMoneySource === "Part-time work and family support"
  ) {
    add(scores, "budgeting", 10);
    add(scores, "saving", 8);
  }

  if (
    input.mainSpendingCategory === "Subscriptions" ||
    input.mainSpendingCategory === "Going out"
  ) {
    add(scores, "budgeting", 8);
  }
}

function applyBehaviorSignals(input: AssessmentInput, scores: NeedScoreMap) {
  if (input.moneyCheckFrequency === "Rarely" || input.moneyCheckFrequency === "I avoid it") {
    add(scores, "budgeting", 18);
    add(scores, "foundations", 8);
  }

  if (input.moneyHabitStyle === "I spend first and think later") {
    add(scores, "budgeting", 24);
    add(scores, "credit", 8);
    add(scores, "debt", 8);
  }

  if (input.moneyHabitStyle === "I try to save but it is inconsistent") {
    add(scores, "saving", 16);
    add(scores, "budgeting", 10);
  }

  if (input.moneyHabitStyle === "I am careful but confused") {
    add(scores, "foundations", 12);
    add(scores, "banking", 6);
    add(scores, "credit", 6);
  }

  if (input.moneyHabitStyle === "I want to improve but do not know where to start") {
    add(scores, "foundations", 18);
    add(scores, "budgeting", 10);
  }

  if (input.stressLevel === "Very stressed") {
    add(scores, "budgeting", 16);
    add(scores, "saving", 8);
    add(scores, "foundations", 8);
  }

  if (input.stressLevel === "Somewhat stressed") {
    add(scores, "budgeting", 10);
    add(scores, "saving", 6);
  }

  if (input.confidenceLevel === "Very low") {
    add(scores, "foundations", 20);
    add(scores, "banking", 8);
    add(scores, "credit", 8);
  }

  if (input.confidenceLevel === "Low") {
    add(scores, "foundations", 12);
    add(scores, "budgeting", 8);
  }

  if (input.confidenceLevel === "Fairly confident") {
    add(scores, "investing", 8);
    add(scores, "saving", 6);
  }
}

function applyKnowledgeSignals(input: AssessmentInput, scores: NeedScoreMap) {
  const stocks = toKnowledgeLevel(input.basicsStocks);
  const indexFunds = toKnowledgeLevel(input.basicsIndexFunds);
  const market = toKnowledgeLevel(input.basicsStockMarket);
  const interest = toKnowledgeLevel(input.basicsInterest);
  const credit = toKnowledgeLevel(input.basicsCredit);
  const budgeting = toKnowledgeLevel(input.basicsBudgeting);

  add(scores, "investing", knowledgeValue[stocks] * 7);
  add(scores, "investing", knowledgeValue[indexFunds] * 10);
  add(scores, "investing", knowledgeValue[market] * 8);
  add(scores, "saving", knowledgeValue[interest] * 4);
  add(scores, "credit", knowledgeValue[credit] * 10);
  add(scores, "banking", knowledgeValue[credit] * 4);
  add(scores, "budgeting", knowledgeValue[budgeting] * 10);
  add(
    scores,
    "foundations",
    knowledgeValue[interest] * 4 +
      knowledgeValue[credit] * 4 +
      knowledgeValue[budgeting] * 4
  );
}

function applyPrioritySignals(input: AssessmentInput, scores: NeedScoreMap) {
  for (const priority of input.topPriority || []) {
    switch (priority) {
      case "Learning the basic 101 of money":
        add(scores, "foundations", 22);
        break;
      case "Bank accounts and debit cards":
        add(scores, "banking", 20);
        add(scores, "foundations", 8);
        break;
      case "Budgeting and spending control":
        add(scores, "budgeting", 20);
        break;
      case "Saving money":
        add(scores, "saving", 18);
        break;
      case "Credit cards and how they work":
        add(scores, "credit", 22);
        break;
      case "Debt and repayment basics":
        add(scores, "debt", 24);
        add(scores, "budgeting", 8);
        break;
      case "Emergency fund basics":
        add(scores, "saving", 18);
        break;
      case "How investing works":
        add(scores, "investing", 20);
        break;
      case "How taxes work":
        add(scores, "paychecks", 18);
        break;
      case "How to start building wealth early":
        add(scores, "saving", 12);
        add(scores, "investing", 16);
        break;
      default:
        break;
    }
  }
}

function applyGuardrails(input: AssessmentInput, scores: NeedScoreMap) {
  const strongBudgetRisk =
    input.endOfMonthSituation === "I usually run low before the month ends" ||
    input.endOfMonthSituation === "I often do not know where my money went" ||
    input.moneyCheckFrequency === "Rarely" ||
    input.moneyCheckFrequency === "I avoid it" ||
    input.moneyHabitStyle === "I spend first and think later" ||
    input.stressLevel === "Very stressed";

  const clearBudgetingKnowledge = toKnowledgeLevel(input.basicsBudgeting) === "clear";
  const clearCreditKnowledge = toKnowledgeLevel(input.basicsCredit) === "clear";
  const strongInvestingInterest =
    input.topPriority.includes("How investing works") ||
    input.topPriority.includes("How to start building wealth early");

  if (strongBudgetRisk) {
    add(scores, "budgeting", 22);
    scores.investing = Math.max(scores.investing - 8, 0);
  }

  if (
    clearCreditKnowledge &&
    !input.topPriority.includes("Credit cards and how they work") &&
    scores.credit > 12
  ) {
    scores.credit = Math.max(scores.credit - 12, 0);
  }

  if (
    clearBudgetingKnowledge &&
    input.endOfMonthSituation !== "I usually run low before the month ends" &&
    input.endOfMonthSituation !== "I often do not know where my money went" &&
    scores.budgeting > 10
  ) {
    scores.budgeting = Math.max(scores.budgeting - 8, 0);
  }

  if (
    strongInvestingInterest &&
    !strongBudgetRisk &&
    input.confidenceLevel !== "Very low" &&
    input.confidenceLevel !== "Low"
  ) {
    add(scores, "investing", 10);
  }

  const fullySupportedTeen =
    input.lifeStage === "Pre-college / high school" &&
    (input.primaryMoneySource === "Parents or family" ||
      input.primaryMoneySource === "Mostly family support");

  if (fullySupportedTeen) {
    add(scores, "foundations", 16);
    add(scores, "banking", 8);
    scores.investing = Math.max(scores.investing - 8, 0);
  }

  const workingWithPaycheck =
    isWorkingLike(input) &&
    input.incomePattern === "Regular paycheck" &&
    input.endOfMonthSituation !== "I usually run low before the month ends" &&
    input.endOfMonthSituation !== "I often do not know where my money went";

  if (workingWithPaycheck) {
    add(scores, "saving", 10);
    add(scores, "paychecks", 8);
  }
}

function scoreNeeds(input: AssessmentInput): NeedScoreMap {
  const scores = blankScores();

  applyLifeStageSignals(input, scores);
  applyMoneySituationSignals(input, scores);
  applyBehaviorSignals(input, scores);
  applyKnowledgeSignals(input, scores);
  applyPrioritySignals(input, scores);
  applyGuardrails(input, scores);

  return {
    foundations: clamp(scores.foundations),
    budgeting: clamp(scores.budgeting),
    saving: clamp(scores.saving),
    credit: clamp(scores.credit),
    investing: clamp(scores.investing),
    paychecks: clamp(scores.paychecks),
    banking: clamp(scores.banking),
    debt: clamp(scores.debt),
  };
}

function mapCanonicalNeedsToModules(scores: NeedScoreMap): Record<RecommendedModule, number> {
  return {
    "money-101-foundations":
      scores.foundations + Math.round(scores.banking * 0.7) + Math.round(scores.paychecks * 0.25),
    "budgeting-and-cash-flow":
      scores.budgeting + Math.round(scores.debt * 0.45) + Math.round(scores.paychecks * 0.15),
    "saving-starting-early-and-long-term-impact":
      scores.saving + Math.round(scores.paychecks * 0.25) + Math.round(scores.foundations * 0.15),
    "credit-scores-and-credit-cards":
      scores.credit + Math.round(scores.debt * 0.3) + Math.round(scores.foundations * 0.15),
    "investing-basics-and-first-stocks":
      scores.investing + Math.round(scores.saving * 0.25),
  };
}

function sortModules(
  mappedScores: Record<RecommendedModule, number>
): RecommendedModule[] {
  return (Object.entries(mappedScores) as [RecommendedModule, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([module]) => module);
}

function topCanonicalNeed(scores: NeedScoreMap): CanonicalNeed {
  return (Object.entries(scores) as [CanonicalNeed, number][])
    .sort((a, b) => b[1] - a[1])[0][0];
}

function buildContext(input: AssessmentInput): PlanContext {
  const persona = detectPersona(input);
  const scores = scoreNeeds(input);
  const mappedScores = mapCanonicalNeedsToModules(scores);
  const topModule = sortModules(mappedScores)[0];
  const topNeed = topCanonicalNeed(scores);

  return {
    persona,
    scores,
    topModule,
    topCanonicalNeed: topNeed,
    mappedScores,
  };
}

function buildEncouragement(input: AssessmentInput, context: PlanContext) {
  const topPriority = input.topPriority?.[0];

  if (context.persona === "teen-supported" || context.persona === "student-dependent") {
    return {
      title: "You do not need to know everything yet to get started well.",
      body:
        "You are at a stage where small money habits can make a real difference later. Starting with simple clarity now is much more valuable than trying to sound advanced too early.",
    };
  }

  if (context.persona === "between-jobs") {
    return {
      title: "A clear plan matters even more during an uncertain stretch.",
      body:
        "The goal right now is not perfection. It is to create a simpler system that gives you more control and reduces financial stress while your situation stabilizes.",
    };
  }

  if (context.topModule === "budgeting-and-cash-flow") {
    return {
      title: "The fastest win is getting clearer control over your monthly money flow.",
      body:
        "Once you can see where your money comes in, where it goes, and where it starts slipping away, every other money decision gets easier.",
    };
  }

  if (context.topModule === "saving-starting-early-and-long-term-impact") {
    return {
      title: "You may be ready to turn decent money habits into real momentum.",
      body:
        "Saving is often where confidence starts to compound. A simple system now can lower stress and give you more freedom later.",
    };
  }

  if (context.topModule === "investing-basics-and-first-stocks") {
    return {
      title: "You may already have enough basic structure to start learning the next layer.",
      body:
        "The point is not to rush into complicated investing decisions. It is to understand how long-term money growth works while your time advantage is still high.",
    };
  }

  return {
    title: "The goal is not to master everything at once.",
    body:
      "A strong starting plan should help you focus on the few things that matter most right now, instead of drowning you in too many money topics at once.",
  };
}

function buildSnapshot(input: AssessmentInput, context: PlanContext) {
  const strongBudgetKnowledge = toKnowledgeLevel(input.basicsBudgeting) === "clear";
  const strongCreditKnowledge = toKnowledgeLevel(input.basicsCredit) === "clear";
  const weakInvestingKnowledge =
    toKnowledgeLevel(input.basicsStocks) !== "clear" ||
    toKnowledgeLevel(input.basicsIndexFunds) !== "clear";

  if (
    isWorkingLike(input) &&
    input.incomePattern === "Regular paycheck" &&
    strongCreditKnowledge &&
    strongBudgetKnowledge &&
    context.topModule === "saving-starting-early-and-long-term-impact"
  ) {
    return {
      title: "You seem to have a decent base, but not yet a strong money system.",
      body:
        "You appear to understand some everyday money basics already, which is a real strength. The bigger opportunity now is turning that knowledge into a repeatable saving structure that works month after month.",
    };
  }

  if (
    context.topModule === "budgeting-and-cash-flow" &&
    (input.endOfMonthSituation === "I usually run low before the month ends" ||
      input.endOfMonthSituation === "I often do not know where my money went")
  ) {
    return {
      title: "Your answers suggest that money feels harder in practice than in theory.",
      body:
        "That usually means the next win is not learning more abstract concepts. It is getting clearer control over spending, timing, and what happens by the end of the month.",
    };
  }

  if (
    context.topModule === "money-101-foundations" &&
    isStudentLike(input)
  ) {
    return {
      title: "You are still building the base layer, and that is completely fine.",
      body:
        "Right now the most useful thing is to get comfortable with the basic building blocks of money, because that makes later topics like saving, credit, and investing much easier to understand.",
    };
  }

  if (
    context.topModule === "credit-scores-and-credit-cards" &&
    toKnowledgeLevel(input.basicsCredit) !== "clear"
  ) {
    return {
      title: "Credit looks like one of the most important open gaps for you right now.",
      body:
        "That does not mean you need to rush into getting a credit card. It means understanding how credit works now can help you avoid mistakes that stay with people much longer than they expect.",
    };
  }

  if (
    context.topModule === "investing-basics-and-first-stocks" &&
    weakInvestingKnowledge
  ) {
    return {
      title: "You may be ready to learn investing, but from a practical beginner angle.",
      body:
        "Your plan should not throw you into hype or jargon. It should help you understand how investing fits into real life, what the core terms mean, and when it makes sense to take that step.",
    };
  }

  return {
    title: "Your plan should match your real life, not just your confidence level.",
    body:
      "Your answers show a mix of strengths and gaps. The goal now is to start with the topic that will help you most in day-to-day life, then build outward from there.",
  };
}

function buildStrengths(input: AssessmentInput, context: PlanContext): string[] {
  const strengths = new Set<string>();

  if (
    input.moneyCheckFrequency === "Weekly" ||
    input.moneyCheckFrequency === "A few times a week" ||
    input.moneyCheckFrequency === "Daily"
  ) {
    strengths.add("You already check in on your money with some regularity, which is a strong habit to build on.");
  }

  if (
    input.endOfMonthSituation === "I usually have enough left" ||
    input.endOfMonthSituation === "Yes, usually"
  ) {
    strengths.add("You seem to have at least some breathing room by the end of the month, which gives you a good base for building stronger habits.");
  }

  if (toKnowledgeLevel(input.basicsCredit) === "clear") {
    strengths.add("You already have a decent grasp of debit versus credit, so we do not need to start from the most basic card concepts.");
  }

  if (toKnowledgeLevel(input.basicsBudgeting) === "clear") {
    strengths.add("You already understand the idea of budgeting, which means the next step can focus more on making it practical and consistent.");
  }

  if (
    input.confidenceLevel === "Fairly confident" ||
    input.confidenceLevel === "Very confident"
  ) {
    strengths.add("You already bring some confidence to the topic, which makes it easier to turn learning into action.");
  }

  if (
    input.topPriority.includes("Saving money") ||
    input.topPriority.includes("How to start building wealth early") ||
    input.topPriority.includes("How investing works")
  ) {
    strengths.add("You are already thinking ahead, not just reacting to money problems in the moment.");
  }

  if (
    input.moneyHabitStyle === "I try to save but it is inconsistent" ||
    input.moneyHabitStyle === "I am careful but confused"
  ) {
    strengths.add("You are not ignoring money. You are already trying, which is an important starting point.");
  }

  if (strengths.size === 0) {
    if (context.persona === "teen-supported" || context.persona === "student-dependent") {
      strengths.add("You are starting early, which is itself a major advantage even if you do not feel knowledgeable yet.");
    } else {
      strengths.add("You took the time to answer honestly, which already gives us something real to work with instead of guessing.");
    }
  }

  return Array.from(strengths).slice(0, 3);
}

function moduleWhyNow(
  module: RecommendedModule,
  input: AssessmentInput,
  context: PlanContext
) {
  switch (module) {
    case "money-101-foundations":
      if (isStudentLike(input)) {
        return "Because your answers suggest that getting comfortable with everyday money basics will help you much more than jumping into advanced topics too soon.";
      }
      return "Because the clearest gap right now is not one isolated topic. It is the base layer that makes everything else easier to understand.";
    case "budgeting-and-cash-flow":
      return "Because your answers suggest that control and consistency are the biggest needs right now, especially around where your money goes and how it holds up across the month.";
    case "saving-starting-early-and-long-term-impact":
      return "Because you may be ready to turn decent day-to-day money habits into a system that helps you keep more of what you earn and build stability over time.";
    case "credit-scores-and-credit-cards":
      return "Because understanding credit now can prevent mistakes that affect later financial options far more than most people realize.";
    case "investing-basics-and-first-stocks":
      return "Because your answers suggest that learning how long-term money growth works may now be more useful than staying only at the basic awareness level.";
    default:
      return "Because this looks like the most useful next step for your situation right now.";
  }
}

function moduleActionNow(module: RecommendedModule, input: AssessmentInput) {
  switch (module) {
    case "money-101-foundations":
      return isStudentLike(input)
        ? "List where your money currently comes from, where it usually goes, and whether you already use a bank account or debit card."
        : "Write down the 3 most common places your money comes in and the 5 places it most often goes out.";
    case "budgeting-and-cash-flow":
      return "Review the last 2 to 4 weeks of spending and group it into a few simple buckets so you can see where money is leaking first.";
    case "saving-starting-early-and-long-term-impact":
      return "Choose one small weekly or monthly saving target that feels realistic enough to repeat, not impressive enough to fail.";
    case "credit-scores-and-credit-cards":
      return "Write down what you believe happens when a credit card balance is not paid in full, then compare that belief against the lesson.";
    case "investing-basics-and-first-stocks":
      return "Write down the difference you think exists between saving and investing before you start, then use the lesson to correct or sharpen it.";
    default:
      return "Take one small concrete action that helps you understand your money more clearly this week.";
  }
}

function buildFocusAreas(
  sortedModules: RecommendedModule[],
  input: AssessmentInput,
  context: PlanContext
): FocusArea[] {
  return sortedModules.slice(0, 4).map((module) => ({
    module,
    title: moduleTitles[module],
    whyNow: moduleWhyNow(module, input, context),
    actionNow: moduleActionNow(module, input),
    score: context.mappedScores[module],
  }));
}

function buildFirstLessonReason(
  input: AssessmentInput,
  context: PlanContext,
  topModule: RecommendedModule
) {
  if (
    topModule === "budgeting-and-cash-flow" &&
    input.incomePattern === "Regular paycheck" &&
    toKnowledgeLevel(input.basicsCredit) === "clear"
  ) {
    return "Even though you already understand some basics, your answers still suggest that the biggest practical opportunity is building more control over how your paycheck works across the month.";
  }

  if (
    topModule === "saving-starting-early-and-long-term-impact" &&
    input.incomePattern === "Regular paycheck"
  ) {
    return "Because you appear to have enough structure to move beyond just understanding money and start building a repeatable saving habit tied to what you earn.";
  }

  if (
    topModule === "credit-scores-and-credit-cards" &&
    toKnowledgeLevel(input.basicsCredit) !== "clear"
  ) {
    return "Because credit affects future flexibility in ways that are easy to underestimate, and your answers suggest this is still an open gap.";
  }

  if (
    topModule === "money-101-foundations" &&
    isStudentLike(input)
  ) {
    return "Because your current stage of life makes it more useful to build a strong practical base first than to jump into more advanced topics too early.";
  }

  if (topModule === "investing-basics-and-first-stocks") {
    return "Because your answers suggest that the next useful jump is learning how investing fits into real life, but from a grounded beginner perspective rather than hype.";
  }

  return moduleWhyNow(topModule, input, context);
}

function buildImmediateActions(
  input: AssessmentInput,
  context: PlanContext,
  topModule: RecommendedModule
): string[] {
  const actions = new Set<string>();

  actions.add(moduleActionNow(topModule, input));

  if (
    topModule !== "budgeting-and-cash-flow" &&
    (input.endOfMonthSituation === "I usually run low before the month ends" ||
      input.endOfMonthSituation === "I often do not know where my money went")
  ) {
    actions.add(
      "Spend 10 minutes looking at your recent transactions or purchases so you can see where money is slipping away."
    );
  }

  if (
    topModule !== "saving-starting-early-and-long-term-impact" &&
    (input.topPriority.includes("Saving money") ||
      input.topPriority.includes("Emergency fund basics") ||
      input.topPriority.includes("How to start building wealth early"))
  ) {
    actions.add(
      "Pick one small amount you could realistically set aside each week or month, even if it feels modest."
    );
  }

  if (
    topModule !== "credit-scores-and-credit-cards" &&
    toKnowledgeLevel(input.basicsCredit) !== "clear"
  ) {
    actions.add(
      "Make sure you can explain the difference between using your own money and borrowing money before moving on."
    );
  }

  if (
    isWorkingLike(input) &&
    input.incomePattern === "Regular paycheck"
  ) {
    actions.add(
      "Map your paycheck into three simple buckets: essentials, flexible spending, and what you want to keep."
    );
  }

  if (
    isStudentLike(input) &&
    topModule === "money-101-foundations"
  ) {
    actions.add(
      "Ask a parent, guardian, or trusted adult one practical question about how they use a checking or savings account."
    );
  }

  if (actions.size < 3) {
    actions.add(
      "Finish the first lesson before judging yourself. Clarity usually comes from moving through one concrete step, not from trying to solve everything in your head."
    );
  }

  return Array.from(actions).slice(0, 3);
}

export function buildPersonalizedPlan(
  input: AssessmentInput
): PersonalizedPlan {
  const context = buildContext(input);
  const sortedModules = sortModules(context.mappedScores);
  const topModule = sortedModules[0];

  return {
    persona: context.persona,
    encouragement: buildEncouragement(input, context),
    snapshot: buildSnapshot(input, context),
    strengths: buildStrengths(input, context),
    focus: {
      title: "What will help you most next",
      body:
        "This plan is ranking the areas most likely to help your real situation now, not just the topics that sound most interesting in the abstract.",
    },
    firstLessonReason: buildFirstLessonReason(input, context, topModule),
    immediateActions: buildImmediateActions(input, context, topModule),
    focusAreas: buildFocusAreas(sortedModules, input, context),
    recommendedPath: {
      modules: sortedModules.slice(0, 5),
    },
  };
}