import type { Metadata } from "next";
import GrantsFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Business Grants Finder";
const description = "Search available grants, subsidies, and incentives for businesses in Cyprus — filterable by sector and eligibility.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/grants-finder/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/grants-finder/`, type: "website" },
};

export default function GrantsFinderPage() {
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
      <GrantsFinderClient />
    </>
  );
}
