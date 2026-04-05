"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { Brain, GraduationCap, PiggyBank } from "lucide-react";

type OnboardingStep = {
  eyebrow: string;
  title: string;
  lead: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  supportTitle?: string;
  supportBody?: string;
};

const steps: OnboardingStep[] = [
  {
    eyebrow: "Who this is for",
    title: "MoneyWise is for young adults who want a better start with money.",
    lead:
      "Money can feel heavy early in life because people expect you to make decisions before anyone teaches you the basics clearly.",
    points: [
      "You may be trying to figure out spending, saving, credit, rent, or future choices all at once.",
      "This app is meant to make that feel simpler, calmer, and more manageable.",
    ],
    icon: GraduationCap,
    supportTitle: "You are not behind.",
    supportBody:
      "If money has felt confusing or stressful, that usually means nobody explained it in a way that felt usable.",
  },
  {
    eyebrow: "Why starting early matters",
    title: "Small money habits built early can change a lot later.",
    lead:
      "You do not need to have everything figured out. You just need a better starting point before life gets more expensive and more complex.",
    points: [
      "A little clarity now can reduce stress later.",
      "A few better decisions early can help you avoid expensive mistakes.",
    ],
    icon: PiggyBank,
    supportTitle: "Start small, but start now.",
    supportBody:
      "You do not need a perfect plan or a high income. You only need a few habits that make life easier over time.",
  },
  {
    eyebrow: "How this works",
    title: "We learn about you first, then guide you step by step.",
    lead:
      "The flow is quick and simple. We use a short check-in to shape something more personal than a generic money article.",
    points: [
      "No long forms",
      "No complicated finance language",
      "A better place to begin, based on your real situation",
    ],
    icon: Brain,
  },
];

const flowSteps = [
  {
    step: "01",
    title: "Short assessment",
    body: "A few simple questions so the app understands your stage of life and what feels hard right now.",
    classes:
      "border-white/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.22)_0%,rgba(196,181,253,0.12)_100%)]",
  },
  {
    step: "02",
    title: "AI analysis",
    body: "The app looks for patterns in your answers and identifies what support would help first.",
    classes:
      "border-white/20 bg-[linear-gradient(135deg,rgba(192,132,252,0.22)_0%,rgba(96,165,250,0.10)_100%)]",
  },
  {
    step: "03",
    title: "Personal plan",
    body: "You get a starting plan shaped around your situation, not one-size-fits-all advice.",
    classes:
      "border-white/20 bg-[linear-gradient(135deg,rgba(251,146,60,0.18)_0%,rgba(168,85,247,0.10)_100%)]",
  },
  {
    step: "04",
    title: "Lessons and progress",
    body: "You move into practical lessons and simple progress tools you can build on over time.",
    classes:
      "border-white/20 bg-[linear-gradient(135deg,rgba(250,204,21,0.16)_0%,rgba(59,130,246,0.10)_100%)]",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const current = steps[step];
  const Icon = current.icon;

  function handleBack() {
    if (step === 0) {
      router.push("/");
      return;
    }
    setStep((v) => v - 1);
  }

  function handleNext() {
    if (step === steps.length - 1) {
      router.push("/assessment");
      return;
    }
    setStep((v) => v + 1);
  }

  return (
    <AppShell footerDark>
      <div className="relative overflow-hidden bg-[#141127] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,146,60,0.10),_transparent_24%)]" />

        <div className="relative px-5 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index <= step
                      ? "bg-[linear-gradient(90deg,#fde68a_0%,#ffffff_40%,#c4b5fd_100%)]"
                      : "bg-white/15"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-[32px] border border-amber-200/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(31,24,58,0.96)_0%,rgba(22,19,40,0.96)_100%)] p-6 md:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-[linear-gradient(135deg,rgba(250,204,21,0.16)_0%,rgba(196,181,253,0.12)_100%)] text-amber-100">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="mt-4 inline-flex rounded-full border border-amber-200/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.20)_0%,rgba(168,85,247,0.10)_100%)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-amber-100">
                  {current.eyebrow}
                </div>

                <h2 className="mt-4 max-w-5xl text-[40px] font-semibold leading-[1.02] tracking-tight text-white md:text-[48px]">
                  {current.title}
                </h2>

                <p className="mt-4 max-w-4xl text-[17px] leading-8 text-slate-300">
                  {current.lead}
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {current.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-[15px] leading-7 text-slate-200"
                    >
                      {point}
                    </div>
                  ))}
                </div>

                {step < 2 && current.supportTitle && current.supportBody && (
                  <div className="mt-5 rounded-[22px] border border-copper-200/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(251,146,60,0.06)_50%,rgba(196,181,253,0.05)_100%)] p-5">
                    <div className="text-[20px] font-semibold text-white">{current.supportTitle}</div>
                    <div className="mt-2 max-w-4xl text-[15px] leading-7 text-slate-300">
                      {current.supportBody}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {flowSteps.map((item) => (
                      <div
                        key={item.step}
                        className={`rounded-[20px] border px-5 py-4 ${item.classes}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="min-w-[48px] rounded-xl bg-white/12 px-2 py-1 text-center text-xs font-semibold tracking-[0.18em] text-white">
                            {item.step}
                          </div>
                          <div>
                            <div className="text-[17px] font-semibold text-white">{item.title}</div>
                            <div className="mt-1 text-[14px] leading-6 text-slate-100/90">
                              {item.body}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                  >
                    {step === steps.length - 1 ? "Start assessment" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}