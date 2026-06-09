import type { Metadata } from "next";
import SectionsIndexClient from "./client";

export const metadata: Metadata = {
  title: "Cyprus Relocation Directories — 29 Curated Service Guides | RealCy.app",
  description: "29 curated directories for Cyprus relocators — property lawyers, immigration specialists, accountants, coworking spaces, specialist doctors, expat communities, and more.",
  alternates: { canonical: "/sections/" },
  openGraph: {
    title: "Cyprus Relocation Directories — 29 Curated Service Guides",
    description: "29 curated directories for Cyprus relocators — property lawyers, immigration specialists, accountants, coworking spaces, specialist doctors, expat communities, and more.",
    url: "https://realcy.app/sections/",
    type: "website",
  },
};

const SITE_URL = "https://realcy.app";

export default function SectionsIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Directories" },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SectionsIndexClient />
    </>
  );
}
