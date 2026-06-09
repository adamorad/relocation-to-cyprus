import type { Metadata } from "next";
import SocialInsuranceCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Social Insurance Calculator";
const description = "Calculate Cyprus social insurance contributions for employed and self-employed — monthly and annual breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/social-insurance-calculator/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/social-insurance-calculator/`, type: "website" },
};

export default function SocialInsuranceCalculatorPage() {
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
      <SocialInsuranceCalculatorClient />
    </>
  );
}
