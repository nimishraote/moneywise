import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoneyWise Starter",
  description: "Starter UI for the MoneyWise financial literacy app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
