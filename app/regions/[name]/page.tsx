import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityTemplate } from "@/components/templates/CityTemplate";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { InfoCards } from "@/components/ui/InfoCards";
import { Section } from "@/components/ui/Section";
import { REGIONS, type RegionInfo, regionBySlug } from "@/lib/regions";
import { DAILY_TOPICS, hubHref } from "@/lib/topics";

const SITE_URL = "https://realcy.app";

const pageTitle = (r: RegionInfo) =>
	`Living in ${r.name}: areas, healthcare, schools and costs`;

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
	const ogImage = r.image
		? {
				url: `${SITE_URL}${r.image.src}`,
				width: r.image.width,
				height: r.image.height,
				alt: r.image.alt ?? `Living in ${r.name}`,
			}
		: { url: "https://realcy.app/og-default.webp", width: 1200, height: 630 };
	return {
		title: pageTitle(r),
		description: r.summary,
		alternates: { canonical: `/regions/${r.slug}/` },
		openGraph: {
			title: `Living in ${r.name}, Cyprus`,
			description: r.summary,
			url: `${SITE_URL}/regions/${r.slug}/`,
			type: "website",
			images: [ogImage],
		},
		twitter: {
			card: "summary_large_image",
			title: `Living in ${r.name}, Cyprus`,
			description: r.summary,
			images: [ogImage.url],
		},
	};
}

function Paragraphs({ items }: { items: string[] }) {
	return (
		<div className="space-y-4">
			{items.map((p) => (
				<p key={p} className="text-base leading-relaxed text-ink">
					{p}
				</p>
			))}
		</div>
	);
}

export default async function RegionPage({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;
	const r = regionBySlug(name);
	if (!r) notFound();

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: `Living in ${r.name}`,
		description: r.summary,
		author: { "@type": "Organization", name: "RealCy.app" },
		publisher: { "@type": "Organization", name: "RealCy.app" },
		datePublished: "2026-05-22",
		...(r.image && { image: `${SITE_URL}${r.image.src}` }),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}/regions/${r.slug}/`,
		},
	};

	// Buyer content (r.property) is intentionally not rendered here; Phase 4
	// shows it in the Property area.
	const sections: { id: string; label: string; show: boolean }[] = [
		{ id: "areas", label: "Areas and everyday life", show: r.areas.length > 0 },
		{
			id: "getting-around",
			label: "Getting around",
			show: r.gettingAround.length > 0,
		},
		{ id: "healthcare", label: "Healthcare", show: r.healthcare.length > 0 },
		{
			id: "schools",
			label: "Schools and childcare",
			show: r.schools.length > 0,
		},
		{
			id: "things-to-do",
			label: "Beaches, food and things to do",
			show: r.leisure.length > 0,
		},
		{ id: "costs", label: "Monthly costs", show: r.costs.rows.length > 0 },
		{ id: "faq", label: "Frequently asked questions", show: r.faqs.length > 0 },
		{ id: "practical", label: "Practical notes", show: r.practical.length > 0 },
		{ id: "topics", label: "Explore by topic", show: true },
	];
	const shown = new Set(sections.filter((s) => s.show).map((s) => s.id));

	return (
		<CityTemplate
			pagefindType="city"
			hero={r.image}
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Cities", href: "/regions/" },
					{ label: r.name },
				],
				eyebrow: "City guide",
				title: `Living in ${r.name}`,
				intro: r.intro,
			}}
			contents={sections
				.filter((s) => s.show)
				.map(({ id, label }) => ({ id, label }))}
			cta={
				<Section
					id="topics"
					title={`Explore ${r.name} by topic`}
					description={`Guides, directories and tools for daily life, filtered to ${r.name}.`}
				>
					<div data-pagefind-ignore>
						<CardGrid cols={4}>
							{DAILY_TOPICS.map((t) => (
								<CardGridItem key={t.slug}>
									<Card
										variant="icon"
										icon={t.icon}
										href={`${hubHref(t)}?city=${r.slug}`}
										title={t.name}
									/>
								</CardGridItem>
							))}
						</CardGrid>
					</div>
				</Section>
			}
			related={
				<div data-pagefind-ignore>
					<ButtonLink href={`/listings/?city=${r.slug}`} variant="secondary">
						New developments in {r.name}
					</ButtonLink>
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
			{shown.has("areas") ? (
				<Section id="areas" title="Areas and everyday life">
					<Paragraphs items={r.areas} />
				</Section>
			) : null}
			{shown.has("getting-around") ? (
				<Section id="getting-around" title="Getting around">
					<Paragraphs items={r.gettingAround} />
				</Section>
			) : null}
			{shown.has("healthcare") ? (
				<Section id="healthcare" title="Healthcare">
					<Paragraphs items={r.healthcare} />
				</Section>
			) : null}
			{shown.has("schools") ? (
				<Section id="schools" title="Schools and childcare">
					<Paragraphs items={r.schools} />
				</Section>
			) : null}
			{shown.has("things-to-do") ? (
				<Section id="things-to-do" title="Beaches, food and things to do">
					<Paragraphs items={r.leisure} />
				</Section>
			) : null}
			{shown.has("costs") ? (
				<Section id="costs" title="Monthly costs" description={r.costs.summary}>
					<DataTable
						caption={`Sample monthly budget for a couple in ${r.name}`}
						columns={[
							{ header: "Item" },
							{ header: "Per month", align: "right" },
						]}
						rows={r.costs.rows.map((c) => [c.item, c.amount])}
						footer={["Total", r.costs.total]}
					/>
					<div className="mt-4 space-y-3">
						{r.costs.notes.map((n) => (
							<p key={n} className="text-base leading-relaxed text-ink">
								{n}
							</p>
						))}
					</div>
				</Section>
			) : null}
			{shown.has("faq") ? (
				<Section id="faq" title="Frequently asked questions">
					<InfoCards
						columns={1}
						items={r.faqs.map((f) => ({ heading: f.question, body: f.answer }))}
					/>
				</Section>
			) : null}
			{shown.has("practical") ? (
				<Section id="practical" title="Practical notes">
					<ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-ink">
						{r.practical.map((p) => (
							<li key={p}>{p}</li>
						))}
					</ul>
				</Section>
			) : null}
		</CityTemplate>
	);
}
