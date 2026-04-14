"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/layout/app-shell";
import { createClient } from "@supabase/supabase-js";
import { hasSupabaseBrowserEnv } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const existingEmail = params.get("email");

    if (existingEmail) {
      setEmail(existingEmail);
    }
  }, []);

  const supabaseReady = hasSupabaseBrowserEnv();

  const isDisabled = useMemo(() => {
    return !email.trim() || submitting || !supabaseReady;
  }, [email, submitting, supabaseReady]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
          "Password reset is not available right now because Supabase is not configured."
        );
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const redirectTo =
        typeof window !== "undefined" ? `${window.location.origin}/login` : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (error) {
        throw error;
      }

      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not send password reset email.";
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
            Reset password
          </div>

          <h1
            className="mt-4 text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Get back into your account
          </h1>

          <p className="mt-4 text-sm leading-8 text-slate-300">
            Enter your email and we will send you a password reset link.
          </p>

          {!supabaseReady && (
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
              Password reset is not available right now because the app is missing Supabase environment variables.
            </div>
          )}

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
              {submitting ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-400">
            Remembered it?{" "}
            <a href="/login" className="font-semibold text-white underline underline-offset-4">
              Back to log in
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}