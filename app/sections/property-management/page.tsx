import type { Metadata } from "next";
import { PROPERTY_MANAGEMENT_TIPS } from "@/lib/property-management";
import PropertyManagementClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Property Management Companies in Cyprus";
const description = "Licensed property managers for non-resident owners renting out their Cyprus property.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/property-management/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/property-management/`, type: "website" },
};

export default function PropertyManagementPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PROPERTY_MANAGEMENT_TIPS.map((t) => ({
      "@type": "Question",
      name: t.heading,
      acceptedAnswer: { "@type": "Answer", text: t.body },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PropertyManagementClient />
      <SectionRelatedGuides sectionSlug="property-management" />
    </>
  );
}
