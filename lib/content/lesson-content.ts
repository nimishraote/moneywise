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

const recommendedModules: RecommendedModule[] = [
  "money-101-foundations",
  "budgeting-and-cash-flow",
  "saving-starting-early-and-long-term-impact",
  "credit-scores-and-credit-cards",
  "investing-basics-and-first-stocks",
];

export function isRecommendedModule(value: string): value is RecommendedModule {
  return recommendedModules.includes(value as RecommendedModule);
}

export function getLessonHref(module: RecommendedModule) {
  return `/learn/${module}`;
}

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
    heroTitle: "Start with the basic money ideas people use every day.",
    heroBody:
      "This lesson is for someone who wants the real beginner version first. No finance voice, no complicated setup, just the things that make daily money feel less confusing.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand where money sits and how it gets used",
        intro:
          "Before budgets, investing, or credit, it helps to understand the basic tools most people use first.",
        concepts: [
          {
            id: "bank-account",
            title: "What a bank account actually does",
            shortLabel: "Where your money lives",
            summary:
              "A bank account is usually the main place where your money sits, comes in, and goes out.",
            narrative: [
              "A lot of money confusion starts because people use a bank account without really understanding what role it plays. A bank account is not just a place where money sits. It is usually the center of your everyday money life.",
              "Money can come into it from work, family, transfers, or refunds. Money can go out from debit card spending, subscriptions, bills, ATM withdrawals, or bank transfers. If you do not know what is happening in the account, money starts to feel vague very quickly.",
              "The useful way to think about it is simple: this is the place where your money gets collected, stored, and used. Once you understand that, it becomes easier to notice whether you actually have enough, where the money is going, and what keeps happening again and again.",
              "For a beginner, the goal is not to become an expert on banking. The goal is just to stop treating your account like a black box and start treating it like a dashboard.",
            ],
            takeaway:
              "A bank account is not just where money sits. It is the main place where you can see your money life clearly.",
            actionSteps: [
              "Open your banking app or ask to see the account you usually use.",
              "Write down the current balance.",
              "Write the last 3 ways money came in.",
              "Write the last 3 ways money went out.",
            ],
            extraReadingLabel: "Learn more about bank accounts",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/opening-checking-or-savings-account",
          },
          {
            id: "debit-vs-credit",
            title: "Why debit and credit are not the same thing",
            shortLabel: "Your money versus borrowed money",
            summary:
              "A debit card usually spends your own money. A credit card usually means you are borrowing first and paying later.",
            narrative: [
              "Debit and credit can feel identical when you tap or swipe, which is exactly why people mix them up. But behind the scenes they work very differently, and that difference matters a lot.",
              "With debit, the purchase usually comes out of money you already have in your bank account. With credit, the card company covers the purchase first and you owe them back later. That means the purchase can feel easy in the moment even though the real cost has not hit you yet.",
              "This is where beginners often get tripped up. They think a card working means they can afford the purchase. But a working card does not always mean the money is really yours to spend without consequences.",
              "The useful mental rule is this: debit checks what you have now. Credit can create a bill for later. Once you understand that clearly, a lot of future confusion gets avoided.",
            ],
            takeaway:
              "Debit usually uses your own money now. Credit can create a bill for later.",
            actionSteps: [
              "Look at the cards you use now and label each one debit or credit.",
              "Write one sentence explaining the difference in your own words.",
              "Next time you use a card, pause and ask: is this my money now, or a bill later?",
            ],
            extraReadingLabel: "Learn more about debit and credit",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/using-debit-cards",
          },
        ],
      },
    ],
  };
}

