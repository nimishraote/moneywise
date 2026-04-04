import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoneyWise",
  description: "A financial literacy app for young adults",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}