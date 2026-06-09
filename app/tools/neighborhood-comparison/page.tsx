import type { Metadata } from "next";
import NeighborhoodComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Neighbourhood Comparison Tool";
const description = "Compare all 5 Cyprus cities side by side — rent, property prices, international schools, beach access, expat community, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/neighborhood-comparison/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/neighborhood-comparison/`, type: "website" },
};

export default function NeighborhoodComparisonPage() {
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
      <NeighborhoodComparisonClient />
    </>
  );
}
