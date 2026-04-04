import type { AssessmentInput } from "@/lib/types/assessment";
import type { PersonalizedPlan, RecommendedModule } from "@/lib/types/personalized-plan";

function getTopModule(input: AssessmentInput): RecommendedModule {
  if (input.helpAreas.includes("Budgeting")) return "budgeting-and-cash-flow";
  if (input.helpAreas.includes("Saving money")) return "saving-starting-early-and-long-term-impact";
  if (input.helpAreas.includes("Understanding credit")) return "credit-scores-and-credit-cards";
  if (input.paycheckStatus === "Yes" || input.paycheckStatus === "Sometimes") return "budgeting-and-cash-flow";
  if (input.emotionalStates.includes("I feel stressed about money")) return "budgeting-and-cash-flow";
  return "saving-starting-early-and-long-term-impact";
}

function getRemainingModules(top: RecommendedModule): RecommendedModule[] {
  const ordered: RecommendedModule[] = [
    "budgeting-and-cash-flow",
    "saving-starting-early-and-long-term-impact",
    "credit-scores-and-credit-cards",
  ];
  return [top, ...ordered.filter((item) => item !== top)];
}

export function buildPersonalizedPlan(input: AssessmentInput): PersonalizedPlan {
  const topModule = getTopModule(input);
  const modules = getRemainingModules(topModule);

  const strengths: string[] = [];
  if (input.helpAreas.length > 0) strengths.push("You were clear about the kind of help you want right now.");
  if (input.freeTextGoal && input.freeTextGoal.trim().length > 12) strengths.push("You gave the app a real goal to work around, not just generic answers.");
  if (input.emotionalStates.length > 0) strengths.push("You were honest about how money feels, which makes the plan more useful.");
  if (strengths.length < 3) strengths.push("You took the time to understand your money life instead of avoiding it.");
  if (strengths.length < 3) strengths.push("You are starting before life gets more expensive and more complicated.");

  let encouragement = {
    title: "You made a strong start.",
    body: "A lot of people postpone money until it becomes a source of pressure. You did not. You showed up, answered honestly, and gave the app enough signal to build something more useful than generic advice.",
  };
  if (input.emotionalStates.includes("I feel stressed about money")) {
    encouragement = {
      title: "This can feel heavy, and you are not the only one.",
      body: "Money stress is common, especially early in adult life. The important thing is that you are looking at it directly now. That creates a real chance to move from pressure to clarity.",
    };
  }

  let focus = {
    title: "Your clearest next move is to get more control over monthly money flow.",
    body: "That means understanding what is coming in, what is going out, and where small changes could create breathing room. Once that feels clearer, everything else becomes easier to build on.",
  };
  let firstStep = {
    label: "Start with budgeting and cash flow",
    body: "Focus first on getting a clearer picture of monthly spending and pressure points.",
  };
  let nextActions = [
    "Map what money comes in each month and what must go out.",
    "Look for one or two changes that could create breathing room.",
    "Build enough clarity that saving starts to feel possible.",
  ];

  if (topModule === "saving-starting-early-and-long-term-impact") {
    focus = {
      title: "Your clearest next move is to build a small savings habit.",
      body: "You do not need a perfect plan or a big income to begin. A repeatable savings habit can reduce pressure, create stability, and make future choices easier.",
    };
    firstStep = { label: "Start with saving and starting early", body: "Begin with a savings goal that feels realistic enough to repeat." };
    nextActions = [
      "Pick one simple savings goal that feels meaningful.",
      "Choose a monthly amount you can repeat without strain.",
      "Build consistency before trying to optimize everything.",
    ];
  }

  if (topModule === "credit-scores-and-credit-cards") {
    focus = {
      title: "Your clearest next move is to strengthen your understanding of credit.",
      body: "Credit can affect borrowing, housing, and financial flexibility later. A little clarity now can prevent expensive misunderstandings and help you make calmer decisions.",
    };
    firstStep = { label: "Start with credit scores and credit cards", body: "Learn the basics first so credit feels less mysterious and less risky." };
    nextActions = [
      "Understand what affects a credit score in simple terms.",
      "Learn how credit cards help or hurt depending on behavior.",
      "Build enough confidence to avoid common early mistakes.",
    ];
  }

  return { encouragement, strengths, focus, recommendedPath: { modules }, firstStep, nextActions };
}
