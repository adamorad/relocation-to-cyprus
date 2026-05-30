import type { Metadata } from "next";
import ReligiousServicesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Religious Services in Cyprus";
const description = "English-language churches, mosques, synagogues, and temples across all districts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/religious-services/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/religious-services/`, type: "website" },
};

export default function ReligiousServicesPage() {
  return <ReligiousServicesClient />;
}
