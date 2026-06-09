import type { Metadata } from "next";
import { WINE_TIPS } from "@/lib/wineries";
import WineriesClient from "./client";
import { SectionRelatedGuides } from "@/components/SectionRelatedGuides";

const SITE_URL = "https://realcy.app";
const title = "Wineries & Wine Tourism in Cyprus";
const description = "Wine-producing villages and tasting rooms across the Troodos foothills.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/wineries/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/wineries/`, type: "website" },
};

export default function WineriesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WINE_TIPS.map((t) => ({
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
      <WineriesClient />
      <SectionRelatedGuides sectionSlug="wineries" />
    </>
  );
}
