import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityTemplate } from "@/components/templates/CityTemplate";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { listingsForRegion } from "@/lib/listings";
import { REGIONS, regionBySlug } from "@/lib/regions";

const SITE_URL = "https://realcy.app";

export function generateStaticParams() {
	return REGIONS.map((r) => ({ name: r.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ name: string }>;
}): Promise<Metadata> {
	const { name } = await params;
	const r = regionBySlug(name);
	if (!r) return {};
	return {
		title: `${r.name} new developments: buy or relocate to ${r.name}, Cyprus`,
		description: r.oneLiner + " " + r.intro.slice(0, 120) + "…",
		alternates: { canonical: `/regions/${r.slug}/` },
		openGraph: {
			title: `${r.name}: Cyprus new developments`,
			description: r.oneLiner,
			url: `${SITE_URL}/regions/${r.slug}/`,
			type: "website",
			images: [
				{ url: "https://realcy.app/og-default.webp", width: 1200, height: 630 },
			],
		},
	};
}

export default async function RegionPage({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;
	const r = regionBySlug(name);
	if (!r) notFound();
	const listingCount = listingsForRegion(r.name).length;

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: `${r.name} new developments`,
		description: r.oneLiner,
		author: { "@type": "Organization", name: "RealCy.app" },
		publisher: { "@type": "Organization", name: "RealCy.app" },
		datePublished: "2026-05-22",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}/regions/${r.slug}/`,
		},
	};
	const toId = (h: string) =>
		h
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");
	const relatedGuides = [
		{
			href: "/guides/best-areas-to-live-cyprus/",
			title: "Best areas to live in Cyprus",
			desc: "Compare cities and neighbourhoods",
		},
		{
			href: "/guides/buying-vs-renting-cyprus/",
			title: "Buying vs renting in Cyprus",
			desc: "Which makes financial sense",
		},
		{
			href: "/guides/cost-of-living/",
			title: "Cost of living in Cyprus",
			desc: "Monthly budgets by city",
		},
		{
			href: "/guides/banking-in-cyprus/",
			title: "Opening a bank account",
			desc: "Banking as a new resident",
		},
	];
	const relatedTools = [
		{ href: "/tools/rent-vs-buy-calculator/", title: "Rent vs buy calculator" },
		{ href: "/tools/city-comparison/", title: "Compare cities" },
		{
			href: "/tools/relocation-cost-calculator/",
			title: "Relocation cost calculator",
		},
	];

	return (
		<CityTemplate
			pagefindType="city"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Regions", href: "/regions/" },
					{ label: r.name },
				],
				eyebrow: "Region guide",
				title: `${r.name}, Cyprus`,
				intro: r.oneLiner,
			}}
			contents={[
				...r.sections.map((s) => ({ id: toId(s.heading), label: s.heading })),
				{ id: "new-developments", label: "New developments" },
				{ id: "planning", label: "Planning your move" },
			]}
			cta={
				<Section
					id="new-developments"
					title={`New developments in ${r.name}`}
					description={
						listingCount > 0
							? `${listingCount} new-build developments are listed in ${r.name}.`
							: undefined
					}
				>
					<ButtonLink href="/listings/" size="lg">
						New developments in {r.name}
					</ButtonLink>
				</Section>
			}
			related={
				<div data-pagefind-ignore>
					<Section
						id="planning"
						title={`Planning your move to ${r.name}?`}
						description="Guides and tools to help you decide where to live and what to buy."
					>
						<CardGrid cols={2}>
							{relatedGuides.map((g) => (
								<CardGridItem key={g.href}>
									<Card
										variant="text"
										href={g.href}
										title={g.title}
										text={g.desc}
									/>
								</CardGridItem>
							))}
						</CardGrid>
						<div className="mt-5 flex flex-wrap gap-3">
							{relatedTools.map((t) => (
								<ButtonLink key={t.href} href={t.href} variant="secondary">
									{t.title}
								</ButtonLink>
							))}
						</div>
					</Section>
				</div>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(articleJsonLd),
				}}
			/>
			<p className="text-lg leading-relaxed text-ink">{r.intro}</p>
			{r.sections.map((s) => (
				<Section key={s.heading} id={toId(s.heading)} title={s.heading}>
					<p className="text-base leading-relaxed text-ink">{s.body}</p>
				</Section>
			))}
		</CityTemplate>
	);
}
