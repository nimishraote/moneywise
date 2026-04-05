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
          <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                    Your starting plan
                  </div>
                  <h2
                    className="mt-3 text-4xl font-semibold tracking-tight"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    A more personal place to start{headingName}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    This plan should reflect your real situation, not a generic beginner path.
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/8 p-4 text-sm text-slate-300">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                    Save status
                  </div>
                  <div className="mt-2 text-white">
                    {isLoggedIn ? "Saved to your account" : "Saved on this device only"}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    {isLoggedIn
                      ? authEmail || "Your progress can follow you when you come back."
                      : "Create an account if you want this plan and progress to stay with you later."}
                  </div>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="plan" short />
              </div>
            </div>

            {!isLoggedIn && (
              <div className="mb-6 rounded-[28px] border border-amber-300/20 bg-amber-200/10 p-5 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                      Guest mode
                    </div>
                    <div className="mt-2 max-w-2xl text-sm leading-7 text-amber-50">
                      You can keep learning as a guest, but your plan and progress are only saved on this device for now.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={accountHref}
                      className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      Create account
                    </a>
                    <a
                      href={loginHref}
                      className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                Your main takeaway and best place to start
              </div>

              <h3 className="mt-3 text-2xl font-semibold text-white">{summaryTitle}</h3>

              <p className="mt-4 text-sm leading-8 text-slate-300">{summaryParagraphOne}</p>

              <p className="mt-4 text-sm leading-8 text-slate-300">{summaryParagraphTwo}</p>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                <div className="text-sm font-semibold text-white">Best place to start now</div>
                <div className="mt-2 text-base leading-8 text-slate-200">
                  {recommendedTopModuleTitle}
                </div>
                <p className="mt-3 text-sm leading-8 text-slate-300">
                  {plan.firstLessonReason}
                </p>
              </div>

              {summaryLoading && (
                <div className="mt-4 text-sm text-slate-400">Personalizing your summary...</div>
              )}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                  Your top focus areas
                </div>
                <div className="mt-5 space-y-4">
                  {plan.focusAreas.map((area, index) => (
                    <div
                      key={`${area.title}-${index}`}
                      className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-sm font-semibold text-white">
                          {index + 1}. {area.title}
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                          Priority
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{area.whyNow}</p>
                      <div className="mt-3 rounded-2xl border border-amber-300/15 bg-amber-200/8 p-4 text-sm leading-7 text-amber-100">
                        <span className="font-semibold text-amber-200">Action now: </span>
                        {area.actionNow}
                      </div>
                    </div>
                  ))}
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
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                        Your next 3 actions
                      </div>
                      <div className="mt-2 text-sm text-slate-400">
                        These should be small enough to do, not just admire.
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={startLessonHref}
                        className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                      >
                        Start learning
                      </a>

                      {isLoggedIn ? (
                        <a
                          href="/dashboard"
                          className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                        >
                          Go to dashboard
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

                  {!isLoggedIn && (
                    <div className="mt-5 rounded-[22px] border border-white/10 bg-slate-950/20 p-4 text-sm leading-7 text-slate-300">
                      You can start learning right away as a guest. When you are ready, create an account to keep your progress across visits.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}