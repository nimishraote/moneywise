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

  function handleSignup() {
    router.push("/signup");
  }

  function handleLogin() {
    router.push("/login");
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
                  MoneyWise helps young adults make sense of money in plain
                  language. It is for people who want less confusion, less
                  stress, and a clearer place to start.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Chip>Simple language</Chip>
                  <Chip>Short assessment</Chip>
                  <Chip>Personalized learning path</Chip>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleStart}
                    className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                  >
                    Get started
                  </button>

                  <button
                    onClick={handleSignup}
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Create account
                  </button>

                  <button
                    onClick={handleLogin}
                    className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300"
                  >
                    Log in
                  </button>
                </div>

                <div className="mt-4 text-sm text-slate-400">
                  Learn the basics, build one clear rule, and come back to track
                  your progress over time
                </div>
              </div>

              <EditorialPhotoBand imageKey="home" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}