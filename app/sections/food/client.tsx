"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { UrlPrefilter, useUrlFilter } from "@/components/templates/UrlFilter";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CATEGORIES,
	CATEGORY_LABEL,
	type Category,
	FOOD_PLACES,
	PRICE_LABEL,
} from "@/lib/food";
import { CITY_NAME, CITY_SLUGS, type CitySlug, isCitySlug } from "@/lib/topics";

const parseCity = (q: string): CitySlug | undefined =>
	isCitySlug(q) ? q : undefined;

/** City slug for an entry's city name (for the pre-paint `?city=` filter). */
const citySlugOf = (name: string) =>
	CITY_SLUGS.find((c) => CITY_NAME[c] === name);

const PATH = "/sections/food/";

/**
 * Filters first, then the place cards. Header lives in page.tsx. The city
 * filter is URL-readable (`?city=limassol`), like the topic hubs.
 */
export default function FoodClient() {
	const {
		value: city,
		set: onCityChange,
		scopeRef,
	} = useUrlFilter<CitySlug | "all">({
		param: "city",
		path: PATH,
		initial: "all",
		parse: parseCity,
	});
	const [category, setCategory] = useState<Category | "All">("All");

	const visible = FOOD_PLACES.filter(
		(p) =>
			(city === "all" || p.city === CITY_NAME[city]) &&
			(category === "All" || p.category === category),
	);

	return (
		<div ref={scopeRef} suppressHydrationWarning>
			<UrlPrefilter param="city" values={CITY_SLUGS} />
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="City"
					value={city}
					onChange={onCityChange}
					options={[
						{ value: "all", label: "All cities" },
						...CITY_SLUGS.map((c) => ({ value: c, label: CITY_NAME[c] })),
					]}
				/>
				<ChipGroup
					label="Meal"
					value={category}
					onChange={setCategory}
					options={[
						{ value: "All", label: "All" },
						...ALL_CATEGORIES.map((c) => ({
							value: c,
							label: CATEGORY_LABEL[c],
						})),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No places match your filters"
					: `${visible.length} place${visible.length === 1 ? "" : "s"}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid className="mt-5">
					{visible.map((place) => (
						<CardGridItem
							key={`${place.city}-${place.category}-${place.name}`}
							filter={citySlugOf(place.city)}
						>
							<Card
								variant="text"
								eyebrow={<Badge>{CATEGORY_LABEL[place.category]}</Badge>}
								title={place.name}
								meta={
									<>
										{place.city}
										{place.neighbourhood ? ` · ${place.neighbourhood}` : ""}
										{" · "}
										<span>{PRICE_LABEL[place.price]}</span>
									</>
								}
								text={place.why}
								footer={
									place.instagram ? (
										<a
											href={`https://www.instagram.com/${place.instagram}/`}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
										>
											Instagram @{place.instagram}
										</a>
									) : undefined
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			) : null}
		</div>
	);
}
