import type { Metadata } from "next";
import { ACTIVITY_TIPS } from "@/lib/after-school";
import AfterSchoolActivitiesClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "After-School Activities for Children in Cyprus";
const description = "Sports clubs, music academies, language classes, and arts programs for children aged 4–18.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/after-school-activities/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/after-school-activities/`, type: "website" },
};

export default function AfterSchoolActivitiesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ACTIVITY_TIPS.map((t) => ({
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
      <AfterSchoolActivitiesClient />
      <SectionRelatedGuides sectionSlug="after-school-activities" />
    </>
  );
}
