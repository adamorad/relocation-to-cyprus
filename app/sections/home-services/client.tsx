"use client";

import { useState } from "react";
import { DirectoryFeatured } from "@/components/templates/DirectoryFeatured";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_TRADES,
	type City,
	HOME_SERVICES,
	type Trade,
	telHref,
} from "@/lib/home-services";

/** Filters first, then the cards. Header, note and guide box live in page.tsx. */
export default function HomeServicesClient() {
	const [tradeFilter, setTradeFilter] = useState<Trade | "All">("All");
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const filtered = HOME_SERVICES.filter(
		(s) =>
			(tradeFilter === "All" || s.trade === tradeFilter) &&
			(cityFilter === "All" || s.cities.includes(cityFilter)),
	);

	return (
		<>
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="Trade"
					value={tradeFilter}
					onChange={setTradeFilter}
					options={[
						{ value: "All", label: "All trades" },
						...ALL_TRADES.map((t) => ({ value: t, label: t })),
					]}
				/>
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
					? "No listings match these filters"
					: `${filtered.length} ${filtered.length === 1 ? "listing" : "listings"} found`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((s) => (
						<CardGridItem key={`${s.website}-${s.trade}`}>
							<Card
								variant="text"
								eyebrow={<Badge>{s.trade}</Badge>}
								title={s.name}
								meta={s.cities.join(", ")}
								footer={
									<span className="flex flex-col gap-1">
										<a
											href={s.website}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
										>
											Website
										</a>
										<a
											href={telHref(s.phone)}
											className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
										>
											{s.phone}
										</a>
									</span>
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			) : null}
		</>
	);
}
