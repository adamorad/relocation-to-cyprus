"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CITIES,
	ALL_MARKET_DAYS,
	type City,
	FARMERS_MARKETS,
	type MarketDay,
} from "@/lib/farmers-markets";

/** Filters first, then the market cards. Header and info live in page.tsx. */
export default function FarmersMarketsClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [dayFilter, setDayFilter] = useState<MarketDay | "All">("All");

	const visible = FARMERS_MARKETS.filter((m) => {
		const matchCity = cityFilter === "All" || m.city === cityFilter;
		const matchDay =
			dayFilter === "All" || (m.days ?? [m.dayOfWeek]).includes(dayFilter);
		return matchCity && matchDay;
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
						...ALL_CITIES.filter((c) =>
							FARMERS_MARKETS.some((m) => m.city === c),
						).map((c) => ({ value: c, label: c })),
					]}
				/>
				<ChipGroup
					label="Day of the week"
					value={dayFilter}
					onChange={setDayFilter}
					options={[
						{ value: "All", label: "Any day" },
						...ALL_MARKET_DAYS.map((d) => ({ value: d, label: d })),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{visible.length === 0
					? "No markets match your filters"
					: `${visible.length} market${visible.length === 1 ? "" : "s"} found`}
			</h2>

			{visible.length > 0 ? (
				<CardGrid className="mt-5">
					{visible.map((market) => (
						<CardGridItem key={`${market.name}-${market.city}`}>
							<Card
								variant="text"
								eyebrow={<Badge>{market.dayOfWeek}</Badge>}
								title={market.name}
								meta={
									<>
										{market.city}
										{" · "}
										{market.hours}
										<span className="mt-1 block">{market.location}</span>
									</>
								}
								text={market.why}
								footer={
									<div className="space-y-2">
										<div className="flex flex-wrap gap-1.5">
											{market.produces.map((item) => (
												<Badge key={item}>{item}</Badge>
											))}
										</div>
										{market.parkingNotes ? (
											<p className="text-muted">
												<span className="font-semibold text-ink">Parking:</span>{" "}
												{market.parkingNotes}
											</p>
										) : null}
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
