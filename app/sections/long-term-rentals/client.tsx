"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	ALL_RENTAL_TYPES,
	type City,
	FURNISHED_LABEL,
	type FurnishedStatus,
	RENTAL_LISTINGS,
	RENTAL_TIPS,
	RENTAL_TYPE_LABEL,
	type RentalType,
} from "@/lib/long-term-rentals";

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

function FilterChip({
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
					? "bg-ink text-white border border-ink"
					: "bg-white text-ink border border-line hover:bg-sky"
			}`}
		>
			{label}
		</button>
	);
}

const ALL_FURNISHED: ReadonlyArray<FurnishedStatus> = [
	"furnished",
	"unfurnished",
	"both",
];

export default function LongTermRentalsPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<RentalType | "All">("All");
	const [furnishedFilter, setFurnishedFilter] = useState<
		FurnishedStatus | "All"
	>("All");

	const filtered = RENTAL_LISTINGS.filter((r) => {
		if (cityFilter !== "All" && r.city !== cityFilter) return false;
		if (typeFilter !== "All" && r.type !== typeFilter) return false;
		if (furnishedFilter !== "All") {
			if (furnishedFilter === "furnished" && r.furnished === "unfurnished")
				return false;
			if (furnishedFilter === "unfurnished" && r.furnished === "furnished")
				return false;
		}
		return true;
	});

	return (
		<main id="main" className="max-w-5xl mx-auto px-6 py-10 md:py-16">
			{/* Back nav */}
			<nav className="text-xs text-slate-600 mb-6">
				<Link href="/sections" className="hover:text-ink">
					Directories
				</Link>
			</nav>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Long-Term Rentals
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Long-Term Rentals in Cyprus
				</h1>
				<p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-2xl">
					Monthly furnished and unfurnished rentals across all four cities,
					from city-centre studios to seafront villas. Real areas, real price
					ranges, and links to the main Cypriot rental portals.
				</p>
			</header>

			{/* Tips section */}
			<section className="mb-10">
				<h2 className="text-xl font-bold mb-4 text-ink">Before you search</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{RENTAL_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-2xl border border-line bg-sky p-4 text-xs"
						>
							<p className="font-bold text-sm text-ink">{tip.heading}</p>
							<p className="mt-1.5 text-slate-700 leading-relaxed">
								{tip.body}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Filters */}
			<section className="mb-8 space-y-3">
				<div>
					<p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
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
					<p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
						Property type
					</p>
					<div className="flex flex-wrap gap-1.5">
						<FilterChip
							label="All types"
							selected={typeFilter === "All"}
							onClick={() => setTypeFilter("All")}
						/>
						{ALL_RENTAL_TYPES.map((t) => (
							<FilterChip
								key={t}
								label={RENTAL_TYPE_LABEL[t]}
								selected={typeFilter === t}
								onClick={() => setTypeFilter(t)}
							/>
						))}
					</div>
				</div>

				<div>
					<p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
						Furnished
					</p>
					<div className="flex flex-wrap gap-1.5">
						<FilterChip
							label="All"
							selected={furnishedFilter === "All"}
							onClick={() => setFurnishedFilter("All")}
						/>
						{ALL_FURNISHED.map((f) => (
							<FilterChip
								key={f}
								label={FURNISHED_LABEL[f]}
								selected={furnishedFilter === f}
								onClick={() => setFurnishedFilter(f)}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{filtered.length} listing{filtered.length !== 1 ? "s" : ""}
				{cityFilter !== "All" ? ` in ${cityFilter}` : " across all cities"}
			</p>

			{/* Card grid */}
			{filtered.length === 0 ? (
				<div className="rounded-2xl border border-line bg-sky px-6 py-8 text-center text-sm text-slate-500">
					No listings match the current filters. Try widening the city or type
					filter.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((listing) => (
						<article
							key={`${listing.name}-${listing.neighbourhood ?? ""}`}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col text-xs"
						>
							<div className="flex-1">
								<p className="font-bold text-sm text-ink">{listing.name}</p>
								<p className="text-xs text-slate-500 mt-0.5">
									{listing.city}
									{listing.neighbourhood ? ` · ${listing.neighbourhood}` : ""}
								</p>
								<div className="mt-2 flex flex-wrap gap-1.5">
									<span className="rounded-full bg-sky-strong px-2 py-0.5 text-xs font-semibold text-slate-700 capitalize">
										{RENTAL_TYPE_LABEL[listing.type]}
									</span>
									<span className="rounded-full bg-sky-strong px-2 py-0.5 text-xs font-semibold text-slate-700">
										{listing.bedroomsFrom === 0 && listing.bedroomsTo <= 1
											? "Studio / 1-bed"
											: listing.bedroomsFrom === listing.bedroomsTo
												? `${listing.bedroomsFrom} bed`
												: `${listing.bedroomsFrom}–${listing.bedroomsTo} bed`}
									</span>
									<span className="rounded-full bg-sky-strong px-2 py-0.5 text-xs font-semibold text-ink">
										{FURNISHED_LABEL[listing.furnished]}
									</span>
									{listing.petFriendly && (
										<span className="rounded-full bg-sky-strong px-2 py-0.5 text-xs font-semibold text-ink">
											Pet-friendly
										</span>
									)}
								</div>
								<p className="mt-3 text-slate-700 leading-relaxed">
									{listing.why}
								</p>
							</div>
							<div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
								<p className="font-bold text-sm text-ink">
									€{listing.monthlyFrom.toLocaleString()}
									{listing.monthlyTo !== listing.monthlyFrom
										? `–€${listing.monthlyTo.toLocaleString()}`
										: ""}
									<span className="font-normal text-slate-500 text-xs">
										{" "}
										/ month
									</span>
								</p>
								{listing.website && (
									<a
										href={listing.website}
										target="_blank"
										rel="noopener noreferrer"
										className="text-xs font-semibold text-primary hover:text-primary-hover"
									>
										Browse listings
									</a>
								)}
							</div>
						</article>
					))}
				</div>
			)}

			<p className="mt-12 text-xs text-slate-600">
				<Link href="/" className="underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
