"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Chip, ChipGroup } from "@/components/ui/Chip";
import { ALL_CITIES, type City, WINERIES } from "@/lib/wineries";

const PRICE_LABEL: Record<1 | 2 | 3, string> = {
	1: "€ Budget",
	2: "€€ Mid",
	3: "€€€ Premium",
};

/** Filters first, then the winery cards. Header and tips live in page.tsx. */
export default function WineriesClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [tastingFilter, setTastingFilter] = useState<boolean | "All">("All");
	const [restaurantFilter, setRestaurantFilter] = useState<boolean | "All">(
		"All",
	);

	const filtered = WINERIES.filter((winery) => {
		const cityMatch = cityFilter === "All" || winery.city === cityFilter;
		const tastingMatch =
			tastingFilter === "All" || winery.tastingAvailable === tastingFilter;
		const restaurantMatch =
			restaurantFilter === "All" ||
			winery.restaurantOnSite === restaurantFilter;
		return cityMatch && tastingMatch && restaurantMatch;
	});

	return (
		<>
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="District"
					value={cityFilter}
					onChange={setCityFilter}
					options={[
						{ value: "All", label: "All districts" },
						...ALL_CITIES.map((c) => ({ value: c, label: c })),
					]}
				/>
				<fieldset className="min-w-0">
					<legend className="mb-2 text-sm font-semibold text-ink">
						Experience
					</legend>
					<div className="flex flex-wrap gap-2">
						<Chip
							selected={tastingFilter === "All"}
							onClick={() => setTastingFilter("All")}
						>
							All wineries
						</Chip>
						<Chip
							selected={tastingFilter === true}
							onClick={() => setTastingFilter(true)}
						>
							Tasting available
						</Chip>
						<Chip
							selected={restaurantFilter === true}
							onClick={() =>
								setRestaurantFilter(restaurantFilter === true ? "All" : true)
							}
						>
							Restaurant on site
						</Chip>
					</div>
				</fieldset>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} {filtered.length !== 1 ? "wineries" : "winery"} shown
				{cityFilter !== "All" ? ` in ${cityFilter} district` : ""}
				{tastingFilter === true ? " · tastings available" : ""}
			</h2>

			{filtered.length === 0 ? (
				<Callout tone="info" className="mt-5">
					No wineries found for the selected filters.
				</Callout>
			) : (
				<CardGrid className="mt-5">
					{filtered.map((winery) => (
						<CardGridItem key={`${winery.name}-${winery.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{PRICE_LABEL[winery.priceRange]}</Badge>
										{winery.tastingAvailable ? <Badge>Tastings</Badge> : null}
										{winery.tourAvailable ? <Badge>Tours</Badge> : null}
										{winery.restaurantOnSite ? <Badge>Restaurant</Badge> : null}
									</span>
								}
								title={winery.name}
								meta={`${winery.city} district${winery.village ? ` · ${winery.village}` : ""}`}
								text={winery.why}
								footer={
									<>
										<p className="text-muted">
											<span className="font-semibold text-ink">Grapes: </span>
											{winery.grapeVarieties.join(", ")}
										</p>
										{winery.website ? (
											<a
												href={winery.website}
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
