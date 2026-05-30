import type { Metadata } from "next";
import RooftopBarsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Rooftop & Sea View Bars in Cyprus";
const description = "Rooftop and sea-view venues across the island with price ranges and reservation notes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/rooftop-bars/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/rooftop-bars/`, type: "website" },
};

export default function RooftopBarsPage() {
  return <RooftopBarsClient />;
}
