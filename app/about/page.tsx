import AppShell from "@/components/layout/app-shell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="bg-[#120f1e] px-6 py-12 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            About
          </div>
          <h2
            className="mt-3 text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Why MoneyWise exists
          </h2>
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
        </div>
      </div>
    </AppShell>
  );
}