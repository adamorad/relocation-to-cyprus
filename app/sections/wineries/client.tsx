"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ALL_CITIES, type City, WINE_TIPS, WINERIES } from "@/lib/wineries";

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

const PRICE_LABEL: Record<1 | 2 | 3, string> = {
	1: "€ Budget",
	2: "€€ Mid",
	3: "€€€ Premium",
};

export default function WineriesPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [tastingFilter, setTastingFilter] = useState<boolean | "All">("All");
	const [restaurantFilter, setRestaurantFilter] = useState<boolean | "All">(
		"All",
	);

	const filtered = WINERIES.filter((winery) => {
		const cityMatch = cityFilter === "All" || winery.city === cityFilter;
		const tastingMatch =
			tastingFilter === "All" || winery.tastingAvailable === tastingFilter;
		const restaurantMatch =
			restaurantFilter === "All" ||
			winery.restaurantOnSite === restaurantFilter;
		return cityMatch && tastingMatch && restaurantMatch;
	});

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-12">
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Wineries & Wine Tourism" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Wine Tourism
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Wineries & Wine Tourism in Cyprus — From Commandaria Country
				</h1>
				<p className="mt-3 text-base text-slate-600 leading-relaxed max-w-2xl">
					The Troodos foothills produce some of the Mediterranean's most
					distinctive wines. Indigenous varieties, ancient traditions, and a
					wine route through some of Cyprus's most beautiful villages.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
				{WINE_TIPS.map((tip) => (
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

			{/* Tasting filter */}
			<div className="mb-8 flex flex-wrap gap-1.5">
				<CityChip
					label="All wineries"
					selected={tastingFilter === "All"}
					onClick={() => setTastingFilter("All")}
				/>
				<CityChip
					label="Tasting available"
					selected={tastingFilter === true}
					onClick={() => setTastingFilter(true)}
				/>
				<CityChip
					label="Restaurant on site"
					selected={restaurantFilter === true}
					onClick={() =>
						setRestaurantFilter(restaurantFilter === true ? "All" : true)
					}
				/>
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{filtered.length} {filtered.length !== 1 ? "wineries" : "winery"} shown
				{cityFilter !== "All" ? ` in ${cityFilter} district` : ""}
				{tastingFilter === true ? " · tastings available" : ""}
			</p>

			{/* Cards */}
			{filtered.length === 0 ? (
				<p className="text-sm text-slate-500 bg-sky border border-line rounded-2xl px-5 py-4">
					No wineries found for the selected filters.
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((winery) => (
						<article
							key={`${winery.name}-${winery.city}`}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2"
						>
							<div>
								<p className="font-bold text-ink text-sm leading-snug">
									{winery.name}
								</p>
								<p className="text-xs text-slate-500 mt-0.5">
									{winery.city} district
									{winery.village ? (
										<>
											<span className="mx-1 text-muted">·</span>
											{winery.village}
										</>
									) : null}
								</p>
							</div>

							<div className="flex flex-wrap gap-1.5">
								<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-sky-strong text-ink">
									{PRICE_LABEL[winery.priceRange]}
								</span>
								{winery.tastingAvailable && (
									<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-primary/10 text-ink">
										Tastings
									</span>
								)}
								{winery.tourAvailable && (
									<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-sky-strong text-ink">
										Tours
									</span>
								)}
								{winery.restaurantOnSite && (
									<span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-green-50 text-green-800">
										Restaurant
									</span>
								)}
							</div>

							<p className="text-xs text-slate-600 leading-relaxed">
								<span className="font-medium">Grapes: </span>
								{winery.grapeVarieties.join(", ")}
							</p>

							<p className="text-xs text-slate-700 leading-relaxed flex-1">
								{winery.why}
							</p>

							{winery.website && (
								<a
									href={winery.website}
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
