"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	ALL_STARTUP_VENUE_TYPES,
	type City,
	STARTUP_TIPS,
	STARTUP_VENUE_TYPE_LABEL,
	STARTUP_VENUES,
	type StartupVenueType,
} from "@/lib/startup-ecosystem";

// ---------------------------------------------------------------------------
// Chip helpers
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
			className={`rounded-full inline-flex min-h-11 items-center px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors md:min-h-0 ${
				selected
					? "bg-ink text-white border border-ink"
					: "bg-white text-ink border border-line hover:bg-sky"
			}`}
		>
			{city}
		</button>
	);
}

function TypeChip({
	label,
	selected,
	onClick,
}: {
	label: string;
	selected: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={selected}
			className={`rounded-full inline-flex min-h-11 items-center px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors md:min-h-0 ${
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
// Page
// ---------------------------------------------------------------------------

export default function StartupEcosystemPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<StartupVenueType | "All">("All");

	const visible = STARTUP_VENUES.filter(
		(v) =>
			(cityFilter === "All" || v.city === cityFilter) &&
			(typeFilter === "All" || v.type === typeFilter),
	);

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
			{/* Back nav */}
			<nav className="text-xs text-slate-500 mb-6">
				<Link href="/sections" className="hover:text-ink">
					Directories
				</Link>
			</nav>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Startup Ecosystem
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Cyprus Startup Ecosystem
				</h1>
				<p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
					Coworking spaces, incubators, accelerators and tech hubs across Cyprus
					— with focus areas and membership pricing.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
				{STARTUP_TIPS.map((tip) => (
					<div
						key={tip.heading}
						className="rounded-2xl border border-line bg-sky p-4 text-xs"
					>
						<p className="font-bold text-sm text-ink mb-1.5">{tip.heading}</p>
						<p className="text-slate-700 leading-relaxed">{tip.body}</p>
					</div>
				))}
			</section>

			{/* City filter */}
			<div className="flex flex-wrap gap-1.5 mb-3">
				{(["All", ...ALL_CITIES] as const).map((c) => (
					<CityChip
						key={c}
						city={c}
						selected={cityFilter === c}
						onClick={() => setCityFilter(c)}
					/>
				))}
			</div>

			{/* Type filter */}
			<div className="flex flex-wrap gap-1.5 mb-6">
				<TypeChip
					label="All types"
					selected={typeFilter === "All"}
					onClick={() => setTypeFilter("All")}
				/>
				{ALL_STARTUP_VENUE_TYPES.map((t) => (
					<TypeChip
						key={t}
						label={STARTUP_VENUE_TYPE_LABEL[t]}
						selected={typeFilter === t}
						onClick={() => setTypeFilter(t)}
					/>
				))}
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{visible.length === 0
					? "No venues match these filters."
					: `${visible.length} venue${visible.length === 1 ? "" : "s"}`}
			</p>

			{/* Card grid */}
			{visible.length > 0 && (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{visible.map((venue) => (
						<li
							key={venue.name}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2 shadow-sm"
						>
							<div>
								<span className="inline-block text-xs uppercase tracking-wider font-bold text-primary bg-sky-strong rounded-full px-1.5 py-0.5 mb-1">
									{STARTUP_VENUE_TYPE_LABEL[venue.type]}
								</span>
								<p className="font-bold text-sm text-ink">{venue.name}</p>
								<p className="text-xs text-slate-500 mt-0.5">
									{venue.city}
									{venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
								</p>
							</div>

							{venue.focusAreas.length > 0 && (
								<div className="flex flex-wrap gap-1">
									{venue.focusAreas.map((area) => (
										<span
											key={area}
											className="text-xs bg-sky-strong text-slate-600 rounded px-1.5 py-0.5"
										>
											{area}
										</span>
									))}
								</div>
							)}

							<p className="text-xs text-slate-700 leading-relaxed flex-1">
								{venue.why}
							</p>

							<div className="flex items-center justify-between mt-1">
								{venue.membershipFrom != null ? (
									<p className="text-xs text-slate-500">
										From{" "}
										<span className="font-semibold text-ink">
											€{venue.membershipFrom}/mo
										</span>
									</p>
								) : (
									<span />
								)}
								{venue.website && (
									<a
										href={venue.website}
										target="_blank"
										rel="noopener noreferrer"
										className="text-xs font-semibold text-primary hover:text-primary-hover"
									>
										Website
									</a>
								)}
							</div>
						</li>
					))}
				</ul>
			)}

			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink">
					Back to Explore
				</Link>
			</p>
		</main>
	);
}
