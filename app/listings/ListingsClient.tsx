"use client";

import { useEffect, useState } from "react";
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
	const [city, setCity] = useState<Filter>("all");
	const [shown, setShown] = useState(STEP);

	useEffect(() => {
		const q = new URLSearchParams(window.location.search).get("city");
		if (isCity(q)) setCity(q);
	}, []);

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
		const url = next === "all" ? "/listings/" : `/listings/?city=${next}`;
		window.history.replaceState(null, "", url);
	}

	const matching =
		city === "all" ? listings : listings.filter((l) => l.city === city);
	const rank = new Map(matching.map((l, i) => [l.slug, i]));
	const visibleCount = Math.min(shown, matching.length);

	return (
		<>
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
					return (
						<li key={l.slug} className={show ? "flex" : "hidden"}>
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
						onClick={() => setShown((n) => n + STEP)}
					>
						Show more
					</Button>
					<p className="text-sm text-muted">
						Showing {visibleCount} of {matching.length}
					</p>
				</div>
			) : null}
		</>
	);
}
