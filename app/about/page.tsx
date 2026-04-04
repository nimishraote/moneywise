import AppShell from "@/components/layout/app-shell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="bg-[#f7f2eb] px-6 py-12 md:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Premium editorial direction</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>About the app</h2>
          <div className="mt-6 rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <p className="text-lg leading-8 text-slate-700">
              MoneyWise is designed to make financial literacy feel simpler, calmer, and more useful for younger adults. The goal is not to overwhelm people with jargon. It is to help them understand what matters, start earlier, and take practical steps with more confidence.
            </p>
            <div className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <div className="font-semibold">Created by Nimish Raote</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">A concept built to explore how AI, education, and premium product design can come together to make money feel more human and actionable.</div>
              <div className="mt-4 text-sm text-slate-700">Contact: nimishar@hotmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
