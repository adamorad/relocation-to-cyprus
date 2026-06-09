import type { Metadata } from "next";
import { CULTURE_TIPS } from "@/lib/art-culture";
import ArtCultureClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Art Galleries, Museums & Cultural Venues in Cyprus";
const description = "Galleries, museums, and cultural venues with English signage and exhibition schedules.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/art-culture/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/art-culture/`, type: "website" },
};

export default function ArtCulturePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CULTURE_TIPS.map((t) => ({
      "@type": "Question",
      name: t.heading,
      acceptedAnswer: { "@type": "Answer", text: t.body },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Directories", item: `${SITE_URL}/sections/` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]) }}
      />
      <ArtCultureClient />
      <SectionRelatedGuides sectionSlug="art-culture" />
    </>
  );
}
