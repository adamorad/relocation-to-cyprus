import type { Metadata } from "next";
import AccountantsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Accountants & Tax Advisors in Cyprus";
const description = "ICPAC-registered accountants with experience in expat non-dom filings and company tax.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/accountants/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/accountants/`, type: "website" },
};

export default function AccountantsPage() {
  return <AccountantsClient />;
}
