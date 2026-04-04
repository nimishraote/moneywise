import type { AssessmentInput } from "@/lib/types/assessment";
import type {
  PersonalizedPlan,
  RecommendedModule,
} from "@/lib/types/personalized-plan";

function getTopModule(input: AssessmentInput): RecommendedModule {
  if (input.helpAreas.includes("Saving money"))
    return "saving-starting-early-and-long-term-impact";
  if (input.helpAreas.includes("Budgeting")) return "budgeting-and-cash-flow";
  if (input.helpAreas.includes("Understanding credit"))
    return "credit-scores-and-credit-cards";

  if (
    input.paycheckStatus === "I earn money and it feels tight month to month" ||
    input.paycheckStatus === "I earn some money but it is inconsistent" ||
    input.emotionalStates.includes("I feel stressed about money")
  ) {
    return "budgeting-and-cash-flow";
  }

  if (
    input.lifeStage === "Pre-college / high school" ||
    input.lifeStage === "College student" ||
    input.paycheckStatus === "I am not earning regularly right now" ||
    input.paycheckStatus === "I am mostly supported by parents or family"
  ) {
    return "saving-starting-early-and-long-term-impact";
  }

  return "saving-starting-early-and-long-term-impact";
}

function getRemainingModules(top: RecommendedModule): RecommendedModule[] {
  const ordered: RecommendedModule[] = [
    "saving-starting-early-and-long-term-impact",
    "budgeting-and-cash-flow",
    "credit-scores-and-credit-cards",
  ];
  return [top, ...ordered.filter((item) => item !== top)];
}

function buildStrengths(input: AssessmentInput): string[] {
  const strengths: string[] = [];

  if (input.helpAreas.length > 0) {
    strengths.push("You were clear about the kind of help you want right now.");
  }

  if (input.freeTextGoal && input.freeTextGoal.trim().length > 12) {
    strengths.push(
      "You gave the app a real goal to work around, not just generic answers."
    );
  }

  if (input.emotionalStates.length > 0) {
    strengths.push(
      "You were honest about how money feels, which makes the plan more useful."
    );
  }

  if (strengths.length < 3) {
    strengths.push(
      "You took the time to understand your money life instead of avoiding it."
    );
  }

  if (strengths.length < 3) {
    strengths.push(
      "You are starting before life gets more expensive and more complicated."
    );
  }

  return strengths.slice(0, 3);
}

function buildEncouragement(input: AssessmentInput) {
  const lifeStage = input.lifeStage || "where you are right now";

  if (input.emotionalStates.includes("I feel stressed about money")) {
    return {
      title: "This can feel heavy, and you are not the only one.",
      body: `Money stress is common, especially when you are in ${lifeStage.toLowerCase()}. The important thing is that you are looking at it directly now. That creates a real chance to move from pressure to clarity.`,
    };
  }

  if (
    input.lifeStage === "Pre-college / high school" ||
    input.lifeStage === "College student"
  ) {
    return {
      title: "Starting this early gives you an advantage.",
      body: "A lot of people do not think seriously about money until they are already under pressure. You are looking at it earlier, which gives you more room to build good habits before life gets more expensive.",
    };
  }

  return {
    title: "You made a strong start.",
    body: "A lot of people postpone money until it becomes a source of pressure. You did not. You showed up, answered honestly, and gave the app enough signal to build something more useful than generic advice.",
  };
}

export function buildPersonalizedPlan(
  input: AssessmentInput
): PersonalizedPlan {
  const topModule = getTopModule(input);
  const modules = getRemainingModules(topModule);

  const encouragement = buildEncouragement(input);
  const strengths = buildStrengths(input);

  let focus = {
    title: "Your clearest next move is to build a small savings habit.",
    body: "You do not need a perfect plan or a big income to begin. A repeatable savings habit can reduce pressure, create stability, and make future choices easier.",
  };

  if (topModule === "budgeting-and-cash-flow") {
    focus = {
      title: "Your clearest next move is to get more control over monthly money flow.",
      body: "That means understanding what is coming in, what is going out, and where small changes could create breathing room. Once that feels clearer, everything else becomes easier to build on.",
    };
  }

  if (topModule === "credit-scores-and-credit-cards") {
    focus = {
      title: "Your clearest next move is to strengthen your understanding of credit.",
      body: "Credit can affect borrowing, housing, and financial flexibility later. A little clarity now can prevent expensive misunderstandings and help you make calmer decisions.",
    };
  }

  return {
    encouragement,
    strengths,
    focus,
    recommendedPath: { modules },
  };
}