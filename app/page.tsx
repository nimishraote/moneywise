"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import EditorialPhotoBand from "@/components/ui/editorial-photo-band";
import { resetMoneywiseSession } from "@/lib/storage/moneywise-storage";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
      {children}
    </div>
  );
}

function EntryModal({
  open,
  onClose,
  onContinueGuest,
  onSignup,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onContinueGuest: () => void;
  onSignup: () => void;
  onLogin: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-[28px] border border-white/10 bg-[#171327] p-6 text-white shadow-2xl md:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
          Continue to MoneyWise
        </div>

        <h2
          className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          How would you like to start?
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
          You can jump in right away without an account, or create one to save
          your progress and come back to your dashboard later.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={onContinueGuest}
            className="w-full rounded-2xl bg-white px-5 py-4 text-left text-sm font-semibold text-slate-950"
          >
            Continue without account
            <div className="mt-1 text-xs font-normal text-slate-600">
              Best if you just want to explore first
            </div>
          </button>

          <button
            onClick={onSignup}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm font-semibold text-white"
          >
            Create account
            <div className="mt-1 text-xs font-normal text-slate-400">
              Save progress, plan, and learning history
            </div>
          </button>

          <button
            onClick={onLogin}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-5 py-4 text-left text-sm font-semibold text-slate-200"
          >
            Log in
            <div className="mt-1 text-xs font-normal text-slate-400">
              Pick up where you left off
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-slate-400 underline underline-offset-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [showEntryModal, setShowEntryModal] = useState(false);

  function handleOpenEntryModal() {
    setShowEntryModal(true);
  }

  function handleContinueGuest() {
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
                    onClick={handleOpenEntryModal}
                    className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                  >
                    Get started
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

        <EntryModal
          open={showEntryModal}
          onClose={() => setShowEntryModal(false)}
          onContinueGuest={handleContinueGuest}
          onSignup={handleSignup}
          onLogin={handleLogin}
        />
      </div>
    </AppShell>
  );
}