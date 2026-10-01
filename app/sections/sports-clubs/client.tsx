"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	ALL_SPORTS,
	type City,
	SPORTS_CLUBS,
	SPORTS_TIPS,
} from "@/lib/sports-clubs";

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

export default function SportsClubsPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [sportFilter, setSportFilter] = useState<string>("All");

	const filtered = SPORTS_CLUBS.filter((club) => {
		const cityMatch = cityFilter === "All" || club.city === cityFilter;
		const sportMatch = sportFilter === "All" || club.sport === sportFilter;
		return cityMatch && sportMatch;
	});

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-12">
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
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Sports & Recreation
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Sports & Recreation Clubs in Cyprus
				</h1>
				<p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
					Tennis, padel, golf, sailing, running, rugby and more — across all
					four cities. Most clubs have strong expat memberships and
					English-speaking coaches.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
				{SPORTS_TIPS.map((tip) => (
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

			{/* Sport filter */}
			<div className="mb-8 flex flex-wrap gap-1.5">
				{(["All", ...ALL_SPORTS] as const).map((s) => (
					<CityChip
						key={s}
						label={s}
						selected={sportFilter === s}
						onClick={() => setSportFilter(s)}
					/>
				))}
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{filtered.length} club{filtered.length !== 1 ? "s" : ""} shown
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{sportFilter !== "All" ? ` · ${sportFilter}` : ""}
			</p>

			{/* Cards */}
			{filtered.length === 0 ? (
				<p className="text-sm text-slate-500 bg-sky border border-line rounded-2xl px-5 py-4">
					No clubs found for the selected filters.
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((club) => (
						<article
							key={`${club.name}-${club.city}`}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2"
						>
							<div>
								<p className="font-bold text-ink text-sm leading-snug">
									{club.name}
								</p>
								<p className="text-xs text-slate-500 mt-0.5">
									{club.city}
									<span className="mx-1 text-muted">·</span>
									<span className="text-primary font-semibold">
										{club.sport}
									</span>
								</p>
							</div>

							<div className="flex flex-wrap gap-1.5">
								<span
									className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
										club.level === "competitive"
											? "bg-red-50 text-red-800"
											: club.level === "beginner"
												? "bg-green-50 text-green-800"
												: "bg-sky-strong text-slate-600"
									}`}
								>
									{club.level}
								</span>
								{club.englishWelcome && (
									<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-sky-strong text-ink">
										English welcome
									</span>
								)}
								{club.annualFeeApprox !== undefined && (
									<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-sky-strong text-ink">
										~€{club.annualFeeApprox}/yr
									</span>
								)}
							</div>

							<p className="text-xs text-slate-700 leading-relaxed flex-1">
								{club.why}
							</p>

							{club.website && (
								<a
									href={club.website}
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
