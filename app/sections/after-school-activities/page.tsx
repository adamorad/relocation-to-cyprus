import type { Metadata } from "next";
import AfterSchoolActivitiesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "After-School Activities for Children in Cyprus";
const description = "Sports clubs, music academies, language classes, and arts programs for children aged 4–18.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/after-school-activities/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/after-school-activities/`, type: "website" },
};

export default function AfterSchoolActivitiesPage() {
  return <AfterSchoolActivitiesClient />;
}
