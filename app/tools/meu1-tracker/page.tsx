import type { Metadata } from "next";
import Meu1TrackerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "MEU1 Registration Tracker — Cyprus EU Residency Checklist";
const description = "Interactive checklist for EU citizens registering their residence in Cyprus (MEU1). Track required documents and steps to completion.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/meu1-tracker/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/meu1-tracker/`, type: "website" },
};

export default function Meu1TrackerPage() {
  return <Meu1TrackerClient />;
}
