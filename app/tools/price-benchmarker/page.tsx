import type { Metadata } from "next";
import PriceBenchmarkerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Property Price Benchmarker";
const description =
  "See how your property's asking price compares to similar developments in the same region. Based on real listings data from across Cyprus.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/price-benchmarker/" },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/tools/price-benchmarker/`,
    type: "website",
  },
};

export default function PriceBenchmarkerPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools/`,
      },
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
      <PriceBenchmarkerClient />
    </>
  );
}
