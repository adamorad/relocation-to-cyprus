import type { Metadata } from "next";
import GrantsFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Business Grants Finder";
const description = "Search available grants, subsidies, and incentives for businesses in Cyprus — filterable by sector and eligibility.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/grants-finder/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/grants-finder/`, type: "website" },
};

export default function GrantsFinderPage() {
  return <GrantsFinderClient />;
}
