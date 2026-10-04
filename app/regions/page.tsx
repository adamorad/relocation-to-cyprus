import type { Metadata } from "next";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { REGIONS } from "@/lib/regions";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const title = "Cities";
const description =
	"Explore every major city and region in Cyprus: Paphos, Limassol, Larnaca, and Ayia Napa. Compare lifestyle, property, schools, and healthcare.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/regions/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: "https://realcy.app/regions/",
		type: "website",
	},
};

export default function RegionsIndexPage() {
	return (
		<HubTemplate
			header={{
				breadcrumbs: [{ label: "Home", href: "/" }, { label: "Cities" }],
				eyebrow: `${REGIONS.length} cities`,
				title,
				intro:
					"Each city has a distinct character, from Limassol's high-rise coastal energy to Paphos's laid-back appeal. Browse by city to explore property, schools, healthcare and lifestyle.",
			}}
		>
			<CardGrid cols={2}>
				{REGIONS.map((region) => (
					<CardGridItem key={region.slug}>
						<Card
							variant="photo"
							headingLevel="h2"
							icon="pin"
							image={
								region.image
									? { src: region.image.srcSmall, alt: "" }
									: undefined
							}
							href={`/regions/${region.slug}/`}
							title={region.name}
							text={region.oneLiner}
						/>
					</CardGridItem>
				))}
			</CardGrid>
		</HubTemplate>
	);
}
