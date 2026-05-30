import type { Metadata } from "next";
import ArtCultureClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Art Galleries, Museums & Cultural Venues in Cyprus";
const description = "Galleries, museums, and cultural venues with English signage and exhibition schedules.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/art-culture/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/art-culture/`, type: "website" },
};

export default function ArtCulturePage() {
  return <ArtCultureClient />;
}
