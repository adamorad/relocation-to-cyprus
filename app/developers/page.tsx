import type { Metadata } from "next";
import { titleCaseName } from "@/app/listings/format";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { DEVELOPERS } from "@/lib/developers";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const h1 = "Cyprus property developers";
const projectCount = DEVELOPERS.reduce((n, d) => n + d.listings.length, 0);
const title = `Property developers in Cyprus: ${DEVELOPERS.length} developers compared`;
const description = `Property developers in Cyprus: ${DEVELOPERS.length} developers and ${projectCount} new-build projects in Paphos, Limassol, Larnaca and Ayia Napa, with locations and price ranges.`;

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/developers/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/developers/`,
		type: "website",
	},
};

export default function DevelopersIndexPage() {
	return (
		<HubTemplate
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Property", href: "/property/" },
					{ label: "Developers" },
				],
				eyebrow: "Property developers",
				title: h1,
				intro: `Realcy lists ${DEVELOPERS.length} property developers in Cyprus behind ${projectCount} new-build projects. Pick a developer to see its projects, locations and price ranges. Prices are shown as stated by the developer and may exclude VAT.`,
			}}
		>
			<h2 className="sr-only">All developers</h2>
			<CardGrid>
				{DEVELOPERS.map((dev) => {
					const name = titleCaseName(dev.name);
					const regions = Array.from(
						new Set(dev.listings.map((l) => l.regionCity)),
					).sort();
					return (
						<CardGridItem key={dev.slug}>
							<Card
								variant="text"
								href={`/developers/${dev.slug}/`}
								logo={{ src: dev.logo, initial: name }}
								title={name}
								meta={`${dev.listings.length} ${dev.listings.length === 1 ? "project" : "projects"}`}
								text={regions.join(", ")}
							/>
						</CardGridItem>
					);
				})}
			</CardGrid>
		</HubTemplate>
	);
}
