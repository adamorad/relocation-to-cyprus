import type { Metadata } from "next";
import DoubleTaxTreatyFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Double Tax Treaty Finder";
const description = "Look up Cyprus double tax treaties with 65+ countries — withholding rates on dividends, interest, and royalties.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/double-tax-treaty-finder/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/double-tax-treaty-finder/`, type: "website" },
};

export default function DoubleTaxTreatyFinderPage() {
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
      <DoubleTaxTreatyFinderClient />
    </>
  );
}
