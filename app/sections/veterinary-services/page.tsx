import type { Metadata } from "next";
import { VET_TIPS } from "@/lib/veterinary";
import VeterinaryServicesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Veterinary Services in Cyprus";
const description = "English-speaking vet clinics with emergency care and specialist referrals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/veterinary-services/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/veterinary-services/`, type: "website" },
};

export default function VeterinaryServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VET_TIPS.map((t) => ({
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
      <VeterinaryServicesClient />
    </>
  );
}
