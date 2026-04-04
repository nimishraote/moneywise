"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import JourneyNav from "@/components/ui/journey-nav";
import {
  BarChart3,
  CheckCircle2,
  Circle,
  Flame,
  Route,
  Target,
} from "lucide-react";
import { defaultAssessmentInput, getStoredAssessment } from "@/lib/storage/moneywise-storage";
import type { AssessmentInput } from "@/lib/types/assessment";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { moduleTitles } from "@/lib/content/lesson-content";

type ActionItem = {
  id: string;
  title: string;
  body: string;
};

const STORAGE_KEY = "moneywise.dashboard.actions.v1";

function getActionPlan(topModule: string): {
  headline: string;
  subhead: string;
  thisWeek: ActionItem[];
  examples: string[];
} {
  if (topModule === "money-101-foundations") {
    return {
      headline: "Your best next step is to build the real 101 first.",
      subhead:
        "Do not jump into harder topics yet. First make everyday money basics feel normal and clear.",
      thisWeek: [
        {
          id: "check-balance",
          title: "Check your bank or card balance 2 times this week",
          body:
            "This helps money feel more familiar and less abstract. Pick two days and actually look.",
        },
        {
          id: "learn-cards",
          title: "Finish the lesson on debit card versus credit card",
          body:
            "This will help you understand the difference between using your own money and borrowed money.",
        },
        {
          id: "write-rule",
          title: "Write one money rule for yourself",
          body:
            "Example: I will check my balance every Sunday night before the new week starts.",
        },
        {
          id: "save-small",
          title: "Set aside one small amount",
          body:
            "Even a very small amount is useful if it starts the habit. The goal is to begin, not to impress.",
        },
      ],
      examples: [
        "Look at your account and say out loud how much money is there right now.",
        "Explain to yourself the difference between debit and credit in one sentence.",
        "Write down one thing you spent money on this week and whether it was a need or a want.",
      ],
    };
  }

  if (topModule === "budgeting-and-cash-flow") {
    return {
      headline: "Your best next step is to understand where your money goes.",
      subhead:
        "Before trying to fix everything, build a clearer picture of spending and pressure points.",
      thisWeek: [
        {
          id: "track-three",
          title: "Track your 3 biggest spending buckets this week",
          body:
            "Examples: food, transport, subscriptions, going out. Keep it simple.",
        },
        {
          id: "check-twice",
          title: "Check your balance 2 times this week",
          body:
            "This gives you a simple money rhythm and reduces end-of-week surprises.",
        },
        {
          id: "pick-leak",
          title: "Pick one money leak to reduce",
          body:
            "Choose just one. Example: cut delivery once or pause one unused subscription.",
        },
        {
          id: "write-budget-rule",
          title: "Write one budget rule",
          body:
            "Example: rent, food, and transport come first before fun spending.",
        },
      ],
      examples: [
        "Write down how much you spent on food in the last 7 days.",
        "Circle the one spending habit that creates the most pressure.",
        "Make one small cut that you can actually repeat next week.",
      ],
    };
  }

  if (topModule === "credit-scores-and-credit-cards") {
    return {
      headline: "Your best next step is to understand how cards really work.",
      subhead:
        "The goal is not to fear cards. The goal is to understand the rules before they become expensive.",
      thisWeek: [
        {
          id: "learn-credit-basics",
          title: "Finish the lesson on cards and credit basics",
          body:
            "Focus on what borrowed money means and how interest changes the real cost.",
        },
        {
          id: "card-rule",
          title: "Write one card rule for yourself",
          body:
            "Example: I only put something on a card if I could already pay for it from my account.",
        },
        {
          id: "check-card-balance",
          title: "Check your card or account balance 2 times this week",
          body:
            "The goal is to reduce avoidance and make the numbers feel less scary.",
        },
        {
          id: "late-payment-system",
          title: "Set one reminder or system",
          body:
            "Example: weekly calendar reminder or autopay review if relevant.",
        },
      ],
      examples: [
        "Explain in one sentence what makes debit different from credit.",
        "Say what interest means in your own words.",
        "Write down the safest first rule you want to follow with cards.",
      ],
    };
  }

  if (topModule === "investing-basics-and-first-stocks") {
    return {
      headline: "Your best next step is to understand investing before using real money.",
      subhead:
        "Start with the words, the structure, and the behavior. Do not rush into buying things you do not fully understand.",
      thisWeek: [
        {
          id: "learn-stock",
          title: "Finish the lesson on stocks, funds, and markets",
          body:
            "The goal is to understand the building blocks first, not to pick investments yet.",
        },
        {
          id: "define-three",
          title: "Write down 3 definitions in your own words",
          body:
            "What is a stock? What is an index fund? What is the stock market?",
        },
        {
          id: "investing-rule",
          title: "Write your first investing rule",
          body:
            "Example: I will not buy something unless I can explain what it is in simple language.",
        },
        {
          id: "money-separation",
          title: "Separate short-term money from learning money",
          body:
            "Do not use money you may need soon for bills, rent, or emergencies.",
        },
      ],
      examples: [
        "Explain why one stock is different from a wider fund.",
        "Say why starting small matters for beginners.",
        "Write one sentence on what risk means in real life.",
      ],
    };
  }

  return {
    headline: "Your best next step is to build one simple saving habit.",
    subhead:
      "The goal is not a huge amount right away. The goal is a small rule you can keep.",
    thisWeek: [
      {
        id: "save-once",
        title: "Set aside one small amount this week",
        body:
          "The amount can be small. The main thing is to make the habit real.",
      },
      {
        id: "learn-saving",
        title: "Finish the lesson on saving basics",
        body:
          "Focus on why saving matters and how small habits help over time.",
      },
      {
        id: "saving-rule",
        title: "Write one saving rule",
        body:
          "Example: I save a small amount every Friday before weekend spending.",
      },
      {
        id: "check-money",
        title: "Check your balance 2 times this week",
        body:
          "This helps you stay aware of what is happening instead of guessing.",
      },
    ],
    examples: [
      "Pick one day of the week when saving happens.",
      "Say where your savings money will live.",
      "Write one reason saving would reduce pressure in your life.",
    ],
  };
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  const plan = useMemo(() => buildPersonalizedPlan(answers), [answers]);
  const topModule = plan.recommendedPath.modules[0];
  const nextModules = plan.recommendedPath.modules.slice(1, 4);
  const actionPlan = useMemo(() => getActionPlan(topModule), [topModule]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setChecked(JSON.parse(raw));
      }
    } catch {
      setChecked({});
    }
  }, []);

  function toggleAction(id: string) {
    setChecked((current) => {
      const next = { ...current, [id]: !current[id] };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const completedCount = actionPlan.thisWeek.filter((item) => checked[item.id]).length;
  const totalCount = actionPlan.thisWeek.length;

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="dashboard" />
          <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Your path forward
              </div>
              <div className="mt-5 overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="dashboard" short />
              </div>
              <h2
                className="mt-3 text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Keep going, but make the next steps concrete.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                This page is not just about what you finished. It is about what
                to do next, what to track, and how to keep building confidence
                from here.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                <Target className="h-4 w-4" />
                Best next step
              </div>
              <h3 className="text-2xl font-semibold text-white">
                {actionPlan.headline}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                {actionPlan.subhead}
              </p>
              <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                <div className="text-sm font-semibold text-white">
                  Current recommended learning path
                </div>
                <div className="mt-2 text-base leading-8 text-slate-200">
                  {moduleTitles[topModule]}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                  <BarChart3 className="h-4 w-4" />
                  This week
                </div>
                <div className="space-y-4">
                  <MetricCard label="Actions completed" value={`${completedCount} of ${totalCount}`} />
                  <MetricCard label="Current focus" value={moduleTitles[topModule]} />
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                  <CheckCircle2 className="h-4 w-4" />
                  Your concrete action plan
                </div>

                <div className="grid gap-4">
                  {actionPlan.thisWeek.map((item) => {
                    const isChecked = Boolean(checked[item.id]);

                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleAction(item.id)}
                        className={`rounded-[24px] border p-5 text-left transition ${
                          isChecked
                            ? "border-emerald-300/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.12)_0%,rgba(255,255,255,0.04)_100%)]"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 text-slate-200">
                            {isChecked ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {item.title}
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                  <Flame className="h-4 w-4" />
                  What this can look like in real life
                </div>
                <div className="space-y-3">
                  {actionPlan.examples.map((item) => (
                    <div
                      key={item}
                      className="rounded-[20px] border border-white/10 bg-slate-950/30 p-4 text-sm leading-7 text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                  <Route className="h-4 w-4" />
                  What comes after this
                </div>

                <div className="space-y-3">
                  <div className="rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(251,191,36,0.12)_0%,rgba(255,255,255,0.04)_100%)] p-4">
                    <div className="text-sm font-semibold text-white">
                      Now
                    </div>
                    <div className="mt-2 text-sm leading-7 text-slate-200">
                      {moduleTitles[topModule]}
                    </div>
                  </div>

                  {nextModules.map((module, index) => (
                    <div
                      key={module}
                      className="rounded-[20px] border border-white/10 bg-slate-950/30 p-4"
                    >
                      <div className="text-sm font-semibold text-white">
                        Next {index + 1}
                      </div>
                      <div className="mt-2 text-sm leading-7 text-slate-300">
                        {moduleTitles[module]}
                      </div>
                    </div>
                  ))}

                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                    The goal is not to rush through everything. The goal is to
                    make one topic feel clearer, build one useful rule, and then
                    move to the next layer.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                Simple reminder
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-300">
                Progress in money is usually not one huge breakthrough. It is a
                few smaller actions repeated until they start to feel normal.
                This page should help you leave with a real path, not just a
                record of what you already finished.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}