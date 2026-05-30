import type { Metadata } from "next";
import VisaPathwayFinderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Visa Pathway Finder";
const description = "Answer 2 questions to find the right Cyprus visa or residency route — Digital Nomad Visa, PR by Investment, EU registration, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/visa-pathway-finder/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/visa-pathway-finder/`, type: "website" },
};

export default function VisaPathwayFinderPage() {
  return <VisaPathwayFinderClient />;
}