function budgetingContent(): LearnPageContent {
  return {
    heroTitle: "Budgeting should make money feel clearer, not stricter.",
    heroBody:
      "This lesson is for someone who feels like money comes in, then somehow disappears. The goal is not a perfect spreadsheet. The goal is understanding the pattern.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: See the pattern first",
        intro:
          "A budget works better when it starts from your real life, not from a random rule online.",
        concepts: [
          {
            id: "cash-flow",
            title: "What cash flow really means",
            shortLabel: "When money comes in, when it leaves, and whether it lasts",
            summary:
              "Cash flow is the pattern of your money through the month.",
            narrative: [
              "If you are 16 or 20, 'cash flow' can sound like a finance word meant for adults. But the idea is actually very basic. It just means this: when does money come in for you, when does it go out, and how long does it last.",
              "A lot of people think they have a money problem only because the total is low. Sometimes that is true. But sometimes the bigger problem is timing. Money comes in on one day, a bunch of spending happens fast, and then the rest of the month feels tight or stressful.",
              "That is why two people with the same amount of money can feel very different. One person knows what usually hits first and plans around it. The other person just reacts in the moment and gets surprised again and again.",
              "So before you try to 'budget,' you want to see the pattern. Not every detail. Just the main flow. Once that becomes visible, your money starts to feel less random.",
            ],
            takeaway:
              "Before you control money better, you need to see its pattern more clearly.",
            actionSteps: [
              "Open your notes app.",
              "Write the last 3 times money came in for you.",
              "Next to each one, write how much it was.",
              "Under that, write the first 3 things that money usually goes toward.",
            ],
            extraReadingLabel: "Learn more about budgeting and cash flow",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/making-budget",
          },
          {
            id: "needs-vs-flex",
            title: "What spending can move and what cannot",
            shortLabel: "Not every dollar works the same way",
            summary:
              "Some spending is harder to avoid. Other spending is easier to change.",
            narrative: [
              "A lot of people fail at budgeting because they try to control everything at once. That usually does not last. A better approach is to separate spending into two groups: the stuff that is harder to change, and the stuff that is easier to adjust.",
              "For a young person, harder-to-change spending might be transit, lunch at school, a phone bill someone expects you to help with, or basic supplies. Easier-to-adjust spending might be snacks, hanging out, random online shopping, subscriptions, or extra food delivery.",
              "The reason this matters is simple. Control usually comes from one or two flexible categories, not from trying to become a completely different person overnight.",
              "Once you know which spending is fixed and which spending is movable, you stop feeling like budgeting means cutting everything. It becomes more like choosing where you want your money to have room.",
            ],
            takeaway:
              "The first useful budget is not about cutting everything. It is about finding what you can move.",
            actionSteps: [
              "List your top 5 places money went recently.",
              "Mark each one as harder to change or easier to change.",
              "Circle one easier-to-change category you want to watch this week.",
            ],
            extraReadingLabel: "Learn more about needs and wants spending",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/tracking-your-spending",
          },
        ],
      },
    ],
  };
}

