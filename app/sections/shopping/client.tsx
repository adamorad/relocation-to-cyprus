"use client";

import { useState } from "react";
import { UrlPrefilter, useUrlFilter } from "@/components/templates/UrlFilter";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_SHOP_KINDS,
	SHOP_ENTRIES,
	SHOP_KIND_LABEL,
	type ShopEntry,
	type ShopKind,
	TIER_LABEL,
} from "@/lib/shopping";
import { CITY_NAME, CITY_SLUGS, type CitySlug, isCitySlug } from "@/lib/topics";

const parseCity = (q: string): CitySlug | undefined =>
	isCitySlug(q) ? q : undefined;

/** City slug for an entry's city name (for the pre-paint `?city=` filter). */
const citySlugOf = (name: string) =>
	CITY_SLUGS.find((c) => CITY_NAME[c] === name);

const PATH = "/sections/shopping/";

const KIND_BADGE: Record<ShopKind, string> = {
	supermarket: "Supermarket",
	market: "Market",
	mall: "Mall",
};

function place(e: ShopEntry): string {
	return e.neighbourhood ? `${e.city} · ${e.neighbourhood}` : e.city;
}

/** Second meta line: the field each kind of entry actually has. */
function detail(e: ShopEntry): string {
	if (e.kind === "supermarket") return TIER_LABEL[e.tier];
	if (e.kind === "market") return `Open ${e.when}`;
	return `Anchors: ${e.anchors}`;
}

/**
 * Filters first, then the store cards. Header and info live in page.tsx. The
 * city filter is URL-readable (`?city=larnaca`), like the topic hubs.
 */
export default function ShoppingClient() {
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
	const [kind, setKind] = useState<ShopKind | "All">("All");

	const visible = SHOP_ENTRIES.filter(
		(e) =>
			(city === "all" || e.city === CITY_NAME[city]) &&
			(kind === "All" || e.kind === kind),
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
					label="Type"
					value={kind}
					onChange={setKind}
					options={[
						{ value: "All", label: "All types" },
						...ALL_SHOP_KINDS.map((k) => ({
							value: k,
							label: SHOP_KIND_LABEL[k],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "Nothing matches your filters"
					: `${visible.length} place${visible.length === 1 ? "" : "s"}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid className="mt-5">
					{visible.map((e) => (
						<CardGridItem
							key={`${e.kind}-${e.city}-${e.name}`}
							filter={citySlugOf(e.city)}
						>
							<Card
								variant="text"
								eyebrow={<Badge>{KIND_BADGE[e.kind]}</Badge>}
								title={e.name}
								meta={
									<>
										<span className="block">{place(e)}</span>
										<span className="mt-1 block">{detail(e)}</span>
									</>
								}
								text={e.kind === "market" ? e.what : e.why}
								footer={
									e.kind === "supermarket" && e.website ? (
										<a
											href={e.website}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
										>
											Website
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
