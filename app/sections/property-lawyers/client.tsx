"use client";

import Link from "next/link";
import { useState } from "react";
import {
	ALL_CITIES,
	type City,
	LAWYER_TIPS,
	PROPERTY_LAWYERS,
	type PropertyLawyer,
} from "@/lib/property-lawyers";

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

function SpecChip({
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
					: "bg-sky-strong text-ink border border-line hover:bg-sky"
			}`}
		>
			{label}
		</button>
	);
}

const ALL_SPECIALIZATIONS = [
	"conveyancing",
	"title deed transfer",
	"new-build contracts",
	"foreign buyer representation",
	"mortgage assistance",
	"due diligence",
	"title deed disputes",
	"off-plan purchases",
	"PR by investment",
	"resale properties",
	"Council of Ministers approval",
	"commercial property",
	"inheritance and succession",
	"buy-to-let",
	"short-term rental registration",
] as const;

function LawyerCard({ lawyer }: { lawyer: PropertyLawyer }) {
	return (
		<div className="rounded-2xl border border-line bg-white p-4 md:p-5 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="font-bold text-ink text-sm md:text-base leading-snug">
						{lawyer.name}
					</p>
					<p className="text-xs text-slate-500 mt-0.5 font-medium">
						{lawyer.firm}
					</p>
				</div>
				<span className="flex-shrink-0 rounded-full bg-sky-strong text-primary text-xs font-bold px-2.5 py-1 uppercase tracking-wide">
					{lawyer.city}
				</span>
			</div>

			<p className="mt-3 text-sm text-slate-700 leading-relaxed">
				{lawyer.why}
			</p>

			<div className="mt-3 flex flex-wrap gap-1.5">
				{lawyer.specializations.map((s) => (
					<span
						key={s}
						className="rounded-full bg-sky-strong text-slate-600 text-xs font-semibold px-2 py-0.5"
					>
						{s}
					</span>
				))}
			</div>

			<div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
				<span className="text-slate-500">
					<span className="font-semibold text-slate-700">Languages:</span>{" "}
					{lawyer.languages.join(", ")}
				</span>
				{lawyer.website && (
					<a
						href={lawyer.website}
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-primary hover:text-primary-hover"
					>
						Website
					</a>
				)}
				{lawyer.phone && (
					<a
						href={`tel:${lawyer.phone}`}
						className="font-semibold text-slate-700 hover:text-ink"
					>
						{lawyer.phone}
					</a>
				)}
			</div>
		</div>
	);
}

export default function PropertyLawyersPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specFilter, setSpecFilter] = useState<string | "All">("All");

	const visible = PROPERTY_LAWYERS.filter((l) => {
		const cityMatch = cityFilter === "All" || l.city === cityFilter;
		const specMatch =
			specFilter === "All" ||
			l.specializations.some((s) =>
				s.toLowerCase().includes(specFilter.toLowerCase()),
			);
		return cityMatch && specMatch;
	});

	return (
		<main
			id="main"
			data-pagefind-body
			data-pagefind-filter="type[data-type]"
			data-type="directory"
			className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14"
		>
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
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary mb-2">
					Professional Services
				</p>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Property Lawyers in Cyprus — Vetted Directory
				</h1>
				<p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
					Conveyancing solicitors experienced with foreign buyers, title deed
					transfers, and new-build contracts across all Cyprus cities.
				</p>
				<p className="mt-2 text-xs text-muted">
					This is a directory, not legal advice. Always verify Bar Association
					registration and fee structures directly with the firm.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-base font-bold text-ink mb-3">
					Before you engage a property lawyer
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{LAWYER_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-2xl border border-line bg-sky p-4 text-sm"
						>
							<p className="font-bold text-ink text-sm">{tip.heading}</p>
							<p className="mt-1.5 text-slate-700 leading-relaxed text-xs">
								{tip.body}
							</p>
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

			{/* Specialization filter */}
			<div className="mb-6 flex flex-wrap gap-1.5">
				<SpecChip
					label="All specializations"
					selected={specFilter === "All"}
					onClick={() => setSpecFilter("All")}
				/>
				{ALL_SPECIALIZATIONS.map((s) => (
					<SpecChip
						key={s}
						label={s}
						selected={specFilter === s}
						onClick={() => setSpecFilter(s === specFilter ? "All" : s)}
					/>
				))}
			</div>

			{/* Results count */}
			<p className="text-xs text-muted mb-4">
				Showing {visible.length} lawyer{visible.length !== 1 ? "s" : ""}
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{specFilter !== "All" ? ` · ${specFilter}` : ""}
			</p>

			{/* Card grid */}
			{visible.length === 0 ? (
				<div className="rounded-xl border border-line bg-sky px-6 py-10 text-center text-sm text-slate-500">
					No lawyers match the selected filters. Try removing a filter.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{visible.map((lawyer) => (
						<LawyerCard key={`${lawyer.name}-${lawyer.firm}`} lawyer={lawyer} />
					))}
				</div>
			)}
		</main>
	);
}
