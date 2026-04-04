"use client";

import AppShell from "@/components/layout/app-shell";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import { useRouter } from "next/navigation";
import { resetMoneywiseSession } from "@/lib/storage/moneywise-storage";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
      {children}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();

  function handleStart() {
    resetMoneywiseSession();
    router.push("/onboarding");
  }

  return (
    <AppShell footerDark>
      <div className="relative overflow-hidden bg-[#120f1e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.22),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(251,191,36,0.10),_transparent_20%)]" />

        <div className="relative px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
                  Built for young adults
                </div>

                <h1
                  className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Learn money earlier, with less fear and more clarity.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
                  MoneyWise helps young adults understand money before life gets
                  more expensive and more confusing. It turns stress, avoidance,
                  and guesswork into clearer choices and better habits.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Chip>Understand what is happening</Chip>
                  <Chip>Get a plan that fits your stage of life</Chip>
                  <Chip>Build confidence one step at a time</Chip>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleStart}
                    className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                  >
                    Get started
                  </button>
                  <div className="text-sm text-slate-400">
                    Short assessment, simple lessons, personalized action plan
                  </div>
                </div>
              </div>

              <EditorialPhotoBand imageKey="home" />
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
                  What MoneyWise does
                </div>
                <div className="mt-4 grid gap-5 md:grid-cols-3">
                  <div>
                    <div className="text-lg font-semibold text-white">
                      See clearly
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Understand your current money habits and where the
                      pressure is really coming from.
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      Learn simply
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Get short lessons in plain language, without jargon,
                      lectures, or shame.
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      Act calmly
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Leave with a small set of practical next steps that feel
                      realistic right now.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-slate-950/35 p-6 shadow-2xl backdrop-blur md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
                  Good for people who are
                </div>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Starting to earn money and not fully sure how to manage it
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Feeling stress around rent, spending, saving, or credit
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Wanting a better relationship with money before bad habits
                    harden
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