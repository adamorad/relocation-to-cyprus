import type { Metadata } from "next";
import FreelancerVsCompanyClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Freelancer vs Cyprus Ltd Calculator";
const description = "Compare after-tax take-home pay as a Cyprus sole trader vs a Cyprus Ltd — input your income and see a full breakdown.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/freelancer-vs-company/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/freelancer-vs-company/`, type: "website" },
};

export default function FreelancerVsCompanyPage() {
  return <FreelancerVsCompanyClient />;
}
