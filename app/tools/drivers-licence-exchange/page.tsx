import type { Metadata } from "next";
import DriversLicenceExchangeClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Driver's Licence Exchange";
const description =
  "Find out if you can directly exchange your foreign driving licence in Cyprus or whether you need to take theory and practical tests. Includes costs, required documents, and step-by-step guidance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/drivers-licence-exchange/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/drivers-licence-exchange/",
    type: "website",
  },
};

export default function DriversLicenceExchangePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: SITE_URL + "/tools/",
      },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DriversLicenceExchangeClient />
    </>
  );
}
