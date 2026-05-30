import type { Metadata } from "next";
import ChildcareNurseriesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Childcare & Nurseries in Cyprus";
const description = "Registered nurseries and pre-schools with English instruction across all districts.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/childcare-nurseries/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/childcare-nurseries/`, type: "website" },
};

export default function ChildcareNurseriesPage() {
  return <ChildcareNurseriesClient />;
}
