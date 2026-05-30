import type { Metadata } from "next";
import EventsCalendarClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Cyprus Annual Events & Festivals Calendar";
const description = "Cyprus annual events and festivals calendar — 30+ events across all districts, filterable by city and month.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/events-calendar/" },
  openGraph: { title, description, url: `${SITE_URL}/tools/events-calendar/`, type: "website" },
};

export default function EventsCalendarPage() {
  return <EventsCalendarClient />;
}
