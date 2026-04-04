"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { ArrowLeft, Image as ImageIcon, TrendingUp, Wallet } from "lucide-react";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { lessonOneContent } from "@/lib/content/lesson-content";
import {
  defaultAssessmentInput,
  getStoredAssessment,
} from "@/lib/storage/moneywise-storage";
import type { AssessmentInput } from "@/lib/types/assessment";

export default function LessonOnePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  const content = useMemo(
    () => lessonOneContent[buildPersonalizedPlan(answers).recommendedPath.modules[0]],
    [answers]
  );

  const goBackToPlan = () => {
    router.push("/plan");
  };

  const goToPracticalStep = () => {
    router.push("/lesson2");
  };

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative px-6 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <button
              type="button"
              onClick={goBackToPlan}
              className="mb-6 inline-flex items-center gap-3 text-sm text-slate-300"
            >
              <ArrowLeft className="h-4 w-4" /> Back to plan
            </button>

            <div className="space-y-5">
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_42%,rgba(255,255,255,0.08)_100%)] shadow-2xl backdrop-blur">
                <div className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),linear-gradient(135deg,rgba(59,130,246,0.10)_0%,rgba(168,85,247,0.12)_55%,rgba(251,191,36,0.08)_100%)] px-6 py-8 md:px-8">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                    Step 2 of 3 - Understand the topic
                  </div>
                  <h2
                    className="mt-3 text-4xl font-semibold tracking-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {content.heroTitle}
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                    {content.heroBody}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                    This lesson gives you the foundation first. After this, we
                    will help you choose one practical next step.
                  </p>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-amber-200">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      {content.sectionOneTitle}
                    </div>
                    <div className="text-sm text-slate-400">
                      {content.sectionOneSubtitle}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  {content.sectionOneBody}
                </p>
                <div className="mt-5 flex h-40 items-center justify-center rounded-[24px] border border-dashed border-white/12 bg-slate-950/25">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <ImageIcon className="h-4 w-4" /> Foundational concept visual
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-amber-200">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      {content.sectionTwoTitle}
                    </div>
                    <div className="text-sm text-slate-400">
                      {content.sectionTwoSubtitle}
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  {content.sectionTwoBody}
                </p>
                <div className="mt-5 flex h-40 items-center justify-center rounded-[24px] border border-dashed border-white/12 bg-slate-950/25">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <ImageIcon className="h-4 w-4" /> Real-world example visual
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={goBackToPlan}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={goToPracticalStep}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Continue to practical step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}