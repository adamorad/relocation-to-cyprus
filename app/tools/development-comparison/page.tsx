import type { Metadata } from "next";
import DevelopmentComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Compare Cyprus Developments";
const description =
  "Select up to 3 new-build developments and compare them side by side on price, location, specs, developer, and available bedrooms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/development-comparison/" },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/tools/development-comparison/`,
    type: "website",
  },
};

export default function DevelopmentComparisonPage() {
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
      <DevelopmentComparisonClient />
    </>
  );
}
