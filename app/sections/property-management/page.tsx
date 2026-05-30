import type { Metadata } from "next";
import PropertyManagementClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Property Management Companies in Cyprus";
const description = "Licensed property managers for non-resident owners renting out their Cyprus property.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/property-management/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/property-management/`, type: "website" },
};

export default function PropertyManagementPage() {
  return <PropertyManagementClient />;
}
