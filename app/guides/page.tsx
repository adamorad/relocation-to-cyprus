import type { Metadata } from "next";
import GuidesClient from "./GuidesClient";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Relocation Guides — RealCy.app";
const description = "Practical relocation guides for moving to Cyprus — immigration, tax, property, family, healthcare, business setup, and lifestyle. Written for people deciding whether and how to move.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guides/" },
  openGraph: { title, description, url: `${SITE_URL}/guides/`, type: "website" },
};

export default function GuidesPage() {
  return <GuidesClient />;
}
