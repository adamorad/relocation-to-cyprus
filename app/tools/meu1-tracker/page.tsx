import type { Metadata } from "next";
import Meu1TrackerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "MEU1 Registration Tracker — Cyprus EU Residency Checklist";
const description = "Interactive checklist for EU citizens registering their residence in Cyprus (MEU1). Track required documents and steps to completion.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/meu1-tracker/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/meu1-tracker/`, type: "website" },
};

export default function Meu1TrackerPage() {
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
      <Meu1TrackerClient />
    </>
  );
}
