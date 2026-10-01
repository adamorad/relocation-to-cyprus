"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	ALL_FITNESS_TYPES,
	type City,
	FITNESS_TIPS,
	FITNESS_TYPE_LABEL,
	FITNESS_VENUES,
	type FitnessType,
} from "@/lib/fitness-wellness";

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
					? "bg-ink text-white border border-ink"
					: "bg-white text-ink border border-line hover:bg-sky"
			}`}
		>
			{label}
		</button>
	);
}

export default function FitnessWellnessPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<FitnessType | "All">("All");

	const filtered = FITNESS_VENUES.filter(
		(v) =>
			(cityFilter === "All" || v.city === cityFilter) &&
			(typeFilter === "All" || v.type === typeFilter),
	);

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Fitness & Wellness Studios" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
					Fitness &amp; Wellness
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Gyms, Fitness Studios &amp; Wellness in Cyprus
				</h1>
				<p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
					From CrossFit boxes to yoga studios, padel clubs, and hotel spas — a
					curated directory of fitness and wellness venues for relocators across
					all four cities.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-3">
					Fitness in Cyprus — what to know
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{FITNESS_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-2xl border border-line bg-sky p-4 text-sm"
						>
							<p className="font-bold text-ink">{tip.heading}</p>
							<p className="mt-1.5 text-slate-600 leading-relaxed text-xs">
								{tip.body}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Filters */}
			<section className="mb-6 space-y-3">
				<div>
					<p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
						City
					</p>
					<div className="flex flex-wrap gap-1.5">
						<CityChip
							city="All"
							selected={cityFilter === "All"}
							onClick={() => setCityFilter("All")}
						/>
						{ALL_CITIES.map((c) => (
							<CityChip
								key={c}
								city={c}
								selected={cityFilter === c}
								onClick={() => setCityFilter(c)}
							/>
						))}
					</div>
				</div>
				<div>
					<p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
						Type
					</p>
					<div className="flex flex-wrap gap-1.5">
						<TypeChip
							label="All types"
							selected={typeFilter === "All"}
							onClick={() => setTypeFilter("All")}
						/>
						{ALL_FITNESS_TYPES.map((t) => (
							<TypeChip
								key={t}
								label={FITNESS_TYPE_LABEL[t]}
								selected={typeFilter === t}
								onClick={() => setTypeFilter(t)}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{filtered.length === 0
					? "No venues match the current filters."
					: `${filtered.length} venue${filtered.length === 1 ? "" : "s"}`}
			</p>

			{/* Card grid */}
			{filtered.length > 0 && (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((venue) => (
						<li
							key={`${venue.name}-${venue.city}`}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow-sm transition-shadow"
						>
							<div>
								<p className="font-bold text-ink text-sm leading-snug">
									{venue.name}
								</p>
								<p className="text-xs text-slate-500 mt-0.5">
									{venue.city}
									{venue.neighbourhood ? ` · ${venue.neighbourhood}` : ""}
									{" · "}
									<span className="text-primary font-semibold">
										{FITNESS_TYPE_LABEL[venue.type]}
									</span>
								</p>
							</div>

							<p className="text-xs text-slate-600 leading-relaxed flex-1">
								{venue.why}
							</p>

							<div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
								{venue.monthlyFrom !== undefined && (
									<span>
										Monthly from{" "}
										<span className="font-semibold text-slate-700">
											€{venue.monthlyFrom}
										</span>
									</span>
								)}
								{venue.dropInFrom !== undefined && (
									<span>
										Drop-in from{" "}
										<span className="font-semibold text-slate-700">
											€{venue.dropInFrom}
										</span>
									</span>
								)}
								{venue.englishSpoken && (
									<span className="text-primary font-semibold">
										English spoken
									</span>
								)}
							</div>

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
						</li>
					))}
				</ul>
			)}

			{/* Footer nav */}
			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
