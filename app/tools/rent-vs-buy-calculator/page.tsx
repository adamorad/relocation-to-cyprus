import type { Metadata } from "next";
import RentVsBuyCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Rent vs Buy Calculator — Cyprus";
const description = "Should you rent or buy in Cyprus? Compare total cost over 1–10 years including mortgage, appreciation, and opportunity cost of your deposit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/rent-vs-buy-calculator/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/rent-vs-buy-calculator/`, type: "website" },
};

export default function RentVsBuyCalculatorPage() {
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
      <RentVsBuyCalculatorClient />
    </>
  );
}
