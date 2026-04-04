import type {
  RecommendedModule,
  UserPersona,
} from "@/lib/types/personalized-plan";

export const moduleTitles: Record<RecommendedModule, string> = {
  "money-101-foundations": "Money basics 101",
  "saving-starting-early-and-long-term-impact":
    "Saving, starting early, and long-term impact",
  "budgeting-and-cash-flow": "Budgeting and cash flow",
  "credit-scores-and-credit-cards": "Credit scores and credit cards",
  "investing-basics-and-first-stocks": "Investing basics and first stocks",
};

export type LessonConcept = {
  id: string;
  title: string;
  shortLabel: string;
  summary: string;
  narrative: string[];
  takeaway: string;
  actionSteps?: string[];
  extraReadingLabel?: string;
  extraReadingUrl?: string;
};

export type LessonStep = {
  id: string;
  title: string;
  intro: string;
  concepts: LessonConcept[];
};

export type LearnPageContent = {
  heroTitle: string;
  heroBody: string;
  steps: LessonStep[];
};

function money101Content(): LearnPageContent {
  return {
    heroTitle: "Start with the real basics of money.",
    heroBody:
      "This lesson is for beginners who want the 101 first. It starts with everyday money ideas before moving into harder topics.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Learn the everyday basics",
        intro:
          "Start with the things most people use first in real life.",
        concepts: [
          {
            id: "bank-account",
            title: "What is a bank account?",
            shortLabel: "A place to store and use your money",
            summary:
              "A bank account is where your money can be stored, received, and used.",
            narrative: [
              "A bank account is a place where your money can be stored and tracked. It also makes it easier to receive money and pay for things.",
              "For many people, it becomes the center of everyday money life. Paychecks can go in. Spending can go out. Balances can be checked there.",
              "A simple example is getting paid from a job or receiving money from family. Instead of holding everything as cash, the money can sit in the account and be used as needed.",
              "This matters because a lot of money habits start with understanding where your money actually lives and how you see it clearly.",
            ],
            takeaway:
              "A bank account helps you store, receive, use, and track your money in one place.",
            actionSteps: [
              "Check whether you already have a bank account, or ask a parent or trusted adult what account you currently use.",
              "Look at your current balance and say out loud how much money is there right now.",
              "Write down one sentence on where your money usually comes from and where it usually goes.",
            ],
            extraReadingLabel: "Read more about bank accounts",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/opening-checking-or-savings-account",
          },
          {
            id: "debit-vs-credit",
            title: "Debit card versus credit card",
            shortLabel: "They are not the same thing",
            summary:
              "A debit card uses your money. A credit card uses borrowed money.",
            narrative: [
              "A debit card usually uses money that is already in your bank account. A credit card usually means the card company pays first and you pay them back later.",
              "They can feel similar when you tap or swipe, but the money behind them works differently.",
              "For example, if you use a debit card for a $20 purchase, the money usually comes from your own account. If you use a credit card for that same purchase, it creates money you owe back later.",
              "This matters because a lot of beginners mix them together and do not realize that one spends what you have while the other creates a bill you still need to pay.",
            ],
            takeaway:
              "Debit usually uses your own money. Credit usually means borrowed money that must be paid back.",
            actionSteps: [
              "Look at the cards you already use and identify whether they are debit or credit.",
              "Write down one sentence explaining the difference in your own words.",
            ],
            extraReadingLabel: "Read more about debit and credit",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/using-debit-cards",
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Learn where money goes",
        intro:
          "Once you understand the basics, the next thing is noticing where money actually ends up.",
        concepts: [
          {
            id: "spending-awareness",
            title: "Why tracking money matters",
            shortLabel: "You cannot improve what you cannot see",
            summary:
              "Seeing where your money goes is the first step toward better decisions.",
            narrative: [
              "A lot of people feel confused about money not because they are careless, but because they do not have a simple view of where money is going.",
              "Even a quick review of recent spending can show patterns. It can show what is necessary, what is flexible, and what keeps repeating in the background.",
              "This matters because money often feels stressful when it is vague. It usually feels more manageable once it becomes visible.",
            ],
            takeaway:
              "Tracking spending creates clarity, and clarity usually lowers stress.",
            actionSteps: [
              "Look at your last 10 purchases and group them into 3 simple buckets.",
              "Circle one thing that surprised you.",
            ],
          },
        ],
      },
    ],
  };
}

