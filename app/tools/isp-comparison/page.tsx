import type { Metadata } from "next";
import IspComparisonClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Internet & Mobile Providers in Cyprus";
const description = "Compare broadband and mobile plans from Cyta, Epic, Primetel, and Cablenet — speeds, prices, and contract terms across Cyprus.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/isp-comparison/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/isp-comparison/`, type: "website" },
};

export default function IspComparisonPage() {
  return <IspComparisonClient />;
}
