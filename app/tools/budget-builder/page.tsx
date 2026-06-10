import type { Metadata } from "next";
import BudgetBuilderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Monthly Budget Builder";
const description =
  "Estimate your monthly living costs in Cyprus based on city, household size, and lifestyle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/budget-builder/" },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/tools/budget-builder/`,
    type: "website",
  },
};

export default function BudgetBuilderPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools/`,
      },
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
      <BudgetBuilderClient />
    </>
  );
}
