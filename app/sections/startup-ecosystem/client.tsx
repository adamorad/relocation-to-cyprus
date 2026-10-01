"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_STARTUP_VENUE_TYPES,
	type City,
	STARTUP_VENUE_TYPE_LABEL,
	STARTUP_VENUES,
	type StartupVenueType,
} from "@/lib/startup-ecosystem";

/** Filters first, then the venue cards. Header and tips live in page.tsx. */
export default function StartupEcosystemClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<StartupVenueType | "All">("All");

	const visible = STARTUP_VENUES.filter(
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
						...ALL_STARTUP_VENUE_TYPES.map((t) => ({
							value: t,
							label: STARTUP_VENUE_TYPE_LABEL[t],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No venues match these filters"
					: `${visible.length} venue${visible.length === 1 ? "" : "s"}`}
			</h2>

			{visible.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No venues match these filters.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{visible.map((venue) => (
						<CardGridItem key={venue.name}>
							<Card
								variant="text"
								eyebrow={<Badge>{STARTUP_VENUE_TYPE_LABEL[venue.type]}</Badge>}
								title={venue.name}
								meta={`${venue.city}${venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}`}
								text={venue.why}
								footer={
									<>
										{venue.focusAreas.length > 0 ? (
											<p className="flex flex-wrap gap-1.5 pb-2">
												{venue.focusAreas.map((area) => (
													<Badge key={area}>{area}</Badge>
												))}
											</p>
										) : null}
										<div className="flex flex-wrap items-center justify-between gap-x-5">
											{venue.membershipFrom != null ? (
												<p className="text-muted">
													From{" "}
													<span className="font-semibold text-ink">
														€{venue.membershipFrom}/mo
													</span>
												</p>
											) : (
												<span />
											)}
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
									</>
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			)}
		</>
	);
}
