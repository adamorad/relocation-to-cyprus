import type { Metadata } from "next";
import { CO_LIVING_TIPS } from "@/lib/co-living";
import CoLivingClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Co-Living & Serviced Apartments in Cyprus";
const description = "Month-to-month co-living options for digital nomads and new arrivals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/co-living/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/co-living/`, type: "website" },
};

export default function CoLivingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CO_LIVING_TIPS.map((t) => ({
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
      <CoLivingClient />
      <SectionRelatedGuides sectionSlug="co-living" />
    </>
  );
}
