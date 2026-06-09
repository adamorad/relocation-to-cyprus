import type { Metadata } from "next";
import { VET_TIPS } from "@/lib/veterinary";
import VeterinaryServicesClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Veterinary Services in Cyprus";
const description = "English-speaking vet clinics with emergency care and specialist referrals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/veterinary-services/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/veterinary-services/`, type: "website" },
};

export default function VeterinaryServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VET_TIPS.map((t) => ({
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
      <VeterinaryServicesClient />
      <SectionRelatedGuides sectionSlug="veterinary-services" />
    </>
  );
}
