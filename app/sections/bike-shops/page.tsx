import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ListingContact } from "@/components/ui/ListingContact";
import {
	BIKE_SHOPS,
	type BikeShop,
	OTHER_LOCATIONS,
} from "@/lib/bike-shops";
import { listingId } from "@/lib/food";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { topicCrumb } from "@/lib/topic-map";

const SITE_URL = "https://realcy.app";
const title = "Bike Shops & Rentals in Cyprus";
const description =
	"Bike shops and bike rentals in Cyprus, with contact details confirmed by each business.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/bike-shops/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/bike-shops/`,
		type: "website",
	},
};

const GROUP_ORDER = [
	"Limassol",
	"Paphos",
	"Larnaca",
	"Nicosia",
	"Ayia Napa",
	OTHER_LOCATIONS,
] as const;

const groupOf = (s: BikeShop): string => s.city ?? OTHER_LOCATIONS;

export default function BikeShopsPage() {
	const groups = GROUP_ORDER.map((g) => ({
		name: g,
		shops: BIKE_SHOPS.filter((s) => groupOf(s) === g),
	})).filter((g) => g.shops.length > 0);

	return (
		<DirectoryTemplate
			slug="bike-shops"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "bike-shops"),
					{ label: "Bike Shops & Rentals" },
				],
				eyebrow: "Sports & Recreation",
				title,
				intro:
					"Bike shops and bike rentals in Cyprus, with contact details confirmed by each business. Shops in towns outside the main cities are listed under Other locations. Contact the shop to check opening times and availability.",
			}}
			related={<MoreOnTopic type="directory" slug="bike-shops" cols={3} />}
		>
			<h2 className="mt-8 text-2xl font-bold tracking-tight text-ink">
				{BIKE_SHOPS.length} shop{BIKE_SHOPS.length !== 1 ? "s" : ""} listed
			</h2>
			{groups.map((g) => (
				<section key={g.name} className="mt-6" aria-label={g.name}>
					<h3 className="text-xl font-semibold text-ink">{g.name}</h3>
					<CardGrid className="mt-4">
						{g.shops.map((s) => (
							<CardGridItem key={s.name} id={listingId(s.name)}>
								<Card
									variant="text"
									title={s.name}
									meta={s.town ?? s.city}
									footer={
										<ListingContact
											address={s.address}
											phone={s.phone}
											email={s.email}
											website={s.website}
										/>
									}
								/>
							</CardGridItem>
						))}
					</CardGrid>
				</section>
			))}
		</DirectoryTemplate>
	);
}
