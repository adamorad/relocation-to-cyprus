import type { Metadata } from "next";
import { EV_TIPS } from "@/lib/ev-charging";
import EvChargingClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "EV Charging Stations in Cyprus — Directory";
const description = "Public EV charging points by city with charger type and operator details.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/ev-charging/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/ev-charging/`, type: "website" },
};

export default function EvChargingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: EV_TIPS.map((t) => ({
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
      <EvChargingClient />
      <SectionRelatedGuides sectionSlug="ev-charging" />
    </>
  );
}
