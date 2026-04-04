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
              "This matters because a lot of beginners mix them together and do not realize one is using their own money while the other is creating a bill.",
            ],
            takeaway:
              "Debit uses your money. Credit uses borrowed money.",
            actionSteps: [
              "Write one sentence for debit and one sentence for credit in your own words.",
              "Look at any card you use and ask yourself whether it uses your money or borrowed money.",
              "Make one rule: do not use a card unless you know which kind it is.",
            ],
            extraReadingLabel: "Read more about debit and credit cards",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/using-credit-cards",
          },
          {
            id: "checking-balance",
            title: "Why checking your balance matters",
            shortLabel: "Looking helps more than avoiding",
            summary:
              "Checking your balance helps you stay aware of what is happening.",
            narrative: [
              "A lot of people avoid checking their balance when they feel nervous about money. That is understandable, but it usually makes confusion worse later.",
              "Checking your balance does not fix everything by itself. But it gives you a clearer picture, and that makes better decisions easier.",
              "For example, if you look once a week, you may notice a pattern early instead of being surprised at the end of the month.",
              "This matters because money usually feels less scary when it feels more familiar.",
            ],
            takeaway:
              "Looking sooner is usually kinder than looking later.",
            actionSteps: [
              "Pick two days this week when you will check your balance.",
              "After you check, write down one thing you noticed.",
              "Do not judge yourself. Just practice looking clearly.",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Learn the basics of spending and saving",
        intro:
          "Once the everyday tools make sense, the next step is understanding how money gets used and protected.",
        concepts: [
          {
            id: "budget",
            title: "What is a budget?",
            shortLabel: "A simple plan for where money goes",
            summary:
              "A budget is a simple plan that helps you see where your money should go.",
            narrative: [
              "A budget is a plan for where money goes before it disappears. It helps you see what needs to happen first and what is left after that.",
              "It does not need to be fancy. It just needs to help you understand the basic picture.",
              "For example, if you have $500 for the month and rent, food, and transport already take up most of it, a budget helps you see that clearly before smaller spending takes over.",
              "This matters because many people feel bad about money without ever seeing the actual flow of it.",
            ],
            takeaway:
              "A budget is not about guilt. It is about clarity.",
            actionSteps: [
              "Write down how much money comes in this month.",
              "Write down your 3 biggest spending buckets.",
              "Subtract those main costs first so you can see what is actually left.",
            ],
            extraReadingLabel: "Read more about simple budgeting",
            extraReadingUrl:
              "https://consumer.gov/managing-your-money/making-budget",
          },
          {
            id: "saving",
            title: "What is saving?",
            shortLabel: "Keeping some money for later",
            summary:
              "Saving means keeping some money for future use instead of spending it all now.",
            narrative: [
              "Saving means keeping part of your money for later instead of using all of it right away.",
              "That may sound simple, but it matters because it creates breathing room. Without some savings, every surprise can feel bigger and more stressful.",
              "For example, even a small amount saved each week can help when a real-life problem shows up later.",
              "This matters because saving is not only about discipline. It is about giving yourself a little more choice and a little less pressure.",
            ],
            takeaway:
              "Saving is one of the simplest ways to reduce future pressure.",
            actionSteps: [
              "Pick one very small amount you can save this week.",
              "Choose the day when you will do it.",
              "Treat that small amount as a real habit, not as something too tiny to matter.",
            ],
          },
          {
            id: "emergency-fund",
            title: "What is an emergency fund?",
            shortLabel: "Money for real surprises",
            summary:
              "An emergency fund is money set aside for unexpected problems.",
            narrative: [
              "An emergency fund is money saved for real surprises, like an urgent bill, a broken phone, or another problem you did not plan for.",
              "It is not there for random spending or things you simply want right now. It has a very specific job.",
              "For example, if something goes wrong and you have even a small emergency cushion, the situation may still be stressful, but it does not always turn into panic.",
              "This matters because one surprise can force a bad decision when there is no backup at all.",
            ],
            takeaway:
              "Emergency money is for real pressure, not random spending.",
            actionSteps: [
              "Write down one kind of emergency that could realistically happen in your life.",
              "Decide where emergency money would live so you do not mix it with normal spending.",
              "Start with a small first amount instead of waiting for a perfect number.",
            ],
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Learn the next layer",
        intro:
          "Once the basics feel clearer, these are good next ideas to understand.",
        concepts: [
          {
            id: "interest",
            title: "What is interest?",
            shortLabel: "Extra money charged or earned over time",
            summary:
              "Interest is extra money that can be charged or earned over time.",
            narrative: [
              "Interest is extra money added over time. In some situations, you may earn it. In other situations, you may be charged it.",
              "For beginners, the most important thing to understand is that borrowed money can cost more if it is not paid back quickly.",
              "A simple example is carrying a credit card balance. The original item may have one price at first, but the total cost can get bigger when extra charges keep getting added.",
              "This matters because a lot of people hear the word interest without really understanding why it changes the real cost of money.",
            ],
            takeaway:
              "Interest changes the real cost of borrowing and the real value of saving.",
            actionSteps: [
              "Write one sentence on where interest can help you and where it can hurt you.",
              "If you use a credit card, remind yourself that unpaid balances can grow.",
              "If you save, remember that time can help smaller amounts build.",
            ],
          },
          {
            id: "credit",
            title: "What is credit in simple terms?",
            shortLabel: "Borrowing with responsibility",
            summary:
              "Credit is borrowed money that you are expected to handle responsibly.",
            narrative: [
              "Credit means someone is letting you use borrowed money with the expectation that you will pay it back.",
              "That is why credit needs more care than everyday spending from your own account.",
              "For example, using a credit card creates money you owe back. If that is managed well, it can stay under control. If it is ignored, it can become expensive.",
              "This matters because a lot of beginners start using credit before they understand what it really asks from them.",
            ],
            takeaway:
              "Credit is not extra money. It is borrowed money with responsibility attached.",
            actionSteps: [
              "Make one rule: do not put something on credit unless you could already cover it.",
              "If you already use credit, check the balance instead of avoiding it.",
              "Focus on understanding first, then using it more.",
            ],
          },
          {
            id: "investing",
            title: "What is investing, in the most basic sense?",
            shortLabel: "Trying to grow money over time",
            summary:
              "Investing means putting money somewhere with the hope that it grows over time.",
            narrative: [
              "Investing means putting money into something because you hope it becomes worth more later.",
              "It is different from saving because the value can move up and down. That is why it is usually better to understand basics first before jumping in.",
              "A simple example is buying a small piece of a company or a wider fund and hoping it grows in value over time.",
              "This matters because a lot of people hear about investing early, but they do not always learn the building blocks first.",
            ],
            takeaway:
              "Investing is about growth over time, but it works best when the basics are already clear.",
            actionSteps: [
              "Do not rush to buy anything yet if the basics still feel fuzzy.",
              "Learn what a stock, fund, and market are before using real money.",
              "Separate learning from acting too quickly.",
            ],
          },
        ],
      },
    ],
  };
}

