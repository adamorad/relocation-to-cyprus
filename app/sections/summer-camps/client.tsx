"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import { ALL_CITIES, type City, SUMMER_CAMPS } from "@/lib/summer-camps";

type CampType = "all" | "day" | "residential";

/** Filters first, then the camp cards. Header, tips and notes live in page.tsx. */
export default function SummerCampsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<CampType>("all");

	const visible = SUMMER_CAMPS.filter(
		(c) =>
			(cityFilter === "All" || c.city === cityFilter) &&
			(typeFilter === "all" || c.type === typeFilter),
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
				<ChipGroup<CampType>
					label="Camp type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "all", label: "All camps" },
						{ value: "day", label: "Day camps" },
						{ value: "residential", label: "Residential" },
					]}
				/>
			</div>

			<DirectoryFeatured />

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length} camp{visible.length === 1 ? "" : "s"}
				{cityFilter !== "All" ? ` in ${cityFilter}` : " across Cyprus"}
				{typeFilter !== "all"
					? ` · ${typeFilter === "residential" ? "Residential" : "Day camps"}`
					: ""}
			</h2>

			{visible.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No camps match your filters. Try a different city or type.
				</Callout>
			) : (
				<CardGrid cols={2} className="mt-5">
					{visible.map((camp) => (
						<CardGridItem key={`${camp.name}-${camp.city}`}>
							<Card
								variant="text"
								eyebrow={
									<Badge>
										{camp.type === "residential" ? "Residential" : "Day camp"}
									</Badge>
								}
								title={camp.name}
								meta={`${camp.city}${camp.neighbourhood ? ` · ${camp.neighbourhood}` : ""}`}
								text={camp.why}
								footer={
									<>
										<p className="text-muted">
											<span className="font-semibold text-ink">Ages: </span>
											{camp.ageFrom}–{camp.ageTo} yrs
											{camp.weeklyFeeApprox !== undefined
												? ` · ~€${camp.weeklyFeeApprox}/week`
												: ""}
										</p>
										<p className="text-muted">
											<span className="font-semibold text-ink">
												Languages:{" "}
											</span>
											{camp.languages.join(", ")}
										</p>
										<p className="flex flex-wrap gap-1.5 pt-2">
											{camp.focusAreas.map((area) => (
												<Badge key={area}>{area}</Badge>
											))}
										</p>
										{camp.website ? (
											<a
												href={camp.website}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
											>
												Website
											</a>
										) : null}
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
