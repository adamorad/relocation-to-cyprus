import type { Metadata } from "next";
import { IMMIGRATION_LAWYER_TIPS } from "@/lib/immigration-lawyers";
import ImmigrationLawyersClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Immigration Lawyers in Cyprus";
const description = "Immigration specialists covering digital nomad visas, PR by investment, and work permits.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/immigration-lawyers/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/immigration-lawyers/`, type: "website" },
};

export default function ImmigrationLawyersPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: IMMIGRATION_LAWYER_TIPS.map((t) => ({
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
      <ImmigrationLawyersClient />
    </>
  );
}