function budgetingContent(): LearnPageContent {
  return {
    heroTitle: "Take control of money as it moves through the month.",
    heroBody:
      "This lesson is for people who need more control, visibility, or consistency in day-to-day money flow.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand cash flow",
        intro:
          "Budgeting works best when it feels like a clear map, not a punishment.",
        concepts: [
          {
            id: "cash-flow",
            title: "What cash flow really means",
            shortLabel: "Money in, money out, and what stays",
            summary:
              "Cash flow is the timing and movement of money into and out of your life.",
            narrative: [
              "Cash flow is not just how much money you earn. It is also when money comes in, when it leaves, and what remains after bills and spending.",
              "Two people can earn the same amount and still feel very different because one has clear timing and structure while the other does not.",
              "This matters because a lot of money stress comes from timing problems, not only from low income.",
            ],
            takeaway:
              "Budgeting becomes easier when you understand timing, not just totals.",
            actionSteps: [
              "Write down when money usually comes in for you.",
              "Write down the biggest 3 things it goes toward first.",
            ],
          },
          {
            id: "needs-vs-flex",
            title: "Needs versus flexible spending",
            shortLabel: "Not every purchase is equal",
            summary:
              "Some spending keeps life running. Other spending is more flexible.",
            narrative: [
              "A useful early budgeting step is to separate what you truly need from what changes more easily.",
              "For example, rent, transportation, or required bills may be needs. Eating out, impulse shopping, or some subscriptions may be more flexible.",
              "This matters because control often starts by changing just one or two flexible categories rather than trying to cut everything.",
            ],
            takeaway:
              "You do not need to control every dollar perfectly. You need to know which dollars are easier to move.",
            actionSteps: [
              "List your top 5 spending areas.",
              "Mark each one as either essential or flexible.",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Build a simple budget that can actually last",
        intro:
          "The best budget is one you can repeat, not the most impressive one on paper.",
        concepts: [
          {
            id: "simple-budget",
            title: "How to make a first working budget",
            shortLabel: "Simple is stronger than perfect",
            summary:
              "A first budget should be simple enough to use regularly.",
            narrative: [
              "Many people quit budgeting because they try to make it too detailed too quickly.",
              "A stronger starting point is using a few simple buckets such as essentials, flexible spending, and what you want to keep or save.",
              "This matters because consistency usually creates more progress than complexity.",
            ],
            takeaway:
              "A budget should help you make decisions more easily, not make life feel more complicated.",
            actionSteps: [
              "Create 3 categories for your money this month.",
              "Put rough numbers next to each one.",
            ],
          },
        ],
      },
    ],
  };
}

function savingContent(): LearnPageContent {
  return {
    heroTitle: "Saving is where stability begins to build.",
    heroBody:
      "This lesson helps users move from good intentions to a saving habit that is realistic and repeatable.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand why saving matters",
        intro:
          "Saving is not only about being disciplined. It is about reducing future pressure.",
        concepts: [
          {
            id: "saving-why",
            title: "Why saving changes your money life",
            shortLabel: "It gives you room to breathe",
            summary:
              "Saving creates choice, flexibility, and less panic when something unexpected happens.",
            narrative: [
              "Even small savings can make money feel less fragile.",
              "Without savings, a small surprise can become a major problem. With savings, the same event can feel manageable.",
              "This matters because saving is often less about getting rich and more about creating space between you and constant stress.",
            ],
            takeaway:
              "Saving gives you more stability, flexibility, and emotional relief.",
            actionSteps: [
              "Write down one reason saving would help your life feel easier right now.",
            ],
          },
          {
            id: "small-starts",
            title: "Why small starts still matter",
            shortLabel: "Small habits can still compound",
            summary:
              "A small saving habit can matter more than a big plan you never sustain.",
            narrative: [
              "A lot of people assume there is no point in saving unless the amount is large.",
              "In reality, small repeated habits often matter more because they are what people actually maintain.",
              "This matters because the goal is to start building the pattern first. The amount can grow later.",
            ],
            takeaway:
              "A saving habit starts with repeatability, not perfection.",
            actionSteps: [
              "Choose one small amount you could save weekly or monthly without breaking the system.",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Make saving real",
        intro:
          "A saving goal becomes more useful when it has a purpose and a home.",
        concepts: [
          {
            id: "saving-purpose",
            title: "Save for something specific",
            shortLabel: "Purpose makes saving easier",
            summary:
              "Saving usually works better when it is tied to a clear reason.",
            narrative: [
              "Saving for 'the future' can feel vague. Saving for a buffer, a trip, an emergency fund, or a first investing step feels clearer.",
              "Specific goals make it easier to stay engaged because the money has a job.",
            ],
            takeaway:
              "Giving savings a purpose often makes the habit easier to keep.",
            actionSteps: [
              "Name one short-term saving goal and one longer-term saving goal.",
            ],
          },
        ],
      },
    ],
  };
}

function creditContent(): LearnPageContent {
  return {
    heroTitle: "Understand credit before it quietly shapes your future.",
    heroBody:
      "This lesson helps users understand what credit is, why it matters, and how to avoid common early mistakes.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Learn what credit really is",
        intro:
          "Credit is not free money. It is a system that tracks how you handle borrowed money.",
        concepts: [
          {
            id: "credit-basics",
            title: "What credit means",
            shortLabel: "Borrowing plus reputation",
            summary:
              "Credit is about borrowing money and how reliably you pay it back.",
            narrative: [
              "A credit card lets you borrow within a limit and then pay that amount back later.",
              "Over time, your behavior with borrowed money helps shape your credit history and credit score.",
              "This matters because credit can affect more than cards. It can influence later access to loans, apartments, and other financial options.",
            ],
            takeaway:
              "Credit is not just a card. It is part of your long-term financial reputation.",
            actionSteps: [
              "Write down what you think happens if a credit card bill is paid late or not in full.",
            ],
          },
          {
            id: "interest",
            title: "Why interest matters so much",
            shortLabel: "Borrowing can get expensive fast",
            summary:
              "Interest is the extra cost of carrying borrowed money.",
            narrative: [
              "When a credit card balance is not paid in full, interest can be added on top of what you already owe.",
              "That means a purchase becomes more expensive than the original price.",
              "This matters because a lot of early credit problems do not come from one huge mistake. They come from small balances that quietly grow.",
            ],
            takeaway:
              "Interest is one of the biggest reasons credit can become expensive if not handled carefully.",
            actionSteps: [
              "Explain in one sentence why carrying a balance can cost more than the purchase itself.",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Avoid common early mistakes",
        intro:
          "The goal is not fear. It is understanding.",
        concepts: [
          {
            id: "credit-mistakes",
            title: "Common early credit mistakes",
            shortLabel: "Small mistakes can follow you",
            summary:
              "Credit mistakes often come from misunderstanding how repayment works.",
            narrative: [
              "Common mistakes include treating the credit limit like available spending money, missing payments, or only focusing on the minimum without understanding the bigger cost.",
              "The earlier you understand the system, the easier it is to avoid those patterns.",
            ],
            takeaway:
              "The best use of credit starts with clarity, not confidence.",
            actionSteps: [
              "List 2 things you would want to understand before ever applying for a first credit card.",
            ],
          },
        ],
      },
    ],
  };
}

function investingContent(): LearnPageContent {
  return {
    heroTitle: "Learn investing from a grounded and practical starting point.",
    heroBody:
      "This lesson helps users understand what investing is, how it differs from saving, and why time matters so much.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand the role of investing",
        intro:
          "Investing is about long-term growth, not fast excitement.",
        concepts: [
          {
            id: "saving-vs-investing",
            title: "Saving versus investing",
            shortLabel: "They are related but not the same",
            summary:
              "Saving is usually for safety and shorter-term needs. Investing is usually for longer-term growth.",
            narrative: [
              "Saving and investing both matter, but they serve different purposes.",
              "Saving is often where you keep money for safety, emergencies, or shorter-term goals. Investing is usually about giving money a chance to grow over a longer period of time.",
              "This matters because people often jump into investing before understanding what role it should play in the bigger picture.",
            ],
            takeaway:
              "Saving and investing work best when you know what each one is for.",
            actionSteps: [
              "Write one short sentence explaining how saving and investing feel different to you right now.",
            ],
          },
          {
            id: "time",
            title: "Why starting early matters",
            shortLabel: "Time can do more than big amounts",
            summary:
              "Time gives money more opportunity to grow.",
            narrative: [
              "One of the biggest advantages younger people have is time.",
              "Even modest amounts can matter more when they are given longer to grow.",
              "This matters because people often think they need a lot of money to begin learning. In reality, understanding time early can be more valuable than waiting until later.",
            ],
            takeaway:
              "Starting earlier can matter because time helps growth compound.",
            actionSteps: [
              "Write down one reason time may matter even more than starting with a big amount.",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Learn the beginner terms",
        intro:
          "You do not need deep jargon. You need basic clarity.",
        concepts: [
          {
            id: "basic-terms",
            title: "Stocks, funds, and diversification",
            shortLabel: "A gentle intro to key terms",
            summary:
              "A stock is a piece of a company. Funds group many investments together.",
            narrative: [
              "A stock generally represents a small ownership stake in one company.",
              "Funds such as index funds or ETFs usually hold many investments together in one package.",
              "This matters because a lot of beginners hear the words without understanding the practical difference between owning one thing and owning a broader mix.",
            ],
            takeaway:
              "You do not need to memorize everything. You just need a clear first map of the main terms.",
            actionSteps: [
              "Write down which term feels least clear right now: stock, ETF, index fund, mutual fund, bond, or CD.",
            ],
          },
        ],
      },
    ],
  };
}

export function getLearnPageContent(
  module: RecommendedModule
): LearnPageContent {
  switch (module) {
    case "money-101-foundations":
      return money101Content();
    case "budgeting-and-cash-flow":
      return budgetingContent();
    case "saving-starting-early-and-long-term-impact":
      return savingContent();
    case "credit-scores-and-credit-cards":
      return creditContent();
    case "investing-basics-and-first-stocks":
      return investingContent();
    default:
      return money101Content();
  }
}

export function getPersonaLead(
  persona: UserPersona,
  module: RecommendedModule
): string {
  if (persona === "teen-supported" || persona === "student-dependent") {
    return module === "money-101-foundations"
      ? "You are starting in the right place. This lesson is meant to make everyday money feel much clearer before you move into harder topics."
      : "Even if you are still supported right now, learning this early can make later decisions feel much less confusing.";
  }

  if (persona === "student-earning") {
    return "Because you are already dealing with some real money decisions, this lesson is meant to connect directly to day-to-day life rather than stay theoretical.";
  }

  if (persona === "working-tight" || persona === "between-jobs") {
    return "This lesson is designed to lower confusion and help you find a more practical next step, not overwhelm you with too much at once.";
  }

  if (persona === "working-steady") {
    return "This lesson is meant to help you turn your current position into a stronger system, not just give you more information.";
  }

  return "This lesson is here to make the topic feel clear, practical, and easier to act on.";
}