import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatListingPrice, titleCaseName } from "@/app/listings/format";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem, LogoTile } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { allDeveloperSlugs, developerBySlug } from "@/lib/developers";

const SITE_URL = "https://realcy.app";

export function generateStaticParams() {
	return allDeveloperSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const dev = developerBySlug(slug);
	if (!dev) return {};
	const name = titleCaseName(dev.name);
	const desc =
		dev.description?.slice(0, 160) ??
		`${name}: Cyprus property developer with ${dev.listings.length} new-build projects.`;
	return {
		title: `${name}: Cyprus new developments`,
		description: desc,
		alternates: { canonical: `/developers/${dev.slug}/` },
		openGraph: {
			title: `${name}: Cyprus new developments`,
			description: desc,
			url: `${SITE_URL}/developers/${dev.slug}/`,
			type: "website",
		},
	};
}

export default async function DeveloperPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const dev = developerBySlug(slug);
	if (!dev) notFound();

	const name = titleCaseName(dev.name);
	const regions = Array.from(
		new Set(dev.listings.map((l) => l.regionCity)),
	).sort();

	return (
		<HubTemplate
			pagefindType="developer"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Developers", href: "/developers/" },
					{ label: name },
				],
				eyebrow: "Property developer",
				title: name,
				intro: `${dev.listings.length} new-build ${dev.listings.length === 1 ? "project" : "projects"}${regions.length ? ` in ${regions.join(", ")}` : ""}.`,
			}}
			after={
				<div className="space-y-6">
					<Section
						title="Next steps"
						description="Browse all developers or explore new developments by city."
					>
						<div className="flex flex-wrap gap-3">
							<ButtonLink href="/developers/" variant="secondary">
								All developers
							</ButtonLink>
							<ButtonLink href="/listings/">
								Browse all new developments
							</ButtonLink>
						</div>
					</Section>
					<Callout tone="legal">
						<strong>Disclaimer:</strong> Developer information and project
						details are sourced from publicly available listings. Always verify
						directly with the developer before making any purchase decisions.
					</Callout>
				</div>
			}
		>
			{dev.description || dev.logo ? (
				<Section title={`About ${name}`} className="mb-10">
					<div className="flex items-start gap-4">
						{dev.logo ? (
							<LogoTile
								logo={{ src: dev.logo, alt: `${name} logo` }}
								size="md"
								eager
							/>
						) : null}
						{dev.description ? (
							<p className="whitespace-pre-line text-base leading-relaxed text-muted">
								{dev.description}
							</p>
						) : null}
					</div>
				</Section>
			) : null}

			<Section title={`Projects (${dev.listings.length})`}>
				<CardGrid>
					{dev.listings.map((l) => {
						const lname = titleCaseName(l.title);
						const price = formatListingPrice(l.priceRange);
						return (
							<CardGridItem key={l.slug}>
								<Card
									variant="photo"
									href={`/listings/${l.slug}/`}
									image={
										l.images?.[0]
											? {
													src: l.images[0],
													alt: `${lname}, ${l.location ?? l.regionCity}`,
												}
											: undefined
									}
									eyebrow={<Badge>{l.location ?? l.regionCity}</Badge>}
									title={lname}
									meta={<span className="font-semibold text-ink">{price}</span>}
								/>
							</CardGridItem>
						);
					})}
				</CardGrid>
			</Section>
		</HubTemplate>
	);
}
