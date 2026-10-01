"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
	// Ukraine (suspended — Ukrainian airspace closed since Feb 2022)
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

const FREQUENCY_COLOR: Record<Frequency, string> = {
	daily: "bg-green-100 text-green-800",
	"several/week": "bg-sky-strong text-ink",
	seasonal: "bg-slate-100 text-slate-700",
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
		<main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-12">
			<nav className="text-xs text-slate-500 mb-6">
				<Link href="/tools/" className="hover:text-ink">
					Tools
				</Link>{" "}
				&rsaquo; <span className="text-ink">Flight Connectivity</span>
			</nav>

			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
					Interactive Tool
				</p>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Cyprus Flight Connectivity
				</h1>
				<p className="mt-3 text-slate-600 max-w-2xl">
					Explore direct routes from Larnaca (LCA) and Paphos (PFO) airports.
					Search by destination, filter by airport or schedule.
				</p>
			</header>

			{/* Filters */}
			<div className="bg-sky border border-line rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
				<input
					type="text"
					placeholder="Search city or country..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="flex-1 border border-line rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-focus"
				/>
				<div className="flex gap-2 flex-wrap">
					{(["all", "LCA", "PFO"] as AirportFilter[]).map((v) => (
						<button
							key={v}
							onClick={() => setAirportFilter(v)}
							className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
								airportFilter === v
									? "bg-primary text-white border-primary"
									: "bg-white text-slate-700 border-line hover:border-primary"
							}`}
						>
							{v === "all" ? "All airports" : v}
						</button>
					))}
				</div>
				<div className="flex gap-2 flex-wrap">
					{(["all", "year-round", "seasonal"] as SeasonFilter[]).map((v) => (
						<button
							key={v}
							onClick={() => setSeasonFilter(v)}
							className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
								seasonFilter === v
									? "bg-primary text-white border-primary"
									: "bg-white text-slate-700 border-line hover:border-primary"
							}`}
						>
							{v === "all"
								? "All schedules"
								: v.charAt(0).toUpperCase() + v.slice(1)}
						</button>
					))}
				</div>
			</div>

			<p className="text-sm text-slate-500 mb-4">
				{filtered.length} destination{filtered.length !== 1 ? "s" : ""} found
			</p>

			{/* Route cards grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((r) => (
					<div
						key={`${r.destination}-${r.airportTo}`}
						className="bg-white border border-line rounded-2xl p-4 hover:border-primary transition-colors"
					>
						<div className="flex items-start justify-between mb-2">
							<div>
								<h2 className="font-bold text-ink text-base leading-tight">
									{r.destination}
								</h2>
								<p className="text-xs text-slate-500 mt-0.5">
									{r.country} &middot; {r.airportTo}
								</p>
							</div>
							<span
								className={`text-xs px-2 py-1 rounded-full font-medium ${FREQUENCY_COLOR[r.frequency]}`}
							>
								{FREQUENCY_LABEL[r.frequency]}
							</span>
						</div>

						<div className="mt-3 flex items-center gap-4 text-sm">
							<div>
								<span className="text-slate-500 text-xs block">
									Flight time
								</span>
								<span className="font-semibold text-ink">
									{formatFlightTime(r.flightTimeMinutes)}
								</span>
							</div>
							<div className="flex gap-1 ml-auto">
								{r.fromLCA && (
									<span className="bg-ink text-white text-xs px-2 py-0.5 rounded font-medium">
										LCA
									</span>
								)}
								{r.fromPFO && (
									<span className="bg-ink text-white text-xs px-2 py-0.5 rounded font-medium">
										PFO
									</span>
								)}
							</div>
						</div>

						<div className="mt-3 pt-3 border-t border-slate-100">
							<p className="text-xs text-slate-500 font-medium mb-1">
								Airlines
							</p>
							<div className="flex flex-wrap gap-1">
								{r.carriers.map((c) => (
									<span
										key={c}
										className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
									>
										{c}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			{filtered.length === 0 && (
				<div className="text-center py-16 text-slate-500">
					No routes match your filters. Try broadening your search.
				</div>
			)}

			<p className="mt-8 text-xs text-muted text-center">
				Route data is indicative. Schedules, carriers and frequencies change
				seasonally. Verify on airline websites before booking.
			</p>

			<p className="mt-6 text-sm">
				<Link href="/tools/" className="text-primary hover:underline">
					&larr; Back to tools
				</Link>
			</p>

			<aside className="mt-10 p-5 rounded-2xl bg-sky border border-line">
				<p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
					Next steps
				</p>
				<div className="flex flex-wrap gap-3">
					<Link
						href="/guides/airport-transfers-guide/"
						className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Read: Getting Around Cyprus
					</Link>{" "}
					<Link
						href="/explore/"
						className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Explore Cyprus by region
					</Link>
				</div>
			</aside>
		</main>
	);
}
