import type { Metadata } from "next";
import VeterinaryServicesClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Veterinary Services in Cyprus";
const description = "English-speaking vet clinics with emergency care and specialist referrals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/veterinary-services/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/veterinary-services/`, type: "website" },
};

export default function VeterinaryServicesPage() {
  return <VeterinaryServicesClient />;
}
