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
import { moduleTitles } from "@/lib/content/lesson-content";

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

  useEffect(() => {
    setAnswers(getStoredAssessment());
    const profile = getStoredProfile();
    if (profile?.firstName) setFirstName(profile.firstName);
  }, []);

  const plan: PersonalizedPlan = useMemo(
    () => buildPersonalizedPlan(answers),
    [answers]
  );

  const headingName = firstName ? `, ${firstName}` : "";
  const recommendedTopModule = plan.recommendedPath.modules[0];
  const recommendedTopModuleTitle = moduleTitles[recommendedTopModule];

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
      answers.paycheckStatus ||
      answers.confidenceLevel ||
      answers.emotionalStates.length > 0 ||
      answers.helpAreas.length > 0 ||
      (answers.freeTextGoal ?? "").trim().length > 0;

    if (hasEnoughInput) loadSummary();

    return () => {
      cancelled = true;
    };
  }, [answers, recommendedTopModule, recommendedTopModuleTitle]);

  const summaryTitle = aiSummary?.title || plan.encouragement.title;
  const summaryParagraphOne = aiSummary?.paragraphOne || plan.encouragement.body;
  const summaryParagraphTwo = aiSummary?.paragraphTwo || plan.focus.body;

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="plan" />
          <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Your starting plan
              </div>
              <div className="mt-5 overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="plan" short />
              </div>
              <h2
                className="mt-3 text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                A calmer place to start{headingName}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                This page brings together the main readout, your focus areas, and
                the next steps in one place.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                  Your main takeaway
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {summaryTitle}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {summaryParagraphOne}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {summaryParagraphTwo}
                </p>
                {summaryLoading && (
                  <div className="mt-4 text-sm text-slate-400">
                    Personalizing your summary...
                  </div>
                )}
              </div>

              <div className="rounded-[30px] border border-white/10 bg-slate-950/35 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                  Focus areas
                </div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                    {plan.focus.title}
                  </div>
                  {plan.recommendedPath.modules.slice(0, 2).map((module) => (
                    <div
                      key={module}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                    >
                      {moduleTitles[module]}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Your next 3 steps
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    One compact section instead of several disconnected cards
                  </div>
                </div>
                <a
                  href="/lesson1"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Start first lesson
                </a>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                  <div className="text-sm font-semibold text-white">
                    1. Track one month
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Just observe. Do not try to optimize yet.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                  <div className="text-sm font-semibold text-white">
                    2. Set one savings rule
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Pick a small amount you can repeat without failing.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                  <div className="text-sm font-semibold text-white">
                    3. Learn one concept
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Start with credit, budgeting, or emergency funds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}