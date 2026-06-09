import type { Metadata } from "next";
import FreelancerVsCompanyClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Freelancer vs Cyprus Ltd Calculator";
const description = "Compare after-tax take-home pay as a Cyprus sole trader vs a Cyprus Ltd — input your income and see a full breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/freelancer-vs-company/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/freelancer-vs-company/`, type: "website" },
};

export default function FreelancerVsCompanyPage() {
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
      <FreelancerVsCompanyClient />
    </>
  );
}
