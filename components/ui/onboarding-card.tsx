export default function OnboardingCard({
  eyebrow,
  title,
  body,
  accent,
  icon: Icon,
  visualTitle,
  visualSubtitle,
}: {
  eyebrow: string;
  title: string;
  body: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  visualTitle: string;
  visualSubtitle: string;
}) {
  return (
    <div className={`relative overflow-hidden px-6 py-14 md:px-10 lg:px-14 ${accent}`}>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="text-center md:text-left">
          <div className="inline-flex rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 ring-1 ring-black/5">{eyebrow}</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{body}</p>
          <div className="mt-8 flex justify-center gap-3 md:justify-start">
            <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Continue</button>
            <button className="rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 ring-1 ring-black/5">Skip for now</button>
          </div>
        </div>
        <div>
          <div className="rounded-[30px] bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
              <Icon className="h-6 w-6" />
            </div>
            <div className="mt-5 text-2xl font-semibold text-slate-900">{visualTitle}</div>
            <div className="mt-2 text-sm leading-7 text-slate-600">{visualSubtitle}</div>
            <div className="mt-5 flex h-36 items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/70">
              <div className="text-sm text-slate-500">Contextual illustration area</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
