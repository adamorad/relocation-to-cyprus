import type { Metadata } from "next";
import { CHILDCARE_TIPS } from "@/lib/childcare";
import ChildcareNurseriesClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Childcare & Nurseries in Cyprus";
const description = "Registered nurseries and pre-schools with English instruction across all districts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/childcare-nurseries/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/childcare-nurseries/`, type: "website" },
};

export default function ChildcareNurseriesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CHILDCARE_TIPS.map((t) => ({
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
      <ChildcareNurseriesClient />
      <SectionRelatedGuides sectionSlug="childcare-nurseries" />
    </>
  );
}
