import type { Metadata } from "next";
import PublicTransportClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Getting Around Cyprus — Public Transport Guide";
const description = "Bus routes, Bolt availability, taxi apps, and monthly pass costs by city.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/public-transport/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/public-transport/`, type: "website" },
};

export default function PublicTransportPage() {
  return <PublicTransportClient />;
}
