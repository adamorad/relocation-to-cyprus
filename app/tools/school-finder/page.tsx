import type { Metadata } from "next";
import SchoolFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "International School Finder — Cyprus";
const description =
  "Find and compare international schools in Cyprus. Filter by city, curriculum (British, IB, German, French, Waldorf, Montessori), and age group. Includes fees and key details for expat families.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/school-finder/" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/tools/school-finder/",
    type: "website",
  },
};

export default function SchoolFinderPage() {
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
      <SchoolFinderClient />
    </>
  );
}
