import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ListingContact } from "@/components/ui/ListingContact";
import { listingId } from "@/lib/food";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { PHOTOGRAPHERS } from "@/lib/photographers";
import { topicCrumb } from "@/lib/topic-map";

const SITE_URL = "https://realcy.app";
const title = "Photographers in Cyprus";
const description =
	"Photographers in Cyprus, with contact details confirmed by each business.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/photographers/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/photographers/`,
		type: "website",
	},
};

export default function PhotographersPage() {
	return (
		<DirectoryTemplate
			slug="photographers"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "photographers"),
					{ label: "Photographers" },
				],
				eyebrow: "Services",
				title,
				intro:
					"Photographers in Cyprus, with contact details confirmed by each business. Contact the photographer to check availability and prices.",
			}}
			related={<MoreOnTopic type="directory" slug="photographers" cols={3} />}
		>
			<h2 className="mt-8 text-2xl font-bold tracking-tight text-ink">
				{PHOTOGRAPHERS.length} photographer
				{PHOTOGRAPHERS.length !== 1 ? "s" : ""} listed
			</h2>
			<CardGrid className="mt-5">
				{PHOTOGRAPHERS.map((p) => (
					<CardGridItem key={p.name} id={listingId(p.name)}>
						<Card
							variant="text"
							title={p.name}
							meta={p.city}
							footer={
								<ListingContact
									address={p.address}
									phone={p.phone}
									email={p.email}
									website={p.website}
								/>
							}
						/>
					</CardGridItem>
				))}
			</CardGrid>
		</DirectoryTemplate>
	);
}
