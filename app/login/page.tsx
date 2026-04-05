"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { getCurrentAuthUser, signInWithEmail } from "@/lib/supabase/auth";
import { syncMoneywiseUserData } from "@/lib/supabase/moneywise-sync";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [nextPath, setNextPath] = useState("/dashboard");

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || submitting;
  }, [email, password, submitting]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");

    if (next && next.startsWith("/")) {
      setNextPath(next);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function checkExistingSession() {
      try {
        const user = await getCurrentAuthUser();
        if (!mounted) return;

        if (user) {
          router.replace(nextPath);
          return;
        }

        setCheckingSession(false);
      } catch {
        if (!mounted) return;
        setCheckingSession(false);
      }
    }

    void checkExistingSession();

    return () => {
      mounted = false;
    };
  }, [nextPath, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const authData = await signInWithEmail(email.trim(), password);

      if (authData.user?.id) {
        await syncMoneywiseUserData(authData.user.id, authData.user.email ?? email.trim());
      }

      router.push(nextPath);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong during log in.";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingSession) {
    return (
      <AppShell>
        <div className="min-h-screen bg-[#120f1e] px-6 py-12 text-white">
          <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/8 p-8 text-center shadow-2xl backdrop-blur md:p-10">
            Checking your session...
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-[#120f1e] px-6 py-12 text-white">
        <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-2xl backdrop-blur md:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
            Log in
          </div>

          <h1
            className="mt-4 text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Pick up where you left off
          </h1>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            Log in to reconnect your plan, lessons, and progress.
          </p>

          <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/25 p-4">
            <div className="text-sm font-semibold text-white">What comes back when you log in</div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                Your plan
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                Lesson progress
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                Next best step
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none"
                placeholder="Your password"
              />
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-100">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isDisabled}
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-400">
            Need an account?{" "}
            <a
              href={nextPath !== "/dashboard" ? `/signup?next=${encodeURIComponent(nextPath)}` : "/signup"}
              className="font-semibold text-white underline underline-offset-4"
            >
              Create one
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}