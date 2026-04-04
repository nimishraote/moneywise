import type { RecommendedModule } from "@/lib/types/personalized-plan";

export const moduleTitles: Record<RecommendedModule, string> = {
  "budgeting-and-cash-flow": "Budgeting and cash flow",
  "saving-starting-early-and-long-term-impact": "Saving and starting early",
  "credit-scores-and-credit-cards": "Credit scores and credit cards",
};

export const lessonOneContent: Record<RecommendedModule, {
  heroTitle: string;
  heroBody: string;
  sectionOneTitle: string;
  sectionOneSubtitle: string;
  sectionOneBody: string;
  sectionTwoTitle: string;
  sectionTwoSubtitle: string;
  sectionTwoBody: string;
}> = {
  "budgeting-and-cash-flow": {
    heroTitle: "Budgeting and cash flow",
    heroBody: "This lesson is about getting clearer on what money is doing each month. Budgeting is not about punishment. It is about reducing surprises, lowering pressure, and making your choices more visible.",
    sectionOneTitle: "Why cash flow matters",
    sectionOneSubtitle: "Start with visibility",
    sectionOneBody: "If money comes in and goes out without a clear picture, stress grows fast. Understanding your monthly cash flow helps you see where pressure is coming from and where small changes can help.",
    sectionTwoTitle: "Why a budget helps",
    sectionTwoSubtitle: "Then build structure",
    sectionTwoBody: "A budget gives your money a plan before it disappears. It helps you decide what matters most, what can wait, and where you may be leaking money without noticing.",
  },
  "saving-starting-early-and-long-term-impact": {
    heroTitle: "Saving and starting early",
    heroBody: "This lesson is about one of the most important ideas in personal finance. Saving is not just about discipline. It is about reducing pressure, creating options, and giving your future self more stability.",
    sectionOneTitle: "Why saving matters",
    sectionOneSubtitle: "The emotional side first",
    sectionOneBody: "Saving gives breathing room. It means one unexpected bill is less likely to become a crisis. Even a small cushion can change how life feels.",
    sectionTwoTitle: "Why starting early helps",
    sectionTwoSubtitle: "The time advantage",
    sectionTwoBody: "Starting early matters because time does work that effort alone cannot. Small consistent amounts can build into something meaningful.",
  },
  "credit-scores-and-credit-cards": {
    heroTitle: "Credit scores and credit cards",
    heroBody: "This lesson is about making credit feel less mysterious. Credit can help or hurt depending on how it is used. Understanding the basics early can prevent expensive mistakes later.",
    sectionOneTitle: "Why credit matters",
    sectionOneSubtitle: "Start with the big picture",
    sectionOneBody: "Credit can affect loans, housing, and financial flexibility. The goal is not to obsess over it. The goal is to understand the rules well enough to avoid avoidable damage.",
    sectionTwoTitle: "Why card habits matter",
    sectionTwoSubtitle: "Then understand behavior",
    sectionTwoBody: "Credit cards are not automatically good or bad. What matters is how they are used, how balances are managed, and whether payments are made on time.",
  },
};

