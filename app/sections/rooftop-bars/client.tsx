"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_VIEW_TYPES,
	type City,
	VIEW_BARS,
	VIEW_TYPE_LABEL,
	type ViewType,
} from "@/lib/rooftop-bars";

function priceStr(range: 1 | 2 | 3 | 4): string {
	return "€".repeat(range);
}

/** Filters first, then the bar cards. Header, tips and note live in page.tsx. */
export default function RooftopBarsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [viewFilter, setViewFilter] = useState<ViewType | "All">("All");

	const filtered = VIEW_BARS.filter(
		(bar) =>
			(cityFilter === "All" || bar.city === cityFilter) &&
			(viewFilter === "All" || bar.viewType === viewFilter),
	);

	return (
		<>
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="City"
					value={cityFilter}
					onChange={setCityFilter}
					options={[
						{ value: "All", label: "All cities" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
				<ChipGroup
					label="View type"
					value={viewFilter}
					onChange={setViewFilter}
					options={[
						{ value: "All", label: "All views" },
						...ALL_VIEW_TYPES.map((v) => ({
							value: v,
							label: VIEW_TYPE_LABEL[v],
						})),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No bars match your filters"
					: `${filtered.length} bar${filtered.length === 1 ? "" : "s"}`}
			</h2>

			{filtered.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No bars match the selected filters.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((bar) => (
						<CardGridItem key={`${bar.name}-${bar.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{VIEW_TYPE_LABEL[bar.viewType]}</Badge>
										<Badge>{priceStr(bar.priceRange)}</Badge>
										{bar.reservationRequired ? (
											<Badge>Reservation required</Badge>
										) : null}
										{bar.cocktailsFrom !== undefined ? (
											<Badge>Cocktails from €{bar.cocktailsFrom}</Badge>
										) : null}
									</span>
								}
								title={bar.name}
								meta={`${bar.city}${bar.neighbourhood ? ` · ${bar.neighbourhood}` : ""}`}
								text={bar.why}
								footer={
									bar.website || bar.instagram ? (
										<div className="flex flex-wrap gap-x-5 gap-y-1">
											{bar.website ? (
												<a
													href={bar.website}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													Website
												</a>
											) : null}
											{bar.instagram ? (
												<a
													href={bar.instagram}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													Instagram
												</a>
											) : null}
										</div>
									) : undefined
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			)}
		</>
	);
}
