import type { Metadata } from "next";
import { LAWYER_TIPS } from "@/lib/property-lawyers";
import PropertyLawyersClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Property Lawyers in Cyprus — Vetted Directory";
const description = "Vetted conveyancing solicitors specialising in foreign buyer transactions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/property-lawyers/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/property-lawyers/`, type: "website" },
};

export default function PropertyLawyersPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LAWYER_TIPS.map((t) => ({
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
      <PropertyLawyersClient />
      <SectionRelatedGuides sectionSlug="property-lawyers" />
    </>
  );
}
