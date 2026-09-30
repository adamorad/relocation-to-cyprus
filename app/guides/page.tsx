import type { Metadata } from "next";
import GuidesClient from "./GuidesClient";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Guides for Residents and Newcomers | RealCy.app";
const description = "Practical Cyprus guides: healthcare, transport, food, everyday admin, plus visas, tax, property and business setup for people planning a move.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/guides/" },
  openGraph: { title, description, url: `${SITE_URL}/guides/`, type: "website" },
};

export default function GuidesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides" },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GuidesClient />
    </>
  );
}
