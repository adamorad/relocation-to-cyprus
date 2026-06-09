import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { LISTINGS } from "@/lib/listingsData";

export const metadata: Metadata = {
  title: {
    absolute:
      "RealCy.app - Your Cyprus Portal | New Developments, Relocation & More",
  },
  description:
    "RealCy.app — your portal for anything Cyprus. Browse 260+ new-build developments on an interactive map. 30+ service directories, 16 relocation tools, and 68 in-depth guides.",
  alternates: { canonical: "/" },
};

const SITE_URL = "https://realcy.app";

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RealCy.app",
    alternateName: "RealCy",
    url: SITE_URL,
    description:
      "Your portal for anything Cyprus — new-build real estate, relocation guides, interactive tools, and curated service directories.",
    publisher: { "@type": "Organization", name: "RealCy.app" },
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
