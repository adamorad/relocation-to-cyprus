import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

const SITE_URL = "https://realcy.app";
const title = "Explore Cyprus Relocation Resources — RealCy.app";
const description = "Browse all guides, tools, and directories for relocating to Cyprus — organised by category. Search across 30+ curated resources.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/explore/" },
  openGraph: { title, description, url: `${SITE_URL}/explore/`, type: "website" },
};

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreClient />
    </Suspense>
  );
}
