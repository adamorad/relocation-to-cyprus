import type { Metadata } from "next";
import { formatListingPrice, titleCaseName } from "@/app/listings/format";
import { LISTINGS } from "@/lib/listingsData";
import ShortlistClient, { type SavedCard } from "./client";

export const metadata: Metadata = {
	title: "Saved developments",
	robots: { index: false, follow: true },
};

export default function MyShortlistPage() {
	// Display-ready cards built on the server, so the client gets names, prices
	// and one image per listing instead of the full listing records.
	const cards: SavedCard[] = LISTINGS.map((l) => ({
		slug: l.slug,
		name: titleCaseName(l.title),
		city: l.regionCity,
		location: l.location,
		price: formatListingPrice(l.priceRange),
		developer: l.developer?.name ? titleCaseName(l.developer.name) : null,
		image: l.images?.[0] ?? null,
	}));
	return <ShortlistClient listings={cards} />;
}
