import type { Metadata } from "next";
import CountryComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus vs Europe — Relocation Country Comparison";
const description =
  "Compare Cyprus against Portugal, Malta, Greece, Spain and Italy across tax, property, cost of living, healthcare and visa routes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/country-comparison/" },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/tools/country-comparison/`,
    type: "website",
  },
};

export default function CountryComparisonPage() {
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
      <CountryComparisonClient />
    </>
  );
}
