import type { Metadata } from "next";
import { COWORK_TIPS } from "@/lib/coworking";
import CoworkingClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Coworking Spaces in Cyprus";
const description = "Day pass prices, WiFi speeds, and noise levels for 20+ coworking venues island-wide.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/coworking/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/coworking/`, type: "website" },
};

export default function CoworkingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COWORK_TIPS.map((t) => ({
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
      <CoworkingClient />
      <SectionRelatedGuides sectionSlug="coworking" />
    </>
  );
}
