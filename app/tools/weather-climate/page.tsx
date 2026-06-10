import type { Metadata } from "next";
import WeatherClimateClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Weather & Climate";
const description =
  "Explore Cyprus weather month by month — temperatures, sea warmth, rain days, and UV index. Compare Cyprus climate against London, Amsterdam, Berlin, New York, Toronto, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/weather-climate/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/weather-climate/",
    type: "website",
  },
};

export default function WeatherClimatePage() {
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
      <WeatherClimateClient />
    </>
  );
}
