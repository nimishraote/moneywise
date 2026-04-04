"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { Check, Circle, Square } from "lucide-react";
import type { AssessmentInput } from "@/lib/types/assessment";
import {
  defaultAssessmentInput,
  getStoredAssessment,
  saveAssessment,
} from "@/lib/storage/moneywise-storage";

type SingleQuestionConfig = {
  key: keyof Pick<
    AssessmentInput,
    "lifeStage" | "ageRange" | "paycheckStatus" | "confidenceLevel"
  >;
  label: string;
  type: "single";
  options: string[];
};

type MultiQuestionConfig = {
  key: keyof Pick<AssessmentInput, "emotionalStates" | "helpAreas">;
  label: string;
  type: "multi";
  options: string[];
};

type TextQuestionConfig = {
  key: "freeTextGoal";
  label: string;
  type: "text";
  placeholder: string;
  helper: string;
};

type QuestionConfig =
  | SingleQuestionConfig
  | MultiQuestionConfig
  | TextQuestionConfig;

type AssessmentStep = {
  section: string;
  progress: number;
  questions: QuestionConfig[];
};

const assessmentSteps: AssessmentStep[] = [
  {
    section: "About you",
    progress: 25,
    questions: [
      {
        key: "lifeStage",
        label: "Which best describes you right now?",
        type: "single",
        options: [
          "Pre-college / high school",
          "College student",
          "Recent graduate",
          "Early-career working professional",
          "Other",
        ],
      },
      {
        key: "ageRange",
        label: "How old are you?",
        type: "single",
        options: ["14 to 18", "18 to 21", "22 to 25", "26 to 30"],
      },
    ],
  },
  {
    section: "Money right now",
    progress: 50,
    questions: [
      {
        key: "paycheckStatus",
        label: "How would you describe your money situation right now?",
        type: "single",
        options: [
          "I earn money and it feels tight month to month",
          "I earn some money but it is inconsistent",
          "I am not earning regularly right now",
          "I am mostly supported by parents or family",
          "I am not sure how to describe it",
        ],
      },
      {
        key: "confidenceLevel",
        label: "How confident do you feel with money today?",
        type: "single",
        options: ["Very low", "Low", "Somewhat confident", "Fairly confident"],
      },
    ],
  },
  {
    section: "How it feels",
    progress: 75,
    questions: [
      {
        key: "emotionalStates",
        label: "Which of these feel true for you right now?",
        type: "multi",
        options: [
          "I think about money but feel confused",
          "I feel stressed about money",
          "I am trying, but I do not know where to start",
          "I have some basics, but want to get better",
        ],
      },
    ],
  },
  {
    section: "What you want help with",
    progress: 100,
    questions: [
      {
        key: "helpAreas",
        label: "What do you most want help with right now?",
        type: "multi",
        options: [
          "Saving money",
          "Budgeting",
          "Understanding credit",
          "Learning to invest",
        ],
      },
      {
        key: "freeTextGoal",
        label: "What would you most like to change over the next few months?",
        type: "text",
        placeholder:
          "Example: I want to stop stressing before rent and finally build some savings.",
        helper:
          "One or two sentences is enough. This helps the app make the plan feel more personal.",
      },
    ],
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentInput>(
    defaultAssessmentInput
  );
  const step = assessmentSteps[stepIndex];

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  useEffect(() => {
    saveAssessment(answers);
  }, [answers]);

  function handleBack() {
    if (stepIndex === 0) {
      router.push("/onboarding");
      return;
    }
    setStepIndex((v) => v - 1);
  }

  function handleContinue() {
    if (stepIndex === assessmentSteps.length - 1) {
      router.push("/plan");
      return;
    }
    setStepIndex((v) => v + 1);
  }

  function toggleSingle(key: SingleQuestionConfig["key"], value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function toggleMulti(key: MultiQuestionConfig["key"], value: string) {
    setAnswers((current) => {
      const currentValues = current[key] as string[];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...current, [key]: nextValues };
    });
  }

  const canContinue = useMemo(() => {
    return step.questions.every((question) => {
      if (question.type === "single") return Boolean(answers[question.key]);
      if (question.type === "multi")
        return (answers[question.key] as string[]).length > 0;
      if (question.type === "text") return Boolean(answers[question.key]?.trim());
      return false;
    });
  }, [answers, step.questions]);

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative px-6 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <h2
              className="text-4xl font-semibold tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              A few quick questions before we build your starting plan.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
              These questions help the app understand your stage of life, what
              feels hard right now, and what kind of help will be most useful
              first.
            </p>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#c084fc_0%,#60a5fa_50%,#f59e0b_100%)]"
                style={{ width: `${step.progress}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
              <span>{step.section}</span>
              <span>{stepIndex + 1} of {assessmentSteps.length}</span>
            </div>

            <div className="mt-8 rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="space-y-5">
                {step.questions.map((question) => (
                  <div
                    key={question.label}
                    className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-lg font-medium text-white">
                        {question.label}
                      </div>

                      {question.type === "single" && (
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                          Choose one
                        </div>
                      )}

                      {question.type === "multi" && (
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                          Choose all that fit
                        </div>
                      )}
                    </div>

                    {question.type === "single" && (
                      <div className="mt-4 grid gap-3">
                        {question.options.map((option) => {
                          const active = answers[question.key] === option;

                          return (
                            <button
                              key={option}
                              onClick={() => toggleSingle(question.key, option)}
                              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                                active
                                  ? "bg-white text-slate-950"
                                  : "bg-white/5 text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Circle
                                  className={`h-4 w-4 ${
                                    active
                                      ? "fill-slate-950 text-slate-950"
                                      : "text-slate-400"
                                  }`}
                                />
                                <span>{option}</span>
                              </div>
                              {active && <Check className="h-4 w-4" />}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {question.type === "multi" && (
                      <div className="mt-4 grid gap-3">
                        {question.options.map((option) => {
                          const active = (
                            answers[question.key] as string[]
                          ).includes(option);

                          return (
                            <button
                              key={option}
                              onClick={() => toggleMulti(question.key, option)}
                              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                                active
                                  ? "bg-white text-slate-950"
                                  : "bg-white/5 text-slate-200 ring-1 ring-white/10 hover:bg-white/10"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Square
                                  className={`h-4 w-4 ${
                                    active
                                      ? "fill-slate-950 text-slate-950"
                                      : "text-slate-400"
                                  }`}
                                />
                                <span>{option}</span>
                              </div>
                              {active && <Check className="h-4 w-4" />}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {question.type === "text" && (
                      <div className="mt-4">
                        <textarea
                          value={answers[question.key]}
                          onChange={(event) =>
                            setAnswers((current) => ({
                              ...current,
                              [question.key]: event.target.value,
                            }))
                          }
                          placeholder={question.placeholder}
                          rows={4}
                          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-200 placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
                        />
                        <div className="mt-2 text-sm leading-6 text-slate-400">
                          {question.helper}
                        </div>
                      </div>
                    )}
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
                  {stepIndex === assessmentSteps.length - 1
                    ? "See my plan"
                    : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}