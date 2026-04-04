import AppShell from "@/components/layout/app-shell";
import { ShieldCheck } from "lucide-react";

export default function LegalPage() {
  return (
    <AppShell>
      <div className="bg-[#f6f8fa] px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Legal / Disclaimers</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Important information</h2>
          <div className="mt-6 space-y-4">
            {[
              "This app is for educational purposes only and does not provide personalized financial, legal, tax, or investment advice.",
              "Any accounts, institutions, rates, or platforms shown are informational examples only and do not constitute endorsements or recommendations.",
              "Information may change over time. Users must review provider terms and make independent decisions before taking action.",
              "The creators of this app disclaim liability for financial decisions, outcomes, losses, or reliance on third-party information presented within the product.",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm ring-1 ring-slate-200">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-500" />
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
