"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
import JourneyNav from "@/components/ui/journey-nav";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import type { AssessmentInput } from "@/lib/types/assessment";
import type { PersonalizedPlan } from "@/lib/types/personalized-plan";
import {
  defaultAssessmentInput,
  getStoredAssessment,
  getStoredProfile,
} from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { moduleTitles } from "@/lib/content/lesson-content";

export default function DashboardPage() {
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    setAnswers(getStoredAssessment());
    const profile = getStoredProfile();
    if (profile?.firstName) setFirstName(profile.firstName);
  }, []);

  const plan: PersonalizedPlan = useMemo(() => buildPersonalizedPlan(answers), [answers]);

  const topModule = plan.recommendedPath.modules[0];
  const nextModules = plan.recommendedPath.modules.slice(1, 4);
  const headingName = firstName ? `, ${firstName}` : "";

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="dashboard" />
          <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Your dashboard
              </div>
              <div className="mt-5 overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="dashboard" short />
              </div>
              <h1
                className="mt-4 text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your progress and next best steps{headingName}
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-300">
                This should feel like the place where your plan turns into momentum.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                    Your current starting point
                  </div>
                  <h2
                    className="mt-3 text-2xl font-semibold tracking-tight text-white"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {moduleTitles[topModule]}
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-slate-300">
                    {plan.firstLessonReason}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="/lesson1"
                      className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      Continue learning
                    </a>
                    <a
                      href="/plan"
                      className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                    >
                      Review my plan
                    </a>
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    What should come next
                  </div>
                  <div className="mt-5 space-y-4">
                    {nextModules.map((module, index) => (
                      <div
                        key={`${module}-${index}`}
                        className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                      >
                        <div className="text-sm font-semibold text-white">
                          {index + 2}. {moduleTitles[module]}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {plan.focusAreas.find((area) => area.module === module)?.whyNow ||
                            "This is one of the next strongest topics for your situation."}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                    Actions to keep moving
                  </div>
                  <div className="mt-5 space-y-4">
                    {plan.immediateActions.map((action, index) => (
                      <div
                        key={`${action}-${index}`}
                        className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                      >
                        <div className="text-sm font-semibold text-white">
                          {index + 1}. {action}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    What you are already doing well
                  </div>
                  <div className="mt-4 space-y-3">
                    {plan.strengths.map((strength) => (
                      <div
                        key={strength}
                        className="rounded-[22px] border border-white/10 bg-slate-950/30 p-4 text-sm leading-7 text-slate-200"
                      >
                        {strength}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                    Your learning path right now
                  </div>
                  <div className="mt-4 space-y-3">
                    {plan.recommendedPath.modules.slice(0, 5).map((module, index) => (
                      <div
                        key={`${module}-${index}`}
                        className={`rounded-[22px] border p-4 text-sm leading-7 ${
                          index === 0
                            ? "border-amber-300/20 bg-amber-200/8 text-amber-100"
                            : "border-white/10 bg-slate-950/30 text-slate-200"
                        }`}
                      >
                        <span className="font-semibold">
                          {index + 1}. {moduleTitles[module]}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Helpful flow
                  </div>
                  <p className="mt-4 text-sm leading-8 text-slate-300">
                    A simple pattern for now is:
                    <br />
                    review your plan,
                    <br />
                    finish the first lesson,
                    <br />
                    return here,
                    <br />
                    then move to the next topic.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="/lesson1"
                      className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      Back to lesson
                    </a>
                    <a
                      href="/plan"
                      className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                    >
                      Back to plan
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}