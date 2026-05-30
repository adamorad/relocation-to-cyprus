import type { Metadata } from "next";
import ImmigrationLawyersClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Immigration Lawyers in Cyprus";
const description = "Immigration specialists covering digital nomad visas, PR by investment, and work permits.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/immigration-lawyers/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/immigration-lawyers/`, type: "website" },
};

export default function ImmigrationLawyersPage() {
  return <ImmigrationLawyersClient />;
}
