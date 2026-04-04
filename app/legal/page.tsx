import AppShell from "@/components/layout/app-shell";
import { ShieldCheck } from "lucide-react";

const legalItems = [
  "This app is for educational and informational purposes only. It does not provide financial, investment, legal, tax, accounting, fiduciary, or other professional advice.",
  "Nothing in this app is a recommendation to buy, sell, hold, use, avoid, or rely on any security, account, product, strategy, institution, or service.",
  "Any examples, numbers, scenarios, accounts, providers, platforms, rates, or products shown are illustrative only. They may be incomplete, simplified, outdated, or not suitable for any specific user.",
  "Users must make their own decisions and, where appropriate, consult a qualified licensed professional before taking action with real money, debt, taxes, contracts, investments, or legal matters.",
  "This app does not guarantee accuracy, completeness, suitability, availability, merchantability, fitness for a particular purpose, performance, outcomes, savings, gains, or avoidance of loss.",
  "Use of this app is at the user's own risk. The creators, owners, operators, contributors, and affiliates disclaim liability to the fullest extent permitted by law for any loss, damage, claim, cost, tax consequence, missed opportunity, or other result arising from use of or reliance on this app or any linked third-party content.",
  "Third-party websites and resources are provided only as convenience links. The app does not control them and does not endorse, verify, or assume responsibility for their content, terms, privacy practices, or availability.",
  "This app may simplify complex topics for learning purposes. Real-world financial decisions can involve additional risks, fees, restrictions, and legal consequences that are not fully covered here.",
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
            Please read this carefully before using the product. This page is
            meant to make the limits of the app very clear.
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