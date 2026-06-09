import type { Metadata } from "next";
import { DIETARY_TIPS } from "@/lib/halal-kosher";
import HalalKosherClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Halal & Kosher Food in Cyprus";
const description = "Certified halal and kosher restaurants, butchers, and grocery suppliers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/halal-kosher/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/halal-kosher/`, type: "website" },
};

export default function HalalKosherPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DIETARY_TIPS.map((t) => ({
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
      <HalalKosherClient />
      <SectionRelatedGuides sectionSlug="halal-kosher" />
    </>
  );
}
