"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Landmark, Lock, MessageCircleMore, X } from "lucide-react";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { lessonTwoChoices } from "@/lib/content/lesson-content";
import {
  defaultAssessmentInput,
  getStoredAssessment,
} from "@/lib/storage/moneywise-storage";
import type { AssessmentInput } from "@/lib/types/assessment";

type ChoiceKey = "goal" | "amount" | "compare" | null;

export default function LessonTwoPage() {
  const [helperOpen, setHelperOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<ChoiceKey>(null);
  const [answers, setAnswers] = useState<AssessmentInput>(
    defaultAssessmentInput
  );

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  const content = useMemo(
    () => lessonTwoChoices[buildPersonalizedPlan(answers).recommendedPath.modules[0]],
    [answers]
  );

  const selectedDetail = selectedChoice ? content.details[selectedChoice] : null;

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#14233f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.20),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.12),_transparent_24%)]" />
        <div className="relative px-6 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <a href="/lesson1" className="mb-6 inline-flex items-center gap-3 text-sm text-slate-200">
              <ArrowLeft className="h-4 w-4" /> Back to lesson 1
            </a>

            <div className="space-y-5">
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.05)_42%,rgba(255,255,255,0.10)_100%)] shadow-2xl backdrop-blur">
                <div className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_30%),linear-gradient(135deg,rgba(96,165,250,0.14)_0%,rgba(59,130,246,0.10)_55%,rgba(37,99,235,0.12)_100%)] px-6 py-8 md:px-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-blue-100">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
                    Step 3 of 3 - Take one practical action
                  </div>
                  <h2
                    className="mt-3 text-4xl font-semibold tracking-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {content.heroTitle}
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
                    {content.heroBody}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                    You have the context now. Pick the next move that feels most
                    useful and most realistic right now.
                  </p>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-slate-950/30 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-sm font-semibold text-slate-200">
                  Start with one of these
                </div>

                <div className="mt-5 grid gap-4">
                  {content.options.map((item) => {
                    const active = selectedChoice === item.key;

                    return (
                      <button
                        key={item.key}
                        onClick={() => setSelectedChoice(item.key)}
                        className={`w-full rounded-2xl border px-5 py-5 text-left transition ${
                          active
                            ? "border-blue-300/40 bg-[linear-gradient(135deg,rgba(191,219,254,0.16)_0%,rgba(96,165,250,0.10)_100%)] ring-1 ring-blue-200/30"
                            : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] hover:bg-white/10"
                        }`}
                      >
                        <div className="text-lg font-semibold text-white">
                          {item.title}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-slate-300">
                          {item.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDetail && (
                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0%,rgba(96,165,250,0.06)_100%)] p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-100">
                        {selectedDetail.title}
                      </div>
                      <div className="mt-1 text-sm text-slate-300">
                        {selectedDetail.subtitle}
                      </div>
                    </div>
                    <Lock className="h-5 w-5 text-slate-300" />
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {selectedDetail.examples.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-3xl border border-white/10 bg-slate-950/30 p-5"
                      >
                        <div className="font-semibold text-white">
                          {item.name}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-300">
                          {item.note}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[24px] border border-blue-200/15 bg-blue-200/10 p-4 text-sm leading-7 text-blue-50">
                    Educational use only. Any banks, rates, accounts, or
                    financial products shown are informational examples only and
                    not financial advice or endorsements.
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <a
                  href="/lesson1"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                >
                  Back
                </a>

                <a
                  href="/plan"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Back to plan
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none fixed bottom-8 right-8 z-30">
          <button
            onClick={() => setHelperOpen(true)}
            className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950 shadow-2xl"
            aria-label="Open AI help"
          >
            <MessageCircleMore className="h-7 w-7" />
          </button>
        </div>

        <AnimatePresence>
          {helperOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="w-full max-w-lg rounded-[30px] border border-white/10 bg-[#18132a] p-6 text-white shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold">
                      What else do you want help with?
                    </div>
                    <div className="mt-2 text-sm leading-7 text-slate-300">
                      This can later become an AI follow-up space for simpler
                      explanations and practical questions.
                    </div>
                  </div>
                  <button
                    onClick={() => setHelperOpen(false)}
                    className="rounded-full bg-white/10 p-2 text-slate-200"
                    aria-label="Close dialog"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 space-y-2">
                  {[
                    "Explain this in simpler words",
                    "How much should I save if I am a student?",
                    "Show me what to compare in a savings account",
                  ].map((item) => (
                    <div
                      key={item}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setHelperOpen(false)}
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}