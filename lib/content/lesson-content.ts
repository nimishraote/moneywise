import type {
  RecommendedModule,
  UserPersona,
} from "@/lib/types/personalized-plan";

export const moduleTitles: Record<RecommendedModule, string> = {
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

function investingBasicsContent(): LearnPageContent {
  return {
    heroTitle: "Learn the basics before you buy anything.",
    heroBody:
      "This lesson is for people who want to understand stocks, index funds, and risk in very simple terms. Start here before you put real money into the market.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Learn the building blocks",
        intro:
          "Before you buy anything, the main words need to make sense. Start with these basics.",
        concepts: [
          {
            id: "stock",
            title: "What is a stock?",
            shortLabel: "A small piece of a company",
            summary:
              "A stock means you own a small piece of a real company.",
            narrative: [
              "A stock is a small piece of a company. If you buy one stock, you are buying a tiny share of that business.",
              "If the company grows and people believe it will do well, the stock price can go up. If the company struggles, the stock price can go down.",
              "Think of it this way. Imagine a company is cut into many tiny pieces. Buying one stock means buying one of those pieces. You are not buying the whole company. You are buying a small part of it.",
              "This matters because a lot of beginners hear the word stock and think it is just a random thing on an app screen. It is actually connected to a real business.",
            ],
            takeaway:
              "A stock is not free money. It is a small piece of a company, and its value can move up or down.",
            extraReadingLabel: "Read more about stocks",
            extraReadingUrl:
              "https://www.investor.gov/introduction-investing/investing-basics/glossary/stock",
          },
          {
            id: "index-fund",
            title: "What is an index fund?",
            shortLabel: "A bundle of many companies",
            summary:
              "An index fund lets you own a small piece of many companies at once.",
            narrative: [
              "An index fund is a bundle of many companies grouped together in one investment. Instead of buying one company, you buy into a wider mix.",
              "That matters because one company can rise fast or fall fast. A wider mix usually feels steadier than putting all your money into one name.",
              "A simple way to picture this is sports. Buying one stock is like betting everything on one player. Buying an index fund is more like owning a small piece of the whole team.",
              "A lot of beginners think they need to find one perfect stock. In reality, many people start by learning index funds first because they are simpler and usually less stressful.",
            ],
            takeaway:
              "One company can swing hard. A wider mix usually feels calmer.",
            extraReadingLabel: "Read more about index funds",
            extraReadingUrl:
              "https://www.investor.gov/introduction-investing/investing-basics/glossary/index-fund",
          },
          {
            id: "stock-market",
            title: "What is the stock market?",
            shortLabel: "A place where people buy and sell",
            summary:
              "The stock market is where stocks get bought and sold.",
            narrative: [
              "The stock market is where people and large institutions buy and sell stocks. Prices keep moving because buyers and sellers keep reacting to news, company results, fear, hope, and the economy.",
              "That movement can feel confusing at first. Many beginners expect prices to move in a neat straight line. They do not. Prices change because people keep changing what they think something is worth.",
              "For example, if many people suddenly want to buy a company, the price may rise. If many want to sell, the price may fall.",
              "This does not always mean something dramatic happened. Sometimes the market is simply reacting to changing expectations.",
            ],
            takeaway:
              "The market moves every day. Movement by itself does not mean something is broken.",
            extraReadingLabel: "Read more about the stock market",
            extraReadingUrl:
              "https://www.investor.gov/introduction-investing/investing-basics/glossary/stock-market",
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Understand risk in plain language",
        intro:
          "A lot of beginners hear that investing is risky. Here is what that actually means.",
        concepts: [
          {
            id: "risk",
            title: "What is risk?",
            shortLabel: "The value can move up or down",
            summary:
              "Risk means your money can rise or fall in value.",
            narrative: [
              "Risk means the value of your investment can change. It can go up, and it can go down. Sometimes the moves are small. Sometimes they are bigger.",
              "A beginner example is simple. You invest $100. A week later it is worth $92. That drop is risk in real life.",
              "Many beginners think any drop means they failed or picked something wrong. That is not always true. Risk is part of how investing works.",
              "The bigger point is this. If you do not understand risk, normal price movement can feel like danger even when it is not.",
            ],
            takeaway:
              "Risk does not mean guaranteed loss. It means the value can move.",
            extraReadingLabel: "Read more about risk",
            extraReadingUrl:
              "https://www.investor.gov/introduction-investing/investing-basics/what-know-investing-basics-and-risks",
          },
          {
            id: "why-prices-move",
            title: "Why do prices move?",
            shortLabel: "People keep changing what they think",
            summary:
              "Prices move because people keep changing what they think something is worth.",
            narrative: [
              "Stock prices are not fixed. They move because buyers and sellers keep reacting to new information and changing expectations.",
              "For example, a company may still be a real business with real products, but if it reports weaker results than people expected, the stock may still fall.",
              "That is why prices can move even when the company did not suddenly become worthless. The market is reacting to what people expected versus what actually happened.",
              "This matters because beginners often think price moves always mean a disaster or a huge success. Many times, the move is really about expectations changing.",
            ],
            takeaway:
              "Prices move because people react and re-price things all the time.",
          },
          {
            id: "single-stock-vs-mix",
            title: "Why one stock is riskier than a mix",
            shortLabel: "One company can hurt you more",
            summary:
              "If all your money is in one company, that one company has a lot of power over your result.",
            narrative: [
              "If you put all your money into one company, that one company can drive almost your whole result. If it does badly, you feel the full hit.",
              "If you spread money across many companies, one bad result matters less. That is one reason people talk about index funds so much with beginners.",
              "A simple example: if one company drops 30 percent and that is all you own, you feel the whole drop. If you own a wide mix, one company matters less.",
              "This does not mean single stocks are always wrong. It means they are usually harder and more stressful for beginners.",
            ],
            takeaway:
              "The more concentrated you are, the more one company can hurt you.",
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Start in a calmer way",
        intro:
          "Good beginner behavior matters as much as knowing the words. This is how to start more safely.",
        concepts: [
          {
            id: "start-small",
            title: "Why start small?",
            shortLabel: "You are still learning",
            summary:
              "Starting small lowers pressure while you learn.",
            narrative: [
              "A lot of beginners feel they need to make a big move right away. They do not. Starting small gives you space to learn without turning every choice into a stressful event.",
              "If the amount is too big, every market move feels personal. That can lead to panic decisions.",
              "Starting small does not mean you are not serious. It means you understand that learning comes first.",
              "This is one of the healthiest beginner habits because it protects both your money and your emotions.",
            ],
            takeaway:
              "Do not let excitement decide your first move.",
          },
          {
            id: "money-you-might-need-soon",
            title: "Do not invest money you may need soon",
            shortLabel: "Short-term money should stay safer",
            summary:
              "Money for bills, rent, or emergencies should not be placed somewhere that can drop at the wrong time.",
            narrative: [
              "If you may need the money soon, investing it can create pressure. Market prices move, and sometimes they move down at exactly the wrong time.",
              "Imagine you need rent money in two months, but the market drops next week. You might be forced to sell while prices are down.",
              "That is why short-term money and investing money should not be mixed carelessly.",
              "A calmer rule is to keep near-term money easier to reach and more stable.",
            ],
            takeaway:
              "Money you may need soon should stay easy to reach and more stable.",
          },
          {
            id: "first-rule",
            title: "Your first investing rule",
            shortLabel: "Understand before acting",
            summary:
              "Before buying something, you should understand the basic idea of what it is and why you are buying it.",
            narrative: [
              "You do not need to know everything before you start. But you should know the basic idea of what the investment is, why it moves, and what could go wrong.",
              "A useful beginner question is simple: can I explain this in plain language to someone else?",
              "If the answer is no, it may mean you should slow down and learn more first.",
              "This rule helps prevent rushed decisions based on hype, fear, or the feeling that everyone else already knows more.",
            ],
            takeaway:
              "If you cannot explain it simply, you probably should not rush into it.",
          },
        ],
      },
    ],
  };
}

function budgetingContent(): LearnPageContent {
  return {
    heroTitle: "See where your money goes before trying to fix it.",
    heroBody:
      "This lesson is for people who feel money disappears too fast. The goal is not perfection. The goal is clarity, control, and fewer surprises.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand where your money is going",
        intro:
          "A budget starts with awareness. Before changing habits, it helps to see what is actually happening.",
        concepts: [
          {
            id: "what-is-budget",
            title: "What is a budget?",
            shortLabel: "A simple plan for your money",
            summary:
              "A budget is a simple plan for where your money goes.",
            narrative: [
              "A budget is just a plan for your money. It helps you decide where money should go before it disappears.",
              "It does not have to be complicated. It does not mean you cannot enjoy your life. It simply helps you see what needs to happen first and what is left after that.",
              "Here is a simple example. Imagine you get $500 this month. Rent is $250. Food is $120. Transport is $50. That leaves $80. A budget helps you see that before you spend the $80 on random things.",
              "A lot of people avoid budgeting because they think it means restriction. In real life, it usually means fewer surprises and more clarity.",
            ],
            takeaway:
              "A budget is not about guilt. It is about fewer surprises.",
            extraReadingLabel: "Read more about simple budgeting",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/making-budget",
          },
          {
            id: "money-leaks",
            title: "What are money leaks?",
            shortLabel: "Small spending that adds up quietly",
            summary:
              "Money leaks are smaller spending habits that build up without you noticing.",
            narrative: [
              "A lot of money pressure does not come from one giant mistake. It comes from smaller spending that keeps happening quietly.",
              "Food delivery, subscriptions, rides, snacks, and small online purchases can all feel harmless in the moment. At the end of the month, the total can feel much bigger than expected.",
              "For example, spending $12 here and $18 there can feel small each time. But if that happens again and again, it can become one of the main reasons there is not much left later.",
              "This matters because many people only look for one big problem and miss the repeated smaller pattern.",
            ],
            takeaway:
              "Big pressure often comes from repeated small choices.",
          },
          {
            id: "check-money",
            title: "Why checking your money matters",
            shortLabel: "Avoiding it usually makes it worse",
            summary:
              "Checking your money more often usually makes it less scary over time.",
            narrative: [
              "Many people avoid checking their balance because they do not want bad news. That is understandable, but it usually makes the confusion worse later.",
              "When you check more regularly, your numbers start to feel more normal and less emotionally heavy.",
              "A simple habit could be checking your bank balance and recent spending once a week. That is often enough to catch problems earlier.",
              "This is not about obsessing over money. It is about making sure nothing drifts too far before you notice.",
            ],
            takeaway:
              "Looking sooner is usually kinder than looking later.",
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Build a simple structure",
        intro:
          "Once you see the pattern, you can give your money a basic structure that feels realistic.",
        concepts: [
          {
            id: "needs-vs-wants",
            title: "Needs and wants",
            shortLabel: "Know what must happen first",
            summary:
              "Not every expense has the same job. Some matter first.",
            narrative: [
              "A need is something that helps keep life functioning. A want may still matter, but it comes after the basics are covered.",
              "This matters when money feels tight. If everything feels equally important, every decision becomes harder.",
              "A simple example is rent, food, and transport. Those usually come before shopping, eating out, or extra subscriptions.",
              "This is not about saying wants are bad. It is about knowing what should come first when money is limited.",
            ],
            takeaway:
              "Cover the basics first. Then decide what matters next.",
          },
          {
            id: "saving-rule",
            title: "A small saving rule",
            shortLabel: "Save a little on purpose",
            summary:
              "Saving works better when it is planned, not random.",
            narrative: [
              "A lot of people say they will save whatever is left at the end of the month. Usually that means very little is left.",
              "A small planned saving rule often works better. The amount does not need to be impressive. It needs to be realistic enough to repeat.",
              "For example, saving $10 every week may not look huge, but it creates a real pattern. That pattern matters more than waiting for a perfect month.",
              "This helps because consistency is usually what changes your money life, not one dramatic effort.",
            ],
            takeaway:
              "Small and repeatable is better than big and unstable.",
          },
          {
            id: "weekly-checkin",
            title: "A weekly money check-in",
            shortLabel: "Short reviews make a big difference",
            summary:
              "A short weekly check-in can reduce month-end surprises.",
            narrative: [
              "You do not need a huge money meeting with yourself. A short review once a week is often enough.",
              "You can look at what came in, what went out, and whether anything feels off. This can take ten minutes.",
              "For example, if food spending is already much higher than expected by the middle of the week, you can adjust earlier instead of panicking later.",
              "That is why short check-ins work so well. They keep small problems from becoming bigger ones.",
            ],
            takeaway:
              "A little review now can prevent a bigger problem later.",
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Make the plan realistic",
        intro:
          "A good money plan is not the strictest one. It is the one you can actually keep using.",
        concepts: [
          {
            id: "be-realistic",
            title: "Why realistic beats perfect",
            shortLabel: "Plans fail when they are too strict",
            summary:
              "If the plan is too strict, most people stop following it.",
            narrative: [
              "A perfect plan may look good for one day. A realistic plan is more likely to survive a real week or month.",
              "If you cut everything at once, the plan may feel impressive at first but impossible later.",
              "For example, saying you will never spend on fun again might sound disciplined. In real life, it often does not last.",
              "A more realistic plan gives you enough structure to stay in control without feeling trapped by the rules.",
            ],
            takeaway:
              "A plan you can keep is better than a plan that looks ideal.",
          },
          {
            id: "what-to-fix-first",
            title: "What to fix first",
            shortLabel: "Do not try to change everything",
            summary:
              "The best first fix is usually the area causing the most pressure.",
            narrative: [
              "Trying to fix every money problem at once usually creates more confusion, not more control.",
              "It is better to start with the one habit or spending area that causes the most pressure right now.",
              "For example, if food delivery is the biggest leak, start there before making ten other rules you will forget.",
              "This makes progress easier to see, and that makes it easier to stay motivated.",
            ],
            takeaway:
              "Fix the pressure point first.",
          },
          {
            id: "what-success-looks-like",
            title: "What success looks like",
            shortLabel: "Less stress and more awareness",
            summary:
              "Success is not perfection. It is more awareness and less panic.",
            narrative: [
              "A lot of beginners think success means never messing up again. That is not realistic.",
              "A better sign of progress is that money starts feeling clearer. You understand where it went. You feel fewer surprises. You make calmer decisions.",
              "For example, if you know where your money went this month and you feel less confused than last month, that is real progress.",
              "This is important because progress in money usually looks quieter than people expect.",
            ],
            takeaway:
              "Clearer is better, even before perfect.",
          },
        ],
      },
    ],
  };
}

function creditContent(): LearnPageContent {
  return {
    heroTitle: "Learn how cards and credit work before they start working against you.",
    heroBody:
      "This lesson is for people who want a simpler understanding of debit cards, credit cards, interest, and credit habits. The goal is to prevent expensive confusion.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand the basic idea",
        intro:
          "Before using credit well, it helps to know what each tool actually is.",
        concepts: [
          {
            id: "debit-vs-credit",
            title: "Debit card versus credit card",
            shortLabel: "They are not the same thing",
            summary:
              "A debit card uses your money. A credit card uses borrowed money.",
            narrative: [
              "A debit card usually takes money straight from your bank account. A credit card usually means the card company pays first and you pay them back later.",
              "That is the big difference. With debit, you are spending money you already have. With credit, you are spending borrowed money.",
              "This matters because the emotional feeling can seem similar at checkout, but the money behavior underneath is very different.",
              "A lot of beginners mix them together because both are cards. But one pulls from your account and the other creates a bill.",
            ],
            takeaway:
              "Debit uses your money. Credit uses borrowed money.",
            extraReadingLabel: "Read more about debit and credit cards",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/using-credit-cards",
          },
          {
            id: "what-is-credit-card",
            title: "What is a credit card?",
            shortLabel: "A short-term loan",
            summary:
              "A credit card is a short-term loan, not extra cash.",
            narrative: [
              "When you use a credit card, the card company pays first and expects you to pay them back. That is why it is borrowed money.",
              "If you treat a credit card like free extra money, it is easy to drift into trouble without noticing.",
              "For example, spending $100 on a card still means you owe that $100 back. The purchase did not disappear just because cash did not leave your bank account right away.",
              "This is the first rule beginners need to understand before anything else.",
            ],
            takeaway:
              "A credit card is borrowed money, not free money.",
          },
          {
            id: "what-is-interest",
            title: "What is interest?",
            shortLabel: "The extra cost of carrying debt",
            summary:
              "Interest is the extra money charged when you do not pay the balance in full.",
            narrative: [
              "If you do not pay your full credit card balance, the card company can charge interest. That is the extra cost of carrying debt.",
              "This matters because small purchases can become more expensive over time if the balance stays unpaid.",
              "For example, something that looked manageable at first may cost more than expected because extra charges keep building.",
              "Many beginners focus only on whether they can make the payment today. They do not always think about how much the item really costs if the balance stays there.",
            ],
            takeaway:
              "If you carry the balance, the item usually costs more than it first looked like.",
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Learn what good and bad use looks like",
        intro:
          "Credit itself is not good or bad. The behavior around it matters more.",
        concepts: [
          {
            id: "good-use",
            title: "What is good card use?",
            shortLabel: "Controlled and paid back on time",
            summary:
              "Good use means staying in control and paying on time.",
            narrative: [
              "Good card use is simple. You use the card for spending you can handle, and you pay it back on time.",
              "The card should not create confusion or pressure. It should fit inside a money plan you already understand.",
              "For example, charging a normal purchase and paying the full amount back on time is controlled use.",
              "A lot of people think using the card more often means they are using it well. Good use is about control, not volume.",
            ],
            takeaway:
              "Good use means controlled use, not heavy use.",
          },
          {
            id: "bad-use",
            title: "What does bad use look like?",
            shortLabel: "Using it without a clear payback plan",
            summary:
              "Problems usually start when spending and repayment get separated.",
            narrative: [
              "Bad use usually starts when people charge things they cannot comfortably pay back, or when they stop tracking what they owe.",
              "If the plan is just to figure it out later, that is often the start of trouble.",
              "For example, using a card because checking feels too low can be a warning sign if there is no real repayment plan behind it.",
              "This matters because card problems often build quietly before they feel urgent.",
            ],
            takeaway:
              "If the payback plan is unclear, slow down.",
          },
          {
            id: "credit-score-basic",
            title: "What is a credit score in simple terms?",
            shortLabel: "A rough trust signal",
            summary:
              "A credit score is one rough signal of how you handle borrowed money.",
            narrative: [
              "A credit score is one way lenders estimate how reliable you may be with borrowed money.",
              "It is not your worth as a person. It is just one signal tied to money behavior over time.",
              "That matters because your score can affect future access and cost when you want certain financial products.",
              "A lot of beginners think the score is random. It is not perfect, but it is also not magic. It responds to behavior patterns.",
            ],
            takeaway:
              "A credit score reflects habits over time, not one perfect moment.",
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Set your first rules",
        intro:
          "A few simple rules can prevent a lot of future stress.",
        concepts: [
          {
            id: "only-charge-what-you-can-cover",
            title: "Only charge what you could already cover",
            shortLabel: "Your bank account is still the real limit",
            summary:
              "A strong beginner rule is to only charge what you could already pay from your account.",
            narrative: [
              "One of the best beginner rules is this: only charge what you could already cover with money you actually have.",
              "That keeps the card from becoming a shortcut around reality.",
              "For example, if you could not pay for it from your bank account today, be careful about putting it on the card.",
              "This rule lowers the chance that debt builds quietly in the background.",
            ],
            takeaway:
              "Your real limit is what you can truly cover.",
          },
          {
            id: "pay-on-time",
            title: "Why paying on time matters",
            shortLabel: "Timing matters a lot",
            summary:
              "Paying on time protects you from extra stress and extra damage.",
            narrative: [
              "Paying on time is one of the most important credit habits because it keeps small problems from becoming bigger ones.",
              "Late payments can create extra stress, and they can also create extra problems that follow you longer.",
              "A simple system like reminders or autopay can help because memory alone is not always enough.",
              "This is one of the easiest habits to understand and one of the most useful to build early.",
            ],
            takeaway:
              "Set up systems so memory is not the whole plan.",
          },
          {
            id: "when-not-to-use-credit",
            title: "When not to use credit",
            shortLabel: "Stress is a warning sign",
            summary:
              "If credit is becoming a way to hide money pressure, pause and reset.",
            narrative: [
              "Credit becomes more dangerous when it starts covering stress you have not really looked at yet.",
              "If bills already feel hard or money already feels very unclear, more card spending can make the problem deeper instead of solving it.",
              "That does not mean credit is always bad. It means it should not become a mask over a bigger problem.",
              "A calmer move is to slow down and understand the pressure first.",
            ],
            takeaway:
              "Do not use credit to hide a problem you have not looked at yet.",
          },
        ],
      },
    ],
  };
}

function savingContent(): LearnPageContent {
  return {
    heroTitle: "Small savings can matter more than people think.",
    heroBody:
      "This lesson is for people who want a calmer start with saving. You do not need a big amount first. You need a structure that feels real and repeatable.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand what saving is really for",
        intro:
          "Saving is not only about discipline. It gives you breathing room and more choice later.",
        concepts: [
          {
            id: "why-save",
            title: "Why save at all?",
            shortLabel: "Less pressure and more choice",
            summary:
              "Saving helps you feel less trapped by every money problem.",
            narrative: [
              "Saving gives you breathing room. When every dollar must be used right away, life feels tighter and more stressful.",
              "Even a small amount saved can change how a surprise feels. A setback still hurts, but it does not always feel like a full crisis.",
              "A lot of people think saving only matters once the amount is big. That is not true. Even smaller savings can reduce pressure.",
              "This is the emotional side of saving, and it matters just as much as the math.",
            ],
            takeaway:
              "Small savings still change how money feels.",
          },
          {
            id: "emergency-fund",
            title: "What is an emergency fund?",
            shortLabel: "Money for the unexpected",
            summary:
              "An emergency fund is money set aside for real surprises.",
            narrative: [
              "An emergency fund is money you keep for real unexpected problems, like an urgent bill, broken device, or sudden travel need.",
              "It is there to protect you from panic and from making rushed money choices under pressure.",
              "This matters because without a small cushion, one surprise can force a bad decision or extra borrowing.",
              "The key idea is simple: this money has a job before the emergency even happens.",
            ],
            takeaway:
              "Emergency money is for real pressure, not random spending.",
          },
          {
            id: "starting-small",
            title: "Why starting small is still good",
            shortLabel: "You do not need a huge number first",
            summary:
              "Small consistent saving matters more than waiting for a perfect amount.",
            narrative: [
              "A lot of people delay saving because they think the amount is too small to matter. The bigger problem is usually not the amount. It is getting started at all.",
              "If you can build the habit with a smaller amount, you are already doing the hard part.",
              "For example, a smaller amount saved every week can matter more than one big amount saved once and never repeated.",
              "This is why starting small is not weak. It is often the most realistic way to begin.",
            ],
            takeaway:
              "Small is not pointless if it keeps happening.",
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: See how time helps you",
        intro:
          "Saving early matters because time can do some of the work for you.",
        concepts: [
          {
            id: "why-early-matters",
            title: "Why starting early matters",
            shortLabel: "Time gives your money more room",
            summary:
              "The earlier you start, the more time your money has to build.",
            narrative: [
              "Starting early matters because time gives your money more room to build. You do not need a huge amount first for this to matter.",
              "A person who starts earlier with smaller amounts can sometimes end up ahead of someone who starts later with bigger amounts.",
              "That is why early action matters so much. It is not only about how much you save. It is also about when you begin.",
              "This is one reason learning money basics earlier can be such a real advantage.",
            ],
            takeaway:
              "Time can matter as much as size.",
          },
          {
            id: "consistency",
            title: "Why consistency beats intensity",
            shortLabel: "Repeatable beats dramatic",
            summary:
              "A repeatable saving habit usually wins over random big efforts.",
            narrative: [
              "A lot of people save hard for one month and then stop. That may feel impressive for a moment, but it is usually harder to keep.",
              "A smaller repeatable habit often works better because it fits real life more naturally.",
              "For example, a simple weekly or monthly saving rule is easier to carry forward than one huge promise.",
              "This matters because steady habits are what make saving feel normal instead of emotional.",
            ],
            takeaway:
              "Steady habits beat dramatic bursts.",
          },
          {
            id: "long-term-view",
            title: "What long-term really means",
            shortLabel: "Think beyond next week",
            summary:
              "Long-term money decisions work better when you stop judging them by one short moment.",
            narrative: [
              "Long-term means not judging everything by this week or this month alone.",
              "A good money habit may feel quiet at first. Its value often shows up later, when life gets more expensive or more complex.",
              "That is why patience matters. Some good decisions do not feel exciting right away.",
              "A lot of beginners want instant proof a habit is working. Money often rewards patience more than speed.",
            ],
            takeaway:
              "Some of the best money habits feel quiet at first.",
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Build your first saving system",
        intro:
          "A saving habit works better when it is set up as a system, not just a feeling.",
        concepts: [
          {
            id: "saving-rule",
            title: "Pick one saving rule",
            shortLabel: "Make the habit easier to repeat",
            summary:
              "Saving works better when the rule is simple enough to keep.",
            narrative: [
              "A saving rule is just a simple repeatable pattern you can follow without having to make a fresh emotional decision every time.",
              "The amount does not need to look impressive. It needs to be realistic enough to keep using.",
              "For example, a small weekly transfer can be stronger than saying you will save whatever is left at the end.",
              "This helps because a rule turns saving from a wish into a system.",
            ],
            takeaway:
              "A clear rule beats a vague goal.",
          },
          {
            id: "where-to-keep-it",
            title: "Where should savings live?",
            shortLabel: "Keep it clear and separate",
            summary:
              "Savings often works better when it feels separate from everyday spending money.",
            narrative: [
              "If savings sits in the same flow as everyday spending, it can be easier to use without thinking.",
              "A more separate place can help the money keep its purpose and feel more protected.",
              "This does not have to be complicated. The main point is to make savings feel distinct from daily spending.",
              "That small separation can make the habit feel much more real.",
            ],
            takeaway:
              "Money is easier to protect when it has a clearer home.",
          },
          {
            id: "how-to-measure-progress",
            title: "How to measure progress",
            shortLabel: "Look for steadiness, not perfection",
            summary:
              "Progress is about regular movement, not flawless behavior.",
            narrative: [
              "A lot of beginners think progress means never slipping up again. That is not realistic.",
              "Real progress means saving feels a little less random and a little more normal over time.",
              "For example, if saving happens more often and with less drama, that is real progress even if the amount is still small.",
              "This way of thinking helps people keep going instead of quitting after one imperfect month.",
            ],
            takeaway:
              "A setback is not the same as starting over.",
          },
        ],
      },
    ],
  };
}

export function getLearnPageContent(
  topModule: RecommendedModule,
  _persona: UserPersona
): LearnPageContent {
  if (topModule === "investing-basics-and-first-stocks") {
    return investingBasicsContent();
  }

  if (topModule === "budgeting-and-cash-flow") {
    return budgetingContent();
  }

  if (topModule === "credit-scores-and-credit-cards") {
    return creditContent();
  }

  return savingContent();
}