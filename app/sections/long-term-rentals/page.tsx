import type { Metadata } from "next";
import LongTermRentalsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Long-Term Rentals in Cyprus";
const description = "Verified rental listings across all five cities — apartments, villas, and studios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/long-term-rentals/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/long-term-rentals/`, type: "website" },
};

export default function LongTermRentalsPage() {
  return <LongTermRentalsClient />;
}
