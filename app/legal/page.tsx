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
        <div className="mx-auto max-w-5xl">
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
            MoneyWise is an educational product, not personal financial advice. Please read the points below before using it.
          </p>

          <div className="mt-8 rounded-[28px] border border-amber-300/20 bg-amber-200/10 p-5">
            <div className="text-sm font-semibold text-amber-200">In simple terms</div>
            <div className="mt-2 text-sm leading-7 text-amber-50">
              This app is meant to help users learn. It should not be treated as a substitute for professional financial, legal, tax, investment, or banking advice.
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {legalItems.map((item, index) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-slate-200"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-950/25">
                    <ShieldCheck className="h-4 w-4 text-slate-300" />
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Point {index + 1}
                    </div>
                    <div className="mt-2">{item}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}