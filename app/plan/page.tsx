"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
import { CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import type { AssessmentInput } from "@/lib/types/assessment";
import type { PersonalizedPlan } from "@/lib/types/personalized-plan";
import { defaultAssessmentInput, getStoredAssessment, getStoredProfile } from "@/lib/storage/moneywise-storage";
import { buildPersonalizedPlan } from "@/lib/personalization/build-plan";
import { moduleTitles } from "@/lib/content/lesson-content";

export default function PlanPage() {
  const [answers, setAnswers] = useState<AssessmentInput>(defaultAssessmentInput);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    setAnswers(getStoredAssessment());
    const profile = getStoredProfile();
    if (profile?.firstName) setFirstName(profile.firstName);
  }, []);

  const plan: PersonalizedPlan = useMemo(() => buildPersonalizedPlan(answers), [answers]);
  const headingName = firstName ? `, ${firstName}` : "";

  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative px-6 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl font-semibold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>Your starting plan{headingName}</h2>
            <div className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_42%,rgba(255,255,255,0.08)_100%)] shadow-2xl backdrop-blur"><div className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),linear-gradient(135deg,rgba(59,130,246,0.10)_0%,rgba(168,85,247,0.12)_55%,rgba(251,191,36,0.08)_100%)] px-6 py-8 md:px-8"><div className="flex items-start gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15"><Sparkles className="h-6 w-6 text-amber-200" /></div><div><div className="text-3xl font-semibold">{plan.encouragement.title}</div><p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">{plan.encouragement.body}</p><p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{plan.focus.body}</p></div></div></div></div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="flex min-h-[360px] flex-col rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8"><div className="text-sm font-semibold text-slate-200">What you are already doing well</div><div className="mt-5 space-y-4">{plan.strengths.map((item) => <div key={item} className="flex gap-3 text-sm leading-7 text-slate-200"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-200" /><span>{item}</span></div>)}</div><div className="mt-auto rounded-[24px] bg-slate-950/35 p-5"><div className="text-sm font-semibold text-slate-200">Main focus</div><p className="mt-3 text-sm leading-7 text-slate-300">{plan.focus.title}</p></div></div>
              <div className="flex min-h-[360px] flex-col rounded-[30px] border border-white/10 bg-slate-950/40 p-6 shadow-2xl backdrop-blur md:p-8"><div className="text-sm font-semibold text-slate-300">What we recommend you do next</div><div className="mt-5 space-y-4">{plan.recommendedPath.modules.map((module, index) => <div key={module} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4"><div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">{String(index + 1).padStart(2, "0")}</div><div className="mt-2 text-lg font-semibold text-white">{moduleTitles[module]}</div></div>)}</div></div>
            </div>
            <div className="mt-5 rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur"><div className="text-sm font-semibold text-slate-200">Your first step</div><div className="mt-2 text-2xl font-semibold text-white">{plan.firstStep.label}</div><div className="mt-3 text-base leading-8 text-slate-300">{plan.firstStep.body}</div><div className="mt-5 space-y-3">{plan.nextActions.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/25 px-4 py-3 text-sm text-slate-200">{item}</div>)}</div></div>
            <div className="mt-5 flex justify-center"><a href="/lesson1" className="inline-flex min-w-[260px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm">Start lessons <ChevronRight className="h-4 w-4" /></a></div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
