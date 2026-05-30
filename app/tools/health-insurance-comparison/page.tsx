import type { Metadata } from "next";
import HealthInsuranceComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Private Health Insurance for Cyprus Residents";
const description = "Compare private health insurance for Cyprus residents from AXA, Bupa, Cigna, and Allianz — premiums, coverage, and GeSY compatibility.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/health-insurance-comparison/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/health-insurance-comparison/`, type: "website" },
};

export default function HealthInsuranceComparisonPage() {
  return <HealthInsuranceComparisonClient />;
}
