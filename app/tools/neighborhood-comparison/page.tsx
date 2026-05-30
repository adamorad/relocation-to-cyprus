import type { Metadata } from "next";
import NeighborhoodComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Neighbourhood Comparison Tool";
const description = "Compare all 5 Cyprus cities side by side — rent, property prices, international schools, beach access, expat community, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/neighborhood-comparison/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/neighborhood-comparison/`, type: "website" },
};

export default function NeighborhoodComparisonPage() {
  return <NeighborhoodComparisonClient />;
}
