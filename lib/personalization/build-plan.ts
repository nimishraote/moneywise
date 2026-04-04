import type { AssessmentInput } from "@/lib/types/assessment";
import type {
  PersonalizedPlan,
  RecommendedModule,
  UserPersona,
} from "@/lib/types/personalized-plan";

function normalize(input?: string) {
  return (input || "").toLowerCase().trim();
}

function detectPersona(input: AssessmentInput): UserPersona {
  const isTeen =
    input.ageRange === "14 to 18" ||
    input.lifeStage === "Pre-college / high school";

  const supported =
    input.paycheckStatus === "I am mostly supported by parents or family";
  const notEarning =
    input.paycheckStatus === "I am not earning regularly right now";
  const tight =
    input.paycheckStatus === "I earn money and it feels tight month to month";
  const inconsistent =
    input.paycheckStatus === "I earn some money but it is inconsistent";

  if (isTeen && (supported || notEarning)) return "teen-supported";
  if (input.lifeStage === "College student" && (supported || notEarning)) {
    return "student-dependent";
  }
  if (input.lifeStage === "College student" && (tight || inconsistent)) {
    return "student-earning";
  }
  if (tight || inconsistent) return "working-tight";
  if (input.lifeStage === "Early-career working professional") {
    return "working-steady";
  }
  return "general";
}

function detectSignals(input: AssessmentInput) {
  const goal = normalize(input.freeTextGoal);

  const wantsInvesting =
    input.helpAreas.includes("Learning to invest") ||
    /invest|investing|stock|stocks|etf|etfs|index fund|brokerage|s&p|shares/.test(
      goal
    );

  const wantsCredit =
    input.helpAreas.includes("Understanding credit") ||
    /credit|credit card|credit score|fico|debt|interest/.test(goal);

  const wantsBudgeting =
    input.helpAreas.includes("Budgeting") ||
    /budget|budgeting|spend|spending|rent|cash flow|monthly|paycheck/.test(goal);

  const wantsSaving =
    input.helpAreas.includes("Saving money") ||
    /save|saving|savings|emergency fund|cushion|buffer/.test(goal);

  const stressed =
    input.emotionalStates.includes("I feel stressed about money") ||
    input.emotionalStates.includes("I think about money but feel confused");

  return {
    wantsInvesting,
    wantsCredit,
    wantsBudgeting,
    wantsSaving,
    stressed,
  };
}

function getTopModule(
  input: AssessmentInput,
  persona: UserPersona
): RecommendedModule {
  const signals = detectSignals(input);

  if (signals.wantsInvesting) return "investing-basics-and-first-stocks";
  if (signals.wantsCredit) return "credit-scores-and-credit-cards";
  if (signals.wantsBudgeting) return "budgeting-and-cash-flow";
  if (signals.wantsSaving) return "saving-starting-early-and-long-term-impact";

  if (persona === "teen-supported" || persona === "student-dependent") {
    return "saving-starting-early-and-long-term-impact";
  }

  if (persona === "working-tight" || signals.stressed) {
    return "budgeting-and-cash-flow";
  }

  return "saving-starting-early-and-long-term-impact";
}

function getOrderedModules(
  top: RecommendedModule,
  persona: UserPersona
): RecommendedModule[] {
  let ordered: RecommendedModule[] = [
    "saving-starting-early-and-long-term-impact",
    "budgeting-and-cash-flow",
    "credit-scores-and-credit-cards",
    "investing-basics-and-first-stocks",
  ];

  if (persona === "teen-supported" || persona === "student-dependent") {
    ordered = [
      "investing-basics-and-first-stocks",
      "saving-starting-early-and-long-term-impact",
      "credit-scores-and-credit-cards",
      "budgeting-and-cash-flow",
    ];
  }

  if (persona === "working-tight") {
    ordered = [
      "budgeting-and-cash-flow",
      "saving-starting-early-and-long-term-impact",
      "credit-scores-and-credit-cards",
      "investing-basics-and-first-stocks",
    ];
  }

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
      "You are asking these questions before the pressure gets even bigger."
    );
  }

  return strengths.slice(0, 3);
}

function buildEncouragement(
  input: AssessmentInput,
  persona: UserPersona
): { title: string; body: string } {
  if (
    input.emotionalStates.includes("I feel stressed about money") ||
    input.emotionalStates.includes("I think about money but feel confused")
  ) {
    return {
      title: "This can feel heavy, and you are not the only one.",
      body: "Money stress often grows when nobody has explained things in a way that feels simple and usable. The good news is that once the right topic is clear, things usually start to feel less overwhelming.",
    };
  }

  if (persona === "teen-supported" || persona === "student-dependent") {
    return {
      title: "Starting this early gives you a real advantage.",
      body: "A lot of people do not think seriously about money until they are already under pressure. You are looking at it earlier, which gives you more room to build understanding before the stakes get higher.",
    };
  }

  return {
    title: "You made a strong start.",
    body: "A lot of people postpone money until it becomes a source of pressure. You did not. You showed up, answered honestly, and gave the app enough signal to build something more useful than generic advice.",
  };
}

function buildFocus(
  topModule: RecommendedModule,
  persona: UserPersona
): { title: string; body: string } {
  if (topModule === "investing-basics-and-first-stocks") {
    if (persona === "teen-supported" || persona === "student-dependent") {
      return {
        title: "Your clearest next move is to build a simple investing foundation.",
        body: "You do not need to start by picking hot stocks or chasing fast wins. The best starting point is learning what investing is, how risk works, and how small early decisions can grow over time.",
      };
    }

    return {
      title: "Your clearest next move is to build confidence with investing basics.",
      body: "Before putting money into stocks, it helps to understand how markets work, what risk really means, and what kind of starting strategy fits your life right now.",
    };
  }

  if (topModule === "budgeting-and-cash-flow") {
    return {
      title: "Your clearest next move is to get more control over monthly money flow.",
      body: "That means understanding what is coming in, what is going out, and where small changes could create breathing room. Once that feels clearer, everything else becomes easier to build on.",
    };
  }

  if (topModule === "credit-scores-and-credit-cards") {
    return {
      title: "Your clearest next move is to strengthen your understanding of credit.",
      body: "Credit can affect borrowing, housing, and financial flexibility later. A little clarity now can prevent expensive misunderstandings and help you make calmer decisions.",
    };
  }

  if (persona === "teen-supported" || persona === "student-dependent") {
    return {
      title: "Your clearest next move is to start small and build a habit early.",
      body: "At this stage, the goal is not an emergency fund in the adult sense. It is learning how money grows, how to save with intention, and how to build a strong foundation before life gets more expensive.",
    };
  }

  return {
    title: "Your clearest next move is to build a small savings habit.",
    body: "You do not need a perfect plan or a big income to begin. A repeatable savings habit can reduce pressure, create stability, and make future choices easier.",
  };
}

export function buildPersonalizedPlan(
  input: AssessmentInput
): PersonalizedPlan {
  const persona = detectPersona(input);
  const topModule = getTopModule(input, persona);

  return {
    persona,
    encouragement: buildEncouragement(input, persona),
    strengths: buildStrengths(input),
    focus: buildFocus(topModule, persona),
    recommendedPath: {
      modules: getOrderedModules(topModule, persona),
    },
  };
}