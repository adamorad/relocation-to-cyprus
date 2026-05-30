import type { Metadata } from "next";
import VisaRenewalReminderClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Visa & Document Renewal Reminder — Cyprus";
const description = "Track ARC card, passport, Cyprus visa, and driving licence expiry dates — see what needs renewing and when.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/visa-renewal-reminder/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/visa-renewal-reminder/`, type: "website" },
};

export default function VisaRenewalReminderPage() {
  return <VisaRenewalReminderClient />;
}
