import type { Metadata } from "next";
import FlightConnectivityClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Flight Connectivity";
const description = "Direct flight routes from Larnaca (LCA) and Paphos (PFO) airports — browse connections by destination country and airline.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/flight-connectivity/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/flight-connectivity/`, type: "website" },
};

export default function FlightConnectivityPage() {
  return <FlightConnectivityClient />;
}
