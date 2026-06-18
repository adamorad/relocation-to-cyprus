import type { Metadata } from "next";
import RelocationCostEstimatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Relocation Cost Estimator 2026 — What It Costs to Move";
const description =
  "Calculate your one-time costs to relocate to Cyprus — international shipping, car import, visa fees, tenancy deposit, pet import, and more. Itemised low-to-high estimate with 2026 prices.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/relocation-cost-estimator/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/relocation-cost-estimator/",
    type: "website",
  },
};

export default function RelocationCostEstimatorPage() {
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
      <RelocationCostEstimatorClient />
    </>
  );
}
