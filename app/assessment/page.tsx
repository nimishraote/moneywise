"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import JourneyNav from "@/components/ui/journey-nav";
import { Check } from "lucide-react";
import type { AssessmentInput } from "@/lib/types/assessment";
import {
  defaultAssessmentInput,
  getStoredAssessment,
  saveAssessment,
} from "@/lib/storage/moneywise-storage";
import { getCurrentAuthUser, subscribeToAuthChanges } from "@/lib/supabase/auth";

type SingleQuestionConfig = {
  key: Exclude<keyof AssessmentInput, "topPriority">;
  label: string;
  options: string[];
  type?: "single";
};

type MultiQuestionConfig = {
  key: "topPriority";
  label: string;
  options: string[];
  type: "multi";
};

type QuestionConfig = SingleQuestionConfig | MultiQuestionConfig;

type AssessmentStep = {
  section: string;
  progress: number;
  questions: QuestionConfig[];
};

function ChoiceButton({
  active,
  option,
  onClick,
  multi = false,
}: {
  active: boolean;
  option: string;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
        active
          ? "bg-white text-slate-950"
          : "bg-white/5 text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-4 w-4 border ${
            active ? "border-slate-950 bg-slate-950" : "border-slate-500"
          } ${multi ? "rounded-sm" : "rounded-full"}`}
        />
        <span>{option}</span>
      </div>
      {active && <Check className="h-4 w-4" />}
    </button>
  );
}

function FinishPrompt({
  open,
  onClose,
  onContinueGuest,
  onSignup,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onContinueGuest: () => void;
  onSignup: () => void;
  onLogin: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-[28px] border border-white/10 bg-[#171327] p-6 text-white shadow-2xl md:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
          Save your progress
        </div>

        <h2
          className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Your plan is ready
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
          You can keep going as a guest, or create an account to save your plan and progress.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={onSignup}
            className="w-full rounded-2xl bg-white px-5 py-4 text-left text-sm font-semibold text-slate-950"
          >
            Create account
            <div className="mt-1 text-xs font-normal text-slate-600">
              Best if you want to save this and come back later
            </div>
          </button>

          <button
            onClick={onLogin}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm font-semibold text-white"
          >
            Log in
            <div className="mt-1 text-xs font-normal text-slate-400">
              Pick up from an existing account
            </div>
          </button>

          <button
            onClick={onContinueGuest}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-5 py-4 text-left text-sm font-semibold text-slate-200"
          >
            Continue as guest
            <div className="mt-1 text-xs font-normal text-slate-400">
              Your progress will stay on this device for now
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-slate-400 underline underline-offset-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function getPriorityOptions(input: AssessmentInput): string[] {
  const isTeen =
    input.lifeStage === "Pre-college / high school" ||
    input.ageRange === "14 to 17";

  const isStudent =
    input.lifeStage === "College student" ||
    input.lifeStage === "Mostly supported by family";

  if (isTeen) {
    return [
      "Learning the basic 101 of money",
      "Bank accounts and debit cards",
      "Budgeting and spending control",
      "Saving money",
      "Credit cards and how they work",
      "How investing works in very simple terms",
    ];
  }

  if (isStudent) {
    return [
      "Learning the basic 101 of money",
      "Budgeting and spending control",
      "Saving money",
      "Credit cards and how they work",
      "Emergency fund basics",
      "How investing works in very simple terms",
    ];
  }

  return [
    "Learning the basic 101 of money",
    "Budgeting and spending control",
    "Saving money",
    "Credit cards and how they work",
    "Debt and repayment basics",
    "Emergency fund basics",
    "How investing works in very simple terms",
    "Paychecks, taxes, and first-job money basics",
  ];
}

function getAssessmentSteps(input: AssessmentInput): AssessmentStep[] {
  const baseStep: AssessmentStep = {
    section: "About you",
    progress: 20,
    questions: [
      {
        key: "lifeStage",
        label: "Which best describes you right now?",
        options: [
          "Pre-college / high school",
          "College student",
          "Working full time",
          "Working part time",
          "Between jobs",
          "Mostly supported by family",
        ],
      },
      {
        key: "ageRange",
        label: "How old are you?",
        options: ["14 to 17", "18 to 21", "22 to 25", "26 to 30"],
      },
      {
        key: "livingSituation",
        label: "Where do you live right now?",
        options: [
          "With family",
          "Dorm or campus housing",
          "With roommates",
          "Alone",
          "Other",
        ],
      },
    ],
  };

  const isStudent =
    input.lifeStage === "Pre-college / high school" ||
    input.lifeStage === "College student" ||
    input.lifeStage === "Mostly supported by family";

  const moneyStep: AssessmentStep = isStudent
    ? {
        section: "Your money situation",
        progress: 40,
        questions: [
          {
            key: "primaryMoneySource",
            label: "Where does your money mostly come from?",
            options: [
              "Parents or family",
              "Part-time work",
              "Part-time work and family support",
              "Other",
            ],
          },
          {
            key: "endOfMonthSituation",
            label: "Do you usually have money left by the end of the month?",
            options: [
              "Yes, usually",
              "Sometimes",
              "Rarely",
              "I am not sure",
            ],
          },
          {
            key: "mainSpendingCategory",
            label: "What do you spend most on right now?",
            options: [
              "Food",
              "Clothes",
              "Going out",
              "Subscriptions",
              "Transport",
              "Other",
            ],
          },
          {
            key: "hasCreditCard",
            label: "Which of these have you used?",
            options: [
              "Debit card only",
              "Credit card only",
              "Both debit card and credit card",
              "Neither",
              "I am not sure how they work",
            ],
          },
        ],
      }
    : {
        section: "Your money situation",
        progress: 40,
        questions: [
          {
            key: "incomePattern",
            label: "How do you get paid right now?",
            options: [
              "Regular paycheck",
              "Irregular income",
              "Both",
              "Not earning right now",
            ],
          },
          {
            key: "endOfMonthSituation",
            label: "Which sounds most like you?",
            options: [
              "I usually have enough left",
              "I usually run low before the month ends",
              "I often do not know where my money went",
              "I am not sure",
            ],
          },
          {
            key: "hasCreditCard",
            label: "Which of these have you used?",
            options: [
              "Debit card only",
              "Credit card and I understand it fairly well",
              "Credit card but I am not fully sure how it works",
              "Both debit card and credit card",
              "Neither",
            ],
          },
          {
            key: "primaryMoneySource",
            label: "What best describes your current situation?",
            options: [
              "Mainly salary or wages",
              "Mostly family support",
              "A mix of work and support",
              "Other",
            ],
          },
        ],
      };

  const behaviorStep: AssessmentStep = {
    section: "Habits and stress",
    progress: 60,
    questions: [
      {
        key: "moneyCheckFrequency",
        label: "How often do you check your bank balance, card balance, or spending?",
        options: ["Often", "Sometimes", "Rarely", "I avoid it"],
      },
      {
        key: "moneyHabitStyle",
        label: "Which sounds most like you?",
        options: [
          "I spend first and think later",
          "I try to save but it is inconsistent",
          "I am careful but confused",
          "I want to improve but do not know where to start",
        ],
      },
      {
        key: "stressLevel",
        label: "How stressed do you feel about money?",
        options: [
          "Very stressed",
          "Somewhat stressed",
          "A little stressed",
          "Not very stressed",
        ],
      },
      {
        key: "confidenceLevel",
        label: "How confident do you feel making money decisions?",
        options: [
          "Very low",
          "Low",
          "Somewhat confident",
          "Fairly confident",
        ],
      },
    ],
  };

  const knowledgeStep: AssessmentStep = {
    section: "What basics do you already know?",
    progress: 80,
    questions: [
      {
        key: "basicsStocks",
        label: "Do you know what a stock is?",
        options: ["Yes, clearly", "A little", "No"],
      },
      {
        key: "basicsIndexFunds",
        label: "Do you know what an index fund is?",
        options: ["Yes, clearly", "A little", "No"],
      },
      {
        key: "basicsStockMarket",
        label: "Do you know how the stock market works at a basic level?",
        options: ["Yes, clearly", "A little", "No"],
      },
      {
        key: "basicsInterest",
        label: "Do you know what interest means?",
        options: ["Yes, clearly", "A little", "No"],
      },
      {
        key: "basicsCredit",
        label: "Do you know how debit cards and credit cards work?",
        options: ["Yes, clearly", "A little", "No"],
      },
      {
        key: "basicsBudgeting",
        label: "Do you know what budgeting means in practice?",
        options: ["Yes, clearly", "A little", "No"],
      },
    ],
  };

  const priorityStep: AssessmentStep = {
    section: "What do you want help with most?",
    progress: 100,
    questions: [
      {
        key: "topPriority",
        label: "Pick all the areas you want help with right now.",
        options: getPriorityOptions(input),
        type: "multi",
      },
    ],
  };

  return [baseStep, moneyStep, behaviorStep, knowledgeStep, priorityStep];
}

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showFinishPrompt, setShowFinishPrompt] = useState(false);

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  useEffect(() => {
    saveAssessment(answers);
  }, [answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

  useEffect(() => {
    let mounted = true;

    async function loadAuth() {
      try {
        const user = await getCurrentAuthUser();
        if (!mounted) return;
        setIsLoggedIn(Boolean(user));
      } catch {
        if (!mounted) return;
        setIsLoggedIn(false);
      }
    }

    void loadAuth();

    const unsubscribe = subscribeToAuthChanges((user) => {
      setIsLoggedIn(Boolean(user));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const steps = useMemo(() => getAssessmentSteps(answers), [answers]);
  const step = steps[stepIndex];

  function setAnswer(key: Exclude<keyof AssessmentInput, "topPriority">, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function togglePriority(value: string) {
    setAnswers((current) => {
      const exists = current.topPriority.includes(value);
      return {
        ...current,
        topPriority: exists
          ? current.topPriority.filter((item) => item !== value)
          : [...current.topPriority, value],
      };
    });
  }

  function handleBack() {
    if (stepIndex === 0) {
      router.push("/onboarding");
      return;
    }
    setStepIndex((current) => current - 1);
  }

  function handleContinueGuest() {
    setShowFinishPrompt(false);
    router.push("/plan");
  }

  function handleCreateAccount() {
    setShowFinishPrompt(false);
    router.push("/signup?next=/plan");
  }

  function handleLogin() {
    setShowFinishPrompt(false);
    router.push("/login?next=/plan");
  }

  function handleContinue() {
    if (stepIndex === steps.length - 1) {
      if (isLoggedIn) {
        router.push("/plan");
        return;
      }

      setShowFinishPrompt(true);
      return;
    }

    setStepIndex((current) => current + 1);
  }

  const canContinue = step.questions.every((question) => {
    if (question.type === "multi") {
      return answers.topPriority.length > 0;
    }
    return Boolean(answers[question.key]);
  });

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="assessment" />
          <div className="px-6 py-8 md:px-10 lg:px-14">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                  Quick assessment
                </div>
                <h2
                  className="mt-3 text-4xl font-semibold tracking-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  A few quick questions before we build your starting plan
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  No typing needed. Just pick what sounds most like you.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-200">
                      {step.section}
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      Step {stepIndex + 1} of {steps.length}
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                    About 2 minutes
                  </div>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#c084fc_0%,#60a5fa_50%,#f59e0b_100%)]"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  {step.questions.map((question) => (
                    <div
                      key={question.key}
                      className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-base font-medium text-white">
                          {question.label}
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                          {question.type === "multi" ? "Choose all that fit" : "Choose one"}
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        {question.options.map((option) => {
                          const active =
                            question.type === "multi"
                              ? answers.topPriority.includes(option)
                              : answers[question.key] === option;

                          return (
                            <ChoiceButton
                              key={option}
                              option={option}
                              active={active}
                              multi={question.type === "multi"}
                              onClick={() =>
                                question.type === "multi"
                                  ? togglePriority(option)
                                  : setAnswer(question.key, option)
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className={`rounded-full px-5 py-3 text-sm font-semibold ${
                      canContinue
                        ? "bg-white text-slate-950"
                        : "cursor-not-allowed bg-white/20 text-white/60"
                    }`}
                  >
                    {stepIndex === steps.length - 1 ? "See my plan" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <FinishPrompt
            open={showFinishPrompt}
            onClose={() => setShowFinishPrompt(false)}
            onContinueGuest={handleContinueGuest}
            onSignup={handleCreateAccount}
            onLogin={handleLogin}
          />
        </div>
      </div>
    </AppShell>
  );
}