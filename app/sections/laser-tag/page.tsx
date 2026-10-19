import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ListingContact } from "@/components/ui/ListingContact";
import { listingId } from "@/lib/food";
import { LASER_TAG_VENUES } from "@/lib/laser-tag";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { topicCrumb } from "@/lib/topic-map";

const SITE_URL = "https://realcy.app";
const title = "Laser Tag in Cyprus";
const description =
	"Laser tag venues in Cyprus, with contact details confirmed by each venue.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/laser-tag/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/laser-tag/`,
		type: "website",
	},
};

export default function LaserTagPage() {
	return (
		<DirectoryTemplate
			slug="laser-tag"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "laser-tag"),
					{ label: "Laser Tag" },
				],
				eyebrow: "Sports & Recreation",
				title: "Laser Tag in Cyprus",
				intro:
					"Laser tag venues in Cyprus, with contact details confirmed by each venue. Contact the venue to check opening times and book.",
			}}
			related={<MoreOnTopic type="directory" slug="laser-tag" cols={3} />}
		>
			<h2 className="mt-8 text-2xl font-bold tracking-tight text-ink">
				{LASER_TAG_VENUES.length} venue
				{LASER_TAG_VENUES.length !== 1 ? "s" : ""} listed
			</h2>
			<CardGrid className="mt-5">
				{LASER_TAG_VENUES.map((v) => (
					<CardGridItem key={v.name} id={listingId(v.name)}>
						<Card
							variant="text"
							title={v.name}
							meta={v.city}
							footer={
								<ListingContact
									address={v.address}
									phone={v.phone}
									email={v.email}
									website={v.website}
								/>
							}
						/>
					</CardGridItem>
				))}
			</CardGrid>
		</DirectoryTemplate>
	);
}
