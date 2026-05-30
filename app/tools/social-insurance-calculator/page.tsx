import type { Metadata } from "next";
import SocialInsuranceCalculatorClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Social Insurance Calculator";
const description = "Calculate Cyprus social insurance contributions for employed and self-employed — monthly and annual breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/social-insurance-calculator/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/social-insurance-calculator/`, type: "website" },
};

export default function SocialInsuranceCalculatorPage() {
  return <SocialInsuranceCalculatorClient />;
}
