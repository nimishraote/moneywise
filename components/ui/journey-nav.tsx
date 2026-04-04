"use client";

import Link from "next/link";

type JourneyStep = "assessment" | "plan" | "learn" | "dashboard";

const steps: { id: JourneyStep; label: string; href: string }[] = [
  { id: "assessment", label: "Check-in", href: "/assessment" },
  { id: "plan", label: "Your plan", href: "/plan" },
  { id: "learn", label: "Learn", href: "/lesson1" },
  { id: "dashboard", label: "Progress", href: "/dashboard" },
];

export default function JourneyNav({
  activeStep,
}: {
  activeStep: JourneyStep;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-[#120f1e]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:px-10 lg:px-14">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Your journey
        </div>

        <div className="flex flex-wrap gap-2 rounded-[24px] border border-white/10 bg-white/5 p-1.5">
          {steps.map((step, index) => {
            const active = activeStep === step.id;

            return (
              <Link
                key={step.id}
                href={step.href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
                  active ? "bg-white text-slate-950" : "text-slate-300"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    active
                      ? "bg-slate-950 text-white"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {index + 1}
                </span>
                <span>{step.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}