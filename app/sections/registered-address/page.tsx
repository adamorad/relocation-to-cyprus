import type { Metadata } from "next";
import RegisteredAddressClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Registered Address Providers in Cyprus";
const description = "Virtual office and registered address services for Cyprus-registered companies.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/registered-address/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/registered-address/`, type: "website" },
};

export default function RegisteredAddressPage() {
  return <RegisteredAddressClient />;
}
