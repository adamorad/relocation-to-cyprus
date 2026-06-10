import type { Metadata } from "next";
import GeSYClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "GeSY Registration Guide";
const description =
  "Step-by-step guide to registering with Cyprus's General Healthcare System (GeSY). Calculate your contributions, understand co-payments, and navigate the registration process.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/gesy-registration/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/gesy-registration/",
    type: "website",
  },
};

export default function GeSYPage() {
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
      <GeSYClient />
    </>
  );
}
