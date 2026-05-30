import type { Metadata } from "next";
import HalalKosherClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Halal & Kosher Food in Cyprus";
const description = "Certified halal and kosher restaurants, butchers, and grocery suppliers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/halal-kosher/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/halal-kosher/`, type: "website" },
};

export default function HalalKosherPage() {
  return <HalalKosherClient />;
}
