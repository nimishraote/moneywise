import AppShell from "@/components/layout/app-shell";
import { ShieldCheck } from "lucide-react";

const legalItems = [
  "This application is provided for general educational and informational purposes only. It does not provide, and should not be relied upon as, financial, investment, tax, legal, accounting, credit, banking, or other professional advice.",
  "Nothing in the application constitutes a recommendation, endorsement, solicitation, offer, or advice to open any account, purchase or sell any security, choose any financial product, or take any specific financial action.",
  "Any references to banks, brokerages, cards, rates, financial products, investment platforms, or third-party providers are illustrative and informational only, may be incomplete, may change without notice, and do not constitute personalized guidance or a suitability determination.",
  "The creators, operators, affiliates, licensors, and service providers of this application disclaim, to the maximum extent permitted by law, any and all liability for any direct, indirect, incidental, consequential, special, exemplary, statutory, punitive, or other losses, damages, costs, claims, or expenses arising out of or relating to reliance on the application, use of any information presented, or decisions made based on such information.",
  "Users are solely responsible for independently evaluating any financial product, institution, rate, or provider and for obtaining advice from qualified licensed professionals where appropriate.",
  "By using the application, the user acknowledges that financial terms, rates, product features, eligibility requirements, and market conditions may change over time, and that no warranty or guarantee is made regarding accuracy, completeness, availability, timeliness, suitability, or results.",
];

export default function LegalPage() {
  return (
    <AppShell>
      <div className="bg-[#120f1e] px-6 py-12 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Legal / disclaimers
          </div>
          <h2
            className="mt-3 text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Important legal information
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
            Please read this carefully before using the product.
          </p>

          <div className="mt-6 space-y-4">
            {legalItems.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200"
              >
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-400" />
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}