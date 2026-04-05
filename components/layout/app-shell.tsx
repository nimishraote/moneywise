"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type AppShellProps = {
  children: ReactNode;
  footerDark?: boolean;
};

type ModalKey = "about" | "legal" | null;

function FooterModal({
  type,
  onClose,
}: {
  type: Exclude<ModalKey, null>;
  onClose: () => void;
}) {
  const isAbout = type === "about";

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl rounded-[32px] border border-white/10 bg-[#171325] p-6 text-white shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {isAbout ? "About" : "Legal / disclaimers"}
            </div>
            <h2
              className="mt-2 text-3xl font-semibold tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {isAbout ? "Why MoneyWise exists" : "Important legal information"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {isAbout
                ? "A short explanation of what this product is trying to do."
                : "Please review these points before using the app."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isAbout ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <div className="text-sm font-semibold text-white">The problem</div>
              <div className="mt-2 text-sm leading-7 text-slate-300">
                Many young adults reach real money decisions before anyone explains the basics in a way that feels usable.
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <div className="text-sm font-semibold text-white">The goal</div>
              <div className="mt-2 text-sm leading-7 text-slate-300">
                The goal is not to sound smart. The goal is to make money feel clearer, calmer, and easier to act on.
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
              <div className="text-sm font-semibold text-white">The product</div>
              <div className="mt-2 text-sm leading-7 text-slate-300">
                MoneyWise is an educational product experiment created by Nimish Raote to help users build confidence and take a few better next steps.
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            <div className="rounded-[24px] border border-amber-300/20 bg-amber-200/10 p-5">
              <div className="text-sm font-semibold text-amber-200">In simple terms</div>
              <div className="mt-2 text-sm leading-7 text-amber-50">
                MoneyWise is an educational tool. It is not personal financial, legal, tax, investment, banking, or professional advice.
              </div>
            </div>

            {[
              "This application is provided for general educational and informational purposes only. It does not provide, and should not be relied upon as, financial, investment, tax, legal, accounting, credit, banking, or other professional advice.",
              "Nothing in the application constitutes a recommendation, endorsement, solicitation, offer, or advice to open any account, purchase or sell any security, choose any financial product, or take any specific financial action.",
              "Any references to banks, brokerages, cards, rates, financial products, investment platforms, or third-party providers are illustrative and informational only, may be incomplete, may change without notice, and do not constitute personalized guidance or a suitability determination.",
              "The creators, operators, affiliates, licensors, and service providers of this application disclaim, to the maximum extent permitted by law, any and all liability for any direct, indirect, incidental, consequential, special, exemplary, statutory, punitive, or other losses, damages, costs, claims, or expenses arising out of or relating to reliance on the application, use of any information presented, or decisions made based on such information.",
              "Users are solely responsible for independently evaluating any financial product, institution, rate, or provider and for obtaining advice from qualified licensed professionals where appropriate.",
              "By using the application, the user acknowledges that financial terms, rates, product features, eligibility requirements, and market conditions may change over time, and that no warranty or guarantee is made regarding accuracy, completeness, availability, timeliness, suitability, or results.",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-slate-300"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Point {index + 1}
                </div>
                <div className="mt-2">{item}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AppShell({
  children,
  footerDark = false,
}: AppShellProps) {
  const [modal, setModal] = useState<ModalKey>(null);

  return (
    <div className="min-h-screen bg-[#120f1e] text-white antialiased">
      <main className="relative">{children}</main>

      <footer
        className={`border-t border-white/10 ${
          footerDark ? "bg-[#0f0c19]" : "bg-[#120f1e]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-14">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="text-sm font-medium text-slate-200">
                MoneyWise
              </div>
              <div className="mt-1 text-sm leading-6 text-slate-400">
                A product experiment by Nimish Raote
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-400">
              <button
                onClick={() => setModal("about")}
                className="transition hover:text-slate-200"
              >
                About
              </button>
              <button
                onClick={() => setModal("legal")}
                className="transition hover:text-slate-200"
              >
                Legal
              </button>
              <a
                href="https://www.nimishraote.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-slate-200"
              >
                Back to nimishraote.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {modal ? <FooterModal type={modal} onClose={() => setModal(null)} /> : null}
    </div>
  );
}