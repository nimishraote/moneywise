"use client";

import type { ReactNode } from "react";
import { useState } from "react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-[#171325] p-6 text-white shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {isAbout ? "About" : "Legal / disclaimers"}
            </div>
            <h2
              className="mt-2 text-3xl font-semibold tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {isAbout ? "Why MoneyWise exists" : "Important legal information"}
            </h2>
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
          <div className="mt-6 space-y-5 text-sm leading-8 text-slate-300">
            <p>
              MoneyWise is built for young adults who want to understand money in
              simpler language. A lot of people enter adult life without clear
              lessons on budgeting, saving, credit, debt, investing, or how
              early habits affect later life.
            </p>
            <p>
              The goal of the product is not to sound smart. The goal is to make
              money feel less confusing, less intimidating, and more actionable.
              The product tries to teach, explain, and guide while the user is
              still inside the learning experience.
            </p>
            <p>
              This is an educational product experiment created by Nimish Raote.
              It is meant to help users build confidence, understand the basics,
              and take a few better next steps.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              This application is provided for general educational and
              informational purposes only. It does not provide, and should not be
              relied upon as, financial, investment, tax, legal, accounting,
              credit, banking, or other professional advice.
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              Nothing in the application constitutes a recommendation,
              endorsement, solicitation, offer, or advice to open any account,
              purchase or sell any security, choose any financial product, or
              take any specific financial action.
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              Any references to banks, brokerages, cards, rates, financial
              products, investment platforms, or third-party providers are
              illustrative and informational only, may be incomplete, may change
              without notice, and do not constitute personalized guidance or a
              suitability determination.
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              The creators, operators, affiliates, licensors, and service
              providers of this application disclaim, to the maximum extent
              permitted by law, any and all liability for any direct, indirect,
              incidental, consequential, special, exemplary, statutory, punitive,
              or other losses, damages, costs, claims, or expenses arising out of
              or relating to reliance on the application, use of any information
              presented, or decisions made based on such information.
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              Users are solely responsible for independently evaluating any
              financial product, institution, rate, or provider and for obtaining
              advice from qualified licensed professionals where appropriate.
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              By using the application, the user acknowledges that financial
              terms, rates, product features, eligibility requirements, and market
              conditions may change over time, and that no warranty or guarantee
              is made regarding accuracy, completeness, availability, timeliness,
              suitability, or results.
            </div>
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
    <div className="min-h-screen bg-[#120f1e] text-white">
      <main>{children}</main>

      <footer
        className={`border-t border-white/10 ${
          footerDark ? "bg-[#0f0c19]" : "bg-[#120f1e]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <div>
            <div className="text-slate-200">
              MoneyWise · A product experiment by Nimish Raote
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
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
              Legal / no advice / liability
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
      </footer>

      {modal ? <FooterModal type={modal} onClose={() => setModal(null)} /> : null}
    </div>
  );
}