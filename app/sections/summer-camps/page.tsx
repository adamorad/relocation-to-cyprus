import type { Metadata } from "next";
import SummerCampsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Summer Camps in Cyprus — Day and Residential";
const description = "Residential and day camps for children — language immersion, sports, STEM, and arts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/summer-camps/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/summer-camps/`, type: "website" },
};

export default function SummerCampsPage() {
  return <SummerCampsClient />;
}
