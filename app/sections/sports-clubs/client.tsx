"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_SPORTS,
	type City,
	SPORTS_CLUBS,
} from "@/lib/sports-clubs";

/** Filters first, then the club cards. Header and tips live in page.tsx. */
export default function SportsClubsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [sportFilter, setSportFilter] = useState<string>("All");

	const filtered = SPORTS_CLUBS.filter((club) => {
		const cityMatch = cityFilter === "All" || club.city === cityFilter;
		const sportMatch = sportFilter === "All" || club.sport === sportFilter;
		return cityMatch && sportMatch;
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
				<ChipGroup<string>
					label="Sport"
					value={sportFilter}
					onChange={setSportFilter}
					options={[
						{ value: "All", label: "All sports" },
						...ALL_SPORTS.map((s) => ({ value: s, label: s })),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} club{filtered.length !== 1 ? "s" : ""} shown
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{sportFilter !== "All" ? ` · ${sportFilter}` : ""}
			</h2>

			{filtered.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No clubs found for the selected filters.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((club) => (
						<CardGridItem key={`${club.name}-${club.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge className="capitalize">{club.level}</Badge>
										{club.englishWelcome ? (
											<Badge>English welcome</Badge>
										) : null}
										{club.annualFeeApprox !== undefined ? (
											<Badge>~€{club.annualFeeApprox}/yr</Badge>
										) : null}
									</span>
								}
								title={club.name}
								meta={`${club.city} · ${club.sport}`}
								text={club.why}
								footer={
									club.website ? (
										<a
											href={club.website}
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
			)}
		</>
	);
}
