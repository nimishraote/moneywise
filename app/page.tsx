"use client";

import AppShell from "@/components/layout/app-shell";
import { useRouter } from "next/navigation";
import { resetMoneywiseSession } from "@/lib/storage/moneywise-storage";

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

        <div className="relative px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
              Built for young adults
            </div>

            <h1
              className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Learn money earlier, with less fear and more clarity.
            </h1>

            <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
              MoneyWise is for young adults who want to understand money before
              life gets more expensive and more complicated. It turns stress,
              confusion, and avoidance into clearer choices, better habits, and
              practical next steps.
            </p>

            <div className="mt-8 max-w-4xl rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(196,181,253,0.05)_100%)] p-6 shadow-2xl backdrop-blur">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-5">
                  <div className="text-sm font-semibold text-white">
                    Understand what is happening
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">
                    See your money life more clearly instead of feeling lost in it.
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-5">
                  <div className="text-sm font-semibold text-white">
                    Get a plan shaped around you
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">
                    Start with guidance that fits your stage of life and your needs.
                  </div>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-5">
                  <div className="text-sm font-semibold text-white">
                    Build confidence over time
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">
                    Take simple steps that feel practical, calm, and easier to follow.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleStart}
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}