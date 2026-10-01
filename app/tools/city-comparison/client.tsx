"use client";

import { useState } from "react";
import { Callout } from "@/components/ui/Callout";
import { Chip } from "@/components/ui/Chip";
import { DataTable } from "@/components/ui/DataTable";
import { RENT_CITATION_GENERAL, RENTS } from "@/lib/facts/rents";

type City = "Limassol" | "Paphos" | "Larnaca" | "Ayia Napa";

interface CityData {
	/** Median asking rent, 2-bed apartment (lib/facts/rents.ts). */
	medianRent2bed: number;
	propertyPriceM2: number;
	internationalSchools: number;
	beachMinutes: number;
	airportMinutes: number;
	nightlifeRating: number;
	expatsRating: number;
	costOfLivingIndex: number;
	winterTemp: number;
	summerTemp: number;
}

const DATA: Record<City, CityData> = {
	Limassol: {
		medianRent2bed: RENTS.Limassol[2].median,
		propertyPriceM2: 4200,
		internationalSchools: 8,
		beachMinutes: 5,
		airportMinutes: 50,
		nightlifeRating: 5,
		expatsRating: 5,
		costOfLivingIndex: 100,
		winterTemp: 14,
		summerTemp: 33,
	},
	Paphos: {
		medianRent2bed: RENTS.Paphos[2].median,
		propertyPriceM2: 2600,
		internationalSchools: 5,
		beachMinutes: 5,
		airportMinutes: 15,
		nightlifeRating: 3,
		expatsRating: 4,
		costOfLivingIndex: 75,
		winterTemp: 14,
		summerTemp: 31,
	},
	Larnaca: {
		medianRent2bed: RENTS.Larnaca[2].median,
		propertyPriceM2: 2200,
		internationalSchools: 4,
		beachMinutes: 5,
		airportMinutes: 10,
		nightlifeRating: 2,
		expatsRating: 3,
		costOfLivingIndex: 72,
		winterTemp: 13,
		summerTemp: 33,
	},
	"Ayia Napa": {
		medianRent2bed: RENTS["Ayia Napa"][2].median,
		propertyPriceM2: 1900,
		internationalSchools: 1,
		beachMinutes: 2,
		airportMinutes: 40,
		nightlifeRating: 4,
		expatsRating: 2,
		costOfLivingIndex: 68,
		winterTemp: 13,
		summerTemp: 32,
	},
};

const ALL_CITIES: City[] = ["Limassol", "Paphos", "Larnaca", "Ayia Napa"];

type MetricKey = keyof CityData;

interface MetricDef {
	key: MetricKey;
	label: string;
	format: (v: number) => string;
	lowerIsBetter?: boolean;
}

const METRICS: MetricDef[] = [
	{
		key: "medianRent2bed",
		label: "Median asking rent, 2-bed",
		format: (v) => `€${v.toLocaleString()}`,
		lowerIsBetter: true,
	},
	{
		key: "propertyPriceM2",
		label: "Property Price / m²",
		format: (v) => `€${v.toLocaleString()}`,
		lowerIsBetter: true,
	},
	{
		key: "internationalSchools",
		label: "International Schools",
		format: (v) => `${v}`,
	},
	{
		key: "beachMinutes",
		label: "Beach (drive, min)",
		format: (v) => `${v} min`,
		lowerIsBetter: true,
	},
	{
		key: "airportMinutes",
		label: "Airport (drive, min)",
		format: (v) => `${v} min`,
		lowerIsBetter: true,
	},
	{
		key: "nightlifeRating",
		label: "Nightlife (1 to 5)",
		format: (v) => "★".repeat(v) + "☆".repeat(5 - v),
	},
	{
		key: "expatsRating",
		label: "Expat Community (1 to 5)",
		format: (v) => "★".repeat(v) + "☆".repeat(5 - v),
	},
	{
		key: "costOfLivingIndex",
		label: "Cost of Living (Limassol=100)",
		format: (v) => `${v}`,
		lowerIsBetter: true,
	},
	{ key: "winterTemp", label: "Winter Avg Temp", format: (v) => `${v}°C` },
	{ key: "summerTemp", label: "Summer Avg Temp", format: (v) => `${v}°C` },
];

/** True when this city has the best value in the row (not shared by every city). */
function isBestInRow(cities: City[], metric: MetricDef, city: City): boolean {
	const values = cities.map((c) => DATA[c][metric.key]);
	const val = DATA[city][metric.key];
	const min = Math.min(...values);
	const max = Math.max(...values);
	if (min === max) return false;
	return metric.lowerIsBetter ? val === min : val === max;
}

const BEST_CLASS = "rounded bg-sky-strong px-2 py-0.5 font-semibold text-ink";

export default function CityComparisonClient() {
	const [selected, setSelected] = useState<Set<City>>(
		new Set(["Limassol", "Paphos", "Larnaca"]),
	);

	const toggleCity = (city: City) => {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(city)) {
				if (next.size <= 2) return prev; // keep minimum 2
				next.delete(city);
			} else {
				if (next.size >= 4) return prev; // max 4
				next.add(city);
			}
			return next;
		});
	};

	const selectedCities = ALL_CITIES.filter((c) => selected.has(c));

	return (
		<>
			<fieldset className="min-w-0">
				<legend className="mb-2 text-sm font-semibold text-ink">
					Select cities (2 to 4)
				</legend>
				<div className="flex flex-wrap gap-2">
					{ALL_CITIES.map((city) => (
						<Chip
							key={city}
							selected={selected.has(city)}
							onClick={() => toggleCity(city)}
						>
							{city}
						</Chip>
					))}
				</div>
			</fieldset>

			<DataTable
				caption="City comparison"
				hideCaption
				zebra
				columns={[
					{ header: "Metric" },
					...selectedCities.map((city) => ({
						header: city,
						align: "right" as const,
					})),
				]}
				rows={METRICS.map((metric) => [
					metric.label,
					...selectedCities.map((city) => (
						<span
							key={city}
							className={
								isBestInRow(selectedCities, metric, city) ? BEST_CLASS : ""
							}
						>
							{metric.format(DATA[city][metric.key])}
						</span>
					)),
				])}
			/>
			<p className="text-sm text-muted">
				Highlighted cells show the best value in each row.
			</p>

			<Callout tone="info" title="About this data">
				Rent row: {RENT_CITATION_GENERAL} Figures are district-wide; Ayia Napa
				covers the whole Famagusta free area. Other values are estimates from
				2025 and 2026. Rental prices vary by exact location, building age, and
				furnishing. Ratings are relative to other Cyprus cities, not European or
				global benchmarks. Always verify with local property agents and recent
				listings before making relocation decisions.
			</Callout>
		</>
	);
}
