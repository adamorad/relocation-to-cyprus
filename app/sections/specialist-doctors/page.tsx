import type { Metadata } from "next";
import SpecialistDoctorsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Specialist Doctors in Cyprus";
const description = "English-speaking specialist consultants with GeSY status and private pricing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/specialist-doctors/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/specialist-doctors/`, type: "website" },
};

export default function SpecialistDoctorsPage() {
  return <SpecialistDoctorsClient />;
}
