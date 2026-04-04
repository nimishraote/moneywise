"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import JourneyNav from "@/components/ui/journey-nav";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { getLearnPageContent } from "@/lib/content/lesson-content";
import {
  defaultAssessmentInput,
  getStoredAssessment,
} from "@/lib/storage/moneywise-storage";
import type { AssessmentInput } from "@/lib/types/assessment";

export default function LessonOnePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [openConcepts, setOpenConcepts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  const plan = useMemo(() => buildPersonalizedPlan(answers), [answers]);
  const content = useMemo(
    () => getLearnPageContent(plan.recommendedPath.modules[0], plan.persona),
    [plan]
  );

  function toggleConcept(id: string) {
    setOpenConcepts((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,146,60,0.10),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="learn" />
          <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Learn
              </div>
              <div className="mt-5 overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="lesson" short />
              </div>
              <h2
                className="mt-3 text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {content.heroTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {content.heroBody}
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/plan")}
              className="mb-6 inline-flex items-center gap-3 text-sm text-slate-300"
            >
              <ArrowLeft className="h-4 w-4" /> Back to plan
            </button>

            <div className="space-y-8">
              {content.steps.map((step, stepIndex) => (
                <div
                  key={step.id}
                  className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/15 bg-[linear-gradient(135deg,rgba(250,204,21,0.16)_0%,rgba(196,181,253,0.10)_100%)] text-amber-200">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {step.title}
                      </div>
                      <div className="text-sm text-slate-400">
                        Part {stepIndex + 1} of {content.steps.length}
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-base leading-8 text-slate-300">
                    {step.intro}
                  </p>

                  <div className="mt-6 space-y-4">
                    {step.concepts.map((concept) => {
                      const isOpen = Boolean(openConcepts[concept.id]);

                      return (
                        <div
                          key={concept.id}
                          className="rounded-[24px] border border-white/10 bg-slate-950/30"
                        >
                          <button
                            onClick={() => toggleConcept(concept.id)}
                            className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
                          >
                            <div>
                              <div className="text-lg font-semibold text-white">
                                {concept.title}
                              </div>
                              <div className="mt-1 text-sm text-amber-100">
                                {concept.shortLabel}
                              </div>
                              <div className="mt-2 text-sm leading-7 text-slate-300">
                                {concept.summary}
                              </div>
                            </div>

                            <div className="mt-1 text-slate-300">
                              {isOpen ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="border-t border-white/10 px-5 py-5">
                              <div className="grid gap-4">
                                <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">
                                    What it is
                                  </div>
                                  <div className="mt-2 text-sm leading-7 text-slate-300">
                                    {concept.detailBody}
                                  </div>
                                </div>

                                <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">
                                    Why it matters
                                  </div>
                                  <div className="mt-2 text-sm leading-7 text-slate-300">
                                    {concept.whyItMatters}
                                  </div>
                                </div>

                                <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">
                                    Simple example
                                  </div>
                                  <div className="mt-2 text-sm leading-7 text-slate-300">
                                    {concept.example}
                                  </div>
                                </div>

                                <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">
                                    What beginners get wrong
                                  </div>
                                  <div className="mt-2 text-sm leading-7 text-slate-300">
                                    {concept.beginnerMistake}
                                  </div>
                                </div>

                                <div className="rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(251,191,36,0.12)_0%,rgba(255,255,255,0.05)_100%)] p-4">
                                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">
                                    Rule to remember
                                  </div>
                                  <div className="mt-2 text-sm leading-7 text-slate-100">
                                    {concept.ruleToRemember}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/plan")}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Go to progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}