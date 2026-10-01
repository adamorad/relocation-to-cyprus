"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	ALL_FOCUS_AREAS,
	type City,
	FOCUS_LABEL,
	TIME_COMMITMENT_LABEL,
	VOLUNTEER_ORGS,
	VOLUNTEER_TIPS,
	type VolunteerFocus,
} from "@/lib/volunteering";

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

const FOCUS_EMOJI: Record<VolunteerFocus, string> = {
	animals: "🐾",
	environment: "🌿",
	children: "👦",
	elderly: "🧓",
	refugees: "🤝",
	community: "🏘️",
	arts: "🎨",
	sport: "⚽",
};

export default function VolunteeringPage() {
	const [cityFilter, setCityFilter] = useState<City | "Island-wide" | "All">(
		"All",
	);
	const [focusFilter, setFocusFilter] = useState<VolunteerFocus | "All">("All");

	const filtered = VOLUNTEER_ORGS.filter((org) => {
		const cityOk = cityFilter === "All" || org.city === cityFilter;
		const focusOk = focusFilter === "All" || org.focus === focusFilter;
		return cityOk && focusOk;
	});

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Volunteering Opportunities" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-2">
					Community
				</p>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
					Volunteering in Cyprus
				</h1>
				<p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
					Opportunities for expats to give back — animal welfare, environment,
					children, refugees, arts, and more. Filter by city and focus area.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
				{VOLUNTEER_TIPS.map((tip) => (
					<div
						key={tip.heading}
						className="rounded-2xl border border-line bg-sky p-4"
					>
						<p className="text-sm font-semibold text-ink mb-1">{tip.heading}</p>
						<p className="text-sm text-slate-600 leading-relaxed">{tip.body}</p>
					</div>
				))}
			</section>

			{/* City filter */}
			<div className="mb-4">
				<p className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-2">
					City
				</p>
				<div className="flex flex-wrap gap-2">
					<CityChip
						label="All cities"
						selected={cityFilter === "All"}
						onClick={() => setCityFilter("All")}
					/>
					<CityChip
						label="Island-wide"
						selected={cityFilter === "Island-wide"}
						onClick={() => setCityFilter("Island-wide")}
					/>
					{ALL_CITIES.map((c) => (
						<CityChip
							key={c}
							label={c}
							selected={cityFilter === c}
							onClick={() => setCityFilter(c)}
						/>
					))}
				</div>
			</div>

			{/* Focus filter */}
			<div className="mb-8">
				<p className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-2">
					Focus area
				</p>
				<div className="flex flex-wrap gap-2">
					<CityChip
						label="All areas"
						selected={focusFilter === "All"}
						onClick={() => setFocusFilter("All")}
					/>
					{ALL_FOCUS_AREAS.map((f) => (
						<CityChip
							key={f}
							label={FOCUS_LABEL[f]}
							selected={focusFilter === f}
							onClick={() => setFocusFilter(f)}
						/>
					))}
				</div>
			</div>

			{/* Results count */}
			<p className="text-sm text-slate-500 mb-4">
				{filtered.length}{" "}
				{filtered.length === 1 ? "organisation" : "organisations"} found
			</p>

			{/* Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filtered.map((org) => (
					<article
						key={org.name}
						className="rounded-2xl border border-line bg-white p-5 flex flex-col gap-3"
					>
						<div className="flex items-start justify-between gap-2">
							<div className="min-w-0">
								<h2 className="font-bold text-ink text-sm leading-snug">
									{org.name}
								</h2>
								<p className="text-xs text-slate-500 mt-0.5">{org.city}</p>
							</div>
							<span
								role="img"
								className="text-xl flex-shrink-0"
								aria-label={org.focus}
							>
								{FOCUS_EMOJI[org.focus]}
							</span>
						</div>

						<div className="flex flex-wrap gap-1.5">
							<span className="inline-flex items-center rounded-full bg-sky-strong px-2.5 py-0.5 text-xs font-semibold text-ink">
								{FOCUS_LABEL[org.focus]}
							</span>
							<span className="inline-flex items-center rounded-full bg-sky-strong px-2.5 py-0.5 text-xs font-medium text-slate-600">
								{TIME_COMMITMENT_LABEL[org.timeCommitment]}
							</span>
						</div>

						{org.languages.length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{org.languages.map((lang) => (
									<span
										key={lang}
										className="inline-flex items-center rounded-full bg-sky-strong px-2 py-0.5 text-xs text-ink"
									>
										{lang}
									</span>
								))}
							</div>
						)}

						<p className="text-sm text-slate-600 leading-relaxed flex-1">
							{org.why}
						</p>

						{org.website && (
							<a
								href={org.website}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
							>
								Visit website
							</a>
						)}
					</article>
				))}

				{filtered.length === 0 && (
					<div className="col-span-full py-16 text-center text-slate-500">
						<p className="text-lg font-medium">
							No organisations match these filters.
						</p>
						<p className="text-sm mt-1">
							Try broadening your city or focus area selection.
						</p>
					</div>
				)}
			</div>

			{/* Back link */}
			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
