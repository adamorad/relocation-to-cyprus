import type { Metadata } from "next";
import SectionsIndexClient from "./client";

export const metadata: Metadata = {
  title: "Cyprus Relocation Directories — 29 Curated Service Guides | RealCy.app",
  description: "29 curated directories for Cyprus relocators — property lawyers, immigration specialists, accountants, coworking spaces, specialist doctors, expat communities, and more.",
  alternates: { canonical: "/sections/" },
  openGraph: {
    title: "Cyprus Relocation Directories — 29 Curated Service Guides",
    description: "29 curated directories for Cyprus relocators — property lawyers, immigration specialists, accountants, coworking spaces, specialist doctors, expat communities, and more.",
    url: "https://realcy.app/sections/",
    type: "website",
  },
};

export default function SectionsIndexPage() {
  return <SectionsIndexClient />;
}
