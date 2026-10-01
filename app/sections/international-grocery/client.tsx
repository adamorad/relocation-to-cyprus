"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	ALL_SPECIALTIES,
	type City,
	GROCERY_TIPS,
	INTERNATIONAL_STORES,
	type Specialty,
} from "@/lib/international-grocery";

const PRICE_LABEL: Record<1 | 2 | 3, string> = {
	1: "€",
	2: "€€",
	3: "€€€",
};

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

function SpecialtyChip({
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

export default function InternationalGroceryPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | "All">(
		"All",
	);

	const visible = INTERNATIONAL_STORES.filter((s) => {
		const matchCity = cityFilter === "All" || s.city === cityFilter;
		const matchSpecialty =
			specialtyFilter === "All" ||
			s.specializes.includes(specialtyFilter as Specialty);
		return matchCity && matchSpecialty;
	});

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 py-8 md:py-12">
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "International Grocery Stores" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
					Food &amp; Dining
				</p>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-3">
					International &amp; Specialty Food Stores in Cyprus
				</h1>
				<p className="text-slate-600 text-base leading-relaxed max-w-2xl">
					Asian grocery stores, Middle Eastern supermarkets, Indian spice shops,
					Russian food stores, and British import shops across Cyprus — wherever
					you are relocating from, this is where to find the taste of home.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8">
				<h2 className="text-lg font-bold text-ink mb-3">Shopping tips</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{GROCERY_TIPS.map((tip) => (
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
						Specialty
					</p>
					<div className="flex flex-wrap gap-2">
						<SpecialtyChip
							label="All types"
							selected={specialtyFilter === "All"}
							onClick={() => setSpecialtyFilter("All")}
						/>
						{ALL_SPECIALTIES.map((spec) => (
							<SpecialtyChip
								key={spec}
								label={spec}
								selected={specialtyFilter === spec}
								onClick={() => setSpecialtyFilter(spec)}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{visible.length === 0
					? "No stores match your filters."
					: `${visible.length} store${visible.length === 1 ? "" : "s"} found`}
			</p>

			{/* Store cards */}
			{visible.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{visible.map((store) => (
						<article
							key={`${store.name}-${store.city}`}
							className="rounded-2xl border border-line bg-white p-4 flex flex-col gap-2"
						>
							<div>
								<div className="flex items-start justify-between gap-2">
									<h3 className="font-bold text-ink text-sm leading-snug">
										{store.name}
									</h3>
									<span className="text-xs text-slate-500 font-semibold shrink-0">
										{PRICE_LABEL[store.priceLevel]}
									</span>
								</div>
								<p className="text-xs text-slate-500 mt-0.5">
									{store.city}
									{store.neighbourhood ? ` · ${store.neighbourhood}` : ""}
								</p>
							</div>

							<p className="text-xs text-slate-700 leading-relaxed flex-1">
								{store.why}
							</p>

							{/* Specialty tags */}
							<div className="flex flex-wrap gap-1 mt-1">
								{store.specializes.map((spec) => (
									<span
										key={spec}
										className="rounded-full bg-sky-strong border border-line text-ink text-xs px-2 py-0.5 font-medium"
									>
										{spec}
									</span>
								))}
							</div>

							<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 border-t border-line pt-2 mt-1">
								{store.openingHours && (
									<span>
										<span className="font-semibold text-slate-600">Hours:</span>{" "}
										{store.openingHours}
									</span>
								)}
								{store.website && (
									<a
										href={store.website}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:text-primary-hover font-semibold"
									>
										Website
									</a>
								)}
							</div>
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
