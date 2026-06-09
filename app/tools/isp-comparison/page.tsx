import type { Metadata } from "next";
import IspComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Internet & Mobile Providers in Cyprus";
const description = "Compare broadband and mobile plans from Cyta, Epic, Primetel, and Cablenet — speeds, prices, and contract terms across Cyprus.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/isp-comparison/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/isp-comparison/`, type: "website" },
};

export default function IspComparisonPage() {
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
      <IspComparisonClient />
    </>
  );
}
