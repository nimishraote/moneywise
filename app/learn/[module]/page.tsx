"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import JourneyNav from "@/components/ui/journey-nav";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import type { AssessmentInput } from "@/lib/types/assessment";
import type { RecommendedModule } from "@/lib/types/personalized-plan";
import {
  defaultAssessmentInput,
  getStoredAssessment,
} from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import {
  getLearnPageContent,
  getLessonHref,
  getPersonaLead,
  isRecommendedModule,
  moduleTitles,
} from "@/lib/content/lesson-content";

export default function DynamicLearnPage() {
  const params = useParams<{ module: string }>();
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);

  useEffect(() => {
    setAnswers(getStoredAssessment());
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

  const moduleIndex = plan.recommendedPath.modules.findIndex(
    (module) => module === activeModule
  );
  const nextModule =
    moduleIndex >= 0
      ? plan.recommendedPath.modules[moduleIndex + 1] ?? null
      : plan.recommendedPath.modules[1] ?? null;

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="learn" />
          <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Your lesson
              </div>
              <div className="mt-5 overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="lesson" short />
              </div>
              <h1
                className="mt-4 text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {moduleTitles[activeModule]}
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {content.heroBody}
              </p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                Why this lesson matters for you
              </div>
              <p className="mt-4 text-sm leading-8 text-slate-300">{personaLead}</p>
              <p className="mt-4 text-sm leading-8 text-slate-300">
                {moduleIndex === 0
                  ? plan.firstLessonReason
                  : plan.focusAreas.find((area) => area.module === activeModule)?.whyNow ||
                    "This is one of the next strongest topics for your situation right now."}
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {content.steps.map((step) => (
                <section
                  key={step.id}
                  className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                    {step.title}
                  </div>
                  <p className="mt-3 text-sm leading-8 text-slate-300">
                    {step.intro}
                  </p>

                  <div className="mt-6 space-y-5">
                    {step.concepts.map((concept) => (
                      <div
                        key={concept.id}
                        className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5"
                      >
                        <div className="text-lg font-semibold text-white">
                          {concept.title}
                        </div>
                        <div className="mt-1 text-sm text-violet-200">
                          {concept.shortLabel}
                        </div>
                        <p className="mt-3 text-sm leading-8 text-slate-300">
                          {concept.summary}
                        </p>

                        <div className="mt-4 space-y-3">
                          {concept.narrative.map((paragraph, index) => (
                            <p
                              key={`${concept.id}-${index}`}
                              className="text-sm leading-8 text-slate-300"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        <div className="mt-4 rounded-2xl border border-emerald-300/15 bg-emerald-200/8 p-4 text-sm leading-7 text-emerald-100">
                          <span className="font-semibold text-emerald-200">
                            Main takeaway:{" "}
                          </span>
                          {concept.takeaway}
                        </div>

                        {concept.actionSteps && concept.actionSteps.length > 0 && (
                          <div className="mt-4">
                            <div className="text-sm font-semibold text-white">
                              Try this now
                            </div>
                            <div className="mt-3 space-y-3">
                              {concept.actionSteps.map((action, index) => (
                                <div
                                  key={`${concept.id}-action-${index}`}
                                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200"
                                >
                                  {index + 1}. {action}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {concept.extraReadingUrl && concept.extraReadingLabel && (
                          <div className="mt-4">
                            <a
                              href={concept.extraReadingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-semibold text-amber-200 underline underline-offset-4"
                            >
                              {concept.extraReadingLabel}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-6 rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                What comes after this
              </div>
              <h2
                className="mt-3 text-2xl font-semibold tracking-tight text-white"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Keep the learning path moving
              </h2>
              <p className="mt-4 text-sm leading-8 text-slate-300">
                This lesson should feed into your broader path. Go to the dashboard to
                review progress, or continue to the next recommended topic.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                  <div className="text-sm font-semibold text-white">Next best place to go</div>
                  <div className="mt-2 text-base leading-8 text-slate-200">
                    Your dashboard
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Review your full path, your priority topics, and what to do next.
                  </p>
                  <a
                    href="/dashboard"
                    className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                  >
                    Go to dashboard
                  </a>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
                  <div className="text-sm font-semibold text-white">Continue learning</div>
                  <div className="mt-2 text-base leading-8 text-slate-200">
                    {nextModule ? moduleTitles[nextModule] : "Review your full plan"}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {nextModule
                      ? "Move directly to the next recommended lesson in your path."
                      : "You have reached the end of the current recommended path. Review your plan again."}
                  </p>
                  <a
                    href={nextModule ? getLessonHref(nextModule) : "/plan"}
                    className="mt-5 inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                  >
                    {nextModule ? "Go to next lesson" : "Review my plan again"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}