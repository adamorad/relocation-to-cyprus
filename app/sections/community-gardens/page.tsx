import type { Metadata } from "next";
import { GARDEN_TIPS } from "@/lib/community-gardens";
import CommunityGardensClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Community Gardens & Urban Farming in Cyprus";
const description = "Allotment schemes and urban farming initiatives — plus growing calendar tips for Cyprus's climate.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/community-gardens/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/community-gardens/`, type: "website" },
};

export default function CommunityGardensPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GARDEN_TIPS.map((t) => ({
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
      <CommunityGardensClient />
    </>
  );
}
