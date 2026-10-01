"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";

type Frequency = "daily" | "several/week" | "seasonal";

type Route = {
	destination: string;
	country: string;
	airportTo: string;
	carriers: string[];
	flightTimeMinutes: number;
	frequency: Frequency;
	fromLCA: boolean;
	fromPFO: boolean;
};

const ROUTES: Route[] = [
	// UK
	{
		destination: "London Heathrow",
		country: "United Kingdom",
		airportTo: "LHR",
		carriers: ["British Airways", "Cyprus Airways"],
		flightTimeMinutes: 265,
		frequency: "daily",
		fromLCA: true,
		fromPFO: true,
	},
	{
		destination: "London Gatwick",
		country: "United Kingdom",
		airportTo: "LGW",
		carriers: ["easyJet", "TUI"],
		flightTimeMinutes: 270,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: true,
	},
	{
		destination: "Manchester",
		country: "United Kingdom",
		airportTo: "MAN",
		carriers: ["TUI", "Jet2"],
		flightTimeMinutes: 285,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: true,
	},
	{
		destination: "Birmingham",
		country: "United Kingdom",
		airportTo: "BHX",
		carriers: ["TUI", "Jet2"],
		flightTimeMinutes: 280,
		frequency: "several/week",
		fromLCA: false,
		fromPFO: true,
	},
	{
		destination: "Edinburgh",
		country: "United Kingdom",
		airportTo: "EDI",
		carriers: ["Jet2"],
		flightTimeMinutes: 295,
		frequency: "seasonal",
		fromLCA: false,
		fromPFO: true,
	},
	// Greece
	{
		destination: "Athens",
		country: "Greece",
		airportTo: "ATH",
		carriers: ["Aegean Airlines", "Cyprus Airways", "Ryanair"],
		flightTimeMinutes: 90,
		frequency: "daily",
		fromLCA: true,
		fromPFO: true,
	},
	{
		destination: "Thessaloniki",
		country: "Greece",
		airportTo: "SKG",
		carriers: ["Aegean Airlines", "Ryanair"],
		flightTimeMinutes: 95,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Germany
	{
		destination: "Frankfurt",
		country: "Germany",
		airportTo: "FRA",
		carriers: ["Lufthansa", "Cyprus Airways"],
		flightTimeMinutes: 220,
		frequency: "daily",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Munich",
		country: "Germany",
		airportTo: "MUC",
		carriers: ["Lufthansa"],
		flightTimeMinutes: 225,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Berlin",
		country: "Germany",
		airportTo: "BER",
		carriers: ["Ryanair", "easyJet"],
		flightTimeMinutes: 215,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Düsseldorf",
		country: "Germany",
		airportTo: "DUS",
		carriers: ["Eurowings", "Condor"],
		flightTimeMinutes: 225,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: true,
	},
	{
		destination: "Stuttgart",
		country: "Germany",
		airportTo: "STR",
		carriers: ["Condor"],
		flightTimeMinutes: 220,
		frequency: "seasonal",
		fromLCA: true,
		fromPFO: false,
	},
	// Israel
	{
		destination: "Tel Aviv",
		country: "Israel",
		airportTo: "TLV",
		carriers: ["El Al", "Arkia", "Israir", "Cyprus Airways"],
		flightTimeMinutes: 105,
		frequency: "daily",
		fromLCA: true,
		fromPFO: true,
	},
	// UAE
	{
		destination: "Dubai",
		country: "UAE",
		airportTo: "DXB",
		carriers: ["Emirates", "flydubai"],
		flightTimeMinutes: 230,
		frequency: "daily",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Abu Dhabi",
		country: "UAE",
		airportTo: "AUH",
		carriers: ["Etihad Airways"],
		flightTimeMinutes: 235,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// France
	{
		destination: "Paris CDG",
		country: "France",
		airportTo: "CDG",
		carriers: ["Air France", "Transavia"],
		flightTimeMinutes: 245,
		frequency: "daily",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Lyon",
		country: "France",
		airportTo: "LYS",
		carriers: ["Transavia"],
		flightTimeMinutes: 235,
		frequency: "seasonal",
		fromLCA: true,
		fromPFO: false,
	},
	// Netherlands
	{
		destination: "Amsterdam",
		country: "Netherlands",
		airportTo: "AMS",
		carriers: ["KLM", "Transavia"],
		flightTimeMinutes: 250,
		frequency: "daily",
		fromLCA: true,
		fromPFO: false,
	},
	// Poland
	{
		destination: "Warsaw",
		country: "Poland",
		airportTo: "WAW",
		carriers: ["LOT Polish Airlines", "Ryanair"],
		flightTimeMinutes: 195,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Krakow",
		country: "Poland",
		airportTo: "KRK",
		carriers: ["Ryanair"],
		flightTimeMinutes: 190,
		frequency: "seasonal",
		fromLCA: true,
		fromPFO: false,
	},
	// Austria
	{
		destination: "Vienna",
		country: "Austria",
		airportTo: "VIE",
		carriers: ["Austrian Airlines", "Lauda"],
		flightTimeMinutes: 200,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Switzerland
	{
		destination: "Zurich",
		country: "Switzerland",
		airportTo: "ZRH",
		carriers: ["SWISS", "Edelweiss Air"],
		flightTimeMinutes: 230,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: true,
	},
	{
		destination: "Geneva",
		country: "Switzerland",
		airportTo: "GVA",
		carriers: ["SWISS", "easyJet"],
		flightTimeMinutes: 240,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Belgium
	{
		destination: "Brussels",
		country: "Belgium",
		airportTo: "BRU",
		carriers: ["Brussels Airlines", "Ryanair"],
		flightTimeMinutes: 240,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Sweden
	{
		destination: "Stockholm",
		country: "Sweden",
		airportTo: "ARN",
		carriers: ["SAS", "Ryanair"],
		flightTimeMinutes: 255,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Czech Republic
	{
		destination: "Prague",
		country: "Czech Republic",
		airportTo: "PRG",
		carriers: ["Ryanair", "Wizz Air"],
		flightTimeMinutes: 200,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Italy
	{
		destination: "Rome Fiumicino",
		country: "Italy",
		airportTo: "FCO",
		carriers: ["ITA Airways", "Ryanair"],
		flightTimeMinutes: 200,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Milan Malpensa",
		country: "Italy",
		airportTo: "MXP",
		carriers: ["easyJet", "Ryanair"],
		flightTimeMinutes: 215,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Jordan
	{
		destination: "Amman",
		country: "Jordan",
		airportTo: "AMM",
		carriers: ["Royal Jordanian", "Cyprus Airways"],
		flightTimeMinutes: 110,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Lebanon
	{
		destination: "Beirut",
		country: "Lebanon",
		airportTo: "BEY",
		carriers: ["Middle East Airlines", "Cyprus Airways"],
		flightTimeMinutes: 75,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Egypt
	{
		destination: "Cairo",
		country: "Egypt",
		airportTo: "CAI",
		carriers: ["EgyptAir", "Air Cairo"],
		flightTimeMinutes: 120,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Georgia
	{
		destination: "Tbilisi",
		country: "Georgia",
		airportTo: "TBS",
		carriers: ["Georgian Airways", "Wizz Air"],
		flightTimeMinutes: 185,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Romania
	{
		destination: "Bucharest",
		country: "Romania",
		airportTo: "OTP",
		carriers: ["Ryanair", "Wizz Air"],
		flightTimeMinutes: 155,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Hungary
	{
		destination: "Budapest",
		country: "Hungary",
		airportTo: "BUD",
		carriers: ["Wizz Air", "Ryanair"],
		flightTimeMinutes: 175,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
	// Spain
	{
		destination: "Madrid",
		country: "Spain",
		airportTo: "MAD",
		carriers: ["Iberia", "Volotea"],
		flightTimeMinutes: 280,
		frequency: "seasonal",
		fromLCA: true,
		fromPFO: false,
	},
	{
		destination: "Barcelona",
		country: "Spain",
		airportTo: "BCN",
		carriers: ["Vueling", "Ryanair"],
		flightTimeMinutes: 265,
		frequency: "seasonal",
		fromLCA: true,
		fromPFO: false,
	},
	// Ukraine (suspended, Ukrainian airspace closed since Feb 2022)
	// { destination: "Kyiv", country: "Ukraine", airportTo: "KBP", carriers: ["Ukraine International Airlines"], flightTimeMinutes: 195, frequency: "seasonal", fromLCA: true, fromPFO: false },
	// Armenia
	{
		destination: "Yerevan",
		country: "Armenia",
		airportTo: "EVN",
		carriers: ["Armenia Aviation", "Flyone Armenia"],
		flightTimeMinutes: 200,
		frequency: "several/week",
		fromLCA: true,
		fromPFO: false,
	},
];

const FREQUENCY_LABEL: Record<Frequency, string> = {
	daily: "Daily",
	"several/week": "Several per week",
	seasonal: "Seasonal",
};

function formatFlightTime(minutes: number): string {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

type AirportFilter = "all" | "LCA" | "PFO";
type SeasonFilter = "all" | "year-round" | "seasonal";

export default function FlightConnectivityPage() {
	const [search, setSearch] = useState("");
	const [airportFilter, setAirportFilter] = useState<AirportFilter>("all");
	const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");

	const filtered = useMemo(() => {
		return ROUTES.filter((r) => {
			const q = search.toLowerCase();
			if (
				q &&
				!r.destination.toLowerCase().includes(q) &&
				!r.country.toLowerCase().includes(q)
			) {
				return false;
			}
			if (airportFilter === "LCA" && !r.fromLCA) return false;
			if (airportFilter === "PFO" && !r.fromPFO) return false;
			if (seasonFilter === "year-round" && r.frequency === "seasonal")
				return false;
			if (seasonFilter === "seasonal" && r.frequency !== "seasonal")
				return false;
			return true;
		}).sort((a, b) => a.destination.localeCompare(b.destination));
	}, [search, airportFilter, seasonFilter]);

	return (
		<>
			{/* Filters */}
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<div>
					<label
						htmlFor="flight-search"
						className="mb-2 block text-sm font-semibold text-ink"
					>
						Search city or country
					</label>
					<input
						id="flight-search"
						type="text"
						placeholder="Search city or country..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="min-h-11 w-full rounded-field border border-line bg-white px-4 py-2 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus"
					/>
				</div>
				<div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
					<ChipGroup
						label="Airport"
						value={airportFilter}
						onChange={setAirportFilter}
						options={[
							{ value: "all", label: "All airports" },
							{ value: "LCA", label: "LCA" },
							{ value: "PFO", label: "PFO" },
						]}
					/>
					<ChipGroup
						label="Schedule"
						value={seasonFilter}
						onChange={setSeasonFilter}
						options={[
							{ value: "all", label: "All schedules" },
							{ value: "year-round", label: "Year-round" },
							{ value: "seasonal", label: "Seasonal" },
						]}
					/>
				</div>
			</div>

			<h2
				className="text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length} destination{filtered.length !== 1 ? "s" : ""} found
			</h2>

			{/* Route cards grid */}
			<CardGrid cols={3}>
				{filtered.map((r) => (
					<CardGridItem key={`${r.destination}-${r.airportTo}`}>
						<article className="w-full rounded-card border border-line bg-white p-4">
							<div className="mb-2 flex items-start justify-between gap-2">
								<div>
									<h3 className="text-base font-bold leading-tight text-ink">
										{r.destination}
									</h3>
									<p className="mt-0.5 text-sm text-muted">
										{r.country} &middot; {r.airportTo}
									</p>
								</div>
								<Badge>{FREQUENCY_LABEL[r.frequency]}</Badge>
							</div>

							<div className="mt-3 flex items-center gap-4 text-sm">
								<div>
									<span className="block text-sm text-muted">Flight time</span>
									<span className="font-semibold text-ink">
										{formatFlightTime(r.flightTimeMinutes)}
									</span>
								</div>
								<div className="ml-auto flex gap-1">
									{r.fromLCA && <Badge>LCA</Badge>}
									{r.fromPFO && <Badge>PFO</Badge>}
								</div>
							</div>

							<div className="mt-3 border-t border-line pt-3">
								<p className="mb-1 text-sm font-medium text-muted">Airlines</p>
								<div className="flex flex-wrap gap-1">
									{r.carriers.map((c) => (
										<span
											key={c}
											className="rounded bg-sky px-2 py-0.5 text-sm text-ink"
										>
											{c}
										</span>
									))}
								</div>
							</div>
						</article>
					</CardGridItem>
				))}
			</CardGrid>

			{filtered.length === 0 && (
				<div className="py-16 text-center text-muted">
					No routes match your filters. Try broadening your search.
				</div>
			)}

			<p className="text-center text-sm text-muted">
				Route data is indicative. Schedules, carriers and frequencies change
				seasonally. Verify on airline websites before booking.
			</p>
		</>
	);
}
