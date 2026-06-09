import type { Metadata } from "next";
import { COMMUNITY_TIPS } from "@/lib/expat-communities";
import ExpatCommunitiesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Expat Community Groups in Cyprus";
const description = "Active Facebook groups, WhatsApp communities, and Meetup events by city and nationality.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/expat-communities/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/expat-communities/`, type: "website" },
};

export default function ExpatCommunitiesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COMMUNITY_TIPS.map((t) => ({
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
      <ExpatCommunitiesClient />
    </>
  );
}
