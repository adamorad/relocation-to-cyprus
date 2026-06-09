import type { Metadata } from "next";
import { IMMIGRATION_LAWYER_TIPS } from "@/lib/immigration-lawyers";
import ImmigrationLawyersClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Immigration Lawyers in Cyprus";
const description = "Immigration specialists covering digital nomad visas, PR by investment, and work permits.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/immigration-lawyers/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/immigration-lawyers/`, type: "website" },
};

export default function ImmigrationLawyersPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: IMMIGRATION_LAWYER_TIPS.map((t) => ({
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
      <ImmigrationLawyersClient />
      <SectionRelatedGuides sectionSlug="immigration-lawyers" />
    </>
  );
}