function investingBasicsContent(): LearnPageContent {
  return {
    heroTitle: "Learn the basics before you buy anything.",
    heroBody:
      "This lesson is for people who already want to understand investing. It starts with the building blocks and then moves into safer beginner behavior.",
    steps: [
      {
        id: "step-1",
        title: "Step 1: Learn the building blocks",
        intro:
          "Before you buy anything, the main words need to make sense.",
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
              "Imagine a company is cut into many tiny pieces. Buying one stock means buying one of those pieces.",
              "This matters because many beginners hear the word stock and think it is just a random thing on a screen. It is actually connected to a real business.",
            ],
            takeaway:
              "A stock is not free money. It is a small piece of a company.",
            actionSteps: [
              "Write what a stock is in one sentence using your own words.",
              "Do not buy anything yet if that sentence still feels unclear.",
              "Focus on understanding the building block first.",
            ],
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
              "This is one reason index funds come up so often in beginner conversations.",
            ],
            takeaway:
              "A wider mix usually feels calmer than one single company.",
            actionSteps: [
              "Explain to yourself why one stock is different from a wider fund.",
              "Notice that wider mix often means less dependence on one company.",
              "Use this idea before making any real investing move.",
            ],
          },
          {
            id: "stock-market",
            title: "What is the stock market?",
            shortLabel: "A place where people buy and sell",
            summary:
              "The stock market is where stocks get bought and sold.",
            narrative: [
              "The stock market is where people and institutions buy and sell stocks. Prices move because buyers and sellers react to news, results, fear, hope, and the economy.",
              "That movement can feel confusing at first. Prices do not move in a neat straight line.",
              "For example, if many people want to buy a company, the price may rise. If many want to sell, the price may fall.",
              "This matters because market movement can feel less strange once you know why it exists.",
            ],
            takeaway:
              "The market moves every day because people keep changing what they think things are worth.",
            actionSteps: [
              "Do not expect prices to move in a straight line.",
              "Learn why movement happens before treating movement as danger.",
              "Build understanding before reacting emotionally to price changes.",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Step 2: Learn how prices and mix work",
        intro:
          "Before risk gets discussed directly, it helps to understand how movement and mix work.",
        concepts: [
          {
            id: "why-prices-move",
            title: "Why do prices move?",
            shortLabel: "People react and re-price",
            summary:
              "Prices move because people keep changing what they think something is worth.",
            narrative: [
              "Stock prices are not fixed. They move because buyers and sellers keep reacting to new information and changing expectations.",
              "A company can still be real and active, but if results are weaker than people expected, the stock may still fall.",
              "That is why prices can move even when nothing dramatic happened. The market is reacting to expectations, not only facts.",
              "This matters because beginners often think price moves always mean a disaster or a huge win.",
            ],
            takeaway:
              "Prices move because people react and re-price things all the time.",
            actionSteps: [
              "Do not treat every price move like an emergency.",
              "Ask what changed in expectations before jumping to conclusions.",
              "Train yourself to pause before reacting.",
            ],
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
              "A simple example is one company dropping 30 percent. If that is all you own, you feel the whole drop.",
              "This matters because concentration can create stress quickly.",
            ],
            takeaway:
              "The more concentrated you are, the more one company can hurt you.",
            actionSteps: [
              "Do not confuse one exciting company with a safe beginner choice.",
              "Learn the cost of concentration before going all in on one name.",
              "If you are a beginner, wider usually means calmer.",
            ],
          },
          {
            id: "risk",
            title: "What is risk?",
            shortLabel: "The value can move up or down",
            summary:
              "Risk means your money can rise or fall in value.",
            narrative: [
              "Risk means the value of your investment can change. It can go up, and it can go down.",
              "A simple example is investing $100 and seeing it become $92 a week later. That drop is risk in real life.",
              "Many beginners think any drop means they failed. That is not always true. Risk is part of how investing works.",
              "This matters because risk feels less mysterious once you know what it actually means.",
            ],
            takeaway:
              "Risk does not mean guaranteed loss. It means the value can move.",
            actionSteps: [
              "Do not invest money you may need soon.",
              "Start with smaller amounts while learning how movement feels.",
              "Expect some movement instead of assuming every drop means failure.",
            ],
          },
        ],
      },
      {
        id: "step-3",
        title: "Step 3: Start in a calmer way",
        intro:
          "Good beginner behavior matters as much as knowing the words.",
        concepts: [
          {
            id: "start-small",
            title: "Why start small?",
            shortLabel: "You are still learning",
            summary:
              "Starting small lowers pressure while you learn.",
            narrative: [
              "A lot of beginners feel they need to make a big move right away. They do not. Starting small gives you space to learn without turning every choice into a stressful event.",
              "If the amount is too big, every market move feels personal.",
              "Starting small does not mean you are not serious. It means you understand that learning comes first.",
              "This protects both your money and your emotions.",
            ],
            takeaway:
              "Do not let excitement decide your first move.",
            actionSteps: [
              "Choose learning over rushing.",
              "Use a small amount if you ever decide to start, not money that would create panic if it moved.",
              "Let your first move be manageable, not dramatic.",
            ],
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
            actionSteps: [
              "Keep rent, bill, and emergency money separate from investing money.",
              "Do not chase growth with money you may need soon.",
              "Protect stability first.",
            ],
          },
          {
            id: "first-rule",
            title: "Your first investing rule",
            shortLabel: "Understand before acting",
            summary:
              "Before buying something, understand the basic idea of what it is and why you are buying it.",
            narrative: [
              "You do not need to know everything before you start. But you should know the basic idea of what the investment is, why it moves, and what could go wrong.",
              "A useful beginner question is simple: can I explain this in plain language to someone else?",
              "If the answer is no, it may mean you should slow down and learn more first.",
              "This rule helps prevent rushed decisions based on hype, fear, or the feeling that everyone else already knows more.",
            ],
            takeaway:
              "If you cannot explain it simply, you probably should not rush into it.",
            actionSteps: [
              "Make this your first rule: understand before acting.",
              "If the concept is still fuzzy, keep learning instead of buying.",
              "Use clarity as the signal, not excitement.",
            ],
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
              "It does not have to be complicated. It simply helps you see what needs to happen first and what is left after that.",
              "Imagine you get $500 this month. Rent is $250. Food is $120. Transport is $50. That leaves $80. A budget helps you see that before the $80 gets spent without a plan.",
              "That is why budgeting is more about clarity than restriction.",
            ],
            takeaway:
              "A budget is not about guilt. It is about fewer surprises.",
            actionSteps: [
              "Write down how much money comes in this month.",
              "Write down your fixed costs first, like rent, food, and transport.",
              "Only after that, decide what is left for the rest.",
            ],
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
              "Food delivery, subscriptions, rides, snacks, and small online purchases can all feel harmless in the moment.",
              "But if $12 here and $18 there keep happening, the total can become one of the main reasons there is not much left later.",
              "This matters because many people only look for one big problem and miss the repeated smaller pattern.",
            ],
            takeaway:
              "Big pressure often comes from repeated small choices.",
            actionSteps: [
              "Look back at the last 7 days and circle repeated spending.",
              "Find one small habit that happens more often than you realized.",
              "Cut just one money leak first instead of trying to cut everything.",
            ],
          },
          {
            id: "check-money",
            title: "Why checking your money matters",
            shortLabel: "Avoiding it usually makes it worse",
            summary:
              "Checking your money more often usually makes it less scary over time.",
            narrative: [
              "Many people avoid checking their balance because they do not want bad news. That is understandable, but it usually makes confusion worse later.",
              "When you check more regularly, your numbers start to feel more normal and less emotionally heavy.",
              "A simple habit could be checking your bank balance and recent spending once a week. That is often enough to catch problems earlier.",
              "This is not about obsessing. It is about making sure nothing drifts too far before you notice.",
            ],
            takeaway:
              "Looking sooner is usually kinder than looking later.",
            actionSteps: [
              "Pick two days each week when you will check your balance.",
              "When you check, write down one thing you notice.",
              "Do not try to fix everything during the check. First just look clearly.",
            ],
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
              "Rent, food, and transport usually come before shopping, eating out, or extra subscriptions.",
              "This is not about saying wants are bad. It is about knowing what should come first when money is limited.",
            ],
            takeaway:
              "Cover the basics first. Then decide what matters next.",
            actionSteps: [
              "Write your top 3 needs first.",
              "Then list your wants separately.",
              "Use this split before making future spending decisions.",
            ],
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
              "For example, saving $10 every week may not look huge, but it creates a real pattern.",
              "Consistency usually changes your money life more than one dramatic effort.",
            ],
            takeaway:
              "Small and repeatable is better than big and unstable.",
            actionSteps: [
              "Pick one small amount you can save this week.",
              "Choose the exact day when it happens.",
              "Keep the amount realistic enough that you can repeat it next week too.",
            ],
          },
          {
            id: "weekly-checkin",
            title: "A weekly money check-in",
            shortLabel: "Short reviews make a big difference",
            summary:
              "A short weekly check-in can reduce month-end surprises.",
            narrative: [
              "You do not need a huge money meeting with yourself. A short review once a week is often enough.",
              "You can look at what came in, what went out, and whether anything feels off.",
              "For example, if food spending is already much higher than expected by the middle of the week, you can adjust earlier instead of panicking later.",
              "That is why short check-ins work so well. They keep small problems from becoming bigger ones.",
            ],
            takeaway:
              "A little review now can prevent a bigger problem later.",
            actionSteps: [
              "Set one weekly check-in time right now.",
              "At that check-in, review balance, recent spending, and one thing to adjust.",
              "Keep the review short so it stays repeatable.",
            ],
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
              "A more realistic plan gives you enough structure to stay in control without feeling trapped by the rules.",
              "That is what makes it more useful in real life.",
            ],
            takeaway:
              "A plan you can keep is better than a plan that looks ideal.",
            actionSteps: [
              "Keep your first plan simple enough to survive a normal week.",
              "Do not make 10 money rules at once.",
              "Choose the rule you are most likely to follow, not the one that sounds hardest.",
            ],
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
              "If food delivery is the biggest leak, start there before making ten other rules.",
              "This makes progress easier to see, and that makes it easier to stay motivated.",
            ],
            takeaway:
              "Fix the pressure point first.",
            actionSteps: [
              "Choose one area that causes the most pressure.",
              "Make one rule for that area only.",
              "Stay with that first fix before layering on new changes.",
            ],
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
              "If you know where your money went this month and you feel less confused than last month, that is real progress.",
              "Progress in money usually looks quieter than people expect.",
            ],
            takeaway:
              "Clearer is better, even before perfect.",
            actionSteps: [
              "Measure success by awareness and consistency.",
              "Notice whether money feels a little clearer this week than last week.",
              "Keep going even if the progress looks small.",
            ],
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
      "This lesson is for people who want a simpler understanding of debit cards, credit cards, interest, and credit habits.",
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
              "They can feel similar when you tap or swipe, but the money behind them works differently.",
              "If you use a debit card for a $20 purchase, the money usually comes from your own account. If you use a credit card, it creates money you owe back later.",
              "This matters because many beginners mix them together and do not realize one uses their own money while the other creates a bill.",
            ],
            takeaway:
              "Debit uses your money. Credit uses borrowed money.",
            actionSteps: [
              "Write one sentence for debit and one sentence for credit.",
              "Check which type of card you actually use most.",
              "Do not use a card casually until you know which type it is.",
            ],
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
              "For example, spending $100 on a card still means you owe that $100 back.",
              "This is the first rule beginners need to understand before anything else.",
            ],
            takeaway:
              "A credit card is borrowed money, not free money.",
            actionSteps: [
              "Say this out loud once: credit is borrowed money.",
              "Do not treat your credit limit like extra spending power.",
              "Only use credit for amounts you could already cover.",
            ],
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
              "Something that looked manageable at first may cost more than expected because extra charges keep getting added.",
              "That is why interest matters so much in real life.",
            ],
            takeaway:
              "If you carry the balance, the item usually costs more than it first looked like.",
            actionSteps: [
              "If you use credit, remind yourself that unpaid balances can grow.",
              "Pay attention to full balance, not just minimum payment.",
              "Build the habit of thinking about real total cost, not just today's purchase.",
            ],
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
              "The card should not create confusion or pressure.",
              "Charging a normal purchase and paying the full amount back on time is controlled use.",
              "Good use is about control, not volume.",
            ],
            takeaway:
              "Good use means controlled use, not heavy use.",
            actionSteps: [
              "Use your card only for spending you can explain and cover.",
              "Aim to pay on time every cycle.",
              "Keep your first rule simple so you can actually follow it.",
            ],
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
              "Using a card because checking feels too low can be a warning sign if there is no real repayment plan behind it.",
              "Card problems often build quietly before they feel urgent.",
            ],
            takeaway:
              "If the payback plan is unclear, slow down.",
            actionSteps: [
              "Pause before charging anything you do not know how to repay.",
              "Check balances instead of avoiding them.",
              "Treat unclear repayment as a warning sign.",
            ],
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
              "That matters because your score can affect future access and cost.",
              "It is not magic. It responds to behavior patterns.",
            ],
            takeaway:
              "A credit score reflects habits over time, not one perfect moment.",
            actionSteps: [
              "Think of score as habit history, not as personal value.",
              "Build better habits first instead of worrying about perfection.",
              "Stay focused on the basics: understand, control, and pay on time.",
            ],
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
              "If you could not pay for it from your bank account today, be careful about putting it on the card.",
              "This rule lowers the chance that debt builds quietly in the background.",
            ],
            takeaway:
              "Your real limit is what you can truly cover.",
            actionSteps: [
              "Adopt this as your default rule going forward.",
              "Do not let the credit limit decide what feels possible.",
              "Let your real account balance decide what is safe.",
            ],
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
            actionSteps: [
              "Set one reminder or system today.",
              "Do not rely only on memory.",
              "Make on-time payment a repeatable habit, not a hope.",
            ],
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
              "Credit should not become a mask over a bigger problem.",
              "A calmer move is to slow down and understand the pressure first.",
            ],
            takeaway:
              "Do not use credit to hide a problem you have not looked at yet.",
            actionSteps: [
              "Pause if credit starts feeling like a rescue tool.",
              "Look at the real money problem underneath first.",
              "Use clarity before credit expansion.",
            ],
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
              "Even a small amount saved can change how a surprise feels.",
              "A lot of people think saving only matters once the amount is big. That is not true.",
              "This is the emotional side of saving, and it matters just as much as the math.",
            ],
            takeaway:
              "Small savings still change how money feels.",
            actionSteps: [
              "Choose one small amount you can save this week.",
              "Decide where that savings will live.",
              "Start now instead of waiting for a perfect month.",
            ],
          },
          {
            id: "emergency-fund",
            title: "What is an emergency fund?",
            shortLabel: "Money for the unexpected",
            summary:
              "An emergency fund is money set aside for real surprises.",
            narrative: [
              "An emergency fund is money you keep for real unexpected problems, like an urgent bill, broken device, or sudden travel need.",
              "It is there to protect you from panic and rushed money choices.",
              "Without a small cushion, one surprise can force a bad decision or extra borrowing.",
              "That is why this money has a specific job.",
            ],
            takeaway:
              "Emergency money is for real pressure, not random spending.",
            actionSteps: [
              "List one realistic emergency that could happen in your life.",
              "Start a separate spot for that money if you can.",
              "Protect it from normal spending.",
            ],
          },
          {
            id: "starting-small",
            title: "Why starting small is still good",
            shortLabel: "You do not need a huge number first",
            summary:
              "Small consistent saving matters more than waiting for a perfect amount.",
            narrative: [
              "A lot of people delay saving because they think the amount is too small to matter.",
              "If you can build the habit with a smaller amount, you are already doing the hard part.",
              "A smaller amount saved every week can matter more than one big amount saved once and never repeated.",
              "That is why starting small is often the most realistic way to begin.",
            ],
            takeaway:
              "Small is not pointless if it keeps happening.",
            actionSteps: [
              "Choose consistency over size.",
              "Set a number you can repeat next week too.",
              "Judge yourself on habit, not on impressiveness.",
            ],
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
              "Starting early matters because time gives your money more room to build.",
              "A person who starts earlier with smaller amounts can sometimes end up ahead of someone who starts later with bigger amounts.",
              "That is why early action matters so much.",
              "It is not only about how much you save. It is also about when you begin.",
            ],
            takeaway:
              "Time can matter as much as size.",
            actionSteps: [
              "Do not wait for a bigger future version of yourself.",
              "Start the habit now, even if the amount is small.",
              "Let time work with you instead of against you.",
            ],
          },
          {
            id: "consistency",
            title: "Why consistency beats intensity",
            shortLabel: "Repeatable beats dramatic",
            summary:
              "A repeatable saving habit usually wins over random big efforts.",
            narrative: [
              "A lot of people save hard for one month and then stop.",
              "A smaller repeatable habit often works better because it fits real life more naturally.",
              "A simple weekly or monthly saving rule is easier to carry forward than one huge promise.",
              "Steady habits are what make saving feel normal instead of emotional.",
            ],
            takeaway:
              "Steady habits beat dramatic bursts.",
            actionSteps: [
              "Pick a rule you can live with.",
              "Repeat it on the same day or schedule.",
              "Do not confuse one intense month with a real system.",
            ],
          },
          {
            id: "long-term-view",
            title: "What long-term really means",
            shortLabel: "Think beyond next week",
            summary:
              "Long-term money decisions work better when you stop judging them by one short moment.",
            narrative: [
              "Long-term means not judging everything by this week or this month alone.",
              "A good money habit may feel quiet at first.",
              "Some good decisions do not feel exciting right away.",
              "Money often rewards patience more than speed.",
            ],
            takeaway:
              "Some of the best money habits feel quiet at first.",
            actionSteps: [
              "Stop judging progress only by this week.",
              "Notice whether the habit is becoming more normal.",
              "Give good habits enough time to matter.",
            ],
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
              "A saving rule is a simple repeatable pattern you can follow without making a fresh emotional decision every time.",
              "The amount does not need to look impressive. It needs to be realistic enough to keep using.",
              "A small weekly transfer can be stronger than saying you will save whatever is left at the end.",
              "A rule turns saving from a wish into a system.",
            ],
            takeaway:
              "A clear rule beats a vague goal.",
            actionSteps: [
              "Choose one amount.",
              "Choose one day.",
              "Turn saving into a repeated action, not a vague intention.",
            ],
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
              "The main point is to make savings feel distinct from daily spending.",
              "That small separation can make the habit feel much more real.",
            ],
            takeaway:
              "Money is easier to protect when it has a clearer home.",
            actionSteps: [
              "Decide where your savings money will live.",
              "Keep it mentally separate from spending money.",
              "Protect its job by not mixing it casually.",
            ],
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
              "If saving happens more often and with less drama, that is real progress even if the amount is still small.",
              "This way of thinking helps people keep going instead of quitting after one imperfect month.",
            ],
            takeaway:
              "A setback is not the same as starting over.",
            actionSteps: [
              "Track whether the habit happened, not whether it looked perfect.",
              "Look for steadiness from week to week.",
              "Keep going after imperfect weeks instead of resetting everything.",
            ],
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
  if (topModule === "money-101-foundations") {
    return money101Content();
  }

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