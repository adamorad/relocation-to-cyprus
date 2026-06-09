import type { Metadata } from "next";
import { VIEW_BAR_TIPS } from "@/lib/rooftop-bars";
import RooftopBarsClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Rooftop & Sea View Bars in Cyprus";
const description = "Rooftop and sea-view venues across the island with price ranges and reservation notes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/rooftop-bars/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/rooftop-bars/`, type: "website" },
};

export default function RooftopBarsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VIEW_BAR_TIPS.map((t) => ({
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
      <RooftopBarsClient />
      <SectionRelatedGuides sectionSlug="rooftop-bars" />
    </>
  );
}
