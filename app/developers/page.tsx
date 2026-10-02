import type { Metadata } from "next";
import { titleCaseName } from "@/app/listings/format";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { DEVELOPERS } from "@/lib/developers";

const SITE_URL = "https://realcy.app";
const title = "Cyprus property developers";
const description = `Browse ${DEVELOPERS.length} property developers active in Cyprus. View their new-build projects, regions and pricing across Paphos, Limassol, Larnaca and Ayia Napa.`;

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/developers/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/developers/`,
		type: "website",
	},
};

export default function DevelopersIndexPage() {
	const projectCount = DEVELOPERS.reduce((n, d) => n + d.listings.length, 0);
	return (
		<HubTemplate
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Property", href: "/property/" },
					{ label: "Developers" },
				],
				eyebrow: "Property developers",
				title,
				intro: `${DEVELOPERS.length} developers behind ${projectCount} new-build projects across Cyprus.`,
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
