import type { Metadata } from "next";
import "./globals.css";
import MoneywiseSyncProvider from "@/components/providers/moneywise-sync-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "MoneyWise",
  description: "A financial literacy app for young adults",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MoneywiseSyncProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}