function savingContent(): LearnPageContent {
  return {
    heroTitle: "Saving matters because life feels easier when not every surprise becomes a problem.",
    heroBody:
      "This lesson is for someone who knows saving is good, but has never made it feel real or consistent.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand what saving is really doing for you",
        intro:
          "Saving is not just about future wealth. It is also about present calm.",
        concepts: [
          {
            id: "saving-why",
            title: "Why saving changes how money feels",
            shortLabel: "Less panic, more room to think",
            summary:
              "Saving gives you breathing room when something unexpected happens.",
            narrative: [
              "People often talk about saving like it is a moral achievement, as if good people save and careless people do not. That is not the most useful way to think about it. A better way is to see saving as protection against pressure.",
              "When you have no savings at all, even a small problem can feel huge. A late ride home, a broken charger, school expenses, an unexpected meal, or a bill you forgot about can suddenly feel stressful because there is no cushion.",
              "When you do have some savings, the same problem may still be annoying, but it does not hit with the same level of panic. That is the real value early on. Not perfection. Not a giant number. Just a little more space between you and every surprise.",
              "So saving is not only about 'being responsible.' It is about making your future self less boxed in.",
            ],
            takeaway:
              "Saving helps life feel less fragile because small problems stop becoming full money emergencies.",
            actionSteps: [
              "Write down one recent money surprise that felt annoying or stressful.",
              "Write down how even a small savings cushion could have helped.",
              "Choose one reason saving would matter to you personally, not just in theory.",
            ],
            extraReadingLabel: "Learn more about emergency savings",
            extraReadingUrl:
              "https://consumer.gov/saving-and-investing/opening-and-maintaining-emergency-fund",
          },
          {
            id: "small-starts",
            title: "Why small saving still counts",
            shortLabel: "A tiny habit is better than a fake big plan",
            summary:
              "You do not need a big amount to start building a real saving habit.",
            narrative: [
              "A lot of young people quietly assume saving does not count unless the amount is large. That idea is one of the biggest reasons people never begin. They think, 'I only have a little money, so what is the point?'",
              "The point is that habits come before scale. Someone who can save a small amount consistently is building a system. Someone who waits until they have 'real money' often never gets around to building that system at all.",
              "Small saving also teaches you something important: money does not have to be spent immediately just because it showed up. That shift in mindset matters more than most people realize.",
              "So the first win is not hitting a huge number. The first win is proving to yourself that some money can stay with you instead of disappearing right away.",
            ],
            takeaway:
              "A small saving habit matters because it changes your behavior before it changes your total.",
            actionSteps: [
              "Pick one amount you could realistically save this week or month.",
              "Make it small enough that you would actually do it again.",
              "Name what that saved money is for, even if the goal is small.",
            ],
            extraReadingLabel: "Learn more about building a savings habit",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/saving-money",
          },
        ],
      },
    ],
  };
}

function creditContent(): LearnPageContent {
  return {
    heroTitle: "Credit is easier to handle when you understand it before you need it.",
    heroBody:
      "This lesson is for someone who has heard about credit cards and credit scores, but does not want to learn the hard way.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand what credit really is",
        intro:
          "Credit is not free money. It is borrowed money plus a record of how you handle it.",
        concepts: [
          {
            id: "credit-basics",
            title: "What credit actually means",
            shortLabel: "Borrowing plus trust",
            summary:
              "Credit is a system that lets you borrow now and shows whether you pay back responsibly later.",
            narrative: [
              "A lot of people first hear about credit through credit cards, but the deeper idea is bigger than the card itself. Credit is really about borrowed money and your track record with it.",
              "If a company lets you borrow, they want to know whether you pay on time, whether you borrow too much, and whether you handle that responsibility well. Over time, that behavior becomes part of your credit history.",
              "That is why credit matters later for more than shopping. It can affect how lenders, landlords, or other institutions see your reliability.",
              "The useful beginner mindset is this: credit is not extra spending power to play with. It is a system that remembers how you handle borrowed money.",
            ],
            takeaway:
              "Credit is less about the card in your hand and more about the habits attached to it.",
            actionSteps: [
              "Write one sentence explaining what you think credit is now.",
              "Underline the word borrowed in your sentence.",
              "Ask yourself whether that changes how you think about using a credit card.",
            ],
            extraReadingLabel: "Learn more about credit basics",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/building-and-improving-credit",
          },
          {
            id: "interest",
            title: "Why interest gets people in trouble",
            shortLabel: "The purchase can end up costing more",
            summary:
              "Interest is one of the main reasons borrowed money becomes expensive.",
            narrative: [
              "Interest sounds technical, but the basic idea is simple. If you do not fully pay back what you borrowed, you may be charged extra for carrying that balance.",
              "That means a purchase is no longer just the original price. It can quietly become more expensive over time. This is one of the biggest reasons people get into avoidable credit stress.",
              "What makes this tricky for beginners is that the original purchase still feels normal. The extra cost shows up later, which makes it easier to ignore until the bill feels bigger than expected.",
              "So the real lesson is not 'credit is bad.' The lesson is that borrowed money has rules, and interest is one of the rules that makes careless use expensive.",
            ],
            takeaway:
              "If you carry borrowed money too long, the price can grow beyond the original purchase.",
            actionSteps: [
              "Write down one purchase you would not want to become more expensive later.",
              "Under it, write: borrowing does not remove the cost, it can increase it.",
              "Keep that sentence as your reminder if you ever use credit.",
            ],
            extraReadingLabel: "Learn more about interest and credit card costs",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/using-credit-cards",
          },
        ],
      },
    ],
  };
}

