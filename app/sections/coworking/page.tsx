import type { Metadata } from "next";
import CoworkingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Coworking Spaces in Cyprus";
const description = "Day pass prices, WiFi speeds, and noise levels for 20+ coworking venues island-wide.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/coworking/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/coworking/`, type: "website" },
};

export default function CoworkingPage() {
  return <CoworkingClient />;
}
