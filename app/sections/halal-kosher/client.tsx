"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CERTIFICATIONS,
	ALL_CITIES,
	ALL_VENUE_TYPES,
	CERTIFICATION_LABEL,
	type Certification,
	type City,
	HALAL_KOSHER_VENUES,
	VENUE_TYPE_LABEL,
	type VenueType,
} from "@/lib/halal-kosher";

/** Filters first, then the venue cards. Header and info live in page.tsx. */
export default function HalalKosherClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [certFilter, setCertFilter] = useState<Certification | "All">("All");
	const [typeFilter, setTypeFilter] = useState<VenueType | "All">("All");

	const visible = HALAL_KOSHER_VENUES.filter((v) => {
		const matchCity = cityFilter === "All" || v.city === cityFilter;
		const matchCert =
			certFilter === "All" ||
			v.certification === certFilter ||
			v.certification === "both";
		const matchType = typeFilter === "All" || v.type === typeFilter;
		return matchCity && matchCert && matchType;
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
					label="Certification"
					value={certFilter}
					onChange={setCertFilter}
					options={[
						{ value: "All", label: "All" },
						...ALL_CERTIFICATIONS.map((c) => ({
							value: c,
							label: CERTIFICATION_LABEL[c],
						})),
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
				{visible.length === 0
					? "No venues match your filters"
					: `${visible.length} venue${visible.length === 1 ? "" : "s"}`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid className="mt-5">
					{visible.map((venue) => (
						<CardGridItem key={`${venue.name}-${venue.city}`}>
							<Card
								variant="text"
								eyebrow={
									<Badge>{CERTIFICATION_LABEL[venue.certification]}</Badge>
								}
								title={venue.name}
								meta={
									<>
										{venue.city}
										{venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
										{" · "}
										<span className="capitalize">{venue.type}</span>
										{venue.cuisine ? ` · ${venue.cuisine}` : ""}
									</>
								}
								text={venue.why}
								footer={
									venue.phone || venue.website ? (
										<div className="flex flex-wrap gap-x-5 gap-y-1">
											{venue.phone ? (
												<a
													href={`tel:${venue.phone}`}
													className="inline-flex min-h-11 items-center font-semibold text-ink underline-offset-2 hover:underline"
												>
													{venue.phone}
												</a>
											) : null}
											{venue.website ? (
												<a
													href={venue.website}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													Website
												</a>
											) : null}
										</div>
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
