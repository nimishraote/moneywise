import type {
  RecommendedModule,
  UserPersona,
} from "@/lib/types/personalized-plan";

export const moduleTitles: Record<RecommendedModule, string> = {
  "budgeting-and-cash-flow": "Budgeting and cash flow",
  "saving-starting-early-and-long-term-impact": "Saving and starting early",
  "credit-scores-and-credit-cards": "Credit scores and credit cards",
  "investing-basics-and-first-stocks": "Investing basics and first stocks",
};

export type LessonVisualCard = {
  label: string;
  value: string;
  detail: string;
};

export type LessonOneContent = {
  heroTitle: string;
  heroBody: string;
  sectionOneTitle: string;
  sectionOneSubtitle: string;
  sectionOneBody: string;
  sectionOneVisualTitle: string;
  sectionOneVisualCards: LessonVisualCard[];
  sectionTwoTitle: string;
  sectionTwoSubtitle: string;
  sectionTwoBody: string;
  sectionTwoVisualTitle: string;
  sectionTwoVisualCards: LessonVisualCard[];
};

export type LessonTwoContent = {
  heroTitle: string;
  heroBody: string;
  options: {
    key: "goal" | "amount" | "compare";
    title: string;
    subtitle: string;
  }[];
  details: Record<
    "goal" | "amount" | "compare",
    {
      title: string;
      subtitle: string;
      examples: { name: string; note: string; badge?: string }[];
    }
  >;
};

