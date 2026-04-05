import AppShell from "@/components/layout/app-shell";

function AboutCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
      <div className="text-base font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm leading-7 text-slate-300">{body}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <AppShell>
      <div className="bg-[#120f1e] px-6 py-12 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            About
          </div>

          <h2
            className="mt-3 text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Why MoneyWise exists
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            MoneyWise is built for young adults who want money explained in a simpler, calmer, more useful way.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <AboutCard
              title="The problem"
              body="A lot of people reach adult life without clear help on budgeting, saving, credit, debt, or investing."
            />
            <AboutCard
              title="The goal"
              body="The goal is not to sound smart. The goal is to make money feel less confusing and more actionable."
            />
            <AboutCard
              title="The product"
              body="MoneyWise is an educational product experiment created by Nimish Raote to help users build confidence and take a few better next steps."
            />
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/6 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-100">
              What the app tries to do
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-[20px] border border-white/10 bg-slate-950/25 p-4 text-sm leading-7 text-slate-200">
                Explain money basics in plain language
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-950/25 p-4 text-sm leading-7 text-slate-200">
                Turn a short check-in into a more personal starting plan
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-950/25 p-4 text-sm leading-7 text-slate-200">
                Help users move from confusion to a few clear actions
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-950/25 p-4 text-sm leading-7 text-slate-200">
                Build confidence while the user is still inside the learning experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}