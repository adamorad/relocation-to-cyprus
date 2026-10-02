"use client";

import { useUrlFilter } from "@/components/templates/UrlFilter";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup, type ChipOption } from "@/components/ui/Chip";
import { CITY_NAME, CITY_SLUGS, type CitySlug, isCitySlug } from "@/lib/topics";

export type PreviewCard = {
	slug: string;
	name: string;
	location: string;
	price: string | null;
	image: string | null;
};

type Filter = CitySlug | "all";

const parseCity = (q: string): Filter | undefined =>
	isCitySlug(q) ? q : undefined;

/**
 * New developments preview on /property/: a city chip filter (URL-readable
 * `?city=`), a few photo cards for the chosen city and a link to the full,
 * filtered /listings/ page. The static HTML shows the all-cities set; a
 * preset `?city=` swaps in that city's cards after hydration (same card
 * count, so the grid keeps its size).
 */
export function PropertyPreview({
	cards,
	sets,
	counts,
}: {
	cards: Record<string, PreviewCard>;
	/** Card slugs to show for each filter value. */
	sets: Record<Filter, string[]>;
	/** Number of visible developments per city, and in total ("all"). */
	counts: Record<Filter, number>;
}) {
	const {
		value: city,
		set: onChange,
		scopeRef,
	} = useUrlFilter<Filter>({
		param: "city",
		path: "/property/",
		initial: "all",
		parse: parseCity,
	});

	const options: ChipOption<Filter>[] = [
		{ value: "all", label: "All cities", count: counts.all },
		...CITY_SLUGS.map((c) => ({
			value: c,
			label: CITY_NAME[c],
			count: counts[c],
		})),
	];
	const visible = sets[city].map((slug) => cards[slug]);
	const href = city === "all" ? "/listings/" : `/listings/?city=${city}`;
	const label =
		city === "all"
			? `See all ${counts.all} developments`
			: `See all ${counts[city]} in ${CITY_NAME[city]}`;

	return (
		<div ref={scopeRef}>
			<ChipGroup
				label="Filter by city"
				options={options}
				value={city}
				onChange={onChange}
			/>
			<CardGrid className="mt-6">
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
			<p className="mt-6">
				<ButtonLink href={href} variant="secondary">
					{label}
				</ButtonLink>
			</p>
		</div>
	);
}
