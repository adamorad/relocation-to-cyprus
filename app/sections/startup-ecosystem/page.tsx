import type { Metadata } from "next";
import { STARTUP_TIPS } from "@/lib/startup-ecosystem";
import StartupEcosystemClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Startup Ecosystem — Coworking, Incubators & Tech Hubs";
const description = "Co-working spaces, incubators, accelerators, and tech hubs across Cyprus.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/startup-ecosystem/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/startup-ecosystem/`, type: "website" },
};

export default function StartupEcosystemPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: STARTUP_TIPS.map((t) => ({
      "@type": "Question",
      name: t.heading,
      acceptedAnswer: { "@type": "Answer", text: t.body },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Directories", item: `${SITE_URL}/sections/` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]) }}
      />
      <StartupEcosystemClient />
      <SectionRelatedGuides sectionSlug="startup-ecosystem" />
    </>
  );
}
