import type { Metadata } from "next";
import "./globals.css";
import MoneywiseSyncProvider from "@/components/providers/moneywise-sync-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moneywise-mzo6.vercel.app";
const description = "MoneyWise by Nimish Raote is an AI-powered financial literacy app for young adults, with simple explanations, personalized starting plans, and guided money lessons.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MoneyWise by Nimish Raote | Financial Literacy for Young Adults",
  description,
  authors: [{ name: "Nimish Raote", url: "https://nimishraote.com/" }],
  creator: "Nimish Raote",
  publisher: "Nimish Raote",
  keywords: ["MoneyWise", "Nimish Raote", "financial literacy", "money education", "young adults finance", "AI financial education"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: siteUrl, siteName: "MoneyWise", title: "MoneyWise by Nimish Raote", description },
  twitter: { card: "summary", title: "MoneyWise by Nimish Raote", description },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://nimishraote.com/#nimish-raote",
    name: "Nimish Raote",
    url: "https://nimishraote.com/",
    sameAs: ["https://www.linkedin.com/in/nimish-raote-1342697/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${siteUrl}/#moneywise`,
    name: "MoneyWise",
    alternateName: "MoneyWise by Nimish Raote",
    url: siteUrl,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description,
    creator: { "@id": "https://nimishraote.com/#nimish-raote" },
    author: { "@id": "https://nimishraote.com/#nimish-raote" },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <MoneywiseSyncProvider />
        {children}
      </body>
    </html>
  );
}
