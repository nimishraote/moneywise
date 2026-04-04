"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { Brain, GraduationCap, PiggyBank } from "lucide-react";

type OnboardingStep = {
  eyebrow: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  supportTitle?: string;
  supportBody?: string;
};

const steps: OnboardingStep[] = [
  {
    eyebrow: "Who this is for",
    title: "MoneyWise is for young adults who want a better start with money.",
    body:
      "We understand how overwhelming money can feel early in life. You are expected to make decisions about spending, saving, rent, debt, and the future before anyone has really taught you how. This app is meant to make that feel clearer, calmer, and more manageable.",
    icon: GraduationCap,
    supportTitle: "You are not behind.",
    supportBody:
      "If money has felt confusing, stressful, or easy to avoid, that does not mean you are failing. It usually means nobody explained it in a way that felt simple and usable.",
  },
  {
    eyebrow: "Why starting early matters",
    title: "Small money habits built early can make a big difference later.",
    body:
      "A little clarity now can reduce stress, help you avoid expensive mistakes, and give you more control over adult life. You do not need to have everything figured out. You just need to start before life gets more expensive and more complex.",
    icon: PiggyBank,
    supportTitle: "Start small, but start now.",
    supportBody:
      "You do not need a perfect plan or a high income to begin. Even a few better decisions early on can create more stability and less pressure later.",
  },
  {
    eyebrow: "How this works",
    title: "We will learn about you first, then guide you step by step.",
    body:
      "This will be quick and simple. First we understand where you are. Then we use that input to shape something more personal and more useful than generic money advice.",
    icon: Brain,
  },
];

const flowSteps = [
  {
    step: "01",
    title: "Short assessment",
    body: "A few simple questions so the app understands your stage of life and what feels hard right now.",
    classes:
      "border-violet-200/20 bg-[linear-gradient(135deg,rgba(196,181,253,0.22)_0%,rgba(167,139,250,0.10)_100%)]",
  },
  {
    step: "02",
    title: "AI analysis",
    body: "The app looks for patterns in your answers and identifies what support would be most useful first.",
    classes:
      "border-violet-200/18 bg-[linear-gradient(135deg,rgba(167,139,250,0.20)_0%,rgba(139,92,246,0.10)_100%)]",
  },
  {
    step: "03",
    title: "Personalized plan",
    body: "You get a starting plan shaped around your situation, not a one-size-fits-all article.",
    classes:
      "border-violet-200/16 bg-[linear-gradient(135deg,rgba(139,92,246,0.18)_0%,rgba(124,58,237,0.10)_100%)]",
  },
  {
    step: "04",
    title: "Lessons and tracking",
    body: "You move into practical lessons and simple progress tools you can build on over time.",
    classes:
      "border-violet-200/14 bg-[linear-gradient(135deg,rgba(124,58,237,0.16)_0%,rgba(109,40,217,0.10)_100%)]",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(79,70,229,0.12),_transparent_24%)]" />

        <div className="relative px-5 py-4 md:px-8 md:py-5">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index <= step ? "bg-white" : "bg-white/15"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(31,24,58,0.96)_0%,rgba(22,19,40,0.96)_100%)] p-6 md:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-violet-100">
                  {current.eyebrow}
                </div>

                <h2 className="mt-4 max-w-5xl text-[44px] font-semibold leading-[0.98] tracking-tight text-white md:text-[52px]">
                  {current.title}
                </h2>

                <p className="mt-4 max-w-5xl text-[17px] leading-8 text-slate-300 md:text-[18px]">
                  {current.body}
                </p>

                {step < 2 && current.supportTitle && current.supportBody && (
                  <div className="mt-5 rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(196,181,253,0.05)_100%)] p-5">
                    <div className="text-[20px] font-semibold text-white">{current.supportTitle}</div>
                    <div className="mt-2 max-w-4xl text-[15px] leading-7 text-slate-300">
                      {current.supportBody}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-5 space-y-3">
                    {flowSteps.map((item) => (
                      <div
                        key={item.step}
                        className={`rounded-[20px] border px-5 py-4 ${item.classes}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="min-w-[44px] rounded-xl bg-white/12 px-2 py-1 text-center text-xs font-semibold tracking-[0.18em] text-white">
                            {item.step}
                          </div>
                          <div>
                            <div className="text-[17px] font-semibold text-white">{item.title}</div>
                            <div className="mt-1 text-[14px] leading-6 text-slate-200">
                              {item.body}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between">
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