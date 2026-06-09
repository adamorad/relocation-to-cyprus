import type { Metadata } from "next";
import BankingFeeComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Banking Fee Comparison";
const description = "Compare monthly fees, transfer costs, and account types at Bank of Cyprus, Hellenic, AstroBank, Revolut, and Wise for Cyprus residents.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/banking-fee-comparison/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/banking-fee-comparison/`, type: "website" },
};

export default function BankingFeeComparisonPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BankingFeeComparisonClient />
    </>
  );
}
