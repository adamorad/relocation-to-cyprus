import type { Metadata } from "next";
import EvChargingClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "EV Charging Stations in Cyprus — Directory";
const description = "Public EV charging points by city with charger type and operator details.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/ev-charging/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/ev-charging/`, type: "website" },
};

export default function EvChargingPage() {
  return <EvChargingClient />;
}
