import type { Metadata } from "next";
import { MENTAL_HEALTH_TIPS } from "@/lib/mental-health";
import MentalHealthServicesClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Mental Health Services in Cyprus";
const description = "English-speaking therapists, psychologists, and psychiatrists across Cyprus.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/mental-health-services/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/mental-health-services/`, type: "website" },
};

export default function MentalHealthServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MENTAL_HEALTH_TIPS.map((t) => ({
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
      <MentalHealthServicesClient />
      <SectionRelatedGuides sectionSlug="mental-health-services" />
    </>
  );
}
