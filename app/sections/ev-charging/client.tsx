"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CHARGER_TYPES,
	ALL_CITIES,
	CHARGER_TYPE_LABEL,
	type ChargerType,
	type City,
	EV_CHARGERS,
	EV_TIPS,
} from "@/lib/ev-charging";

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
					? "bg-slate-900 text-white border border-slate-900"
					: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
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
					? "bg-slate-900 text-white border border-slate-900"
					: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
			}`}
		>
			{label}
		</button>
	);
}

export default function EvChargingPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<ChargerType | "All">("All");

	const filtered = EV_CHARGERS.filter(
		(c) =>
			(cityFilter === "All" || c.city === cityFilter) &&
			(typeFilter === "All" || c.chargerTypes.includes(typeFilter)),
	);

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "EV Charging Stations" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">
					EV Charging
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
					EV Charging Stations in Cyprus — Directory
				</h1>
				<p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
					Public charge points across all five cities. Operators, speeds, costs,
					and practical notes for EV drivers relocating to Cyprus.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
					EV charging in Cyprus — key facts
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{EV_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm"
						>
							<p className="font-bold text-slate-900">{tip.heading}</p>
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
					<p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
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
					<p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
						Charger type
					</p>
					<div className="flex flex-wrap gap-1.5">
						<TypeChip
							label="All types"
							selected={typeFilter === "All"}
							onClick={() => setTypeFilter("All")}
						/>
						{ALL_CHARGER_TYPES.map((t) => (
							<TypeChip
								key={t}
								label={CHARGER_TYPE_LABEL[t]}
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
					? "No charging locations match the current filters."
					: `${filtered.length} location${filtered.length === 1 ? "" : "s"}`}
			</p>

			{/* Card grid */}
			{filtered.length > 0 && (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((charger) => (
						<li
							key={`${charger.name}-${charger.city}`}
							className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
						>
							<div>
								<p className="font-bold text-slate-900 text-sm leading-snug">
									{charger.name}
								</p>
								<p className="text-[10px] text-slate-500 mt-0.5">
									{charger.city} · {charger.location}
								</p>
							</div>

							{/* Charger type badges */}
							<div className="flex flex-wrap gap-1">
								{charger.chargerTypes.map((ct) => (
									<span
										key={ct}
										className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
											ct === "CCS-DC"
												? "bg-teal-50 text-teal-700 border border-teal-200"
												: ct === "CHAdeMO"
													? "bg-purple-50 text-purple-700 border border-purple-200"
													: "bg-blue-50 text-blue-700 border border-blue-200"
										}`}
									>
										{ct}
									</span>
								))}
								<span className="rounded-full px-2 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
									{charger.maxKw} kW max
								</span>
								<span className="rounded-full px-2 py-0.5 text-[9px] font-semibold bg-slate-50 text-slate-600 border border-slate-200">
									{charger.numberOfPoints} point
									{charger.numberOfPoints !== 1 ? "s" : ""}
								</span>
							</div>

							<p className="text-xs text-slate-600 leading-relaxed flex-1">
								{charger.why}
							</p>

							<div className="text-[10px] text-slate-500">
								<span className="font-semibold text-slate-700">Operator:</span>{" "}
								{charger.operator}
								{" · "}
								<span className="font-semibold text-slate-700">Cost:</span>{" "}
								{charger.cost}
							</div>

							{charger.mapsLink && (
								<a
									href={charger.mapsLink}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[10px] font-semibold text-amber-700 hover:text-amber-900"
								>
									Open in Maps ↗
								</a>
							)}
						</li>
					))}
				</ul>
			)}

			{/* Footer nav */}
			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-slate-900">
					← Back to the map
				</Link>
			</p>
		</main>
	);
}
