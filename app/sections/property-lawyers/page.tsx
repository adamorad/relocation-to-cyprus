import type { Metadata } from "next";
import { LAWYER_TIPS } from "@/lib/property-lawyers";
import PropertyLawyersClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Property Lawyers in Cyprus — Vetted Directory";
const description = "Vetted conveyancing solicitors specialising in foreign buyer transactions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/property-lawyers/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/property-lawyers/`, type: "website" },
};

export default function PropertyLawyersPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LAWYER_TIPS.map((t) => ({
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
      <PropertyLawyersClient />
    </>
  );
}
