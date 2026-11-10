import type { Metadata } from "next";
import Link from "next/link";
import { titleCaseName } from "@/app/listings/format";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { DEVELOPERS } from "@/lib/developers";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const h1 = "Cyprus property developers";
const topDevelopers = [...DEVELOPERS]
	.sort((a, b) => b.listings.length - a.listings.length)
	.slice(0, 3);
const projectCount = DEVELOPERS.reduce((n, d) => n + d.listings.length, 0);
const title = `Developers in Cyprus: ${DEVELOPERS.length} property developers compared`;
const description = `Developers in Cyprus: ${DEVELOPERS.length} property developers and ${projectCount} new-build projects in Paphos, Limassol, Larnaca and Ayia Napa, with locations and price ranges.`;

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
				intro: (
					<>
						Realcy lists {DEVELOPERS.length} property developers in Cyprus
						behind {projectCount} new-build projects, including{" "}
						{topDevelopers.map((dev, i) => (
							<span key={dev.slug}>
								{i > 0 ? (i === topDevelopers.length - 1 ? " and " : ", ") : ""}
								<Link href={`/developers/${dev.slug}/`} className="underline">
									{titleCaseName(dev.name)}
								</Link>
							</span>
						))}
						. Pick a developer to see its projects, locations and price
						ranges, or browse every new-build home in the{" "}
						<Link href="/listings/" className="underline">
							new developments listings
						</Link>
						. For the wider buying picture, start at the{" "}
						<Link href="/property/" className="underline">
							Cyprus property hub
						</Link>
						. Prices are shown as stated by each developer.
					</>
				),
			}}
		>
			<h2 className="text-xl font-semibold">How to compare developers</h2>
			<ul className="mb-8 mt-3 list-disc space-y-1 pl-5">
				<li>Number of projects: shown on each developer card.</li>
				<li>Regions: the cities where each developer has projects.</li>
				<li>
					Shortlist the ones you like in{" "}
					<Link href="/my-shortlist/" className="underline">
						My shortlist
					</Link>
					.
				</li>
			</ul>
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
