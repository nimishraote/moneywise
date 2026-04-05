"use client";

import Link from "next/link";

type JourneyStep = "assessment" | "plan" | "learn" | "dashboard";

const steps: { id: JourneyStep; label: string; href: string }[] = [
  { id: "assessment", label: "Check-in", href: "/assessment" },
  { id: "plan", label: "Plan", href: "/plan" },
  { id: "learn", label: "Learn", href: "/lesson1" },
  { id: "dashboard", label: "Progress", href: "/dashboard" },
];

export default function JourneyNav({
  activeStep,
}: {
  activeStep: JourneyStep;
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-[#120f1e]/92 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-3 md:px-10 lg:px-14">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, index) => {
            const active = activeStep === step.id;

            return (
              <Link
                key={step.id}
                href={step.href}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold md:text-sm ${
                  active
                    ? "bg-white text-slate-950"
                    : "border border-white/10 bg-white/5 text-slate-300"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold md:h-6 md:w-6 md:text-xs ${
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