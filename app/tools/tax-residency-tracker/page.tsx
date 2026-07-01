import type { Metadata } from "next";
import TaxResidencyPlannerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus 60-Day Tax Residency Planner";
const description = "Check if you qualify for Cyprus tax residency under the 60-day rule — track your days in Cyprus against the annual threshold.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/tax-residency-tracker/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/tax-residency-tracker/`, type: "website" },
};

export default function TaxResidencyTrackerPage() {
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
      <TaxResidencyPlannerClient />
    </>
  );
}
