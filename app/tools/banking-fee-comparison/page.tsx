import type { Metadata } from "next";
import BankingFeeComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Banking Fee Comparison";
const description = "Compare monthly fees, transfer costs, and account types at Bank of Cyprus, Hellenic, AstroBank, Revolut, and Wise for Cyprus residents.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/banking-fee-comparison/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/banking-fee-comparison/`, type: "website" },
};

export default function BankingFeeComparisonPage() {
  return <BankingFeeComparisonClient />;
}
