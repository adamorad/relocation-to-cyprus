import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { LISTINGS } from "@/lib/listingsData";

export const metadata: Metadata = {
  title: "Cyprus New Developments — interactive 3D map by region",
  description:
    "Explore 260+ new-build apartments, residences and villas across Cyprus on an interactive 3D map. Filter by Paphos, Limassol, Larnaca, Nicosia or Ayia Napa, by price, bedrooms, view and developer.",
  alternates: { canonical: "/" },
};

const SITE_URL = "https://realcy.app";

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cyprus New Developments",
    url: SITE_URL,
    description:
      "Interactive 3D map of new-build developments across Cyprus, with content guides for relocators.",
    publisher: { "@type": "Organization", name: "Cyprus New Developments" },
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cyprus new developments",
    numberOfItems: LISTINGS.length,
    itemListElement: LISTINGS.slice(0, 50).map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/listings/${l.slug}/`,
      name: l.title,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteJsonLd, itemList]),
        }}
      />
      <AppShell />
    </>
  );
}
