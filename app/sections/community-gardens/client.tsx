"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	ALL_GARDEN_TYPES,
	type City,
	COMMUNITY_GARDENS,
	GARDEN_TIPS,
	GARDEN_TYPE_LABEL,
	type GardenType,
} from "@/lib/community-gardens";

// ---------------------------------------------------------------------------
// City Chip
// ---------------------------------------------------------------------------

function CityChip({
	city,
	selected,
	onClick,
}: {
	city: City | "All";
	selected: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={selected}
			className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
				selected
					? "bg-ink text-white border border-ink"
					: "bg-white text-ink border border-line hover:bg-sky"
			}`}
		>
			{city}
		</button>
	);
}

// ---------------------------------------------------------------------------
// Garden Type Chip
// ---------------------------------------------------------------------------

function GardenTypeChip({
	gardenType,
	selected,
	onClick,
}: {
	gardenType: GardenType | "All";
	selected: boolean;
	onClick: () => void;
}) {
	const label =
		gardenType === "All" ? "All Types" : GARDEN_TYPE_LABEL[gardenType];
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={selected}
			className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
				selected
					? "bg-primary text-white border border-primary"
					: "bg-white text-ink border border-line hover:bg-sky"
			}`}
		>
			{label}
		</button>
	);
}

// ---------------------------------------------------------------------------
// Garden Card
// ---------------------------------------------------------------------------

function GardenCard({
	garden,
}: {
	garden: (typeof COMMUNITY_GARDENS)[number];
}) {
	return (
		<div className="rounded-2xl border border-line bg-white p-4 text-sm flex flex-col gap-2">
			<div>
				<p className="font-bold text-ink leading-snug">{garden.name}</p>
				<p className="text-xs text-slate-500 mt-0.5">
					{garden.city}
					{garden.neighbourhood ? ` · ${garden.neighbourhood}` : ""}
				</p>
			</div>

			<div className="flex flex-wrap gap-1.5">
				<span className="rounded-full bg-sky-strong px-2 py-0.5 text-xs font-semibold text-ink">
					{GARDEN_TYPE_LABEL[garden.type]}
				</span>
				{garden.openToNewMembers ? (
					<span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs font-semibold text-green-800">
						Open to new members
					</span>
				) : (
					<span className="rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-xs font-semibold text-red-800">
						Currently closed
					</span>
				)}
				{garden.annualFeeApprox !== undefined && (
					<span className="rounded-full bg-sky-strong px-2 py-0.5 text-xs text-ink">
						~€{garden.annualFeeApprox}/yr
					</span>
				)}
			</div>

			{garden.produce.length > 0 && (
				<p className="text-xs text-slate-500">
					<span className="font-semibold text-slate-700">Grows: </span>
					{garden.produce.join(", ")}
				</p>
			)}

			<p className="text-slate-700 leading-relaxed text-xs">{garden.why}</p>

			<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold mt-1">
				{garden.website && (
					<a
						href={garden.website}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:text-primary-hover"
					>
						Website
					</a>
				)}
				{garden.contact && (
					<span className="text-slate-500">Contact: {garden.contact}</span>
				)}
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CommunityGardensPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<GardenType | "All">("All");

	const filtered = COMMUNITY_GARDENS.filter(
		(garden) =>
			(cityFilter === "All" || garden.city === cityFilter) &&
			(typeFilter === "All" || garden.type === typeFilter),
	);

	return (
		<main
			id="main"
			data-pagefind-body
			data-pagefind-filter="type[data-type]"
			data-type="directory"
			className="max-w-5xl mx-auto px-4 py-8 md:py-14"
		>
			{/* Back nav */}
			<nav className="text-xs text-slate-600 mb-6">
				<Link href="/" className="hover:text-ink">
					Home
				</Link>
				{" / "}
				<Link href="/sections" className="hover:text-ink">
					Directories
				</Link>
			</nav>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
					Cyprus Community
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Community Gardens &amp; Urban Farming in Cyprus
				</h1>
				<p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
					An emerging scene on the island. Community gardens, allotments, urban
					farms and rooftop growing projects across Cyprus — with honest notes
					on availability and access.
				</p>
				<p className="mt-2 text-sm text-ink bg-sky border border-line rounded-xl px-4 py-2 inline-block">
					This is a growing movement — many schemes are small, volunteer-run, or
					municipality pilots. Verify details directly before visiting.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{GARDEN_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-2xl border border-line bg-sky p-4 text-xs"
						>
							<p className="font-bold text-sm text-ink mb-1.5">{tip.heading}</p>
							<p className="text-slate-700 leading-relaxed">{tip.body}</p>
						</div>
					))}
				</div>
			</section>

			{/* City filter */}
			<div className="mb-3 flex flex-wrap gap-1.5">
				{(["All", ...ALL_CITIES] as const).map((c) => (
					<CityChip
						key={c}
						city={c}
						selected={cityFilter === c}
						onClick={() => setCityFilter(c)}
					/>
				))}
			</div>

			{/* Garden type filter */}
			<div className="mb-8 flex flex-wrap gap-1.5">
				{(["All", ...ALL_GARDEN_TYPES] as const).map((t) => (
					<GardenTypeChip
						key={t}
						gardenType={t}
						selected={typeFilter === t}
						onClick={() => setTypeFilter(t)}
					/>
				))}
			</div>

			{/* Results */}
			{filtered.length === 0 ? (
				<p className="text-sm text-slate-500 bg-sky rounded-2xl border border-line px-4 py-6 text-center">
					No gardens match the selected filters.
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((garden) => (
						<GardenCard key={`${garden.name}-${garden.city}`} garden={garden} />
					))}
				</div>
			)}

			<p className="mt-10 text-xs text-slate-500">
				Community garden availability, fees, and membership status change
				frequently. Always contact the organisation directly for current
				information.
			</p>
		</main>
	);
}
