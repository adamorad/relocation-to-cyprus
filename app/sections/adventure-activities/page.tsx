import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ListingContact } from "@/components/ui/ListingContact";
import { listingId } from "@/lib/food";
import { ADVENTURE_ACTIVITIES } from "@/lib/adventure-activities";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { topicCrumb } from "@/lib/topic-map";

const SITE_URL = "https://realcy.app";
const title = "Adventure Activities in Cyprus";
const description =
	"Outdoor adventure parks, ropes courses, team-building and similar outdoor activity providers in Cyprus.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/adventure-activities/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/adventure-activities/`,
		type: "website",
	},
};

export default function AdventureActivitiesPage() {
	return (
		<DirectoryTemplate
			slug="adventure-activities"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "adventure-activities"),
					{ label: "Adventure Activities" },
				],
				eyebrow: "Sports & Recreation",
				title: "Adventure Activities in Cyprus",
				intro:
					"Outdoor adventure parks, ropes courses, team-building and similar outdoor activity providers in Cyprus.",
			}}
			related={
				<MoreOnTopic type="directory" slug="adventure-activities" cols={3} />
			}
		>
			<h2 className="mt-8 text-2xl font-bold tracking-tight text-ink">
				{ADVENTURE_ACTIVITIES.length} venue
				{ADVENTURE_ACTIVITIES.length !== 1 ? "s" : ""} listed
			</h2>
			<CardGrid className="mt-5">
				{ADVENTURE_ACTIVITIES.map((v) => (
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
