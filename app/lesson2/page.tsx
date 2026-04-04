"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import JourneyNav from "@/components/ui/journey-nav";
import { ArrowLeft, CheckCircle2, ShieldCheck, Target } from "lucide-react";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { getLessonTwoContent } from "@/lib/content/lesson-content";
import {
  defaultAssessmentInput,
  getStoredAssessment,
} from "@/lib/storage/moneywise-storage";
import type { AssessmentInput } from "@/lib/types/assessment";

function ActionCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm leading-7 text-slate-300">{body}</p>
    </div>
  );
}

export default function LessonTwoPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  const plan = useMemo(() => buildPersonalizedPlan(answers), [answers]);
  const content = useMemo(
    () => getLessonTwoContent(plan.recommendedPath.modules[0], plan.persona),
    [plan]
  );

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.16),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,146,60,0.10),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="learn" />
          <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Practical step
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
              onClick={() => router.push("/lesson1")}
              className="mb-6 inline-flex items-center gap-3 text-sm text-slate-300"
            >
              <ArrowLeft className="h-4 w-4" /> Back to lesson
            </button>

            <div className="space-y-5">
              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/15 bg-[linear-gradient(135deg,rgba(250,204,21,0.16)_0%,rgba(196,181,253,0.10)_100%)] text-amber-200">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      {content.actionSectionTitle}
                    </div>
                    <div className="text-sm text-slate-400">
                      Keep it small and repeatable
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {content.actions.map((action) => (
                    <ActionCard
                      key={action.title}
                      title={action.title}
                      body={action.body}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <ShieldCheck className="h-4 w-4 text-amber-200" />
                      Rule to remember
                    </div>
                    <p className="text-sm leading-7 text-slate-300">
                      {content.ruleToRemember}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                      <CheckCircle2 className="h-4 w-4 text-amber-200" />
                      What success looks like
                    </div>
                    <p className="text-sm leading-7 text-slate-300">
                      {content.successLooksLike}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/lesson1")}
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