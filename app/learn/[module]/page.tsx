"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import JourneyNav from "@/components/ui/journey-nav";
import type { AssessmentInput } from "@/lib/types/assessment";
import type { RecommendedModule } from "@/lib/types/personalized-plan";
import {
  buildLessonActionKey,
  defaultAssessmentInput,
  getNextIncompleteModule,
  getProgressState,
  getStoredAssessment,
  isLessonCompleted,
  markLessonCompleted,
  markLessonStarted,
  setActionCompleted,
  setCurrentModule,
} from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import {
  getLearnPageContent,
  getLessonHref,
  getPersonaLead,
  isRecommendedModule,
  moduleTitles,
} from "@/lib/content/lesson-content";
import { getCurrentAuthUser, subscribeToAuthChanges } from "@/lib/supabase/auth";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
      {children}
    </div>
  );
}

export default function DynamicLearnPage() {
  const params = useParams<{ module: string }>();
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [progressTick, setProgressTick] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setAnswers(getStoredAssessment());
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadAuth() {
      try {
        const user = await getCurrentAuthUser();
        if (!mounted) return;
        setIsLoggedIn(Boolean(user));
      } catch {
        if (!mounted) return;
        setIsLoggedIn(false);
      }
    }

    void loadAuth();

    const unsubscribe = subscribeToAuthChanges((user) => {
      setIsLoggedIn(Boolean(user));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const plan = useMemo(() => buildPersonalizedPlan(answers), [answers]);

  const routeModule = typeof params?.module === "string" ? params.module : "";
  const activeModule: RecommendedModule = isRecommendedModule(routeModule)
    ? routeModule
    : plan.recommendedPath.modules[0];

  const content = useMemo(() => getLearnPageContent(activeModule), [activeModule]);

  const personaLead = useMemo(
    () => getPersonaLead(plan.persona, activeModule),
    [plan.persona, activeModule]
  );

  useEffect(() => {
    setCurrentModule(activeModule);
    markLessonStarted(activeModule);
    setProgressTick((value) => value + 1);
  }, [activeModule]);

  const progress = useMemo(() => getProgressState(), [progressTick]);

  const moduleIndex = plan.recommendedPath.modules.findIndex(
    (module) => module === activeModule
  );

  const nextModule =
    moduleIndex >= 0
      ? plan.recommendedPath.modules[moduleIndex + 1] ?? null
      : plan.recommendedPath.modules[1] ?? null;

  const recommendedCurrentModule =
    getNextIncompleteModule(plan.recommendedPath.modules) ?? plan.recommendedPath.modules[0];

  const completed = isLessonCompleted(activeModule);

  const allConcepts = content.steps.flatMap((step) => step.concepts);
  const primaryConcept = allConcepts[0];
  const supportingConcept = allConcepts[1];

  const totalActionSteps = allConcepts.reduce((count, concept) => {
    return count + (concept.actionSteps?.length ?? 0);
  }, 0);

  const completedActionSteps = allConcepts.reduce((count, concept) => {
    return (
      count +
      (concept.actionSteps?.filter((_, index) => {
        const actionKey = buildLessonActionKey(activeModule, concept.id, index);
        return Boolean(progress.actions[actionKey]);
      }).length ?? 0)
    );
  }, 0);

  function handleToggleAction(conceptId: string, actionIndex: number, checked: boolean) {
    const actionKey = buildLessonActionKey(activeModule, conceptId, actionIndex);
    setActionCompleted(actionKey, checked);
    setProgressTick((value) => value + 1);
  }

  function handleCompleteLesson() {
    markLessonCompleted(activeModule);
    setProgressTick((value) => value + 1);
  }

  function renderConceptCard(
    concept: (typeof allConcepts)[number],
    label: string
  ) {
    const actionSteps = concept.actionSteps ?? [];

    return (
      <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
          {label}
        </div>

        <h2 className="mt-3 text-2xl font-semibold text-white">{concept.title}</h2>

        <div className="mt-4 space-y-4">
          <p className="text-sm leading-8 text-slate-300">{concept.summary}</p>
          {concept.narrative.map((paragraph, index) => (
            <p key={`${concept.id}-${index}`} className="text-sm leading-8 text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-5 rounded-[24px] border border-emerald-300/15 bg-emerald-200/8 p-4 text-sm leading-7 text-emerald-100">
          <span className="font-semibold">Main takeaway: </span>
          {concept.takeaway}
        </div>

        {actionSteps.length > 0 && (
          <div className="mt-5">
            <SectionLabel>Do this now</SectionLabel>

            <div className="mt-3 space-y-3">
              {actionSteps.map((action, index) => {
                const actionKey = buildLessonActionKey(activeModule, concept.id, index);
                const checked = Boolean(progress.actions[actionKey]);

                return (
                  <button
                    key={`${concept.id}-action-${index}`}
                    onClick={() => handleToggleAction(concept.id, index, !checked)}
                    className={`w-full rounded-2xl border p-4 text-left text-sm leading-7 ${
                      checked
                        ? "border-emerald-300/20 bg-emerald-200/8 text-emerald-100"
                        : "border-white/10 bg-white/5 text-slate-200"
                    }`}
                  >
                    <span className="font-semibold">
                      {checked ? "Done: " : `${index + 1}. `}
                    </span>
                    {action}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {concept.extraReadingLabel && concept.extraReadingUrl && (
          <div className="mt-5">
            <a
              href={concept.extraReadingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-white underline underline-offset-4"
            >
              {concept.extraReadingLabel}
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="learn" />

          <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 lg:px-14">
            <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Your lesson
              </div>

              <h1
                className="mt-3 text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {moduleTitles[activeModule]}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                {content.heroBody}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/25 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Why this matters for you
                  </div>
                  <div className="mt-2 text-sm leading-7 text-slate-200">{personaLead}</div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/25 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Progress
                  </div>
                  <div className="mt-2 text-sm leading-7 text-slate-200">
                    {completedActionSteps} of {totalActionSteps} action steps completed
                  </div>
                  <div className="mt-1 text-sm leading-7 text-slate-300">
                    {completed ? "Lesson completed" : "Lesson in progress"}
                  </div>
                </div>
              </div>

              {!isLoggedIn && (
                <div className="mt-5 rounded-[24px] border border-amber-300/20 bg-amber-200/10 p-4">
                  <div className="text-sm font-semibold text-amber-200">Guest mode</div>
                  <div className="mt-2 text-sm leading-7 text-amber-50">
                    Your lesson progress is being saved on this device only for now.
                  </div>
                  <a
                    href={`/signup?next=${encodeURIComponent(`/learn/${activeModule}`)}`}
                    className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                  >
                    Create account to save progress
                  </a>
                </div>
              )}
            </div>

            {primaryConcept ? (
              <div className="mt-6">{renderConceptCard(primaryConcept, "Main idea")}</div>
            ) : null}

            {supportingConcept ? (
              <div className="mt-6">
                {renderConceptCard(supportingConcept, "One more useful concept")}
              </div>
            ) : null}

            <div className="mt-6 sticky bottom-4 z-10">
              <div className="rounded-[24px] border border-white/10 bg-[#171327]/95 p-4 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Keep the path moving
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      Finish this lesson, then go to the next step.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCompleteLesson}
                      className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      {completed ? "Completed" : "Mark completed"}
                    </button>

                    <a
                      href={nextModule ? getLessonHref(nextModule) : "/dashboard"}
                      className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                    >
                      {nextModule ? "Go to next lesson" : "Go to dashboard"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-20" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}