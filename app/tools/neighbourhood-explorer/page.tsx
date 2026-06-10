import type { Metadata } from "next";
import NeighbourhoodExplorerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Neighbourhood Explorer";
const description =
  "Explore and compare neighbourhoods across Cyprus cities. Filter by vibe, beach access, expat density, schools, and value for money to find your ideal area.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/neighbourhood-explorer/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/neighbourhood-explorer/",
    type: "website",
  },
};

export default function NeighbourhoodExplorerPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: SITE_URL + "/tools/" },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NeighbourhoodExplorerClient />
    </>
  );
}
