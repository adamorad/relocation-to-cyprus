import type { Metadata } from "next";
import CommunityGardensClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Community Gardens & Urban Farming in Cyprus";
const description = "Allotment schemes and urban farming initiatives — plus growing calendar tips for Cyprus's climate.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/community-gardens/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/community-gardens/`, type: "website" },
};

export default function CommunityGardensPage() {
  return <CommunityGardensClient />;
}
