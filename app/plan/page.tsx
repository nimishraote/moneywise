"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import JourneyNav from "@/components/ui/journey-nav";
import type { AssessmentInput } from "@/lib/types/assessment";
import type { PersonalizedPlan } from "@/lib/types/personalized-plan";
import {
  defaultAssessmentInput,
  getStoredAssessment,
  getStoredProfile,
} from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { getLessonHref, moduleTitles } from "@/lib/content/lesson-content";
import { getCurrentAuthUser, subscribeToAuthChanges } from "@/lib/supabase/auth";

type AiSummary = {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
};

function SmallInfoCard({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-slate-950/25 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-sm leading-7 text-slate-200">{text}</div>
    </div>
  );
}

export default function PlanPage() {
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [firstName, setFirstName] = useState("");
  const [aiSummary, setAiSummary] = useState<AiSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [authEmail, setAuthEmail] = useState<string | null>(null);

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
        setIsLoggedIn(Boolean(user));
        setAuthEmail(user?.email ?? null);
      } catch {
        if (!mounted) return;
        setIsLoggedIn(false);
        setAuthEmail(null);
      }
    }

    void loadAuth();

    const unsubscribe = subscribeToAuthChanges((user) => {
      setIsLoggedIn(Boolean(user));
      setAuthEmail(user?.email ?? null);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const plan: PersonalizedPlan = useMemo(() => buildPersonalizedPlan(answers), [answers]);

  const headingName = firstName ? `, ${firstName}` : "";
  const recommendedTopModule = plan.recommendedPath.modules[0];
  const recommendedTopModuleTitle = moduleTitles[recommendedTopModule];
  const startLessonHref = getLessonHref(recommendedTopModule);

  useEffect(() => {
    let cancelled = false;

    async function loadSummary() {
      setSummaryLoading(true);

      try {
        const profile = getStoredProfile();
        const response = await fetch("/api/plan-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assessment: answers,
            profile: { firstName: profile?.firstName ?? "" },
            recommendedModule: recommendedTopModule,
            recommendedModuleTitle: recommendedTopModuleTitle,
          }),
        });

        if (!response.ok) throw new Error("Failed to generate summary");

        const data = await response.json();
        if (!cancelled && data?.summary) {
          setAiSummary(data.summary);
        }
      } catch {
        if (!cancelled) setAiSummary(null);
      } finally {
        if (!cancelled) setSummaryLoading(false);
      }
    }

    const hasEnoughInput =
      answers.lifeStage ||
      answers.ageRange ||
      answers.livingSituation ||
      answers.primaryMoneySource ||
      answers.incomePattern ||
      answers.endOfMonthSituation ||
      answers.mainSpendingCategory ||
      answers.hasCreditCard ||
      answers.moneyCheckFrequency ||
      answers.moneyHabitStyle ||
      answers.stressLevel ||
      answers.confidenceLevel ||
      answers.basicsStocks ||
      answers.basicsIndexFunds ||
      answers.basicsStockMarket ||
      answers.basicsInterest ||
      answers.basicsCredit ||
      answers.basicsBudgeting ||
      answers.topPriority.length > 0;

    if (hasEnoughInput) {
      void loadSummary();
    }

    return () => {
      cancelled = true;
    };
  }, [answers, recommendedTopModule, recommendedTopModuleTitle]);

  const summaryTitle = aiSummary?.title || plan.encouragement.title;
  const summaryParagraphOne = aiSummary?.paragraphOne || plan.snapshot.body;
  const summaryParagraphTwo = aiSummary?.paragraphTwo || plan.focus.body;

  const accountHref = `/signup?next=${encodeURIComponent("/plan")}`;
  const loginHref = `/login?next=${encodeURIComponent("/plan")}`;

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="plan" />
          <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 lg:px-14">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                  Your starting plan
                </div>

                <h1
                  className="mt-3 text-4xl font-semibold tracking-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  A clearer place to start{headingName}
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                  This plan uses your answers to choose one strong starting point, a few practical next moves, and the areas that matter most right now.
                </p>

                <div className="mt-6 rounded-[26px] border border-white/10 bg-slate-950/30 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                    Best place to start now
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-white">
                    {recommendedTopModuleTitle}
                  </div>
                  <p className="mt-3 text-sm leading-8 text-slate-300">
                    {plan.firstLessonReason}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={startLessonHref}
                      className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      {isLoggedIn ? "Continue learning" : "Start learning"}
                    </a>

                    {isLoggedIn ? (
                      <a
                        href="/dashboard"
                        className="text-sm font-semibold text-white underline underline-offset-4"
                      >
                        View dashboard
                      </a>
                    ) : (
                      <a
                        href={accountHref}
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                      >
                        Create account to save
                      </a>
                    )}
                  </div>
                </div>

                {!isLoggedIn && (
                  <div className="mt-5 rounded-[24px] border border-amber-300/20 bg-amber-200/10 p-4">
                    <div className="text-sm font-semibold text-amber-200">Guest mode</div>
                    <div className="mt-2 text-sm leading-7 text-amber-50">
                      Your plan is saved on this device only for now. Create an account if you want to keep it across visits.
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={accountHref}
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                      >
                        Create account
                      </a>
                      <a
                        href={loginHref}
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">Saved to your account</div>
                    <div className="mt-2 text-sm leading-7 text-slate-300">
                      {authEmail || "Your plan and progress can follow you when you come back."}
                    </div>
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="plan" short={false} />
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                    What we noticed
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{summaryTitle}</h2>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <SmallInfoCard label="Snapshot" text={summaryParagraphOne} />
                    <SmallInfoCard label="Why this matters" text={summaryParagraphTwo} />
                  </div>

                  {summaryLoading && (
                    <div className="mt-4 text-sm text-slate-400">Personalizing your summary...</div>
                  )}
                </div>

                <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                        Your next 3 actions
                      </div>
                      <div className="mt-2 text-sm text-slate-400">
                        Small enough to actually do this week
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {plan.immediateActions.map((action, index) => (
                      <div
                        key={action}
                        className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                      >
                        <div className="text-sm font-semibold text-white">
                          {index + 1}. {action}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Top focus areas
                  </div>

                  <div className="mt-5 space-y-4">
                    {plan.focusAreas.slice(0, 2).map((area, index) => (
                      <div
                        key={`${area.title}-${index}`}
                        className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                      >
                        <div className="text-sm font-semibold text-white">
                          {index + 1}. {area.title}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{area.whyNow}</p>
                        <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-200/8 p-4 text-sm leading-7 text-amber-100">
                          <span className="font-semibold text-amber-200">Action now: </span>
                          {area.actionNow}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
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
                </div>

                <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Path preview
                  </div>
                  <div className="mt-5 space-y-3">
                    {plan.recommendedPath.modules.slice(0, 4).map((module, index) => (
                      <div
                        key={`${module}-${index}`}
                        className="rounded-[22px] border border-white/10 bg-slate-950/30 p-4"
                      >
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Step {index + 1}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          {moduleTitles[module]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}