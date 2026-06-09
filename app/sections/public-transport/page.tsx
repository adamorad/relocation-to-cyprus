import type { Metadata } from "next";
import { TRANSPORT_TIPS } from "@/lib/public-transport";
import PublicTransportClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Getting Around Cyprus — Public Transport Guide";
const description = "Bus routes, Bolt availability, taxi apps, and monthly pass costs by city.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/public-transport/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/public-transport/`, type: "website" },
};

export default function PublicTransportPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TRANSPORT_TIPS.map((t) => ({
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
      <PublicTransportClient />
      <SectionRelatedGuides sectionSlug="public-transport" />
    </>
  );
}
