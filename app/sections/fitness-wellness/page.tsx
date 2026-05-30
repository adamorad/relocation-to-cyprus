import type { Metadata } from "next";
import FitnessWellnessClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Gyms, Fitness Studios & Wellness in Cyprus";
const description = "Gyms, yoga, CrossFit, Pilates, and wellness centres with pricing and language flags.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/fitness-wellness/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/fitness-wellness/`, type: "website" },
};

export default function FitnessWellnessPage() {
  return <FitnessWellnessClient />;
}
