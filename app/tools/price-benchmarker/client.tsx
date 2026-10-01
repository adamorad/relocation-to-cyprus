"use client";

import { useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Callout } from "@/components/ui/Callout";
import { DataTable, StatCard } from "@/components/ui/DataTable";
import { CHART_COLORS } from "@/lib/chart-colors";
import { LISTINGS } from "@/lib/listingsData";

// ---------------------------------------------------------------------------
// Price extraction helpers
// ---------------------------------------------------------------------------

/**
 * Parse a priceRange string such as:
 *   "€460,000 +VAT"
 *   "€390,000 to €405,000 +VAT"
 *   "From €320,000"
 * Returns the lower-bound numeric value, or null if unparseable.
 */
function extractMinPrice(raw: string | null | undefined): number | null {
	if (!raw) return null;
	// Remove currency symbol, commas, "+VAT", "From", whitespace noise
	const cleaned = raw
		.replace(/€/g, "")
		.replace(/,/g, "")
		.replace(/\+VAT/gi, "")
		.replace(/from/gi, "");
	// For a range like "390000 – 405000", take the first number
	const match = cleaned.match(/(\d+(?:\.\d+)?)/);
	if (!match) return null;
	const value = Number.parseFloat(match[1]);
	return Number.isFinite(value) && value > 0 ? value : null;
}

// ---------------------------------------------------------------------------
// Statistics helpers
// ---------------------------------------------------------------------------

