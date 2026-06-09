import type { Metadata } from "next";
import FlightConnectivityClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Flight Connectivity";
const description = "Direct flight routes from Larnaca (LCA) and Paphos (PFO) airports — browse connections by destination country and airline.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/flight-connectivity/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/flight-connectivity/`, type: "website" },
};

export default function FlightConnectivityPage() {
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
      <FlightConnectivityClient />
    </>
  );
}