export function getLessonOneContent(
  module: RecommendedModule,
  persona: UserPersona
): LessonOneContent {
  if (module === "investing-basics-and-first-stocks") {
    return {
      heroTitle: "Investing basics and first stocks",
      heroBody:
        persona === "teen-supported" || persona === "student-dependent"
          ? "This lesson is about making investing feel less intimidating. You do not need to start by picking winning stocks. You need to understand the basics first, so future decisions feel calmer and smarter."
          : "This lesson is about making investing feel less intimidating. Before you put real money into stocks, it helps to understand risk, time horizon, and why simple long-term investing often beats random choices.",
      sectionOneTitle: "Start with the basics first",
      sectionOneSubtitle: "What investing actually means",
      sectionOneBody:
        "Before thinking about stocks, it helps to understand the core ideas. Investing is putting money into something that can grow over time, while accepting that values can move up and down along the way.",
      sectionOneVisualTitle: "Core investing building blocks",
      sectionOneVisualCards: [
        {
          label: "Savings",
          value: "Stability first",
          detail: "Usually steadier, but slower growth over time.",
        },
        {
          label: "Investing",
          value: "Growth with movement",
          detail: "Can grow more, but values can rise and fall.",
        },
        {
          label: "Risk",
          value: "Normal, not failure",
          detail: "Short-term swings are part of investing, not proof you did it wrong.",
        },
      ],
      sectionTwoTitle: "Then understand the main paths",
      sectionTwoSubtitle: "A calmer way to compare options",
      sectionTwoBody:
        "Once the basics are clear, the next step is understanding common paths like index funds and single stocks. For most beginners, the goal is not excitement. It is building understanding before making bigger decisions.",
      sectionTwoVisualTitle: "Three common beginner paths",
      sectionTwoVisualCards: [
        {
          label: "Savings account",
          value: "Lowest movement",
          detail: "Best for stability, not usually for strong long-term growth.",
        },
        {
          label: "Index funds",
          value: "Broader and calmer",
          detail: "A basket of many companies, often a stronger beginner path.",
        },
        {
          label: "Single stocks",
          value: "Higher swings",
          detail: "More upside and more downside if you guess wrong.",
        },
      ],
    };
  }

  if (module === "budgeting-and-cash-flow") {
    return {
      heroTitle: "Budgeting and cash flow",
      heroBody:
        "This lesson is about getting clearer on what money is doing each month. Budgeting is not about punishment. It is about reducing surprises, lowering pressure, and making your choices more visible.",
      sectionOneTitle: "Why cash flow matters",
      sectionOneSubtitle: "Start with visibility",
      sectionOneBody:
        "If money comes in and goes out without a clear picture, stress grows fast. Understanding your monthly cash flow helps you see where pressure is coming from and where small changes can help.",
      sectionOneVisualTitle: "What to map first",
      sectionOneVisualCards: [
        {
          label: "Money in",
          value: "Income",
          detail: "Job, side income, family support, or other sources.",
        },
        {
          label: "Must-pay",
          value: "Fixed costs",
          detail: "Rent, bills, transport, and other non-negotiables.",
        },
        {
          label: "Flexible spend",
          value: "Daily choices",
          detail: "Food, shopping, fun, and convenience spending.",
        },
      ],
      sectionTwoTitle: "Why a budget helps",
      sectionTwoSubtitle: "Then build structure",
      sectionTwoBody:
        "A budget gives your money a plan before it disappears. It helps you decide what matters most, what can wait, and where you may be leaking money without noticing.",
      sectionTwoVisualTitle: "A simple budget frame",
      sectionTwoVisualCards: [
        {
          label: "Needs",
          value: "Cover first",
          detail: "Make the essentials visible before anything optional.",
        },
        {
          label: "Goals",
          value: "Protect next",
          detail: "Savings, debt reduction, or other near-term priorities.",
        },
        {
          label: "Flex",
          value: "Spend last",
          detail: "Use what is left with more intention, not less freedom.",
        },
      ],
    };
  }

  if (module === "credit-scores-and-credit-cards") {
    return {
      heroTitle: "Credit scores and credit cards",
      heroBody:
        "This lesson is about making credit feel less mysterious. Credit can help or hurt depending on how it is used. Understanding the basics early can prevent expensive mistakes later.",
      sectionOneTitle: "Why credit matters",
      sectionOneSubtitle: "Start with the big picture",
      sectionOneBody:
        "Credit can affect loans, housing, and financial flexibility. The goal is not to obsess over it. The goal is to understand the rules well enough to avoid avoidable damage.",
      sectionOneVisualTitle: "What credit touches later",
      sectionOneVisualCards: [
        {
          label: "Borrowing",
          value: "Loan access",
          detail: "Credit affects whether borrowing gets easier or harder.",
        },
        {
          label: "Housing",
          value: "Applications",
          detail: "Some landlords and providers look at credit behavior.",
        },
        {
          label: "Flexibility",
          value: "Future options",
          detail: "Stronger habits now can create more choice later.",
        },
      ],
      sectionTwoTitle: "Why card habits matter",
      sectionTwoSubtitle: "Then understand behavior",
      sectionTwoBody:
        "Credit cards are not automatically good or bad. What matters is how they are used, how balances are managed, and whether payments are made on time.",
      sectionTwoVisualTitle: "Healthy vs risky patterns",
      sectionTwoVisualCards: [
        {
          label: "Healthy",
          value: "Pay on time",
          detail: "On-time payments are one of the strongest habits to build.",
        },
        {
          label: "Watch",
          value: "Keep usage controlled",
          detail: "Using too much of a limit can create pressure fast.",
        },
        {
          label: "Risky",
          value: "Ignore statements",
          detail: "Missed payments and blind spending create avoidable damage.",
        },
      ],
    };
  }

  const teenLike = persona === "teen-supported" || persona === "student-dependent";

  return {
    heroTitle: "Saving and starting early",
    heroBody:
      teenLike
        ? "This lesson is about using saving as a foundation, not as an adult emergency-fund lecture. At your stage, saving is about building awareness, patience, and a habit that gives you more control later."
        : "This lesson is about one of the most important ideas in personal finance. Saving is not just about discipline. It is about reducing pressure, creating options, and giving your future self more stability.",
    sectionOneTitle: "Why saving matters",
    sectionOneSubtitle: "The emotional side first",
    sectionOneBody:
      teenLike
        ? "Saving creates a sense of ownership and intention. Even small amounts can help you feel more in control and more prepared for choices you will make later."
        : "Saving gives breathing room. It means one unexpected bill is less likely to become a crisis. Even a small cushion can change how life feels.",
    sectionOneVisualTitle: "What saving can do",
    sectionOneVisualCards:
      teenLike
        ? [
            {
              label: "First habit",
              value: "Consistency",
              detail: "Learning to save regularly matters more than size at first.",
            },
            {
              label: "First goal",
              value: "Direction",
              detail: "Saving works better when it has a purpose, even a small one.",
            },
            {
              label: "First pause",
              value: "Less impulse",
              detail: "A savings habit can slow down reactive spending.",
            },
          ]
        : [
            {
              label: "Breathing room",
              value: "Less pressure",
              detail: "A cushion can make life feel less fragile.",
            },
            {
              label: "More options",
              value: "Better choices",
              detail: "Savings helps you respond instead of panic.",
            },
            {
              label: "More control",
              value: "Steadier months",
              detail: "Small reserves reduce how hard surprises hit.",
            },
          ],
    sectionTwoTitle: "Why starting early helps",
    sectionTwoSubtitle: "The time advantage",
    sectionTwoBody:
      "Starting early matters because time does work that effort alone cannot. Small consistent amounts can build into something meaningful.",
    sectionTwoVisualTitle: "Small amounts over time",
    sectionTwoVisualCards: [
      {
        label: "Start now",
        value: "Habit first",
        detail: "Early habits are easier to scale later than to invent later.",
      },
      {
        label: "Start small",
        value: "Still counts",
        detail: "The first useful step is often smaller than people think.",
      },
      {
        label: "Stay steady",
        value: "Compounding behavior",
        detail: "Consistency often matters more than intensity.",
      },
    ],
  };
}

