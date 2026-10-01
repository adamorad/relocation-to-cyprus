"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ACTIVITY_TIPS,
	ACTIVITY_TYPE_LABEL,
	type ActivityType,
	AFTER_SCHOOL_ACTIVITIES,
	type AfterSchoolActivity,
	ALL_ACTIVITY_TYPES,
	ALL_CITIES,
	type City,
} from "@/lib/after-school";

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
	type,
	selected,
	onClick,
}: {
	type: ActivityType | "All";
	selected: boolean;
	onClick: () => void;
}) {
	const label = type === "All" ? "All types" : ACTIVITY_TYPE_LABEL[type];
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

const TYPE_ICON: Record<ActivityType, string> = {
	swimming: "🏊",
	sport: "⚽",
	"martial-arts": "🥋",
	dance: "💃",
	music: "🎵",
	art: "🎨",
	language: "💬",
	stem: "💻",
};

function ActivityCard({ activity }: { activity: AfterSchoolActivity }) {
	return (
		<article className="rounded-2xl border border-line bg-white p-4 text-sm">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<div className="flex items-center gap-1.5">
						<span className="text-base" aria-hidden="true">
							{TYPE_ICON[activity.type]}
						</span>
						<h3 className="font-bold text-ink">{activity.name}</h3>
					</div>
					<p className="text-xs text-slate-500 mt-0.5">
						{activity.city}
						{activity.neighbourhood ? ` · ${activity.neighbourhood}` : ""}
					</p>
				</div>
				<span className="flex-shrink-0 rounded-full bg-sky-strong text-ink border border-line px-2.5 py-0.5 text-xs font-semibold">
					{ACTIVITY_TYPE_LABEL[activity.type]}
				</span>
			</div>

			<div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
				<span>
					<span className="font-semibold text-slate-700">Ages: </span>
					{activity.ageRangeFrom}–{activity.ageRangeTo} yrs
				</span>
				<span>
					<span className="font-semibold text-slate-700">Languages: </span>
					{activity.languagesOffered.join(", ")}
				</span>
				{activity.weeklyFeeApprox !== undefined && (
					<span>
						<span className="font-semibold text-slate-700">~</span>€
						{activity.weeklyFeeApprox}/week
					</span>
				)}
			</div>

			<p className="mt-2 text-slate-700 leading-relaxed text-[13px]">
				{activity.why}
			</p>

			{activity.website && (
				<a
					href={activity.website}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-2 inline-block text-xs font-semibold text-primary hover:text-primary-hover"
				>
					Website
				</a>
			)}
		</article>
	);
}

export default function AfterSchoolActivitiesPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<ActivityType | "All">("All");

	const visible = AFTER_SCHOOL_ACTIVITIES.filter(
		(a) =>
			(cityFilter === "All" || a.city === cityFilter) &&
			(typeFilter === "All" || a.type === typeFilter),
	);

	return (
		<main id="main" className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
			{/* Back nav */}
			<nav className="text-xs text-slate-500 mb-6">
				<Link href="/" className="hover:text-ink transition-colors">
					Home
				</Link>
				{" / "}
				<Link href="/sections" className="hover:text-ink transition-colors">
					Directories
				</Link>
			</nav>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
					Family &amp; Children
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					After-School Activities for Children in Cyprus
				</h1>
				<p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
					Swimming, sports, music, dance, coding and more — with English or
					bilingual coaching across Limassol, Paphos, Larnaca and Nicosia.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-lg font-bold text-ink mb-3">Good to know</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					{ACTIVITY_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-2xl border border-line bg-sky p-4"
						>
							<p className="font-semibold text-sm text-ink">{tip.heading}</p>
							<p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
								{tip.body}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* City filter */}
			<div className="mb-3">
				<p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
					City
				</p>
				<div className="flex flex-wrap gap-2">
					{(["All", ...ALL_CITIES] as const).map((c) => (
						<CityChip
							key={c}
							city={c}
							selected={cityFilter === c}
							onClick={() => setCityFilter(c)}
						/>
					))}
				</div>
			</div>

			{/* Type filter */}
			<div className="mb-6">
				<p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
					Activity type
				</p>
				<div className="flex flex-wrap gap-2">
					<TypeChip
						type="All"
						selected={typeFilter === "All"}
						onClick={() => setTypeFilter("All")}
					/>
					{ALL_ACTIVITY_TYPES.map((t) => (
						<TypeChip
							key={t}
							type={t}
							selected={typeFilter === t}
							onClick={() => setTypeFilter(t)}
						/>
					))}
				</div>
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{visible.length} activit{visible.length === 1 ? "y" : "ies"}
				{cityFilter !== "All" ? ` in ${cityFilter}` : " across Cyprus"}
				{typeFilter !== "All" ? ` · ${ACTIVITY_TYPE_LABEL[typeFilter]}` : ""}
			</p>

			{/* Card grid */}
			{visible.length === 0 ? (
				<p className="text-sm text-slate-500 bg-sky rounded-2xl border border-line px-4 py-6 text-center">
					No activities match your filters. Try a different city or type.
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{visible.map((activity) => (
						<ActivityCard
							key={`${activity.name}-${activity.city}`}
							activity={activity}
						/>
					))}
				</div>
			)}

			<p className="mt-10 text-xs text-slate-500">
				Fees and schedules change seasonally — always verify directly with the
				club or academy before enrolling. For competitive sports, look for
				affiliation with the Cyprus Sports Organisation (KOA) or the relevant
				national federation.
			</p>

			<p className="mt-6 text-xs">
				<Link href="/" className="text-slate-500 underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
