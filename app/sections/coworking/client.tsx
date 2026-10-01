"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	ALL_COWORK_TYPES,
	type City,
	COWORK_SPACES,
	COWORK_TIPS,
	COWORK_TYPE_LABEL,
	type CoworkSpaceType,
	NOISE_LEVEL_LABEL,
	type NoiseLevel,
} from "@/lib/coworking";

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
// Noise level badge
// ---------------------------------------------------------------------------

const NOISE_COLOR: Record<NoiseLevel, string> = {
	quiet: "bg-green-50 text-green-800",
	moderate: "bg-amber-50 text-amber-900",
	lively: "bg-orange-50 text-orange-800",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CoworkingPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<CoworkSpaceType | "All">("All");

	const visible = COWORK_SPACES.filter(
		(s) =>
			(cityFilter === "All" || s.city === cityFilter) &&
			(typeFilter === "All" || s.type === typeFilter),
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
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
					Coworking
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Coworking Spaces in Cyprus
				</h1>
				<p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
					Directory with day-pass prices, monthly rates and WiFi speeds. Covers
					coworking, managed offices and café-friendly workspaces.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
				{COWORK_TIPS.map((tip) => (
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
				{ALL_COWORK_TYPES.map((t) => (
					<TypeChip
						key={t}
						label={COWORK_TYPE_LABEL[t]}
						selected={typeFilter === t}
						onClick={() => setTypeFilter(t)}
					/>
				))}
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{visible.length === 0
					? "No spaces match these filters."
					: `${visible.length} space${visible.length === 1 ? "" : "s"}`}
			</p>

			{/* Card grid */}
			{visible.length > 0 && (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{visible.map((space) => (
						<li
							key={space.name}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow-sm transition-shadow"
						>
							<div className="flex items-start justify-between gap-2">
								<div className="min-w-0">
									<div className="flex items-center gap-1.5 flex-wrap mb-0.5">
										<span className="inline-block text-xs uppercase tracking-wider font-bold text-ink bg-sky-strong rounded px-1.5 py-0.5">
											{COWORK_TYPE_LABEL[space.type]}
										</span>
										<span
											className={`inline-block text-xs font-semibold rounded px-1.5 py-0.5 ${NOISE_COLOR[space.noiseLevel]}`}
										>
											{NOISE_LEVEL_LABEL[space.noiseLevel]}
										</span>
									</div>
									<p className="font-bold text-sm text-ink">{space.name}</p>
									<p className="text-xs text-slate-500 mt-0.5">
										{space.city}
										{space.neighbourhood ? ` · ${space.neighbourhood}` : ""}
									</p>
								</div>
							</div>

							{/* Pricing row */}
							<div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-600">
								{space.dayPassEuros != null && (
									<span>
										Day:{" "}
										<span className="font-semibold text-ink">
											€{space.dayPassEuros}
										</span>
									</span>
								)}
								{space.monthlyHotDesk != null && (
									<span>
										Hot desk:{" "}
										<span className="font-semibold text-ink">
											€{space.monthlyHotDesk}/mo
										</span>
									</span>
								)}
								{space.monthlyDedicatedDesk != null && (
									<span>
										Dedicated:{" "}
										<span className="font-semibold text-ink">
											€{space.monthlyDedicatedDesk}/mo
										</span>
									</span>
								)}
								{space.wifiMbps != null && (
									<span>
										WiFi:{" "}
										<span className="font-semibold text-ink">
											{space.wifiMbps} Mbps
										</span>
									</span>
								)}
							</div>

							<p className="text-xs text-slate-700 leading-relaxed flex-1">
								{space.why}
							</p>

							{/* Amenities */}
							{space.amenities.length > 0 && (
								<div className="flex flex-wrap gap-1">
									{space.amenities.map((a) => (
										<span
											key={a}
											className="text-xs bg-sky-strong text-ink rounded px-1.5 py-0.5"
										>
											{a}
										</span>
									))}
								</div>
							)}

							<div className="flex items-center justify-between mt-1">
								<p className="text-xs text-muted">
									Verified {space.verifiedDate}
								</p>
								{space.website && (
									<a
										href={space.website}
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
