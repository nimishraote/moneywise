import type { RecommendedModule, UserPersona } from "@/lib/types/personalized-plan";

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
  detailTitle: string;
  detailBody: string;
  whyItMatters: string;
  example: string;
  beginnerMistake: string;
  ruleToRemember: string;
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
        title: "Step 1: Learn what the main words mean",
        intro:
          "Before money goes in, the words need to make sense. These are the basic ideas most beginners need first.",
        concepts: [
          {
            id: "stock",
            title: "What is a stock?",
            shortLabel: "A small piece of a company",
            summary:
              "A stock means you own a small piece of a company.",
            detailTitle: "A stock is a small piece of a company.",
            detailBody:
              "When you buy a stock, you are buying a tiny part of a real company. If that company grows and people believe it will do well, the stock price can go up. If the company struggles, the price can go down.",
            whyItMatters:
              "A lot of new investors hear the word stock but do not really know what they are buying. This is the first building block.",
            example:
              "Imagine a company is split into many tiny pieces. Buying one stock means buying one of those pieces.",
            beginnerMistake:
              "A lot of beginners think a stock is just a number on a screen. It is actually tied to a real business.",
            ruleToRemember:
              "A stock is not free money. It is a piece of a company, and its value can move up or down.",
          },
          {
            id: "index-fund",
            title: "What is an index fund?",
            shortLabel: "A bundle of many companies",
            summary:
              "An index fund holds many companies together in one place.",
            detailTitle: "An index fund is a bundle of many companies.",
            detailBody:
              "Instead of buying just one company, an index fund lets you own a small piece of many companies at the same time. This spreads your money out more.",
            whyItMatters:
              "Many beginners think they need to pick one perfect stock. Often, understanding index funds first is a safer and simpler starting point.",
            example:
              "Buying one stock is like picking one player. Buying an index fund is more like buying the whole team.",
            beginnerMistake:
              "Many beginners think an index fund is a special secret product. It is really just a simple way to own a wider mix of companies.",
            ruleToRemember:
              "One company can swing hard. A wider mix usually moves in a steadier way.",
          },
          {
            id: "stock-market",
            title: "What is the stock market?",
            shortLabel: "A place where buyers and sellers meet",
            summary:
              "The stock market is where people buy and sell stocks.",
            detailTitle: "The stock market is where stocks get traded.",
            detailBody:
              "People and institutions buy and sell stocks during market hours. Prices move because people react to news, earnings, fear, hope, and bigger economic changes.",
            whyItMatters:
              "If you do not know how the market works, price moves can feel random and scary.",
            example:
              "If many people want to buy a company at the same time, the price may rise. If many want to sell, the price may fall.",
            beginnerMistake:
              "Beginners often think the market should move in a logical straight line. It does not.",
            ruleToRemember:
              "The market moves every day. Movement alone does not mean something is wrong.",
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Understand what risk really means",
        intro:
          "A lot of people hear that investing is risky, but they do not know what that actually means. These ideas make risk easier to understand.",
        concepts: [
          {
            id: "risk",
            title: "What is risk?",
            shortLabel: "The value can move up or down",
            summary:
              "Risk means your money can go up or down in value.",
            detailTitle: "Risk means the value can change, sometimes fast.",
            detailBody:
              "When you invest, the value will not stay perfectly still. It can rise. It can fall. Sometimes it falls for a short time. Sometimes it stays down longer.",
            whyItMatters:
              "If you do not understand risk, normal price changes can feel like failure.",
            example:
              "You invest $100. A week later it is $92. That drop is risk in real life.",
            beginnerMistake:
              "Many beginners think any drop means they made a bad decision. That is not always true.",
            ruleToRemember:
              "Risk does not mean guaranteed loss. It means the value can move.",
          },
          {
            id: "why-prices-move",
            title: "Why do prices move?",
            shortLabel: "People react to news and expectations",
            summary:
              "Prices move because people keep changing what they think something is worth.",
            detailTitle:
              "Prices move because people keep reacting and re-pricing.",
            detailBody:
              "Stock prices are not fixed. They move because buyers and sellers keep reacting to company news, market mood, and bigger economic changes.",
            whyItMatters:
              "If you expect prices to stay calm all the time, normal movement will feel confusing.",
            example:
              "A company reports weaker results than people expected. Even if the company still exists and still sells products, the stock may fall.",
            beginnerMistake:
              "People often think price moves always mean something dramatic happened. Sometimes the market is just reacting to expectations.",
            ruleToRemember:
              "Prices move because people change their minds every day.",
          },
          {
            id: "single-stock-vs-mix",
            title: "Why one stock is riskier than a mix",
            shortLabel: "One company can swing harder",
            summary:
              "If all your money is in one company, you feel every move more.",
            detailTitle:
              "One company is usually riskier than spreading your money out.",
            detailBody:
              "If you put money into one company, that one company has a lot of power over your result. If that company does badly, your money can drop fast. A wider mix spreads that risk out.",
            whyItMatters:
              "This helps beginners understand why index funds often come up so early in investing conversations.",
            example:
              "If one company drops 30 percent, you feel the full drop if you only own that one company.",
            beginnerMistake:
              "Beginners often think picking one exciting company is the smart move. It can also be the most stressful move.",
            ruleToRemember:
              "The more concentrated you are, the more one company can hurt you.",
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Learn how to start in a calmer way",
        intro:
          "This step is about beginner behavior. It is not just what you buy. It is how you think before you buy.",
        concepts: [
          {
            id: "start-small",
            title: "Why start small?",
            shortLabel: "You are still learning",
            summary:
              "Starting small lowers the pressure while you learn.",
            detailTitle: "Starting small protects you while you are still learning.",
            detailBody:
              "A lot of beginners feel they need to move fast. They do not. Starting small gives you room to learn without turning every choice into a big emotional event.",
            whyItMatters:
              "Smaller starting points help you stay calmer and think more clearly.",
            example:
              "Learning with a small amount feels very different from learning with money you cannot afford to lose.",
            beginnerMistake:
              "Beginners often start too big because they want quick results.",
            ruleToRemember:
              "Do not let excitement decide your first move.",
          },
          {
            id: "money-you-might-need-soon",
            title: "Do not invest money you may need soon",
            shortLabel: "Short-term money should stay safer",
            summary:
              "Money for near-term bills or emergencies should not be in something that moves around a lot.",
            detailTitle:
              "Short-term money and market money should not be mixed carelessly.",
            detailBody:
              "If you may need the money soon for rent, bills, or emergencies, market drops can create real pressure at the wrong time.",
            whyItMatters:
              "This is one of the easiest ways beginners accidentally create stress for themselves.",
            example:
              "If you need the money in two months and the market drops next week, you may be forced to sell at a bad time.",
            beginnerMistake:
              "People often invest money first and ask timing questions later.",
            ruleToRemember:
              "Money you may need soon should stay easy to reach and more stable.",
          },
          {
            id: "first-rule",
            title: "Your first investing rule",
            shortLabel: "Understand before acting",
            summary:
              "Your first rule should be simple: understand the basic thing before you buy it.",
            detailTitle: "Your first rule is simple: understand it before you buy it.",
            detailBody:
              "You do not need to know everything. But you should know the basic idea of what it is, why it moves, and what could go wrong before you put money into it.",
            whyItMatters:
              "This rule reduces panic, confusion, and impulsive decisions.",
            example:
              "Before buying a stock, ask: what is this company, why am I buying it, and what would make me regret this?",
            beginnerMistake:
              "A lot of beginners buy first and learn later.",
            ruleToRemember:
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
              "A budget is just a simple plan for where your money goes.",
            detailTitle: "A budget is a plan, not a punishment.",
            detailBody:
              "A budget helps you decide where money should go before it disappears. It does not have to be complicated, and it does not mean you cannot enjoy your life.",
            whyItMatters:
              "A lot of people avoid budgeting because they think it means restriction. It really means more clarity.",
            example:
              "If you know rent, food, and transport come first, it gets easier to see what is left for everything else.",
            beginnerMistake:
              "Beginners often think budgeting means tracking every tiny thing forever.",
            ruleToRemember:
              "A budget is not about guilt. It is about fewer surprises.",
          },
          {
            id: "money-leaks",
            title: "What are money leaks?",
            shortLabel: "Small spending that adds up quietly",
            summary:
              "Money leaks are smaller spending habits that add up without you noticing.",
            detailTitle: "Money leaks are small things that quietly eat the month.",
            detailBody:
              "A lot of spending is not one huge mistake. It is a lot of smaller things that feel harmless in the moment and bigger at the end.",
            whyItMatters:
              "If you only look for one big problem, you may miss the real pattern.",
            example:
              "Food delivery, subscriptions, rides, and little extras can build into a much bigger number than expected.",
            beginnerMistake:
              "People often underestimate frequent small spending.",
            ruleToRemember:
              "Big pressure often comes from repeated small choices.",
          },
          {
            id: "check-money",
            title: "Why checking your money matters",
            shortLabel: "Avoiding it usually makes it worse",
            summary:
              "Checking your money more often usually makes it less scary over time.",
            detailTitle: "Avoiding your money rarely makes it easier.",
            detailBody:
              "Many people avoid checking balances because they do not want bad news. But not looking usually creates more confusion and more stress later.",
            whyItMatters:
              "The more familiar your numbers feel, the less power they have over you.",
            example:
              "Checking once a week is often enough to catch problems earlier.",
            beginnerMistake:
              "Beginners often think less visibility means less stress.",
            ruleToRemember:
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
            detailTitle: "Needs come first because they protect stability.",
            detailBody:
              "A need is something that keeps life functioning. A want may still matter, but it comes after the basics are covered.",
            whyItMatters:
              "This helps when money feels tight and choices feel emotional.",
            example:
              "Rent, food, and transport usually come before shopping or extra subscriptions.",
            beginnerMistake:
              "People sometimes label almost everything as a need when stress is high.",
            ruleToRemember:
              "Cover the basics first. Then decide what matters next.",
          },
          {
            id: "saving-rule",
            title: "A small saving rule",
            shortLabel: "Save a little on purpose",
            summary:
              "Saving works better when it is planned, not random.",
            detailTitle: "A small repeatable saving rule beats a big promise.",
            detailBody:
              "A lot of people try to save whatever is left at the end. Usually that means nothing is left. A small planned amount works better.",
            whyItMatters:
              "Consistency matters more than making the amount look impressive.",
            example:
              "Saving a small fixed amount every week is often stronger than waiting for a perfect month.",
            beginnerMistake:
              "Beginners often aim too high, miss the goal, and quit.",
            ruleToRemember:
              "Small and repeatable is better than big and unstable.",
          },
          {
            id: "weekly-checkin",
            title: "A weekly money check-in",
            shortLabel: "Short reviews make a big difference",
            summary:
              "A short weekly check-in can reduce month-end surprises.",
            detailTitle: "Short check-ins work better than one big panic later.",
            detailBody:
              "You do not need a long complicated review. A short look once a week can help you notice drift before it becomes pressure.",
            whyItMatters:
              "Regular check-ins make money feel more manageable.",
            example:
              "A ten-minute weekly check can help you slow down spending before the month gets hard.",
            beginnerMistake:
              "People often wait until there is already a problem.",
            ruleToRemember:
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
            detailTitle: "Realistic plans last longer than perfect-looking plans.",
            detailBody:
              "A perfect plan may look good for one day. A realistic plan is more likely to survive a real week or month.",
            whyItMatters:
              "You are building a system you can live with, not trying to impress anyone.",
            example:
              "Giving yourself some room for normal life often works better than cutting everything at once.",
            beginnerMistake:
              "Beginners often try to become a totally different person overnight.",
            ruleToRemember:
              "A plan you can keep is better than a plan that looks ideal.",
          },
          {
            id: "what-to-fix-first",
            title: "What to fix first",
            shortLabel: "Do not try to change everything",
            summary:
              "The best first fix is usually the area causing the most pressure.",
            detailTitle: "Start with the pressure point, not every point.",
            detailBody:
              "Trying to fix everything at once creates confusion. It is better to start with the spending pattern or habit that causes the most stress right now.",
            whyItMatters:
              "This lowers overwhelm and makes progress easier to see.",
            example:
              "If food delivery is the biggest leak, start there before making ten other rules.",
            beginnerMistake:
              "People often make too many rules and remember none of them.",
            ruleToRemember:
              "Fix the pressure point first.",
          },
          {
            id: "what-success-looks-like",
            title: "What success looks like",
            shortLabel: "Less stress and more awareness",
            summary:
              "Success is not perfection. It is more awareness and less panic.",
            detailTitle: "Success means your money feels less confusing over time.",
            detailBody:
              "You are moving in the right direction if you understand your money more clearly, feel fewer surprises, and make calmer decisions.",
            whyItMatters:
              "This gives you a better measure of progress than trying to be perfect.",
            example:
              "If you know where your money went this month, that is already progress.",
            beginnerMistake:
              "Beginners often think success means never making a mistake again.",
            ruleToRemember:
              "Clearer is better, even before perfect.",
          },
        ],
      },
    ],
  };
}

