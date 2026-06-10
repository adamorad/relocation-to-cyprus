import type { Metadata } from "next";
import LtdSetupCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Ltd Setup Cost Calculator";
const description =
  "Estimate the one-time and annual ongoing costs of setting up a Cyprus limited company — registration, legal fees, accounting, audit, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/ltd-setup-calculator/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/ltd-setup-calculator/",
    type: "website",
  },
};

export default function LtdSetupCalculatorPage() {
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
      <LtdSetupCalculatorClient />
    </>
  );
}
