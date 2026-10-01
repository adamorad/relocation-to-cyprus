"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	ALL_VENUE_TYPES,
	type City,
	CULTURAL_VENUES,
	CULTURE_TIPS,
	VENUE_TYPE_LABEL,
	type VenueType,
} from "@/lib/art-culture";

function CityChip({
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

export default function ArtCulturePage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<VenueType | "All">("All");

	const filtered = CULTURAL_VENUES.filter((venue) => {
		const cityMatch = cityFilter === "All" || venue.city === cityFilter;
		const typeMatch = typeFilter === "All" || venue.type === typeFilter;
		return cityMatch && typeMatch;
	});

	return (
		<main
			id="main"
			data-pagefind-body
			data-pagefind-filter="type[data-type]"
			data-type="directory"
			className="max-w-5xl mx-auto px-4 py-8 md:py-12"
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
					Art & Culture
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Art Galleries, Museums & Cultural Venues in Cyprus
				</h1>
				<p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
					From the Cyprus Museum's 8,000 years of artefacts to Limassol's
					thriving contemporary galleries — the cultural institutions worth
					knowing as a new resident.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
				{CULTURE_TIPS.map((tip) => (
					<div
						key={tip.heading}
						className="rounded-2xl border border-line bg-sky p-4 text-sm"
					>
						<p className="font-bold text-ink">{tip.heading}</p>
						<p className="mt-1.5 text-slate-700 leading-relaxed">{tip.body}</p>
					</div>
				))}
			</section>

			{/* City filter */}
			<div className="mb-3 flex flex-wrap gap-1.5">
				{(["All", ...ALL_CITIES] as const).map((c) => (
					<CityChip
						key={c}
						label={c}
						selected={cityFilter === c}
						onClick={() => setCityFilter(c)}
					/>
				))}
			</div>

			{/* Type filter */}
			<div className="mb-8 flex flex-wrap gap-1.5">
				{(["All", ...ALL_VENUE_TYPES] as const).map((t) => (
					<CityChip
						key={t}
						label={t === "All" ? "All Types" : VENUE_TYPE_LABEL[t]}
						selected={typeFilter === t}
						onClick={() => setTypeFilter(t)}
					/>
				))}
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{filtered.length} venue{filtered.length !== 1 ? "s" : ""} shown
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{typeFilter !== "All" ? ` · ${VENUE_TYPE_LABEL[typeFilter]}` : ""}
			</p>

			{/* Cards */}
			{filtered.length === 0 ? (
				<p className="text-sm text-slate-500 bg-sky border border-line rounded-2xl px-5 py-4">
					No venues found for the selected filters.
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((venue) => (
						<article
							key={`${venue.name}-${venue.city}`}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2"
						>
							<div>
								<p className="font-bold text-ink text-sm leading-snug">
									{venue.name}
								</p>
								<p className="text-xs text-slate-500 mt-0.5">
									{venue.city}
									{venue.neighbourhood ? (
										<>
											<span className="mx-1 text-muted">·</span>
											{venue.neighbourhood}
										</>
									) : null}
								</p>
							</div>

							<div className="flex flex-wrap gap-1.5">
								<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-primary/10 text-ink">
									{VENUE_TYPE_LABEL[venue.type]}
								</span>
								{venue.admissionEuros !== undefined && (
									<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-sky-strong text-ink">
										{venue.admissionEuros === 0
											? "Free entry"
											: `€${venue.admissionEuros}`}
									</span>
								)}
								{venue.englishSupport && (
									<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-sky-strong text-ink">
										English
									</span>
								)}
							</div>

							<p className="text-xs text-slate-600 italic leading-relaxed">
								{venue.highlights}
							</p>

							<p className="text-xs text-slate-700 leading-relaxed flex-1">
								{venue.why}
							</p>

							{venue.website && (
								<a
									href={venue.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-xs font-semibold text-primary hover:text-primary-hover mt-auto"
								>
									Website
								</a>
							)}
						</article>
					))}
				</div>
			)}
		</main>
	);
}
