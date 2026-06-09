import type { Metadata } from "next";
import { HEALTHCARE_TIPS } from "@/lib/healthcare";
import SpecialistDoctorsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Specialist Doctors in Cyprus";
const description = "English-speaking specialist consultants with GeSY status and private pricing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/specialist-doctors/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/specialist-doctors/`, type: "website" },
};

export default function SpecialistDoctorsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HEALTHCARE_TIPS.map((t) => ({
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
      <SpecialistDoctorsClient />
    </>
  );
}
