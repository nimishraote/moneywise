export default function MoneyWiseLogo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/25 bg-[linear-gradient(135deg,rgba(250,204,21,0.20)_0%,rgba(251,146,60,0.10)_45%,rgba(96,165,250,0.10)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none" aria-hidden="true">
          <circle cx="14" cy="24" r="6.5" stroke="rgb(253 224 71)" strokeWidth="2" />
          <path d="M20 18.5L24 14.5L28 18.5" stroke="rgb(253 224 71)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 14.5V26.5" stroke="rgb(253 224 71)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M10.5 24H17.5" stroke="rgb(253 224 71)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {!compact && (
        <div>
          <div className="text-base font-semibold text-white">MoneyWise</div>
          <div className="text-xs uppercase tracking-[0.18em] text-amber-200/90">
            smarter starts
          </div>
        </div>
      )}
    </div>
  );
}