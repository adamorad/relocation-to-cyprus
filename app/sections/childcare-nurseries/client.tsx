"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	CHILDCARE_TIPS,
	type City,
	NURSERIES,
	type Nursery,
} from "@/lib/childcare";

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

function NurseryCard({ nursery }: { nursery: Nursery }) {
	return (
		<article className="rounded-2xl border border-line bg-white p-4 text-sm">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<h3 className="font-bold text-ink">{nursery.name}</h3>
					<p className="text-xs text-slate-500 mt-0.5">
						{nursery.city}
						{nursery.neighbourhood ? ` · ${nursery.neighbourhood}` : ""}
					</p>
				</div>
				<span
					className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
						nursery.fullDay
							? "bg-sky-strong text-ink border border-line"
							: "bg-sky-strong text-ink border border-line"
					}`}
				>
					{nursery.fullDay ? "Full day" : "Morning only"}
				</span>
			</div>

			<div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
				<span>
					<span className="font-semibold text-slate-700">Ages: </span>
					{nursery.ageRangeFrom < 12
						? `${nursery.ageRangeFrom} months`
						: nursery.ageRangeFrom < 24
							? `${nursery.ageRangeFrom} months`
							: `${Math.floor(nursery.ageRangeFrom / 12)} yrs`}
					{" – "}
					{nursery.ageRangeTo} yrs
				</span>
				<span>
					<span className="font-semibold text-slate-700">Languages: </span>
					{nursery.languagesOffered.join(", ")}
				</span>
				{nursery.annualFeeFrom !== undefined && (
					<span>
						<span className="font-semibold text-slate-700">From: </span>€
						{nursery.annualFeeFrom.toLocaleString()}/yr
					</span>
				)}
			</div>

			<p className="mt-2 text-slate-700 leading-relaxed text-[13px]">
				{nursery.why}
			</p>

			{nursery.website && (
				<a
					href={nursery.website}
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

export default function ChildcareNurseriesPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const visible = NURSERIES.filter(
		(n) => cityFilter === "All" || n.city === cityFilter,
	);

	return (
		<main id="main" data-pagefind-body data-pagefind-filter="type[data-type]" data-type="directory" className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
			{/* Back nav */}
			<nav className="text-xs text-slate-500 mb-6">
				<Link href="/" className="hover:text-ink transition-colors">
					Home
				</Link>
				{" / "}
				<Link href="/sections" className="hover:text-ink transition-colors">
					Explore
				</Link>
			</nav>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
					Family &amp; Children
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Childcare &amp; Nurseries in Cyprus
				</h1>
				<p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
					English-speaking and bilingual nurseries across Limassol, Paphos
					and Larnaca, with fees, age ranges and what makes each one
					stand out for expat families.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-lg font-bold text-ink mb-3">
					What to know before you choose
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{CHILDCARE_TIPS.map((tip) => (
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
			<div className="flex flex-wrap gap-2 mb-6">
				{(["All", ...ALL_CITIES] as const).map((c) => (
					<CityChip
						key={c}
						city={c}
						selected={cityFilter === c}
						onClick={() => setCityFilter(c)}
					/>
				))}
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{visible.length} nurseri{visible.length === 1 ? "y" : "es"}
				{cityFilter !== "All" ? ` in ${cityFilter}` : " across Cyprus"}
			</p>

			{/* Card grid */}
			{visible.length === 0 ? (
				<p className="text-sm text-slate-500 bg-sky rounded-2xl border border-line px-4 py-6 text-center">
					No nurseries listed for {cityFilter} yet.
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{visible.map((nursery) => (
						<NurseryCard
							key={`${nursery.name}-${nursery.city}`}
							nursery={nursery}
						/>
					))}
				</div>
			)}

			<p className="mt-10 text-xs text-slate-500">
				Fees and availability change frequently — always verify directly with
				the nursery before enrolling. Regulatory oversight is by the Cyprus
				Ministry of Education, Culture, Sport and Youth (MOEC) and Social
				Welfare Services.
			</p>

			<p className="mt-6 text-xs">
				<Link href="/" className="text-slate-500 underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
