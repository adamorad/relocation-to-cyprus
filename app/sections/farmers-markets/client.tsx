"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	ALL_MARKET_DAYS,
	type City,
	FARMERS_MARKETS,
	MARKET_TIPS,
	type MarketDay,
} from "@/lib/farmers-markets";

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

function DayChip({
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
					: "bg-sky text-ink border border-line hover:bg-sky-strong"
			}`}
		>
			{label}
		</button>
	);
}

export default function FarmersMarketsPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [dayFilter, setDayFilter] = useState<MarketDay | "All">("All");

	const visible = FARMERS_MARKETS.filter((m) => {
		const matchCity = cityFilter === "All" || m.city === cityFilter;
		const matchDay = dayFilter === "All" || m.dayOfWeek === dayFilter;
		return matchCity && matchDay;
	});

	return (
		<main
			id="main"
			data-pagefind-body
			data-pagefind-filter="type[data-type]"
			data-type="directory"
			className="max-w-5xl mx-auto px-4 py-8 md:py-12"
		>
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Farmers Markets" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
					Food &amp; Dining
				</p>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-3">
					Farmers Markets &amp; Local Produce in Cyprus
				</h1>
				<p className="text-slate-600 text-base leading-relaxed max-w-2xl">
					Weekly laiki agorai, municipal covered markets, and organic farmers
					markets across Cyprus — the best places to buy directly from local
					growers. Seasonal produce, fresh halloumi, village honey, and artisan
					food products at prices that reflect Cyprus's agricultural heritage.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-lg font-bold text-ink mb-3">Market tips</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{MARKET_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-2xl border border-line bg-sky p-4 text-sm"
						>
							<p className="font-bold text-ink mb-1">{tip.heading}</p>
							<p className="text-slate-700 leading-relaxed">{tip.body}</p>
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
					<div className="flex flex-wrap gap-2">
						<CityChip
							label="All cities"
							selected={cityFilter === "All"}
							onClick={() => setCityFilter("All")}
						/>
						{ALL_CITIES.map((city) => (
							<CityChip
								key={city}
								label={city}
								selected={cityFilter === city}
								onClick={() => setCityFilter(city)}
							/>
						))}
					</div>
				</div>

				<div>
					<p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
						Day of the week
					</p>
					<div className="flex flex-wrap gap-2">
						<DayChip
							label="Any day"
							selected={dayFilter === "All"}
							onClick={() => setDayFilter("All")}
						/>
						{ALL_MARKET_DAYS.map((day) => (
							<DayChip
								key={day}
								label={day}
								selected={dayFilter === day}
								onClick={() => setDayFilter(day)}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{visible.length === 0
					? "No markets match your filters."
					: `${visible.length} market${visible.length === 1 ? "" : "s"} found`}
			</p>

			{/* Market cards */}
			{visible.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{visible.map((market) => (
						<article
							key={`${market.name}-${market.city}`}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2"
						>
							<div>
								<h3 className="font-bold text-ink text-sm leading-snug">
									{market.name}
								</h3>
								<p className="text-xs text-slate-500 mt-0.5">
									{market.city}
									{" · "}
									<span className="text-primary font-semibold">
										{market.dayOfWeek}
									</span>
									{" · "}
									{market.hours}
								</p>
							</div>

							<p className="text-[12px] text-slate-500 leading-relaxed">
								{market.location}
							</p>

							<p className="text-xs text-slate-700 leading-relaxed flex-1">
								{market.why}
							</p>

							{/* Produces tags */}
							<div className="flex flex-wrap gap-1 mt-1">
								{market.produces.map((item) => (
									<span
										key={item}
										className="rounded-full bg-green-50 border border-green-200 text-green-800 text-xs px-2 py-0.5 font-medium"
									>
										{item}
									</span>
								))}
							</div>

							{market.parkingNotes && (
								<p className="text-xs text-slate-500 border-t border-line pt-2 mt-1 leading-relaxed">
									<span className="font-semibold text-slate-600">Parking:</span>{" "}
									{market.parkingNotes}
								</p>
							)}
						</article>
					))}
				</div>
			)}

			{/* Footer nav */}
			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink transition-colors">
					Back to home
				</Link>
			</p>
		</main>
	);
}
