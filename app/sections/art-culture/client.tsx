"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_VENUE_TYPES,
	type City,
	CULTURAL_VENUES,
	VENUE_TYPE_LABEL,
	type VenueType,
} from "@/lib/art-culture";

/** Filters first, then the venue cards. Header and info live in page.tsx. */
export default function ArtCultureClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<VenueType | "All">("All");

	const filtered = CULTURAL_VENUES.filter((venue) => {
		const cityMatch = cityFilter === "All" || venue.city === cityFilter;
		const typeMatch = typeFilter === "All" || venue.type === typeFilter;
		return cityMatch && typeMatch;
	});

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
					label="Type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_VENUE_TYPES.map((t) => ({
							value: t,
							label: VENUE_TYPE_LABEL[t],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No venues found for the selected filters"
					: `${filtered.length} venue${filtered.length === 1 ? "" : "s"} shown${
							cityFilter !== "All" ? ` in ${cityFilter}` : ""
						}${
							typeFilter !== "All" ? ` · ${VENUE_TYPE_LABEL[typeFilter]}` : ""
						}`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((venue) => (
						<CardGridItem key={`${venue.name}-${venue.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{VENUE_TYPE_LABEL[venue.type]}</Badge>
										{venue.admissionEuros !== undefined ? (
											<Badge>
												{venue.admissionEuros === 0
													? "Free entry"
													: `€${venue.admissionEuros}`}
											</Badge>
										) : null}
										{venue.englishSupport ? <Badge>English</Badge> : null}
									</span>
								}
								title={venue.name}
								meta={
									<>
										{venue.city}
										{venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
										<span className="mt-1 block italic">
											{venue.highlights}
										</span>
									</>
								}
								text={venue.why}
								footer={
									venue.website ? (
										<a
											href={venue.website}
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
		</>
	);
}
