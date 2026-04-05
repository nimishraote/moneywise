"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
import JourneyNav from "@/components/ui/journey-nav";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import type { AssessmentInput } from "@/lib/types/assessment";
import type { PersonalizedPlan, RecommendedModule } from "@/lib/types/personalized-plan";
import {
  defaultAssessmentInput,
  getCompletedLessonCount,
  getNextIncompleteModule,
  getProgressState,
  getStartedLessonCount,
  getStoredAssessment,
  getStoredProfile,
} from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { getLessonHref, moduleTitles } from "@/lib/content/lesson-content";

export default function DashboardPage() {
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [firstName, setFirstName] = useState("");
  const [progressTick, setProgressTick] = useState(0);

  useEffect(() => {
    setAnswers(getStoredAssessment());
    const profile = getStoredProfile();
    if (profile?.firstName) setFirstName(profile.firstName);
  }, []);

  useEffect(() => {
    function handleFocus() {
      setProgressTick((value) => value + 1);
    }

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleFocus);
    };
  }, []);

  const plan: PersonalizedPlan = useMemo(() => buildPersonalizedPlan(answers), [answers]);

  const progress = useMemo(() => getProgressState(), [progressTick]);
  const headingName = firstName ? `, ${firstName}` : "";
  const pathModules = plan.recommendedPath.modules.slice(0, 5);

  const currentFocusModule: RecommendedModule =
    getNextIncompleteModule(pathModules) ?? pathModules[0];

  const completedLessons = getCompletedLessonCount(pathModules);
  const startedLessons = getStartedLessonCount(pathModules);

  const totalTrackedActions = Object.keys(progress.actions).length;
  const completedActions = Object.values(progress.actions).filter(Boolean).length;

  function getModuleStatus(module: RecommendedModule) {
    const lesson = progress.lessons[module];

    if (lesson?.completedAt) return "Completed";
    if (lesson?.startedAt) return "In progress";
    if (module === currentFocusModule) return "Up next";
    return "Not started";
  }

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
                This page should now reflect where you really are in the path, not just what the app first recommended.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                    Your current focus
                  </div>
                  <h2
                    className="mt-3 text-2xl font-semibold tracking-tight text-white"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {moduleTitles[currentFocusModule]}
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-slate-300">
                    {plan.focusAreas.find((area) => area.module === currentFocusModule)?.whyNow ||
                      plan.firstLessonReason}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={getLessonHref(currentFocusModule)}
                      className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      Continue with current focus
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
                    Your learning path right now
                  </div>
                  <div className="mt-5 space-y-4">
                    {pathModules.map((module, index) => {
                      const status = getModuleStatus(module);

                      return (
                        <div
                          key={`${module}-${index}`}
                          className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm font-semibold text-white">
                                {index + 1}. {moduleTitles[module]}
                              </div>
                              <p className="mt-3 text-sm leading-7 text-slate-300">
                                {plan.focusAreas.find((area) => area.module === module)?.whyNow ||
                                  "This remains part of your recommended learning path."}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                                {status}
                              </div>
                              <a
                                href={getLessonHref(module)}
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white"
                              >
                                Open
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
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
              </div>

              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                    Progress snapshot
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[22px] border border-white/10 bg-slate-950/30 p-4">
                      <div className="text-sm text-slate-400">Lessons started</div>
                      <div className="mt-2 text-3xl font-semibold text-white">
                        {startedLessons} / {pathModules.length}
                      </div>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-slate-950/30 p-4">
                      <div className="text-sm text-slate-400">Lessons completed</div>
                      <div className="mt-2 text-3xl font-semibold text-white">
                        {completedLessons} / {pathModules.length}
                      </div>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-slate-950/30 p-4">
                      <div className="text-sm text-slate-400">Action steps completed</div>
                      <div className="mt-2 text-3xl font-semibold text-white">
                        {completedActions}
                        <span className="ml-2 text-base font-medium text-slate-400">
                          {totalTrackedActions > 0 ? `/ ${totalTrackedActions}` : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Practical next actions
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

                <section className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Helpful flow
                  </div>
                  <p className="mt-4 text-sm leading-8 text-slate-300">
                    Your dashboard should now remember your path.
                    <br />
                    Start or continue the current focus.
                    <br />
                    Mark lesson actions as you do them.
                    <br />
                    Complete the lesson.
                    <br />
                    Then return here for the next step.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={getLessonHref(currentFocusModule)}
                      className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      Back to current lesson
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