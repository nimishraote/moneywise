"use client";

import Link from "next/link";

export default function AppShell({
  children,
  footerDark = false,
}: {
  children: React.ReactNode;
  footerDark?: boolean;
}) {
  return (
    <div className="min-h-screen bg-[#f6f2eb] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-black/5">
          {children}

          <footer
            className={`border-t px-6 py-4 text-sm ${
              footerDark
                ? "border-white/10 bg-slate-950 text-slate-300"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold">MoneyWise</span>
                <span className="mx-2">•</span>
                <span>Built as a concept by Nimish Raote</span>
              </div>

              <div className="flex items-center gap-4">
                <Link className="underline underline-offset-4" href="/about">
                  About
                </Link>
                <Link className="underline underline-offset-4" href="/legal">
                  Legal
                </Link>
                <a
                  className="underline underline-offset-4"
                  href="https://nimishraote.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  nimishraote.com
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}