export function getLessonTwoContent(
  module: RecommendedModule,
  persona: UserPersona
): LessonTwoContent {
  if (module === "investing-basics-and-first-stocks") {
    return {
      heroTitle: "Your next practical investing step",
      heroBody:
        persona === "teen-supported" || persona === "student-dependent"
          ? "Now turn curiosity into a smarter first move. These three steps build on each other and work better in order."
          : "Now turn interest into a practical first move. These three steps build on each other and work better in order.",
      options: [
        {
          key: "goal",
          title: "Step 1 - Learn the building blocks",
          subtitle: "Understand stocks, index funds, and risk before choosing anything",
        },
        {
          key: "amount",
          title: "Step 2 - Choose a tiny starter habit",
          subtitle: "Start with watchlists, paper trading, or a very small amount",
        },
        {
          key: "compare",
          title: "Step 3 - Compare beginner-friendly paths",
          subtitle: "See which account or platform type actually fits your stage of life",
        },
      ],
      details: {
        goal: {
          title: "Step 1 - Learn the building blocks",
          subtitle: "The first win is understanding what you are buying and why.",
          examples: [
            {
              name: "What is a stock?",
              note: "A share of ownership in a company, not a guaranteed win.",
              badge: "101",
            },
            {
              name: "What is an index fund?",
              note: "A basket of many companies, often a calmer beginner path.",
              badge: "ETF",
            },
            {
              name: "What is risk?",
              note: "How much prices can swing, and how much uncertainty you can handle.",
              badge: "RISK",
            },
          ],
        },
        amount: {
          title: "Step 2 - Choose a tiny starter habit",
          subtitle: "At the beginning, habits often matter more than money size.",
          examples:
            persona === "teen-supported" || persona === "student-dependent"
              ? [
                  {
                    name: "Paper portfolio",
                    note: "Track a few investments without using real money first.",
                    badge: "TRY",
                  },
                  {
                    name: "$10 to watch",
                    note: "Follow what happens to a tiny amount over time.",
                    badge: "$10",
                  },
                  {
                    name: "Weekly note",
                    note: "Write down one thing you learned about markets each week.",
                    badge: "NOTE",
                  },
                ]
              : [
                  {
                    name: "Starter amount",
                    note: "Choose a number small enough that you can stay calm.",
                    badge: "$25",
                  },
                  {
                    name: "Auto-invest",
                    note: "A small recurring amount can build better behavior.",
                    badge: "AUTO",
                  },
                  {
                    name: "Watch before chasing",
                    note: "Observe first instead of reacting to hype.",
                    badge: "WAIT",
                  },
                ],
        },
        compare: {
          title: "Step 3 - Compare beginner-friendly paths",
          subtitle: "The right path depends on your age and what kind of control you actually have right now.",
          examples:
            persona === "teen-supported" || persona === "student-dependent"
              ? [
                  {
                    name: "Fidelity Youth",
                    note: "A youth-focused account path for eligible teens.",
                    badge: "FY",
                  },
                  {
                    name: "Custodial brokerage",
                    note: "An adult-managed account that can help a teen start learning.",
                    badge: "UGMA",
                  },
                  {
                    name: "Paper trading app",
                    note: "A no-risk place to practice before using real money.",
                    badge: "SIM",
                  },
                ]
              : [
                  {
                    name: "Brokerage account",
                    note: "A standard path for buying investments directly.",
                    badge: "BRK",
                  },
                  {
                    name: "Roth IRA",
                    note: "A long-term option if your income and situation fit.",
                    badge: "IRA",
                  },
                  {
                    name: "Beginner app",
                    note: "Useful if it keeps the first step simple, not noisy.",
                    badge: "APP",
                  },
                ],
        },
      },
    };
  }

  if (module === "budgeting-and-cash-flow") {
    return {
      heroTitle: "Your next practical step",
      heroBody:
        "Now turn clarity into action. These three steps build on each other and work best in order.",
      options: [
        {
          key: "goal",
          title: "Step 1 - List the essentials",
          subtitle: "Start with rent, food, transport, and must-pay bills",
        },
        {
          key: "amount",
          title: "Step 2 - Choose a weekly check-in",
          subtitle: "A small review habit is easier to keep than a big reset",
        },
        {
          key: "compare",
          title: "Step 3 - Compare fixed vs flexible",
          subtitle: "See what cannot change and what might be adjusted",
        },
      ],
      details: {
        goal: {
          title: "Step 1 - List the essentials",
          subtitle:
            "The goal is to see what must be covered before anything optional.",
          examples: [
            {
              name: "Housing",
              note: "Rent, utilities, and core living costs",
              badge: "FIX",
            },
            {
              name: "Transport",
              note: "Commuting, gas, or transit costs",
              badge: "MOVE",
            },
            {
              name: "Food",
              note: "Basic groceries and regular meals",
              badge: "NEED",
            },
          ],
        },
        amount: {
          title: "Step 2 - Pick a repeatable review rhythm",
          subtitle:
            "Consistency matters more than doing a huge budgeting session once.",
          examples: [
            {
              name: "Weekly check-in",
              note: "Look at spending once a week for 10 minutes",
              badge: "7D",
            },
            {
              name: "Payday reset",
              note: "Review money each time income lands",
              badge: "PAY",
            },
            {
              name: "Category glance",
              note: "Track just the top 3 spend areas first",
              badge: "TOP3",
            },
          ],
        },
        compare: {
          title: "Step 3 - Compare fixed and flexible spending",
          subtitle:
            "This helps you find where pressure can actually be reduced.",
          examples: [
            {
              name: "Fixed costs",
              note: "Rent, subscriptions, loan payments",
              badge: "FIX",
            },
            {
              name: "Flexible costs",
              note: "Dining out, shopping, convenience spending",
              badge: "FLEX",
            },
            {
              name: "Pressure points",
              note: "Places where small changes could help fast",
              badge: "HELP",
            },
          ],
        },
      },
    };
  }

  if (module === "credit-scores-and-credit-cards") {
    return {
      heroTitle: "Your next practical step",
      heroBody:
        "Now narrow the topic down. These three steps build on each other and work best in order.",
      options: [
        {
          key: "goal",
          title: "Step 1 - Learn what affects a score",
          subtitle: "Understand the big drivers before going deeper",
        },
        {
          key: "amount",
          title: "Step 2 - Understand credit card habits",
          subtitle: "See how balances, timing, and behavior affect outcomes",
        },
        {
          key: "compare",
          title: "Step 3 - Compare healthy vs risky patterns",
          subtitle: "Know what helps and what creates damage over time",
        },
      ],
      details: {
        goal: {
          title: "Step 1 - Start with what affects a score",
          subtitle:
            "A few factors matter far more than most people realize.",
          examples: [
            {
              name: "Payment history",
              note: "Paying on time is one of the biggest factors",
              badge: "PAY",
            },
            {
              name: "Utilization",
              note: "How much of your available credit is being used",
              badge: "USE",
            },
            {
              name: "Account age",
              note: "Longer history can help over time",
              badge: "AGE",
            },
          ],
        },
        amount: {
          title: "Step 2 - Understand day-to-day card habits",
          subtitle:
            "Small repeated behavior matters more than one smart decision.",
          examples: [
            {
              name: "Pay on time",
              note: "Late payments can do outsized damage",
              badge: "ON",
            },
            {
              name: "Avoid carrying too much",
              note: "High balances can increase pressure quickly",
              badge: "LOW",
            },
            {
              name: "Know your limit",
              note: "Using too much of available credit can hurt",
              badge: "LIM",
            },
          ],
        },
        compare: {
          title: "Step 3 - Compare healthy and risky credit patterns",
          subtitle:
            "This makes good behavior easier to recognize early.",
          examples: [
            {
              name: "Healthy pattern",
              note: "Spend modestly, pay on time, stay controlled",
              badge: "GOOD",
            },
            {
              name: "Risky pattern",
              note: "Miss payments, run high balances, ignore statements",
              badge: "RISK",
            },
            {
              name: "Gray area",
              note: "Doing okay for now but building bad habits quietly",
              badge: "WATCH",
            },
          ],
        },
      },
    };
  }

  const teenLike = persona === "teen-supported" || persona === "student-dependent";

  return {
    heroTitle: "Your next practical saving step",
    heroBody: teenLike
      ? "Now turn the idea into a first move that actually fits your stage of life. These three steps build on each other and work best in order."
      : "Now turn the idea into one practical step you can actually repeat. These three steps build on each other and work best in order.",
    options: teenLike
      ? [
          {
            key: "goal",
            title: "Step 1 - Pick a first money goal",
            subtitle: "A short-term target can make saving feel real and useful",
          },
          {
            key: "amount",
            title: "Step 2 - Choose a small weekly habit",
            subtitle: "The goal is consistency, not pressure",
          },
          {
            key: "compare",
            title: "Step 3 - Compare beginner-friendly places to save",
            subtitle: "See what kind of account or tool fits your stage of life",
          },
        ]
      : [
          {
            key: "goal",
            title: "Step 1 - Pick a goal",
            subtitle: "Emergency fund, peace of mind, or a first savings target",
          },
          {
            key: "amount",
            title: "Step 2 - Choose a monthly amount",
            subtitle: "Even $50 or $100 can be a meaningful start",
          },
          {
            key: "compare",
            title: "Step 3 - Compare reputable options",
            subtitle: "Look at 2 to 3 established savings providers",
          },
        ],
    details: teenLike
      ? {
          goal: {
            title: "Step 1 - Choose a first money goal",
            subtitle:
              "A small concrete target is often better than a vague idea of saving.",
            examples: [
              {
                name: "First tech purchase",
                note: "Save toward something you genuinely care about.",
                badge: "GOAL",
              },
              {
                name: "Future investing fund",
                note: "Build a starter pool for when you are ready to invest.",
                badge: "FUND",
              },
              {
                name: "Freedom money",
                note: "A small amount that gives you more choice later.",
                badge: "FREE",
              },
            ],
          },
          amount: {
            title: "Step 2 - Choose a small weekly habit",
            subtitle:
              "For your stage, the habit matters more than the size.",
            examples: [
              {
                name: "$5 per week",
                note: "Tiny but repeatable beats big and inconsistent.",
                badge: "$5",
              },
              {
                name: "$10 per week",
                note: "A stronger pace if it still feels easy to keep.",
                badge: "$10",
              },
              {
                name: "Round-up habit",
                note: "Use spare change or small leftovers to keep it simple.",
                badge: "UP",
              },
            ],
          },
          compare: {
            title: "Step 3 - Compare beginner-friendly saving paths",
            subtitle:
              "The right place depends on how much control you have right now.",
            examples: [
              {
                name: "Youth savings account",
                note: "A simple place to practice saving consistently.",
                badge: "BANK",
              },
              {
                name: "Parent-linked account",
                note: "Useful when family support is part of the setup.",
                badge: "LINK",
              },
              {
                name: "Goal tracker app",
                note: "Sometimes the visual progress matters as much as the account.",
                badge: "APP",
              },
            ],
          },
        }
      : {
          goal: {
            title: "Step 1 - Pick one savings goal",
            subtitle:
              "A clear reason makes it easier to begin and easier to stay consistent.",
            examples: [
              {
                name: "Emergency cushion",
                note: "For unexpected bills or short-term stability",
                badge: "SAFE",
              },
              {
                name: "Peace of mind fund",
                note: "A small buffer so money feels less fragile",
                badge: "CALM",
              },
              {
                name: "First milestone",
                note: "A simple first target like $500 or $1,000",
                badge: "GOAL",
              },
            ],
          },
          amount: {
            title: "Step 2 - Choose a monthly amount you can repeat",
            subtitle:
              "Consistency matters more than picking a number that feels impressive.",
            examples: [
              {
                name: "$50 per month",
                note: "A realistic place to begin for many people",
                badge: "$50",
              },
              {
                name: "$100 per month",
                note: "A stronger starting pace if it feels manageable",
                badge: "$100",
              },
              {
                name: "Auto-transfer",
                note: "Set it once so the habit does not depend on memory",
                badge: "AUTO",
              },
            ],
          },
          compare: {
            title: "Step 3 - Compare a few reputable options",
            subtitle:
              "You do not need the perfect option. You need a safe, clear, simple one.",
            examples: [
              {
                name: "Ally",
                note: "Well-known online bank often considered for savings",
                badge: "A",
              },
              {
                name: "Capital One 360",
                note: "Established option with simple digital experience",
                badge: "360",
              },
              {
                name: "Marcus",
                note: "Often reviewed for straightforward savings access",
                badge: "M",
              },
            ],
          },
        },
  };
}