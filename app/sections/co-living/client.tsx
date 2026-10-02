"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import { ALL_CITIES, type City, CO_LIVING_LISTINGS } from "@/lib/co-living";

/** Filters first, then the space cards. Header and info live in page.tsx. */
export default function CoLivingClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const filtered = CO_LIVING_LISTINGS.filter(
		(s) => cityFilter === "All" || s.city === cityFilter,
	);

	return (
		<>
			<div className="rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="City"
					value={cityFilter}
					onChange={setCityFilter}
					options={[
						{ value: "All", label: "All cities" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? `No co-living spaces listed for ${cityFilter} yet`
					: `${filtered.length} space${filtered.length === 1 ? "" : "s"}${
							cityFilter !== "All" ? ` in ${cityFilter}` : " across all cities"
						}`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((space) => (
						<CardGridItem key={`${space.name}-${space.city}`}>
							<Card
								variant="text"
								title={space.name}
								meta={
									<>
										{space.city}
										{space.neighbourhood ? ` · ${space.neighbourhood}` : ""}
									</>
								}
								text={space.why}
								footer={
									<div className="space-y-2">
										{space.includes.length > 0 ? (
											<div>
												<p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
													Included
												</p>
												<div className="flex flex-wrap gap-1.5">
													{space.includes.map((item) => (
														<Badge key={item}>{item}</Badge>
													))}
												</div>
											</div>
										) : null}
										<div className="flex items-center justify-between gap-3">
											<p className="font-bold text-ink">
												€{space.monthlyFrom.toLocaleString()}
												{space.monthlyTo !== space.monthlyFrom
													? `–€${space.monthlyTo.toLocaleString()}`
													: ""}
												<span className="text-sm font-normal text-muted">
													{" "}
													/ month
												</span>
											</p>
											{space.website ? (
												<a
													href={space.website}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													View
												</a>
											) : null}
										</div>
									</div>
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			) : null}
		</>
	);
}
