import type { Metadata } from "next";
import { SPORTS_TIPS } from "@/lib/sports-clubs";
import SportsClubsClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Sports & Recreation Clubs in Cyprus";
const description = "Tennis, golf, sailing, padel, hiking groups, and more — with membership fees.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/sports-clubs/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/sports-clubs/`, type: "website" },
};

export default function SportsClubsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SPORTS_TIPS.map((t) => ({
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
      <SportsClubsClient />
      <SectionRelatedGuides sectionSlug="sports-clubs" />
    </>
  );
}
