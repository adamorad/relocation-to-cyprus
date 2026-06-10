import type { Metadata } from "next";
import TaxSavingsCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Tax Savings Calculator";
const description =
  "See how much tax you could save by moving to Cyprus. Compare your current country's income tax against Cyprus Standard and Non-Dom regimes side by side.";

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
