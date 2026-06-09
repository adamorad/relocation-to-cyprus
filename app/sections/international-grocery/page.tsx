import type { Metadata } from "next";
import { GROCERY_TIPS } from "@/lib/international-grocery";
import InternationalGroceryClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "International & Specialty Food Stores in Cyprus";
const description = "Supermarkets and specialty stores carrying Asian, Middle Eastern, and other international foods.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/international-grocery/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/international-grocery/`, type: "website" },
};

export default function InternationalGroceryPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GROCERY_TIPS.map((t) => ({
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
      <InternationalGroceryClient />
      <SectionRelatedGuides sectionSlug="international-grocery" />
    </>
  );
}
