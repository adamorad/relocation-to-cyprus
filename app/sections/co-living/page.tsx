import type { Metadata } from "next";
import { CO_LIVING_TIPS } from "@/lib/co-living";
import CoLivingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Co-Living & Serviced Apartments in Cyprus";
const description = "Month-to-month co-living options for digital nomads and new arrivals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/co-living/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/co-living/`, type: "website" },
};

export default function CoLivingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CO_LIVING_TIPS.map((t) => ({
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
      <CoLivingClient />
    </>
  );
}
