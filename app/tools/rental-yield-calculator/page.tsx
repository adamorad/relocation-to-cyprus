import type { Metadata } from "next";
import RentalYieldCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Rental Yield Calculator";
const description =
  "Calculate gross yield, net yield, and return on investment for a Cyprus buy-to-let property.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/rental-yield-calculator/" },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/tools/rental-yield-calculator/`,
    type: "website",
  },
};

export default function RentalYieldCalculatorPage() {
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
      <RentalYieldCalculatorClient />
    </>
  );
}
