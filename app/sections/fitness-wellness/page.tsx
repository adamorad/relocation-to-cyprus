import type { Metadata } from "next";
import { FITNESS_TIPS } from "@/lib/fitness-wellness";
import FitnessWellnessClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Gyms, Fitness Studios & Wellness in Cyprus";
const description = "Gyms, yoga, CrossFit, Pilates, and wellness centres with pricing and language flags.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/fitness-wellness/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/fitness-wellness/`, type: "website" },
};

export default function FitnessWellnessPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FITNESS_TIPS.map((t) => ({
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
      <FitnessWellnessClient />
    </>
  );
}
