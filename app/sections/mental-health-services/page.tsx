import type { Metadata } from "next";
import MentalHealthServicesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Mental Health Services in Cyprus";
const description = "English-speaking therapists, psychologists, and psychiatrists across Cyprus.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/mental-health-services/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/mental-health-services/`, type: "website" },
};

export default function MentalHealthServicesPage() {
  return <MentalHealthServicesClient />;
}
