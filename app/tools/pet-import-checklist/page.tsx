import type { Metadata } from "next";
import PetImportChecklistClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Pet Import Checklist";
const description =
  "Generate a personalised checklist for importing your dog, cat, bird, or other pet into Cyprus. Covers microchipping, rabies titre tests, health certificates, and arrival procedures based on your pet type and country of origin.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/pet-import-checklist/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/pet-import-checklist/",
    type: "website",
  },
};

export default function PetImportChecklistPage() {
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
      <PetImportChecklistClient />
    </>
  );
}
