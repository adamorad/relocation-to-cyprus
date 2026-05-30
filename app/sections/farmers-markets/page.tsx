import type { Metadata } from "next";
import FarmersMarketsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Farmers Markets & Local Produce in Cyprus";
const description = "Weekly markets and local produce stalls across all districts with operating days.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/farmers-markets/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/farmers-markets/`, type: "website" },
};

export default function FarmersMarketsPage() {
  return <FarmersMarketsClient />;
}
