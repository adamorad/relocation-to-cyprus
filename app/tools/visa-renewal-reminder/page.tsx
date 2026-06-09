import type { Metadata } from "next";
import VisaRenewalReminderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Visa & Document Renewal Reminder — Cyprus";
const description = "Track ARC card, passport, Cyprus visa, and driving licence expiry dates — see what needs renewing and when.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/visa-renewal-reminder/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/visa-renewal-reminder/`, type: "website" },
};

export default function VisaRenewalReminderPage() {
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
      <VisaRenewalReminderClient />
    </>
  );
}
