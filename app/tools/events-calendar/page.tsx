import type { Metadata } from "next";
import EventsCalendarClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Annual Events & Festivals Calendar";
const description = "Cyprus annual events and festivals calendar — 30+ events across all districts, filterable by city and month.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/events-calendar/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/events-calendar/`, type: "website" },
};

export default function EventsCalendarPage() {
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
      <EventsCalendarClient />
    </>
  );
}
