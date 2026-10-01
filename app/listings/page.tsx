import type { Metadata } from "next";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { allListings } from "@/lib/listings";
import { citySlugFor, formatPrice, titleCaseName } from "./format";
import ListingsClient, { type ListingCardData } from "./ListingsClient";

const SITE_URL = "https://realcy.app";
const title = "New developments in Cyprus";
const description =
	"Browse new-build developments across Cyprus. Compare prices, locations and features in Paphos, Limassol, Larnaca and Ayia Napa.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/listings/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/listings/`,
		type: "website",
	},
};

export default function ListingsIndexPage() {
	const listings = allListings();
	const cards: ListingCardData[] = listings.map((l) => ({
		slug: l.slug,
		name: titleCaseName(l.title),
		city: citySlugFor(l.regionCity),
		location: l.location ?? l.regionCity,
		price: formatPrice(l.priceRange),
		image: l.images?.[0] ?? null,
	}));

	return (
		<HubTemplate
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "New developments" },
				],
				eyebrow: `${listings.length} developments`,
				title,
				intro:
					"New-build projects across Cyprus. Filter by city, then open a project to compare prices, locations and unit types.",
			}}
		>
			<ListingsClient listings={cards} />
		</HubTemplate>
	);
}
