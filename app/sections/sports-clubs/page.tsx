import type { Metadata } from "next";
import SportsClubsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Sports & Recreation Clubs in Cyprus";
const description = "Tennis, golf, sailing, padel, hiking groups, and more — with membership fees.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/sports-clubs/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/sports-clubs/`, type: "website" },
};

export default function SportsClubsPage() {
  return <SportsClubsClient />;
}
