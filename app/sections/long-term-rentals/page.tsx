import type { Metadata } from "next";
import { RENTAL_TIPS } from "@/lib/long-term-rentals";
import LongTermRentalsClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Long-Term Rentals in Cyprus";
const description = "Verified rental listings across all five cities — apartments, villas, and studios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/long-term-rentals/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/long-term-rentals/`, type: "website" },
};

export default function LongTermRentalsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: RENTAL_TIPS.map((t) => ({
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
      <LongTermRentalsClient />
      <SectionRelatedGuides sectionSlug="long-term-rentals" />
    </>
  );
}
