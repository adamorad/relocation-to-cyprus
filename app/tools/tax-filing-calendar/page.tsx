import type { Metadata } from "next";
import TaxFilingCalendarClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Annual Tax Filing Calendar";
const description = "All key Cyprus annual tax deadlines colour-coded by urgency — IR1, IR4, VIES, VAT, and employer submissions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/tax-filing-calendar/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/tax-filing-calendar/`, type: "website" },
};

export default function TaxFilingCalendarPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/` },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TaxFilingCalendarClient />
    </>
  );
}
