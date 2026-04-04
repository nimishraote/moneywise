"use client";

import AppShell from "@/components/layout/app-shell";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import JourneyNav from "@/components/ui/journey-nav";
import { BarChart3, Flame, CircleCheckBig } from "lucide-react";

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

function NextMoveCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm leading-7 text-slate-300">{body}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.08),_transparent_20%)]" />
        <div className="relative">
          <JourneyNav activeStep="dashboard" />
          <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 lg:px-14">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
                Progress dashboard
              </div>
              <div className="mt-5 overflow-hidden rounded-[30px] border border-white/10">
                <EditorialPhotoBand imageKey="dashboard" short />
              </div>
              <h2
                className="mt-3 text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your progress should feel visible, not overwhelming.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                A lighter dashboard with grouped sections. This is less about
                analytics overload and more about giving the user a steady sense
                of movement.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                  <BarChart3 className="h-4 w-4" />
                  This month
                </div>
                <div className="space-y-4">
                  <MetricCard label="Lessons completed" value="3 of 5" />
                  <MetricCard label="Savings streak" value="4 weeks" />
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                  <CircleCheckBig className="h-4 w-4" />
                  Recommended next moves
                </div>
                <div className="grid gap-4">
                  <NextMoveCard
                    title="Finish the budgeting basics lesson"
                    body="You are close, and it connects directly to your spending plan."
                  />
                  <NextMoveCard
                    title="Review your monthly spending check-in"
                    body="A short review here will make your next plan more accurate."
                  />
                  <NextMoveCard
                    title="Increase weekly savings by $5"
                    body="Small progress feels more believable and more sustainable."
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                <Flame className="h-4 w-4" />
                Keep going
              </div>
              <p className="max-w-3xl text-sm leading-8 text-slate-300">
                Progress in money habits rarely comes from one big move. It
                usually comes from a few smaller habits that start feeling normal.
                The goal here is not perfection. The goal is steady confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}