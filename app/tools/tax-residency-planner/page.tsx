import type { Metadata } from "next";
import TaxResidencyPlannerClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus 60-Day Tax Residency Planner";
const description = "Check if you qualify for Cyprus tax residency under the 60-day rule — track your days in Cyprus against the annual threshold.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/tax-residency-planner/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/tax-residency-planner/`, type: "website" },
};

export default function TaxResidencyPlannerPage() {
  return <TaxResidencyPlannerClient />;
}
