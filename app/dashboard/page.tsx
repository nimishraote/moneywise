"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import JourneyNav from "@/components/ui/journey-nav";
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
import {
  getCurrentAuthUser,
  signOutCurrentUser,
  subscribeToAuthChanges,
} from "@/lib/supabase/auth";
import { getLessonHref, moduleTitles } from "@/lib/content/lesson-content";

function StatCard({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/25 p-4">
      <div className="text-3xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [firstName, setFirstName] = useState("");
  const [progressTick, setProgressTick] = useState(0);
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  const accessResolvedRef = useRef(false);

  useEffect(() => {
    setAnswers(getStoredAssessment());
    const profile = getStoredProfile();
    if (profile?.firstName) setFirstName(profile.firstName);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadAuth() {
      try {
        const user = await getCurrentAuthUser();
        if (!mounted) return;

        accessResolvedRef.current = true;

        if (!user) {
          router.replace("/login?next=/dashboard");
          return;
        }

        setAuthEmail(user.email ?? null);
        setCheckingAccess(false);
      } catch {
        if (!mounted) return;
        accessResolvedRef.current = true;
        router.replace("/login?next=/dashboard");
      }
    }

    void loadAuth();

    const unsubscribe = subscribeToAuthChanges((user) => {
      if (!accessResolvedRef.current) return;

      if (!user) {
        setAuthEmail(null);

        if (loggingOut) {
          router.replace("/");
        }

        return;
      }

      setAuthEmail(user.email ?? null);
      setCheckingAccess(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [router, loggingOut]);

  useEffect(() => {
    function handleFocus() {
      setProgressTick((value) => value + 1);
    }

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleFocus);
    window.addEventListener("moneywise-storage-updated", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleFocus);
      window.removeEventListener("moneywise-storage-updated", handleFocus);
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

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await signOutCurrentUser();
      setAuthEmail(null);
      router.replace("/");
    } catch {
      setLoggingOut(false);
    }
  }

  if (checkingAccess) {
    return (
      <AppShell>
        <div className="min-h-screen bg-[#120f1e] px-6 py-12 text-white">
          <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/8 p-8 text-center shadow-2xl backdrop-blur md:p-10">
            Opening your dashboard...
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="dashboard" />
          <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 lg:px-14">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                  Your dashboard
                </div>
                <h1
                  className="mt-3 text-4xl font-semibold tracking-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Keep the path moving{headingName}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                  This page should make one thing clear: what to do next.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/8 p-4 text-sm text-slate-300">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                  Account
                </div>
                <div className="mt-2 text-white">{authEmail}</div>
                <button
                  onClick={handleLogout}
                  className="mt-4 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white"
                >
                  {loggingOut ? "Logging out..." : "Log out"}
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                Your next best step
              </div>

              <h2
                className="mt-3 text-3xl font-semibold tracking-tight text-white"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {moduleTitles[currentFocusModule]}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                {plan.focusAreas.find((area) => area.module === currentFocusModule)?.whyNow ||
                  plan.firstLessonReason}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href={getLessonHref(currentFocusModule)}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Continue learning
                </a>

                <a
                  href="/plan"
                  className="text-sm font-semibold text-white underline underline-offset-4"
                >
                  Review my plan
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-6">
                <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Progress snapshot
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <StatCard value={completedLessons} label="Lessons completed" />
                    <StatCard value={startedLessons} label="Lessons started" />
                    <StatCard value={completedActions} label="Actions completed" />
                    <StatCard value={totalTrackedActions} label="Actions tracked" />
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                  Your path right now
                </div>

                <div className="mt-5 space-y-4">
                  {pathModules.map((module, index) => {
                    const status = getModuleStatus(module);

                    return (
                      <div
                        key={`${module}-${index}`}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-slate-950/25 p-4"
                      >
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Step {index + 1}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-white">
                            {moduleTitles[module]}
                          </div>
                          <div className="mt-1 text-sm text-slate-400">{status}</div>
                        </div>

                        <a
                          href={getLessonHref(module)}
                          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white"
                        >
                          Open
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}