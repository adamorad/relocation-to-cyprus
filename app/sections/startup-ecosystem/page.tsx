import type { Metadata } from "next";
import StartupEcosystemClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Startup Ecosystem — Coworking, Incubators & Tech Hubs";
const description = "Co-working spaces, incubators, accelerators, and tech hubs across Cyprus.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/startup-ecosystem/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/startup-ecosystem/`, type: "website" },
};

export default function StartupEcosystemPage() {
  return <StartupEcosystemClient />;
}
