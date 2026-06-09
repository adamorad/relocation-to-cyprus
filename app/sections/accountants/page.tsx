import type { Metadata } from "next";
import { ACCOUNTANT_TIPS } from "@/lib/accountants";
import AccountantsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Accountants & Tax Advisors in Cyprus";
const description = "ICPAC-registered accountants with experience in expat non-dom filings and company tax.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/accountants/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/accountants/`, type: "website" },
};

export default function AccountantsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ACCOUNTANT_TIPS.map((t) => ({
      "@type": "Question",
      name: t.heading,
      acceptedAnswer: { "@type": "Answer", text: t.body },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AccountantsClient />
    </>
  );
}