function median(sorted: number[]): number {
	const n = sorted.length;
	if (n === 0) return 0;
	const mid = Math.floor(n / 2);
	return n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function percentile(sorted: number[], p: number): number {
	if (sorted.length === 0) return 0;
	const idx = (p / 100) * (sorted.length - 1);
	const lo = Math.floor(idx);
	const hi = Math.ceil(idx);
	if (lo === hi) return sorted[lo];
	return sorted[lo] + (idx - lo) * (sorted[hi] - sorted[lo]);
}

// ---------------------------------------------------------------------------
// Benchmark data builder
// ---------------------------------------------------------------------------

type CityStats = {
	city: string;
	count: number;
	min: number;
	max: number;
	average: number;
	median: number;
	p25: number;
	p75: number;
};

const MIN_DATA_POINTS = 5;

const CITY_NOTES: Record<string, string> = {
	Limassol:
		"Limassol has the widest price range in Cyprus, from affordable inland to ultra-luxury seafront.",
	Paphos:
		"Paphos offers strong value. Most developments are in the comfortable mid-range.",
	Larnaca:
		"Larnaca is the most affordable coastal city, with significant growth potential.",
	"Ayia Napa":
		"Ayia Napa prices are driven by luxury resort demand. Mid-range options are limited.",
};

function buildCityStats(): Record<string, CityStats> {
	const grouped: Record<string, number[]> = {};

	for (const listing of LISTINGS) {
		const price = extractMinPrice(listing.priceRange);
		if (price === null) continue;
		const city = listing.regionCity;
		if (!grouped[city]) grouped[city] = [];
		grouped[city].push(price);
	}

	const result: Record<string, CityStats> = {};
	for (const [city, prices] of Object.entries(grouped)) {
		if (prices.length < MIN_DATA_POINTS) continue;
		const sorted = [...prices].sort((a, b) => a - b);
		const sum = sorted.reduce((acc, v) => acc + v, 0);
		result[city] = {
			city,
			count: sorted.length,
			min: sorted[0],
			max: sorted[sorted.length - 1],
			average: sum / sorted.length,
			median: median(sorted),
			p25: percentile(sorted, 25),
			p75: percentile(sorted, 75),
		};
	}
	return result;
}

const CITY_STATS = buildCityStats();

// ---------------------------------------------------------------------------
// Percentile rank of a value in the distribution
// ---------------------------------------------------------------------------

function percentileRankOf(price: number, city: string): number {
	// Recompute from raw listings for accuracy
	const prices: number[] = [];
	for (const listing of LISTINGS) {
		if (listing.regionCity !== city) continue;
		const p = extractMinPrice(listing.priceRange);
		if (p !== null) prices.push(p);
	}
	if (prices.length === 0) return 0;
	const below = prices.filter((p) => p < price).length;
	return Math.round((below / prices.length) * 100);
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function fmt(n: number): string {
	return "€" + Math.round(n).toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PriceBenchmarkerClient() {
	const availableCities = Object.keys(CITY_STATS).sort();

	const [selectedCity, setSelectedCity] = useState<string>(
		availableCities.includes("Limassol")
			? "Limassol"
			: (availableCities[0] ?? ""),
	);
	const [priceInput, setPriceInput] = useState<string>("");

	const stats = selectedCity ? CITY_STATS[selectedCity] : null;

	const userPrice = useMemo(() => {
		const raw = priceInput.replace(/[€,\s]/g, "");
		const n = Number.parseFloat(raw);
		return Number.isFinite(n) && n > 0 ? n : null;
	}, [priceInput]);

	const pctRank = useMemo(() => {
		if (userPrice === null || !selectedCity) return null;
		return percentileRankOf(userPrice, selectedCity);
	}, [userPrice, selectedCity]);

	// Width of the marker on the percentile bar (clamped)
	const markerLeft =
		pctRank !== null ? Math.min(Math.max(pctRank, 0), 98) : null;

	const field =
		"min-h-11 w-full rounded-xl border border-line bg-white px-3 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus";

	return (
		<>
			<ToolPanel title="Your property">
				<div className="grid gap-5 sm:grid-cols-2">
					<div>
						<label
							htmlFor="city-select"
							className="mb-1.5 block text-sm font-semibold text-ink"
						>
							City / Region
						</label>
						<select
							id="city-select"
							value={selectedCity}
							onChange={(e) => setSelectedCity(e.target.value)}
							className={field}
						>
							{availableCities.map((city) => (
								<option key={city} value={city}>
									{city} ({CITY_STATS[city].count} listings)
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="price-input"
							className="mb-1.5 block text-sm font-semibold text-ink"
						>
							Your property price (€)
						</label>
						<input
							id="price-input"
							type="text"
							inputMode="numeric"
							placeholder="e.g. 450000"
							value={priceInput}
							onChange={(e) => setPriceInput(e.target.value)}
							className={field}
						/>
					</div>
				</div>
			</ToolPanel>

			{stats && (
				<>
					{userPrice !== null && pctRank !== null ? (
						<section
							aria-label="Your price compared"
							className="rounded-card border border-line bg-white p-5 shadow-rc md:p-6"
						>
							<p className="text-base leading-relaxed text-ink">
								Your price of{" "}
								<span className="font-bold">{fmt(userPrice)}</span> is above{" "}
								<span className="font-bold">{pctRank}%</span> of the{" "}
								<span className="font-semibold">{stats.count}</span>{" "}
								developments in{" "}
								<span className="font-semibold">{selectedCity}</span> in our
								database.
							</p>

							<div className="mt-5">
								<div className="mb-1 flex justify-between text-sm text-muted">
									<span>Cheapest</span>
									<span>Most expensive</span>
								</div>
								<div
									role="img"
									aria-label={`Your price is above ${pctRank}% of listed developments`}
									className="relative h-3 overflow-visible rounded-full bg-sky-strong"
								>
									<div
										className="absolute inset-y-0 left-0 rounded-full"
										style={{
											width: `${markerLeft}%`,
											backgroundColor: CHART_COLORS.primary,
										}}
									/>
									<div
										className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white shadow-sm"
										style={{
											left: `${markerLeft}%`,
											borderColor: CHART_COLORS.ink,
										}}
									/>
								</div>
								<div className="mt-1 flex justify-between text-sm text-muted">
									<span>{fmt(stats.min)}</span>
									<span>{fmt(stats.max)}</span>
								</div>
							</div>

							<p className="mt-4 text-sm text-muted">
								{pctRank >= 75
									? "Your price is in the top quarter: premium or luxury segment for this city."
									: pctRank >= 50
										? "Your price is above the median: upper mid-range for this city."
										: pctRank >= 25
											? "Your price is below the median: competitive mid-range for this city."
											: "Your price is in the bottom quarter: among the most affordable options in this city."}
							</p>
						</section>
					) : (
						<Callout tone="info">
							Enter a price above to see where it sits in the distribution.
						</Callout>
					)}

					<section aria-labelledby="dist-heading" className="space-y-4">
						<h2
							id="dist-heading"
							className="text-2xl font-bold tracking-tight text-ink"
						>
							{selectedCity}: price distribution
						</h2>
						<StatCard
							label="Median (50th percentile)"
							value={fmt(stats.median)}
							hint={`Based on ${stats.count} listed developments`}
						/>
						<DataTable
							caption={`Price distribution in ${selectedCity}`}
							hideCaption
							zebra
							columns={[
								{ header: "Metric" },
								{ header: "Price", align: "right" },
							]}
							rows={[
								["Min (lowest listed)", fmt(stats.min)],
								["25th percentile", fmt(stats.p25)],
								["Median (50th percentile)", fmt(stats.median)],
								["Average", fmt(stats.average)],
								["75th percentile", fmt(stats.p75)],
								["Max (highest listed)", fmt(stats.max)],
							]}
						/>
						<p className="text-sm text-muted">
							Based on {stats.count} listed developments in our database.
							Excludes unlisted or off-market properties.
						</p>
					</section>

					{CITY_NOTES[selectedCity] && (
						<Callout tone="info" title={`About ${selectedCity}`}>
							{CITY_NOTES[selectedCity]}
						</Callout>
					)}
				</>
			)}
		</>
	);
}
