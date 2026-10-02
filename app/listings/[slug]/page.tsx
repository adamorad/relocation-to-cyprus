import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeartButton from "@/components/HeartButton";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";
import { RelatedContent } from "@/components/RelatedContent";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { DEVELOPERS } from "@/lib/developers";
import { allListings, listingBySlug } from "@/lib/listings";
import { formatListingPrice, titleCaseName } from "../format";
import DeveloperCTA from "./DeveloperCTA";

const SITE_URL = "https://realcy.app";

export function generateStaticParams() {
	return allListings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const l = listingBySlug(slug);
	if (!l) return {};
	const heroImage = l.images?.[0] ? `${SITE_URL}${l.images[0]}` : undefined;
	const name = titleCaseName(l.title);
	const desc =
		l.description?.slice(0, 160) ??
		`${name}: new-build development in ${l.location ?? l.regionCity}, Cyprus. ${formatListingPrice(l.priceRange)}.`;
	return {
		title: `${name}: ${l.location ?? l.regionCity}`,
		description: desc,
		alternates: { canonical: `/listings/${l.slug}/` },
		openGraph: {
			title: name,
			description: desc,
			images: heroImage ? [heroImage] : undefined,
			type: "website",
			url: `${SITE_URL}/listings/${l.slug}/`,
		},
	};
}

function priceNumber(s: string | null | undefined): number | null {
	if (!s) return null;
	const m = s.match(/€?\s*([\d.,]+)/);
	if (!m) return null;
	const n = Number(m[1].replace(/[.,]/g, ""));
	return Number.isFinite(n) && n > 1000 ? n : null;
}

