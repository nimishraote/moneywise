"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/app-shell";
import { saveProfile } from "@/lib/storage/moneywise-storage";
import { signUpWithEmail } from "@/lib/supabase/auth";
import { upsertMoneywiseProfile } from "@/lib/supabase/moneywise-db";
import { syncMoneywiseUserData } from "@/lib/supabase/moneywise-sync";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isDisabled = useMemo(() => {
    return !firstName.trim() || !email.trim() || password.trim().length < 6 || submitting;
  }, [email, firstName, password, submitting]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const authData = await signUpWithEmail(email.trim(), password, firstName.trim());

      saveProfile({
        firstName: firstName.trim(),
        email: email.trim(),
      });

      if (authData.user?.id) {
        try {
          await upsertMoneywiseProfile(authData.user.id, {
            firstName: firstName.trim(),
            email: email.trim(),
          });
        } catch {
          // Do not fail signup just because profile sync did not complete yet.
        }
      }

      if (authData.user?.id && authData.session) {
        await syncMoneywiseUserData(authData.user.id, authData.user.email ?? email.trim());
      }

      setSuccessMessage(
        authData.session
          ? "Your account is ready."
          : "Your account was created. You can now log in, or check your email if confirmation is required."
      );

      setTimeout(() => {
        router.push(authData.session ? "/onboarding" : "/login");
      }, 1000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong during sign up.";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-[#120f1e] px-6 py-12 text-white">
        <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-2xl backdrop-blur md:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100">
            Create your account
          </div>
          <h1
            className="mt-4 text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Save your progress for real
          </h1>
          <p className="mt-4 text-sm leading-8 text-slate-300">
            This is the first step toward real saved learning, saved progress, and a more personal dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-white">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none"
                placeholder="Your first name"
              />
            </div>

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
                placeholder="At least 6 characters"
              />
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-100">
                {errorMessage}
              </div>
            ) : null}

            {successMessage ? (
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
                {successMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isDisabled}
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-white underline underline-offset-4">
              Log in
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}