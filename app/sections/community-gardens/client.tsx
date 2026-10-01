"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_GARDEN_TYPES,
	type City,
	COMMUNITY_GARDENS,
	GARDEN_TYPE_LABEL,
	type GardenType,
} from "@/lib/community-gardens";

/** Filters first, then the garden cards. Header and info live in page.tsx. */
export default function CommunityGardensClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<GardenType | "All">("All");

	const filtered = COMMUNITY_GARDENS.filter(
		(garden) =>
			(cityFilter === "All" || garden.city === cityFilter) &&
			(typeFilter === "All" || garden.type === typeFilter),
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
					label="Garden type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_GARDEN_TYPES.map((t) => ({
							value: t,
							label: GARDEN_TYPE_LABEL[t],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No gardens match the selected filters"
					: `${filtered.length} garden${filtered.length === 1 ? "" : "s"}`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((garden) => (
						<CardGridItem key={`${garden.name}-${garden.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{GARDEN_TYPE_LABEL[garden.type]}</Badge>
										{garden.openToNewMembers ? (
											<Badge tone="success">Open to new members</Badge>
										) : (
											<Badge tone="warning">Currently closed</Badge>
										)}
										{garden.annualFeeApprox !== undefined ? (
											<Badge>~€{garden.annualFeeApprox}/yr</Badge>
										) : null}
									</span>
								}
								title={garden.name}
								meta={
									<>
										{garden.city}
										{garden.neighbourhood ? ` · ${garden.neighbourhood}` : ""}
										{garden.produce.length > 0 ? (
											<span className="mt-1 block">
												<span className="font-semibold text-ink">Grows:</span>{" "}
												{garden.produce.join(", ")}
											</span>
										) : null}
									</>
								}
								text={garden.why}
								footer={
									garden.website || garden.contact ? (
										<div className="flex flex-wrap items-center gap-x-5 text-muted">
											{garden.website ? (
												<a
													href={garden.website}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
												>
													Website
												</a>
											) : null}
											{garden.contact ? (
												<span>Contact: {garden.contact}</span>
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
