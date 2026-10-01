import type { Metadata } from "next";
import ShortlistClient from "./client";

export const metadata: Metadata = {
	title: "Saved developments",
	robots: { index: false, follow: true },
};

export default function MyShortlistPage() {
	return <ShortlistClient />;
}
