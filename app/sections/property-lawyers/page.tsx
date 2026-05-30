import type { Metadata } from "next";
import PropertyLawyersClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Property Lawyers in Cyprus — Vetted Directory";
const description = "Vetted conveyancing solicitors specialising in foreign buyer transactions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/property-lawyers/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/property-lawyers/`, type: "website" },
};

export default function PropertyLawyersPage() {
  return <PropertyLawyersClient />;
}
