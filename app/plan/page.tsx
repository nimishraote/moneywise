"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
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

export default function PlanPage() {
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [firstName, setFirstName] = useState("");
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
  const accountHref = `/signup?next=${encodeURIComponent("/plan")}`;

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="plan" />

          <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 lg:px-14">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
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

                <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">
                  We picked one strong starting point based on your answers.
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

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href={startLessonHref}
                      className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                    >
                      Continue learning
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
                        className="text-sm font-semibold text-white underline underline-offset-4"
                      >
                        Create account to save
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-5 text-sm leading-7 text-slate-300">
                  {isLoggedIn ? (
                    <span>
                      Saved to your account{authEmail ? `, ${authEmail}` : ""}.
                    </span>
                  ) : (
                    <span>
                      Saved on this device only for now.{" "}
                      <a
                        href={accountHref}
                        className="font-semibold text-white underline underline-offset-4"
                      >
                        Create an account
                      </a>{" "}
                      if you want to keep your plan and progress across visits.
                    </span>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#161226] min-h-[320px] lg:min-h-full">
                <div
                  className="relative h-full min-h-[320px] w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=2400&q=80')",
                  }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,24,0.06)_0%,rgba(13,10,24,0.20)_38%,rgba(13,10,24,0.52)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="max-w-xl rounded-[24px] border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                        Personal direction
                      </div>
                      <div
                        className="mt-2 text-2xl font-semibold tracking-tight text-white"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Start with one useful next step
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                Your top next moves
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
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

              <div className="mt-6">
                <a
                  href={startLessonHref}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                >
                  Continue learning
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}