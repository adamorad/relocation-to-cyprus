import type { Metadata } from "next";
import { VOLUNTEER_TIPS } from "@/lib/volunteering";
import VolunteeringClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Volunteering in Cyprus";
const description = "NGOs, animal shelters, environmental groups, and community orgs welcoming expat volunteers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/volunteering/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/volunteering/`, type: "website" },
};

export default function VolunteeringPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VOLUNTEER_TIPS.map((t) => ({
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
      <VolunteeringClient />
      <SectionRelatedGuides sectionSlug="volunteering" />
    </>
  );
}
