import type { Metadata } from "next";
import { REGISTERED_ADDRESS_TIPS } from "@/lib/registered-address";
import RegisteredAddressClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Registered Address Providers in Cyprus";
const description = "Virtual office and registered address services for Cyprus-registered companies.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/registered-address/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/registered-address/`, type: "website" },
};

export default function RegisteredAddressPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: REGISTERED_ADDRESS_TIPS.map((t) => ({
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
      <RegisteredAddressClient />
      <SectionRelatedGuides sectionSlug="registered-address" />
    </>
  );
}