export const lessonTwoChoices: Record<RecommendedModule, {
  heroTitle: string;
  heroBody: string;
  options: { key: "goal" | "amount" | "compare"; title: string; subtitle: string }[];
  details: Record<"goal" | "amount" | "compare", {
    title: string;
    subtitle: string;
    examples: { name: string; note: string }[];
  }>;
}> = {
  "budgeting-and-cash-flow": {
    heroTitle: "Your next practical step",
    heroBody: "Now turn clarity into action. Pick the budget step that feels most useful right now.",
    options: [
      { key: "goal", title: "List the essentials", subtitle: "Start with rent, food, transport, and must-pay bills" },
      { key: "amount", title: "Choose a weekly check-in", subtitle: "A small review habit is easier to keep than a big reset" },
      { key: "compare", title: "Compare what is fixed vs flexible", subtitle: "See what cannot change and what might be adjusted" },
    ],
    details: {
      goal: { title: "Start by listing the essentials", subtitle: "The goal is to see what must be covered before anything optional.", examples: [ { name: "Housing", note: "Rent, utilities, and core living costs" }, { name: "Transport", note: "Commuting, gas, or transit costs" }, { name: "Food", note: "Basic groceries and regular meals" } ] },
      amount: { title: "Pick a repeatable review rhythm", subtitle: "Consistency matters more than doing a huge budgeting session once.", examples: [ { name: "Weekly check-in", note: "Look at spending once a week for 10 minutes" }, { name: "Payday reset", note: "Review money each time income lands" }, { name: "Category glance", note: "Track just the top 3 spend areas first" } ] },
      compare: { title: "Compare fixed and flexible spending", subtitle: "This helps you find where pressure can actually be reduced.", examples: [ { name: "Fixed costs", note: "Rent, subscriptions, loan payments" }, { name: "Flexible costs", note: "Dining out, shopping, convenience spending" }, { name: "Pressure points", note: "Places where small changes could help fast" } ] },
    },
  },
  "saving-starting-early-and-long-term-impact": {
    heroTitle: "Your next practical step",
    heroBody: "Once you understand why saving matters, the next question is what to do next. Pick the option that feels most useful right now.",
    options: [
      { key: "goal", title: "Pick a goal", subtitle: "Emergency fund, peace of mind, or a first savings target" },
      { key: "amount", title: "Choose a monthly amount", subtitle: "Even $50 or $100 can be a meaningful start" },
      { key: "compare", title: "Compare a few reputable options", subtitle: "Look at 2 to 3 established savings providers" },
    ],
    details: {
      goal: { title: "Start by picking one savings goal", subtitle: "A clear reason makes it easier to begin and easier to stay consistent.", examples: [ { name: "Emergency cushion", note: "For unexpected bills or short-term stability" }, { name: "Peace of mind fund", note: "A small buffer so money feels less fragile" }, { name: "First milestone", note: "A simple first target like $500 or $1,000" } ] },
      amount: { title: "Choose a monthly amount you can repeat", subtitle: "Consistency matters more than picking a number that feels impressive.", examples: [ { name: "$50 per month", note: "A realistic place to begin for many people" }, { name: "$100 per month", note: "A stronger starting pace if it feels manageable" }, { name: "Auto-transfer", note: "Set it once so the habit does not depend on memory" } ] },
      compare: { title: "Compare a few reputable options", subtitle: "You do not need the perfect option. You need a safe, clear, simple one.", examples: [ { name: "Ally Bank", note: "Well-known online bank often considered for savings" }, { name: "Capital One 360", note: "Established option with simple digital experience" }, { name: "Marcus by Goldman Sachs", note: "Often reviewed for straightforward savings access" } ] },
    },
  },
  "credit-scores-and-credit-cards": {
    heroTitle: "Your next practical step",
    heroBody: "Now narrow the topic down. Pick the credit question that feels most useful right now.",
    options: [
      { key: "goal", title: "Learn what affects a score", subtitle: "Understand the big drivers before going deeper" },
      { key: "amount", title: "Understand credit card habits", subtitle: "See how balances, timing, and behavior affect outcomes" },
      { key: "compare", title: "Compare healthy vs risky patterns", subtitle: "Know what helps and what creates damage over time" },
    ],
    details: {
      goal: { title: "Start with what affects a score", subtitle: "A few factors matter far more than most people realize.", examples: [ { name: "Payment history", note: "Paying on time is one of the biggest factors" }, { name: "Utilization", note: "How much of your available credit is being used" }, { name: "Account age", note: "Longer history can help over time" } ] },
      amount: { title: "Understand day-to-day card habits", subtitle: "Small repeated behavior matters more than one smart decision.", examples: [ { name: "Pay on time", note: "Late payments can do outsized damage" }, { name: "Avoid carrying too much", note: "High balances can increase pressure quickly" }, { name: "Know your limit", note: "Using too much of available credit can hurt" } ] },
      compare: { title: "Compare healthy and risky credit patterns", subtitle: "This makes good behavior easier to recognize early.", examples: [ { name: "Healthy pattern", note: "Spend modestly, pay on time, stay controlled" }, { name: "Risky pattern", note: "Miss payments, run high balances, ignore statements" }, { name: "Gray area", note: "Doing okay for now but building bad habits quietly" } ] },
    },
  },
};
