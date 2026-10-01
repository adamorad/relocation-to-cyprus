"use client";

import { useEffect, useState } from "react";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import { CITY_NAME, CITY_SLUGS, type CitySlug, isCitySlug } from "@/lib/topics";

export type HubCard = {
	href: string;
	title: string;
	description: string;
	/** Cities the item is specific to; empty = island-wide. */
	cities: CitySlug[];
	/** Directories only: entries per city in the directory data. */
	counts?: Record<CitySlug, number> & { islandWide: number };
};

type Filter = CitySlug | "all";

function inCity(card: HubCard, city: Filter): boolean {
	if (city === "all") return true;
	if (card.counts) return card.counts[city] > 0 || card.counts.islandWide > 0;
	return card.cities.length === 0 || card.cities.includes(city);
}

/**
 * Topic hub body: a city filter (URL-readable `?city=`), then Guides, Local
 * directories and Tools. The static HTML holds every item ("All cities");
 * the filter is applied after hydration.
 */
export function TopicHubClient({
	path,
	guides,
	directories,
	tools,
}: {
	/** Hub path, e.g. "/health/", used to write `?city=` back to the URL. */
	path: string;
	guides: HubCard[];
	directories: HubCard[];
	tools: HubCard[];
}) {
	const [city, setCity] = useState<Filter>("all");

	useEffect(() => {
		const q = new URLSearchParams(window.location.search).get("city");
		if (isCitySlug(q)) setCity(q);
	}, []);

	function onChange(next: Filter) {
		setCity(next);
		const url = next === "all" ? path : `${path}?city=${next}`;
		window.history.replaceState(null, "", url);
	}

	const all = [...guides, ...directories, ...tools];
	const options: ChipOption<Filter>[] = [
		{ value: "all", label: "All cities", count: all.length },
		...CITY_SLUGS.map((c) => ({
			value: c,
			label: CITY_NAME[c],
			count: all.filter((i) => inCity(i, c)).length,
		})),
	];

	const g = guides.filter((i) => inCity(i, city));
	const d = directories.filter((i) => inCity(i, city));
	const t = tools.filter((i) => inCity(i, city));

	return (
		<>
			<ChipGroup
				label="Filter by city"
				options={options}
				value={city}
				onChange={onChange}
			/>
			{/* Always mounted so screen readers announce the text when it changes. */}
			<p className="mt-3 text-sm text-muted empty:mt-0" aria-live="polite">
				{city !== "all"
					? `Showing directories with entries in ${CITY_NAME[city]}. Guides and tools cover the whole island.`
					: null}
			</p>

			<div className="mt-8">
				{g.length > 0 ? (
					<Section id="guides" title="Guides">
						<CardGrid>
							{g.map((i) => (
								<CardGridItem key={i.href}>
									<Card
										variant="text"
										href={i.href}
										title={i.title}
										text={<span className="line-clamp-3">{i.description}</span>}
									/>
								</CardGridItem>
							))}
						</CardGrid>
					</Section>
				) : null}

				{d.length > 0 ? (
					<Section id="directories" title="Local directories">
						<CardGrid>
							{d.map((i) => (
								<CardGridItem key={i.href}>
									<Card
										variant="icon"
										icon="pin"
										href={i.href}
										title={i.title}
										text={<span className="line-clamp-2">{i.description}</span>}
										meta={
											city !== "all" && i.counts
												? i.counts[city] > 0
													? `${i.counts[city]} in ${CITY_NAME[city]}`
													: "Island-wide entries"
												: undefined
										}
									/>
								</CardGridItem>
							))}
						</CardGrid>
					</Section>
				) : null}

				{t.length > 0 ? (
					<Section id="tools" title="Tools">
						<CardGrid>
							{t.map((i) => (
								<CardGridItem key={i.href}>
									<Card
										variant="icon"
										icon="checklist"
										href={i.href}
										title={i.title}
										text={<span className="line-clamp-2">{i.description}</span>}
									/>
								</CardGridItem>
							))}
						</CardGrid>
					</Section>
				) : null}
			</div>
		</>
	);
}
