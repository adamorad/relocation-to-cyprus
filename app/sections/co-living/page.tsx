import type { Metadata } from "next";
import CoLivingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Co-Living & Serviced Apartments in Cyprus";
const description = "Month-to-month co-living options for digital nomads and new arrivals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/co-living/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/co-living/`, type: "website" },
};

export default function CoLivingPage() {
  return <CoLivingClient />;
}
