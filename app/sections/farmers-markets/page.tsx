import type { Metadata } from "next";
import { MARKET_TIPS } from "@/lib/farmers-markets";
import FarmersMarketsClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Farmers Markets & Local Produce in Cyprus";
const description = "Weekly markets and local produce stalls across all districts with operating days.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/farmers-markets/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/farmers-markets/`, type: "website" },
};

export default function FarmersMarketsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MARKET_TIPS.map((t) => ({
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
      <FarmersMarketsClient />
      <SectionRelatedGuides sectionSlug="farmers-markets" />
    </>
  );
}