function investingContent(): LearnPageContent {
  return {
    heroTitle: "Investing starts making sense once you stop treating it like a mystery topic.",
    heroBody:
      "This lesson is for someone who hears words like stocks, index funds, and investing, but wants the grounded version first.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Learn what investing is for",
        intro:
          "Investing is usually about long-term growth, not fast excitement.",
        concepts: [
          {
            id: "saving-vs-investing",
            title: "Saving and investing are not the same job",
            shortLabel: "Safety versus growth",
            summary:
              "Saving usually protects money you may need sooner. Investing usually gives money a chance to grow over longer periods.",
            narrative: [
              "A lot of beginners hear 'you should invest' before anyone explains what investing is actually for. That creates confusion because investing and saving can sound like the same thing even though they do different jobs.",
              "Saving is usually where money goes when you want safety, quicker access, or a buffer against surprises. Investing is usually what you do with money you do not need immediately and want to grow over time.",
              "This matters because if you skip the distinction, you can end up putting emergency money in the wrong place or expecting investing to behave like a savings account.",
              "So the useful first map is simple: saving is about stability and access. Investing is about time and growth.",
            ],
            takeaway:
              "Saving and investing both matter, but they solve different problems.",
            actionSteps: [
              "Make two columns in your notes app: Save and Invest.",
              "Under Save, write any money you may need in the next 1 to 3 years, like emergency money, school needs, or a near-term purchase.",
              "Under Invest, write money you would not need soon and could leave alone for a long time.",
              "If you do not currently have money in either group, that is okay. The point is to understand which job each bucket is meant to do.",
              "Ask yourself: do I already have any money sitting somewhere that is really savings, even if I never called it that?",
            ],
            extraReadingLabel: "Learn more about saving versus investing",
            extraReadingUrl:
              "https://consumer.gov/saving-and-investing/investing",
          },
          {
            id: "time",
            title: "Why starting early matters so much",
            shortLabel: "Time can matter more than size",
            summary:
              "One of the biggest investing advantages young people have is time.",
            narrative: [
              "People often think investing is mostly about having a lot of money. That is not the full story. One of the biggest advantages younger people have is not money, but time.",
              "When money has more time to grow, even smaller amounts can have more opportunity to build. That does not mean growth is guaranteed or that investing is risk-free. It means time gives your money more chances to work.",
              "This matters because many people delay learning about investing until much later, assuming they can wait until they earn more. But learning the idea of time early is valuable even before you ever invest a large amount.",
              "The early win is not becoming an expert. It is understanding that waiting has a cost too, especially when time is one of the strongest things you already have.",
            ],
            takeaway:
              "You do not need to start big to understand why starting earlier can matter.",
            actionSteps: [
              "Write down your current age.",
              "Then write down an age 10 years older than you.",
              "Ask yourself: if I learned the basics now instead of 10 years from now, what advantage would that give me?",
              "Write one sentence answering that question in your own words.",
              "Then write one reason someone may still need savings before investing, so you remember these are related but different decisions.",
            ],
            extraReadingLabel: "Learn more about starting early and long-term investing",
            extraReadingUrl:
              "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/how-start-investing",
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
      ? "You do not need to know everything yet. This lesson is here to make the basics feel normal and usable."
      : "Even if you are still supported right now, learning this early can save you a lot of confusion later.";
  }

  if (persona === "student-earning") {
    return "Because you already have some real money decisions, this lesson is meant to connect directly to daily life, not stay theoretical.";
  }

  if (persona === "working-tight" || persona === "between-jobs") {
    return "This lesson is meant to lower confusion, show you the pattern, and help you take one practical next step.";
  }

  if (persona === "working-steady") {
    return "This lesson is here to help you turn your current position into a stronger system, not just give you more information.";
  }

  return "This lesson is meant to make the topic feel clearer, more practical, and easier to act on.";
}