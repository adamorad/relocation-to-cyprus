import type { Metadata } from "next";
import TaxSavingsCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Non-Dom Tax Calculator 2026 — See Your Annual Tax Saving";
const description =
  "Enter your income and source country to calculate your exact tax saving under Cyprus's Non-Dom regime. Side-by-side comparison of income tax, dividend tax, and social insurance vs your current country.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/tax-savings-calculator/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/tax-savings-calculator/",
    type: "website",
  },
};

export default function TaxSavingsCalculatorPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: SITE_URL + "/tools/",
      },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TaxSavingsCalculatorClient />
    </>
  );
}
