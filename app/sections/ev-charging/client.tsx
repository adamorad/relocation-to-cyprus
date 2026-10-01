"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import {
	ALL_CHARGER_TYPES,
	ALL_CITIES,
	CHARGER_TYPE_LABEL,
	type ChargerType,
	type City,
	EV_CHARGERS,
} from "@/lib/ev-charging";

/** Filters first, then the charger cards. Header and info live in page.tsx. */
export default function EvChargingClient() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<ChargerType | "All">("All");

	const filtered = EV_CHARGERS.filter(
		(c) =>
			(cityFilter === "All" || c.city === cityFilter) &&
			(typeFilter === "All" || c.chargerTypes.includes(typeFilter)),
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
					label="Charger type"
					value={typeFilter}
					onChange={setTypeFilter}
					options={[
						{ value: "All", label: "All types" },
						...ALL_CHARGER_TYPES.map((t) => ({
							value: t,
							label: CHARGER_TYPE_LABEL[t],
						})),
					]}
				/>
			</div>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No charging locations match the current filters"
					: `${filtered.length} location${filtered.length === 1 ? "" : "s"}`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((charger) => (
						<CardGridItem key={`${charger.name}-${charger.city}`}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										{charger.chargerTypes.map((ct) => (
											<Badge key={ct}>{ct}</Badge>
										))}
										<Badge>{charger.maxKw} kW max</Badge>
										<Badge>
											{charger.numberOfPoints} point
											{charger.numberOfPoints !== 1 ? "s" : ""}
										</Badge>
									</span>
								}
								title={charger.name}
								meta={
									<>
										{charger.city} · {charger.location}
										<span className="mt-1 block">
											<span className="font-semibold text-ink">Operator:</span>{" "}
											{charger.operator}
											{" · "}
											<span className="font-semibold text-ink">Cost:</span>{" "}
											{charger.cost}
										</span>
									</>
								}
								text={charger.why}
								footer={
									charger.mapsLink ? (
										<a
											href={charger.mapsLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline"
										>
											Open in Maps
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
