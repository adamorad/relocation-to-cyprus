import type { Metadata } from "next";
import { SUMMER_CAMP_TIPS } from "@/lib/summer-camps";
import SummerCampsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Summer Camps in Cyprus — Day and Residential";
const description = "Residential and day camps for children — language immersion, sports, STEM, and arts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/summer-camps/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/summer-camps/`, type: "website" },
};

export default function SummerCampsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SUMMER_CAMP_TIPS.map((t) => ({
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
      <SummerCampsClient />
    </>
  );
}
