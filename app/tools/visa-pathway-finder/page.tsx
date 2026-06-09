import type { Metadata } from "next";
import VisaPathwayFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Visa Pathway Finder";
const description = "Answer 2 questions to find the right Cyprus visa or residency route — Digital Nomad Visa, PR by Investment, EU registration, and more.";

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
