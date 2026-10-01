"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import { CITY_SLUGS, type CitySlug } from "./format";

export type ListingCardData = {
	slug: string;
	name: string;
	city: string;
	location: string;
	price: string | null;
	image: string | null;
};

type Filter = CitySlug | "all";

const STEP = 24;

function isCity(v: string | null): v is CitySlug {
	return v !== null && Object.hasOwn(CITY_SLUGS, v);
}

/** City filter (URL-readable `?city=`), photo cards and a "Show more" step of 24. */
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
	const visible = matching.slice(0, shown);

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
				{visible.map((l) => (
					<CardGridItem key={l.slug}>
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
							meta={
								l.price ? (
									<span className="font-semibold text-ink">{l.price}</span>
								) : undefined
							}
						/>
					</CardGridItem>
				))}
			</CardGrid>
			{matching.length > visible.length ? (
				<div className="mt-8 flex flex-col items-center gap-2">
					<Button
						variant="secondary"
						size="lg"
						onClick={() => setShown((n) => n + STEP)}
					>
						Show more
					</Button>
					<p className="text-sm text-muted">
						Showing {visible.length} of {matching.length}
					</p>
				</div>
			) : null}
		</>
	);
}