function creditContent(): LearnPageContent {
  return {
    heroTitle: "Learn how credit works before it starts working against you.",
    heroBody:
      "This lesson is for people who want a simpler understanding of credit cards, interest, and credit habits. The goal is to prevent expensive confusion.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Understand the basic idea",
        intro:
          "Credit sounds complicated at first, but the basic idea is simple. These are the first things to know.",
        concepts: [
          {
            id: "what-is-credit-card",
            title: "What is a credit card?",
            shortLabel: "A short-term loan",
            summary:
              "A credit card is not extra money. It is borrowed money.",
            detailTitle: "A credit card is a short-term loan.",
            detailBody:
              "When you use a credit card, the card company pays first and expects you to pay them back. That is why credit is different from using money already in your bank account.",
            whyItMatters:
              "If you think a credit card is just normal spending, it is easier to drift into debt without noticing.",
            example:
              "If you spend $100 on a card, you still owe that $100 back to the card company.",
            beginnerMistake:
              "Beginners often treat credit like extra cash instead of borrowed money.",
            ruleToRemember:
              "A credit card is borrowed money, not free money.",
          },
          {
            id: "what-is-interest",
            title: "What is interest?",
            shortLabel: "The cost of not paying it back fast",
            summary:
              "Interest is the extra money charged when you carry debt.",
            detailTitle: "Interest is the price of staying in debt.",
            detailBody:
              "If you do not pay your credit card balance in full, the card company can charge extra money called interest. That makes the original purchase cost more.",
            whyItMatters:
              "This is how small purchases can quietly become much more expensive.",
            example:
              "A purchase that looked manageable at first can cost more if it stays unpaid.",
            beginnerMistake:
              "People often focus on the minimum payment and ignore the bigger cost over time.",
            ruleToRemember:
              "If you carry the balance, the item usually costs more than it looked like.",
          },
          {
            id: "minimum-payment",
            title: "What is a minimum payment?",
            shortLabel: "The smallest payment allowed",
            summary:
              "The minimum payment is not the same as paying the balance off.",
            detailTitle: "Minimum payment means the smallest allowed amount.",
            detailBody:
              "A minimum payment keeps the account from being marked as unpaid right away, but it usually does not clear the full balance. Interest can still keep building.",
            whyItMatters:
              "A lot of beginners think paying the minimum means they handled it fully.",
            example:
              "You may still owe most of the money even after making the minimum payment.",
            beginnerMistake:
              "Many people think minimum payment means safe. It only means the smallest required step.",
            ruleToRemember:
              "Minimum payment is not the same as paying it off.",
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
            title: "What is good credit card use?",
            shortLabel: "Controlled and paid back on time",
            summary:
              "Good use means staying in control and paying on time.",
            detailTitle: "Good use is simple and controlled.",
            detailBody:
              "A credit card can be useful when you use it for manageable spending and pay it back on time. The card should not create confusion or pressure.",
            whyItMatters:
              "This is how credit can stay helpful instead of becoming expensive.",
            example:
              "Charging a normal purchase and paying the full amount back on time is controlled use.",
            beginnerMistake:
              "People often think using the card a lot is the same as using it well.",
            ruleToRemember:
              "Good use means controlled use, not heavy use.",
          },
          {
            id: "bad-use",
            title: "What does bad use look like?",
            shortLabel: "Using it without a clear payback plan",
            summary:
              "Bad use usually starts when spending and repayment get separated.",
            detailTitle: "Bad use starts when the payback plan gets blurry.",
            detailBody:
              "Problems usually start when people use a credit card for things they cannot comfortably pay back, or when they stop tracking what they owe.",
            whyItMatters:
              "This is how stress and interest begin to build quietly.",
            example:
              "Using the card because the checking account feels too low is often a warning sign.",
            beginnerMistake:
              "Beginners often think they will figure it out later.",
            ruleToRemember:
              "If the payback plan is unclear, slow down.",
          },
          {
            id: "credit-score-basic",
            title: "What is a credit score in simple terms?",
            shortLabel: "A rough trust signal",
            summary:
              "A credit score is a rough signal of how you handle borrowed money.",
            detailTitle: "A credit score is a rough trust signal.",
            detailBody:
              "It is one way lenders estimate how reliable you may be with borrowed money. It is not your worth as a person, but it can affect access and cost.",
            whyItMatters:
              "Understanding this early helps credit feel less mysterious.",
            example:
              "If someone handles borrowing more responsibly over time, that usually helps their score.",
            beginnerMistake:
              "A lot of people think a credit score is random or purely unfair. Parts of it follow behavior patterns.",
            ruleToRemember:
              "A credit score reflects habits over time, not one perfect moment.",
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Set your first credit rules",
        intro:
          "A few basic rules can prevent a lot of future pain. This is where credit becomes practical.",
        concepts: [
          {
            id: "only-charge-what-you-can-cover",
            title: "Only charge what you could already cover",
            shortLabel: "Use your checking account as the limit",
            summary:
              "A strong beginner rule is to only charge what you could already pay from your bank account.",
            detailTitle: "Your bank account should still be the real limit.",
            detailBody:
              "This rule keeps the card from becoming a shortcut around reality. It helps you stay grounded in what you can actually afford.",
            whyItMatters:
              "This one habit lowers the chance of debt building quietly.",
            example:
              "If you could not pay it from checking today, be careful about charging it.",
            beginnerMistake:
              "People often let the credit limit decide what feels possible.",
            ruleToRemember:
              "Your real limit is what you can truly cover.",
          },
          {
            id: "pay-on-time",
            title: "Why paying on time matters",
            shortLabel: "Timing matters a lot",
            summary:
              "Paying on time protects you from extra damage and extra stress.",
            detailTitle: "Paying on time is one of the most important credit habits.",
            detailBody:
              "Late payments can create fees, stress, and longer-term problems. On-time payment is one of the clearest habits to build early.",
            whyItMatters:
              "This is one of the easiest good habits to understand and repeat.",
            example:
              "Even a simple reminder system can help keep this habit steady.",
            beginnerMistake:
              "People often assume they will just remember.",
            ruleToRemember:
              "Set up systems so memory is not the whole plan.",
          },
          {
            id: "when-not-to-use-credit",
            title: "When not to use credit",
            shortLabel: "Stress is a warning sign",
            summary:
              "If credit is becoming a way to hide pressure, pause and reset.",
            detailTitle: "Credit is most dangerous when it starts covering stress.",
            detailBody:
              "If you are using a card because money already feels too tight or confusing, that is usually a sign to slow down and look at the bigger situation first.",
            whyItMatters:
              "This stops credit from becoming a bandage over a bigger money problem.",
            example:
              "If basic bills already feel hard, more card spending can deepen the pressure.",
            beginnerMistake:
              "Beginners often use credit to make the stress feel temporary.",
            ruleToRemember:
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
          "Saving is not only about being disciplined. It gives you breathing room and more choice later.",
        concepts: [
          {
            id: "why-save",
            title: "Why save at all?",
            shortLabel: "Less pressure and more choice",
            summary:
              "Saving helps you feel less trapped by every money problem.",
            detailTitle: "Saving gives you breathing room.",
            detailBody:
              "When every dollar has to be used right away, life feels tighter. Saving creates a little space between you and the next surprise.",
            whyItMatters:
              "This is the emotional reason saving matters, not just the math reason.",
            example:
              "Even a small cushion can make an unexpected cost feel less scary.",
            beginnerMistake:
              "People often think saving only matters once the amount is big.",
            ruleToRemember:
              "Small savings still change how money feels.",
          },
          {
            id: "emergency-fund",
            title: "What is an emergency fund?",
            shortLabel: "Money for the unexpected",
            summary:
              "An emergency fund is money set aside for real surprises.",
            detailTitle: "An emergency fund is for life happening.",
            detailBody:
              "This is money you keep for things like a sudden bill, urgent travel, or another real-life surprise. It is there to protect you from panic.",
            whyItMatters:
              "Without some cushion, one surprise can force a bad decision.",
            example:
              "A broken phone, travel need, or unexpected bill can hit differently when there is no backup at all.",
            beginnerMistake:
              "Beginners often think emergency money should also cover normal fun spending.",
            ruleToRemember:
              "Emergency money is for real pressure, not random spending.",
          },
          {
            id: "starting-small",
            title: "Why starting small is still good",
            shortLabel: "You do not need a huge number first",
            summary:
              "Small consistent saving matters more than waiting for a perfect amount.",
            detailTitle: "Starting small still counts.",
            detailBody:
              "A lot of people delay saving because they think the amount looks too small to matter. But small repeated saving builds the habit first, and the habit is the hard part.",
            whyItMatters:
              "This helps people begin instead of waiting.",
            example:
              "A smaller amount saved regularly is often stronger than a big amount saved once.",
            beginnerMistake:
              "People often think small equals pointless.",
            ruleToRemember:
              "Small is not pointless if it keeps happening.",
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: See how time helps you",
        intro:
          "Saving early matters because time can do some of the work for you. This is where the long-term value starts making sense.",
        concepts: [
          {
            id: "why-early-matters",
            title: "Why starting early matters",
            shortLabel: "Time gives your money more room",
            summary:
              "The earlier you start, the more time your money has to grow.",
            detailTitle: "Time is one of the biggest advantages you can have.",
            detailBody:
              "Starting earlier does not mean you need huge amounts. It means your money has more time to build, even if the first steps are small.",
            whyItMatters:
              "This is why starting in your teens or twenties can matter a lot.",
            example:
              "A person who starts earlier with smaller amounts can end up ahead of someone who starts later with bigger amounts.",
            beginnerMistake:
              "Beginners often think only the amount matters, not the timing.",
            ruleToRemember:
              "Time can matter as much as size.",
          },
          {
            id: "consistency",
            title: "Why consistency beats intensity",
            shortLabel: "Repeatable beats dramatic",
            summary:
              "A repeatable saving habit usually wins over random big efforts.",
            detailTitle: "Consistency is easier to keep than intensity.",
            detailBody:
              "A lot of people save hard for one month and stop. A smaller repeatable pattern is often more powerful over time.",
            whyItMatters:
              "This turns saving into something normal instead of something emotional.",
            example:
              "A simple weekly or monthly saving rule is easier to carry into real life.",
            beginnerMistake:
              "People often try to prove too much too early.",
            ruleToRemember:
              "Steady habits beat dramatic bursts.",
          },
          {
            id: "long-term-view",
            title: "What long-term really means",
            shortLabel: "Think beyond next week",
            summary:
              "Long-term money decisions work better when you stop judging them by one short moment.",
            detailTitle: "Long-term means looking beyond one good or bad week.",
            detailBody:
              "Good money habits do not always feel exciting right away. Their value often shows up later, when life gets more expensive or more complex.",
            whyItMatters:
              "This helps beginners stay patient with slower progress.",
            example:
              "What feels small today can feel meaningful later if it keeps building.",
            beginnerMistake:
              "Beginners often want instant proof that a habit is working.",
            ruleToRemember:
              "Some of the best money habits feel quiet at first.",
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Build your first saving system",
        intro:
          "A saving habit works better when it is set up as a system, not a feeling.",
        concepts: [
          {
            id: "saving-rule",
            title: "Pick one saving rule",
            shortLabel: "Make the habit easier to repeat",
            summary:
              "Saving works better when the rule is simple enough to keep.",
            detailTitle: "One clear saving rule is easier to follow than vague hope.",
            detailBody:
              "The point is not to impress yourself with a big number. The point is to create a rule you can repeat without constant stress.",
            whyItMatters:
              "This is what turns saving from an idea into behavior.",
            example:
              "A small weekly transfer is clearer than saying you will save whatever is left.",
            beginnerMistake:
              "Beginners often use saving as a wish instead of a system.",
            ruleToRemember:
              "A clear rule beats a vague goal.",
          },
          {
            id: "where-to-keep-it",
            title: "Where should savings live?",
            shortLabel: "Keep it clear and separate",
            summary:
              "It helps when savings feels separate from daily spending money.",
            detailTitle: "Savings works better when it is not mixed into everything else.",
            detailBody:
              "If savings sits in the same flow as daily spending, it is easier to use without thinking. Separation can help the money keep its purpose.",
            whyItMatters:
              "This makes the habit more visible and more protected.",
            example:
              "A separate savings space can reduce the urge to treat it like spending money.",
            beginnerMistake:
              "People often save into the same place they spend from all day.",
            ruleToRemember:
              "Money is easier to protect when it has a clearer home.",
          },
          {
            id: "how-to-measure-progress",
            title: "How to measure progress",
            shortLabel: "Look for steadiness, not perfection",
            summary:
              "Progress is about regular movement, not flawless behavior.",
            detailTitle: "Progress means it is becoming more normal.",
            detailBody:
              "You are making progress if saving feels a little less random and a little more built into life. It does not need to look perfect.",
            whyItMatters:
              "This gives people a healthier way to judge themselves.",
            example:
              "If saving happens more often and with less drama, that is real progress.",
            beginnerMistake:
              "Beginners often think one bad month erased everything.",
            ruleToRemember:
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