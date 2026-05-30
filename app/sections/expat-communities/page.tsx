import type { Metadata } from "next";
import ExpatCommunitiesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Expat Community Groups in Cyprus";
const description = "Active Facebook groups, WhatsApp communities, and Meetup events by city and nationality.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/expat-communities/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/expat-communities/`, type: "website" },
};

export default function ExpatCommunitiesPage() {
  return <ExpatCommunitiesClient />;
}
