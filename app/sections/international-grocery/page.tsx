import type { Metadata } from "next";
import InternationalGroceryClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "International & Specialty Food Stores in Cyprus";
const description = "Supermarkets and specialty stores carrying Asian, Middle Eastern, and other international foods.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sections/international-grocery/" },
  openGraph: { title, description, url: `${SITE_URL}/sections/international-grocery/`, type: "website" },
};

export default function InternationalGroceryPage() {
  return <InternationalGroceryClient />;
}
