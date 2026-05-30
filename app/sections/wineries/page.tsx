import type { Metadata } from "next";
import WineriesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Wineries & Wine Tourism in Cyprus";
const description = "Wine-producing villages and tasting rooms across the Troodos foothills.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/wineries/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/wineries/`, type: "website" },
};

export default function WineriesPage() {
  return <WineriesClient />;
}
