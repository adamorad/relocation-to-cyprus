"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_FITNESS_TYPES,
	type City,
	FITNESS_TYPE_LABEL,
	FITNESS_VENUES,
	type FitnessType,
} from "@/lib/fitness-wellness";

/** Filters first, then the venue cards. Header and info live in page.tsx. */
export default function FitnessWellnessClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<FitnessType | "All">("All");

	const filtered = FITNESS_VENUES.filter(
		(v) =>
			(cityFilter === "All" || v.city === cityFilter) &&
			(typeFilter === "All" || v.type === typeFilter),
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
					label="Type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_FITNESS_TYPES.map((t) => ({
							value: t,
							label: FITNESS_TYPE_LABEL[t],
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
					? "No venues match the current filters"
					: `${filtered.length} venue${filtered.length === 1 ? "" : "s"}`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((venue) => (
						<CardGridItem key={`${venue.name}-${venue.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{FITNESS_TYPE_LABEL[venue.type]}</Badge>
										{venue.englishSpoken ? <Badge>English spoken</Badge> : null}
									</span>
								}
								title={venue.name}
								meta={
									<>
										{venue.city}
										{venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
										{venue.monthlyFrom !== undefined ||
										venue.dropInFrom !== undefined ? (
											<span className="mt-1 flex flex-wrap gap-x-3">
												{venue.monthlyFrom !== undefined ? (
													<span>
														Monthly from{" "}
														<span className="font-semibold text-ink">
															€{venue.monthlyFrom}
														</span>
													</span>
												) : null}
												{venue.dropInFrom !== undefined ? (
													<span>
														Drop-in from{" "}
														<span className="font-semibold text-ink">
															€{venue.dropInFrom}
														</span>
													</span>
												) : null}
											</span>
										) : null}
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
