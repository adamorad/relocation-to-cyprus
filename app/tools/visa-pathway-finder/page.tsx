import type { Metadata } from "next";
import VisaPathwayFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Visa Pathway Finder 2026 — Find Your Route in 2 Questions";
const description = "Two questions to your Cyprus visa route: EU MEU1 registration, Digital Nomad Visa, Yellow Slip, or Permanent Residency by Investment. Updated 2026 income thresholds and requirements.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/visa-pathway-finder/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/visa-pathway-finder/`, type: "website" },
};

export default function VisaPathwayFinderPage() {
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
      <VisaPathwayFinderClient />
    </>
  );
}
