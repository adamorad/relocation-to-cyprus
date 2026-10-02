import type { Metadata } from "next";
import {
	citySlugFor,
	formatListingPrice,
	titleCaseName,
} from "@/app/listings/format";
import type { IconName } from "@/components/icons/Icon";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { DEVELOPERS } from "@/lib/developers";
import { allListings } from "@/lib/listings";
import { PROPERTY_ITEMS, type PropertySection } from "@/lib/property";
import { allTopicItems, type TopicItem } from "@/lib/topic-map";
import { CITY_NAME, CITY_SLUGS, type CitySlug, isCitySlug } from "@/lib/topics";
import { type PreviewCard, PropertyPreview } from "./PropertyPreview";

const SITE_URL = "https://realcy.app";
const PREVIEW_SIZE = 9;
const DEVELOPER_PREVIEW = 6;

const listings = allListings();
const CITY_LIST = `${CITY_SLUGS.slice(0, -1)
	.map((c) => CITY_NAME[c])
	.join(", ")} and ${CITY_NAME[CITY_SLUGS[CITY_SLUGS.length - 1]]}`;

const title = "Property in Cyprus: new developments, guides and tools";
const description = `New-build homes for sale in ${CITY_LIST}: ${listings.length} developments from ${DEVELOPERS.length} developers, plus buying guides and property calculators.`;

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/property/" },
	openGraph: {
		type: "website",
		locale: "en_GB",
		siteName: "RealCy.app",
		title,
		description,
		url: `${SITE_URL}/property/`,
		images: [
			{
				url: `${SITE_URL}/og-default.webp`,
				width: 1200,
				height: 630,
				alt: "RealCy.app: Living in Cyprus",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: [`${SITE_URL}/og-default.webp`],
	},
};

/** Preview cards: per city the first listings, in data order. */
function previewData() {
	const withCity = listings
		.map((l) => ({ l, city: citySlugFor(l.regionCity) }))
		.filter((x): x is { l: (typeof listings)[number]; city: CitySlug } =>
			isCitySlug(x.city),
		);
	const cards: Record<string, PreviewCard> = {};
	const byCity = {} as Record<CitySlug, string[]>;
	const counts = { all: withCity.length } as Record<CitySlug | "all", number>;
	for (const c of CITY_SLUGS) {
		const inCity = withCity.filter((x) => x.city === c);
		counts[c] = inCity.length;
		byCity[c] = inCity.slice(0, PREVIEW_SIZE).map(({ l }) => {
			cards[l.slug] = {
				slug: l.slug,
				name: titleCaseName(l.title),
				location: l.location ?? l.regionCity,
				price: formatListingPrice(l.priceRange),
				image: l.images?.[0] ?? null,
			};
			return l.slug;
		});
	}
	// All cities: take the cities in turn so every city is represented.
	const all: string[] = [];
	for (let i = 0; all.length < PREVIEW_SIZE; i++) {
		let added = false;
		for (const c of CITY_SLUGS) {
			const slug = byCity[c][i];
			if (slug && all.length < PREVIEW_SIZE) {
				all.push(slug);
				added = true;
			}
		}
		if (!added) break;
	}
	return { cards, sets: { all, ...byCity }, counts };
}

/** Topic items for one hub section, in PROPERTY_ITEMS order. */
function itemsFor(section: PropertySection): TopicItem[] {
	const items = allTopicItems();
	return PROPERTY_ITEMS.filter((p) => p.section === section).map((p) => {
		const item = items.find((i) => i.type === p.type && i.slug === p.slug);
		if (!item)
			throw new Error(`lib/property.ts: no ${p.type} "${p.slug}" found`);
		return item;
	});
}

const PROFESSIONAL_ICON: Record<string, IconName> = {
	"property-lawyers": "legal",
	"property-management": "home",
};

const KIND: Record<TopicItem["type"], string> = {
	guide: "Guide",
	directory: "Directory",
	tool: "Tool",
};

/**
 * The Property area: new developments, developers, buying guides, property
 * tools, professionals and saved developments. Every list comes from data
 * (listings, developers, lib/property.ts).
 */
export default function PropertyPage() {
	const preview = previewData();
	const developers = [...DEVELOPERS]
		.sort(
			(a, b) =>
				b.listings.length - a.listings.length || a.name.localeCompare(b.name),
		)
		.slice(0, DEVELOPER_PREVIEW);
	const guides = itemsFor("guides");
	const tools = itemsFor("tools");
	const professionals = itemsFor("professionals");

	return (
		<HubTemplate
			pagefindType="topic"
			header={{
				breadcrumbs: [{ label: "Home", href: "/" }, { label: "Property" }],
				eyebrow: "Property",
				title: "Property in Cyprus",
				intro: `New-build homes for sale in ${CITY_LIST}, for buyers and investors. Browse ${listings.length} developments, see who builds them, and read up on buying, tax and mortgages before you commit.`,
			}}
		>
			<Section
				id="developments"
				title="New developments"
				description="Projects with photos, prices and unit types. Pick a city to narrow the list."
			>
				<PropertyPreview
					cards={preview.cards}
					sets={preview.sets}
					counts={preview.counts}
				/>
			</Section>

			<Section
				id="developers"
				title="Developers"
				description={`${DEVELOPERS.length} developers behind the projects listed here. These have the most projects.`}
			>
				<CardGrid>
					{developers.map((dev) => {
						const name = titleCaseName(dev.name);
						const cities = Array.from(
							new Set(dev.listings.map((l) => l.regionCity)),
						).sort();
						const n = dev.listings.length;
						return (
							<CardGridItem key={dev.slug}>
								<Card
									variant="row"
									href={`/developers/${dev.slug}/`}
									logo={{ src: dev.logo, initial: name }}
									title={name}
									text={cities.join(", ")}
									meta={`${n} ${n === 1 ? "project" : "projects"}`}
								/>
							</CardGridItem>
						);
					})}
				</CardGrid>
				<p className="mt-6">
					<ButtonLink href="/developers/" variant="secondary">
						{`See all ${DEVELOPERS.length} developers`}
					</ButtonLink>
				</p>
			</Section>

			<Section
				id="guides"
				title="Buying guides"
				description="The buying process, title deeds, taxes, mortgages and letting, step by step."
			>
				<CardGrid>
					{guides.map((g) => (
						<CardGridItem key={g.href}>
							<Card
								variant="text"
								href={g.href}
								eyebrow={<Badge>{KIND[g.type]}</Badge>}
								title={g.title}
								text={<span className="line-clamp-3">{g.description}</span>}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			</Section>

			<Section
				id="tools"
				title="Property tools"
				description="Run the numbers on a mortgage, a rental yield or renting against buying, and compare developments."
			>
				<CardGrid>
					{tools.map((t) => (
						<CardGridItem key={t.href}>
							<Card
								variant="text"
								href={t.href}
								eyebrow={<Badge>{KIND[t.type]}</Badge>}
								title={t.title}
								text={<span className="line-clamp-3">{t.description}</span>}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			</Section>

			<Section
				id="professionals"
				title="Professionals"
				description="Lawyers for the purchase and managers for a home you let."
			>
				<CardGrid>
					{professionals.map((p) => (
						<CardGridItem key={p.href}>
							<Card
								variant="row"
								icon={PROFESSIONAL_ICON[p.slug] ?? "paperwork"}
								href={p.href}
								eyebrow={<Badge>{KIND[p.type]}</Badge>}
								title={p.title}
								text={<span className="line-clamp-2">{p.description}</span>}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			</Section>

			<Section id="saved" title="Saved">
				<CardGrid>
					<CardGridItem>
						<Card
							variant="row"
							icon="heart"
							href="/my-shortlist/"
							title="Your saved developments"
							text="Developments you saved with the heart button, kept in this browser."
						/>
					</CardGridItem>
				</CardGrid>
			</Section>
		</HubTemplate>
	);
}
