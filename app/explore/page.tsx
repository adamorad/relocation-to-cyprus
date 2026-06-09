import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

const SITE_URL = "https://realcy.app";
const title = "Explore Cyprus Relocation Resources — RealCy.app";
const description = "Browse all guides, tools, and directories for relocating to Cyprus — organised by category. Search across 30+ curated resources.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/explore/" },
  openGraph: { title, description, url: `${SITE_URL}/explore/`, type: "website" },
};

export default function ExplorePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Explore" },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense>
        <ExploreClient />
      </Suspense>
    </>
  );
}
