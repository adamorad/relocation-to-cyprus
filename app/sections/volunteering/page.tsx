import type { Metadata } from "next";
import VolunteeringClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Volunteering in Cyprus";
const description = "NGOs, animal shelters, environmental groups, and community orgs welcoming expat volunteers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/volunteering/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/volunteering/`, type: "website" },
};

export default function VolunteeringPage() {
  return <VolunteeringClient />;
}
