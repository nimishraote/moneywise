"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  footerDark?: boolean;
};

export default function AppShell({
  children,
  footerDark = false,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#120f1e] text-white">
      <main>{children}</main>

      <footer
        className={`border-t border-white/10 ${
          footerDark ? "bg-[#0f0c19]" : "bg-[#120f1e]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <div>
            <div className="font-semibold text-slate-200">MoneyWise</div>
            <div className="mt-1">
              Financial confidence for young adults, one step at a time.
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <Link href="/" className="transition hover:text-slate-200">
              About
            </Link>
            <Link href="/" className="transition hover:text-slate-200">
              Privacy
            </Link>
            <Link href="/" className="transition hover:text-slate-200">
              How it works
            </Link>
            <Link href="/" className="transition hover:text-slate-200">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}