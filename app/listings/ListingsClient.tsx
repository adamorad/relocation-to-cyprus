"use client";

import { useState } from "react";
import { UrlPrefilter, useUrlFilter } from "@/components/templates/UrlFilter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardGrid } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import { CITY_SLUGS, type CitySlug } from "./format";

export type ListingCardData = {
	slug: string;
	name: string;
	city: string;
	location: string;
	/** Formatted with formatListingPrice ("Price on request" when missing). */
	price: string;
	image: string | null;
};

type Filter = CitySlug | "all";

const STEP = 24;

function isCity(v: string | null): v is CitySlug {
	return v !== null && Object.hasOwn(CITY_SLUGS, v);
}

const parseCity = (q: string): Filter | undefined =>
	isCity(q) ? q : undefined;

const CITY_VALUES = Object.keys(CITY_SLUGS);

/**
 * Pre-hydration paint for `?city=`: UrlPrefilter hides every card whose
 * data-filter-item lacks the city; each card carries its city only while it
 * is within that city's first STEP, and this rule shows those (the static
 * markup hides them when they are past the all-cities first STEP).
 */
const SHOW_RULES = CITY_VALUES.map(
	(c) => `[data-url-filter="${c}"] [data-filter-item~="${c}"]{display:flex}`,
).join("");

/**
 * City filter (URL-readable `?city=`), photo cards and a "Show more" step of
 * 24. Every card is in the static HTML (so every listing link is crawlable);
 * cards past the step or outside the city are display:none, and their lazy
 * images are not fetched until shown.
 */
export default function ListingsClient({
	listings,
}: {
	listings: ListingCardData[];
}) {
	const {
		value: city,
		set: setCity,
		scopeRef,
	} = useUrlFilter<Filter>({
		param: "city",
		path: "/listings/",
		initial: "all",
		parse: parseCity,
	});
	const [shown, setShown] = useState(STEP);

	const options: ChipOption<Filter>[] = [
		{ value: "all", label: "All cities", count: listings.length },
		...(Object.keys(CITY_SLUGS) as CitySlug[]).map((slug) => ({
			value: slug,
			label: CITY_SLUGS[slug],
			count: listings.filter((l) => l.city === slug).length,
		})),
	];

	function onChange(next: Filter) {
		setCity(next);
		setShown(STEP);
	}

	const matching =
		city === "all" ? listings : listings.filter((l) => l.city === city);
	const rank = new Map(matching.map((l, i) => [l.slug, i]));
	const visibleCount = Math.min(shown, matching.length);
	const cityRank: Record<string, number> = {};

	return (
		<div ref={scopeRef}>
			<UrlPrefilter param="city" values={CITY_VALUES} />
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, built from slugs */}
			<style dangerouslySetInnerHTML={{ __html: SHOW_RULES }} />
			<ChipGroup
				label="Filter by city"
				options={options}
				value={city}
				onChange={onChange}
			/>
			<h2 className="mt-8 text-xl font-bold text-ink" aria-live="polite">
				{city === "all" ? "All developments" : CITY_SLUGS[city]}
				<span className="ml-2 text-base font-medium text-muted">
					{matching.length} {matching.length === 1 ? "project" : "projects"}
				</span>
			</h2>
			<CardGrid className="mt-4">
				{listings.map((l) => {
					const i = rank.get(l.slug);
					const show = i !== undefined && i < shown;
					const n = cityRank[l.city] ?? 0;
					cityRank[l.city] = n + 1;
					return (
						<li
							key={l.slug}
							className={show ? "flex" : "hidden"}
							data-filter-item={n < STEP ? l.city : ""}
						>
							<Card
								variant="photo"
								href={`/listings/${l.slug}/`}
								image={
									l.image
										? { src: l.image, alt: `${l.name}, ${l.location}` }
										: undefined
								}
								eyebrow={<Badge>{l.location}</Badge>}
								title={l.name}
								meta={<span className="font-semibold text-ink">{l.price}</span>}
							/>
						</li>
					);
				})}
			</CardGrid>
			{matching.length > visibleCount ? (
				<div className="mt-8 flex flex-col items-center gap-2">
					<Button
						variant="secondary"
						size="lg"
						onClick={() => {
							scopeRef.current?.removeAttribute("data-url-filter");
							setShown((n) => n + STEP);
						}}
					>
						Show more
					</Button>
					<p className="text-sm text-muted">
						Showing {visibleCount} of {matching.length}
					</p>
				</div>
			) : null}
		</div>
	);
}
