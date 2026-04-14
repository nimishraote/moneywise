"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { Brain, GraduationCap, PiggyBank } from "lucide-react";

type OnboardingStep = {
  eyebrow: string;
  title: string;
  lead: string;
  supportTitle?: string;
  supportBody?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const steps: OnboardingStep[] = [
  {
    eyebrow: "Who this is for",
    title: "MoneyWise is for young adults who want a better start with money.",
    lead:
      "Money can feel heavy early in life because people expect you to make decisions before anyone teaches you the basics clearly. This app is here to make that feel simpler, calmer, and more manageable.",
    supportTitle: "You are not behind.",
    supportBody:
      "If money has felt confusing or stressful, that usually means nobody explained it in a way that felt usable.",
    icon: GraduationCap,
  },
  {
    eyebrow: "Why starting early matters",
    title: "Small money habits built early can change a lot later.",
    lead:
      "You do not need to have everything figured out. You just need a better starting point before life gets more expensive and more complex. A little clarity now can reduce stress later and help you avoid expensive mistakes.",
    supportTitle: "Start small, but start now.",
    supportBody:
      "You do not need a perfect plan or a high income. You only need a few habits that make life easier over time.",
    icon: PiggyBank,
  },
  {
    eyebrow: "How this works",
    title: "We learn about you first, then guide you step by step.",
    lead:
      "The flow is quick and simple. We use a short check-in to shape something more personal than a generic money article.",
    icon: Brain,
  },
];

const flowSteps = [
  {
    step: "01",
    title: "Short assessment",
    body: "A few simple questions so the app understands your stage of life and what feels hard right now.",
  },
  {
    step: "02",
    title: "Personal analysis",
    body: "We look for patterns in your answers and identify what would help first.",
  },
  {
    step: "03",
    title: "Starting plan",
    body: "You get a clearer place to begin based on your real situation.",
  },
  {
    step: "04",
    title: "Lessons and progress",
    body: "You move into practical lessons and simple progress tools you can build on over time.",
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,146,60,0.08),_transparent_24%)]" />

        <div className="relative px-5 py-8 md:px-8 md:py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index <= step
                      ? "bg-[linear-gradient(90deg,#fde68a_0%,#ffffff_45%,#c4b5fd_100%)]"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/6 p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(25,20,45,0.96)_0%,rgba(18,15,34,0.96)_100%)] p-6 md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-white/5 text-amber-100">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="mt-5 inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-amber-100">
                  {current.eyebrow}
                </div>

                <h2 className="mt-5 max-w-5xl text-[40px] font-semibold leading-[1.04] tracking-tight text-white md:text-[54px]">
                  {current.title}
                </h2>

                <p className="mt-6 max-w-4xl text-[18px] leading-9 text-slate-300">
                  {current.lead}
                </p>

                {step < 2 && current.supportTitle && current.supportBody && (
                  <div className="mt-8 rounded-[24px] border border-white/15 bg-white/5 p-6">
                    <div className="text-[18px] font-semibold text-white">
                      {current.supportTitle}
                    </div>
                    <div className="mt-3 max-w-4xl text-[16px] leading-8 text-slate-300">
                      {current.supportBody}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-8 rounded-[24px] border border-white/15 bg-white/5 p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {flowSteps.map((item) => (
                        <div
                          key={item.step}
                          className="rounded-[20px] border border-white/10 bg-slate-950/25 p-5"
                        >
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                            {item.step}
                          </div>
                          <div className="mt-2 text-[20px] font-semibold text-white">
                            {item.title}
                          </div>
                          <div className="mt-2 text-[15px] leading-7 text-slate-300">
                            {item.body}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
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