"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	type City,
	TRANSPORT_INFO,
	TRANSPORT_TIPS,
} from "@/lib/public-transport";

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

export default function PublicTransportPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");

	const citiesToShow =
		cityFilter === "All" ? ALL_CITIES : ([cityFilter] as City[]);

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-14">
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Public Transport" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Getting Around
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Getting Around Cyprus — Public Transport Guide
				</h1>
				<p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
					What buses, taxis, and ride-hailing actually look like city by city.
					The honest answer: Cyprus is a car-first country, but the intercity
					network is better than most people expect.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-3">
					What to know before you arrive
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{TRANSPORT_TIPS.map((tip) => (
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

			{/* City filter */}
			<section className="mb-6">
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
			</section>

			{/* City-by-city breakdown */}
			<div className="space-y-6">
				{citiesToShow.map((city) => {
					const info = TRANSPORT_INFO[city];
					return (
						<section
							key={city}
							className="rounded-2xl border border-line bg-white overflow-hidden shadow-sm"
						>
							{/* City header */}
							<div className="px-5 py-4 border-b border-line bg-sky">
								<div className="flex items-center justify-between gap-3 flex-wrap">
									<h2 className="text-lg font-bold text-ink">{city}</h2>
									<div className="flex items-center gap-2">
										{info.boltAvailable && (
											<span className="rounded-full bg-green-50 text-green-800 border border-green-200 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide">
												Bolt available
											</span>
										)}
										{info.busMonthlyPass !== undefined && (
											<span className="rounded-full bg-sky-strong text-ink px-2.5 py-0.5 text-xs font-bold">
												Bus pass €{info.busMonthlyPass}/mo
											</span>
										)}
									</div>
								</div>
								<p className="mt-2 text-xs text-slate-600 italic leading-relaxed">
									{info.verdict}
								</p>
							</div>

							<div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
								{/* Left column */}
								<div className="space-y-4">
									<div>
										<p className="text-xs uppercase tracking-widest text-muted font-semibold mb-1">
											Intercity bus
										</p>
										<p className="text-xs text-slate-700 leading-relaxed">
											{info.intercityBus}
										</p>
									</div>
									<div>
										<p className="text-xs uppercase tracking-widest text-muted font-semibold mb-1">
											Intra-city bus
										</p>
										<p className="text-xs text-slate-700 leading-relaxed">
											{info.intraCityBus}
										</p>
									</div>
									<div>
										<p className="text-xs uppercase tracking-widest text-muted font-semibold mb-1">
											Taxis &amp; ride-hailing
										</p>
										<p className="text-xs text-slate-700 leading-relaxed">
											{info.taxiApp}
										</p>
									</div>
								</div>

								{/* Right column */}
								<div className="space-y-4">
									<div>
										<p className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">
											Key routes
										</p>
										<ul className="space-y-1">
											{info.keyRoutes.map((route) => (
												<li
													key={route}
													className="text-xs text-slate-700 flex items-start gap-1.5"
												>
													<span className="text-primary mt-0.5 shrink-0">
														·
													</span>
													{route}
												</li>
											))}
										</ul>
									</div>
									<div>
										<p className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">
											Practical tips
										</p>
										<ul className="space-y-1">
											{info.tips.map((tip) => (
												<li
													key={tip}
													className="text-xs text-slate-600 flex items-start gap-1.5"
												>
													<span className="text-primary mt-0.5 shrink-0">
														·
													</span>
													{tip}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</section>
					);
				})}
			</div>

			{/* Footer nav */}
			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
