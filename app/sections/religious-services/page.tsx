import type { Metadata } from "next";
import { RELIGIOUS_TIPS } from "@/lib/religious-services";
import ReligiousServicesClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Religious Services in Cyprus";
const description = "English-language churches, mosques, synagogues, and temples across all districts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/religious-services/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/religious-services/`, type: "website" },
};

export default function ReligiousServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RELIGIOUS_TIPS.map((t) => ({
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
      <ReligiousServicesClient />
      <SectionRelatedGuides sectionSlug="religious-services" />
    </>
  );
}