export default async function ListingPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const l = listingBySlug(slug);
	if (!l) notFound();

	const offers = l.offers ?? [];
	const beds = Array.from(
		new Set(
			offers
				.map((o) => Number(o.bedrooms ?? o.features?.bedrooms))
				.filter((n) => Number.isFinite(n) && n > 0),
		),
	);
	const lowPrice = priceNumber(l.priceRange);
	const name = titleCaseName(l.title);
	const price = formatListingPrice(l.priceRange);
	const vatExcluded = /\+\s*VAT/i.test(l.priceRange ?? "");
	const dev = l.developer?.name
		? DEVELOPERS.find((d) => d.name === l.developer?.name)
		: undefined;

	const livingAreas = offers
		.map((o) => {
			const raw =
				(o["living area"] as string | undefined) ??
				(o.features?.living_area as string | undefined);
			if (!raw) return null;
			const n = Number((raw.match(/[\d.]+/) ?? [""])[0]);
			return Number.isFinite(n) && n > 0 ? n : null;
		})
		.filter((n): n is number => n !== null);
	const minLiving = livingAreas.length ? Math.min(...livingAreas) : null;
	const maxLiving = livingAreas.length ? Math.max(...livingAreas) : null;
	const bathrooms = Array.from(
		new Set(
			offers
				.map((o) => Number(o.bathrooms ?? o.features?.bathrooms))
				.filter((n) => Number.isFinite(n) && n > 0),
		),
	);

	const productJsonLd = {
		"@context": "https://schema.org",
		"@type": ["Product", "Residence"],
		name: name,
		description: l.description,
		url: `${SITE_URL}/listings/${l.slug}/`,
		image: (l.images ?? []).map((u) => `${SITE_URL}${u}`),
		brand: l.developer?.name
			? { "@type": "Organization", name: titleCaseName(l.developer.name) }
			: undefined,
		address: {
			"@type": "PostalAddress",
			addressLocality: l.regionCity,
			addressRegion: l.regionCity,
			addressCountry: "CY",
			streetAddress: l.location ?? undefined,
		},
		geo:
			Number.isFinite(l.lat) && Number.isFinite(l.lng)
				? { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng }
				: undefined,
		numberOfBedroomsTotal: beds.length ? Math.max(...beds) : undefined,
		numberOfBathroomsTotal: bathrooms.length
			? Math.max(...bathrooms)
			: undefined,
		floorSize:
			minLiving && maxLiving
				? {
						"@type": "QuantitativeValue",
						minValue: minLiving,
						maxValue: maxLiving,
						unitCode: "MTK",
					}
				: undefined,
		offers: lowPrice
			? {
					"@type": "Offer",
					price: lowPrice,
					priceCurrency: "EUR",
					...(vatExcluded
						? {
								priceSpecification: {
									"@type": "PriceSpecification",
									price: lowPrice,
									priceCurrency: "EUR",
									valueAddedTaxIncluded: false,
								},
							}
						: {}),
					url: `${SITE_URL}/listings/${l.slug}/`,
					availability: "https://schema.org/InStock",
				}
			: undefined,
		additionalProperty: [
			...(beds.length
				? [
						{
							"@type": "PropertyValue",
							name: "bedrooms",
							value: beds.join(", "),
						},
					]
				: []),
			...Object.entries(l.specs ?? {}).map(([k, v]) => ({
				"@type": "PropertyValue",
				name: k,
				value: v,
			})),
		],
	};

	const cell = (v: unknown) => {
		const t = v === null || v === undefined ? "" : String(v).trim();
		return t === "" ? "n/a" : t;
	};
	const specRows = Object.entries(l.specs ?? {}).map(([k, v]) => [k, v]);
	const nearbyRows = Object.entries(l.nearby ?? {}).map(([k, v]) => [k, v]);
	const unitRows = offers.map((o) => {
		const f = o.features ?? {};
		return [
			cell(titleCaseName(o.unit ?? o.title ?? "")),
			cell(o.bedrooms ?? f.bedrooms),
			cell(o.bathrooms ?? f.bathrooms),
			cell(o["living area"] ?? f.living_area),
			cell(o.floor ?? f.floor),
			formatListingPrice(o.price),
		];
	});

	return (
		<TemplateMain pagefindType="listing">
			<MetaPixelEvent
				event="ViewContent"
				params={{ content_name: name, content_category: "listing" }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
			/>

			<PageHeader
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "New developments", href: "/listings/" },
					{ label: name },
				]}
				eyebrow={l.location ?? l.regionCity}
				title={name}
				intro={price}
				titleAction={<HeartButton slug={l.slug} name={name} />}
			/>

			<Container width="wide" className="pt-8 md:pt-10">
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
					<div className="min-w-0">
						{l.images && l.images.length > 0 ? (
							<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
								{l.images.slice(0, 6).map((src, i) => {
									const heroAlt = `${name}: ${beds.length ? `${Math.max(...beds)}-bedroom ` : ""}new-build in ${l.regionCity}, Cyprus`;
									return (
										// biome-ignore lint/performance/noImgElement: static export
										<img
											key={src}
											src={src}
											alt={i === 0 ? heroAlt : `${name}: view ${i + 1}`}
											className={
												i === 0
													? "col-span-1 aspect-[16/9] w-full rounded-2xl object-cover md:col-span-2"
													: "aspect-[4/3] w-full rounded-2xl object-cover"
											}
											loading={i === 0 ? "eager" : "lazy"}
											fetchPriority={i === 0 ? "high" : undefined}
										/>
									);
								})}
							</div>
						) : null}

						{l.description ? (
							<Section title="About this development" className="mt-10">
								<p className="whitespace-pre-line text-base leading-relaxed text-muted">
									{l.description}
								</p>
							</Section>
						) : null}

						{unitRows.length > 0 ? (
							<Section title={`Available units (${unitRows.length})`}>
								<DataTable
									caption={`Available units at ${name}`}
									hideCaption
									zebra
									columns={[
										{ header: "Unit" },
										{ header: "Beds" },
										{ header: "Baths" },
										{ header: "Living area" },
										{ header: "Floor" },
										{ header: "Price", align: "right" },
									]}
									rows={unitRows}
								/>
							</Section>
						) : null}

						{specRows.length > 0 ? (
							<Section title="Specs">
								<DataTable
									caption={`Specifications of ${name}`}
									hideCaption
									columns={[{ header: "Feature" }, { header: "Detail" }]}
									rows={specRows}
								/>
							</Section>
						) : null}

						{nearbyRows.length > 0 ? (
							<Section title="Nearby">
								<DataTable
									caption={`Distances from ${name}`}
									hideCaption
									columns={[{ header: "Place" }, { header: "Distance" }]}
									rows={nearbyRows}
								/>
							</Section>
						) : null}
					</div>

					{l.developer?.name ? (
						<aside className="order-first lg:order-none lg:sticky lg:top-24">
							<DeveloperCTA
								name={titleCaseName(l.developer.name)}
								developerHref={dev ? `/developers/${dev.slug}/` : undefined}
								searchHref={
									dev
										? undefined
										: `https://www.google.com/search?q=${encodeURIComponent(
												`${l.developer.name} Cyprus real estate`,
											)}`
								}
								slug={l.slug}
							/>
						</aside>
					) : null}
				</div>

				<RelatedContent
					heading="Buying a new-build in Cyprus? Start here"
					blurb="The essentials before you enquire: process, financing, taxes and title."
					guides={[
						{
							href: "/guides/new-development-buying-guide/",
							title: "How to buy a new-build",
							desc: "The step-by-step purchase process",
						},
						{
							href: "/guides/cyprus-mortgage-foreigners/",
							title: "Mortgages for foreign buyers",
							desc: "Deposits, rates and eligibility",
						},
						{
							href: "/guides/property-taxes-2026/",
							title: "Property taxes & fees (2026)",
							desc: "Transfer fees, VAT and annual costs",
						},
						{
							href: "/guides/title-deed-status-guide/",
							title: "Title deeds explained",
							desc: "What to check before you buy",
						},
					]}
					tools={[
						{
							href: "/tools/mortgage-calculator/",
							title: "Mortgage calculator",
						},
						{ href: "/tools/rent-vs-buy-calculator/", title: "Rent vs buy" },
						{ href: "/tools/rental-yield-calculator/", title: "Rental yield" },
					]}
				/>
			</Container>
		</TemplateMain>
	);
}
