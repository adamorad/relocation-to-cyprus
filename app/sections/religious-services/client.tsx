"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	ALL_FAITHS,
	type City,
	FAITH_LABEL,
	type Faith,
	RELIGIOUS_SERVICES,
	RELIGIOUS_TIPS,
} from "@/lib/religious-services";

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
					? "bg-slate-900 text-white border border-slate-900"
					: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
			}`}
		>
			{label}
		</button>
	);
}

const FAITH_COLOR: Record<Faith, { bg: string; text: string; border: string }> =
	{
		Anglican: {
			bg: "bg-blue-50",
			text: "text-blue-700",
			border: "border-blue-200",
		},
		Catholic: {
			bg: "bg-yellow-50",
			text: "text-yellow-700",
			border: "border-yellow-200",
		},
		Orthodox: {
			bg: "bg-amber-50",
			text: "text-amber-700",
			border: "border-amber-200",
		},
		Protestant: {
			bg: "bg-green-50",
			text: "text-green-700",
			border: "border-green-200",
		},
		Jewish: {
			bg: "bg-indigo-50",
			text: "text-indigo-700",
			border: "border-indigo-200",
		},
		Muslim: {
			bg: "bg-teal-50",
			text: "text-teal-700",
			border: "border-teal-200",
		},
		Hindu: {
			bg: "bg-orange-50",
			text: "text-orange-700",
			border: "border-orange-200",
		},
		Buddhist: {
			bg: "bg-rose-50",
			text: "text-rose-700",
			border: "border-rose-200",
		},
		"Non-denominational": {
			bg: "bg-slate-100",
			text: "text-slate-700",
			border: "border-slate-200",
		},
	};

export default function ReligiousServicesPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [faithFilter, setFaithFilter] = useState<Faith | "All">("All");

	const filtered = RELIGIOUS_SERVICES.filter((s) => {
		const cityOk = cityFilter === "All" || s.city === cityFilter;
		const faithOk = faithFilter === "All" || s.faith === faithFilter;
		return cityOk && faithOk;
	});

	return (
		<main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16">
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Religious Services" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
					Community
				</p>
				<h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
					Religious Services in Cyprus
				</h1>
				<p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
					English-language and multilingual worship services across Cyprus —
					Anglican, Catholic, Protestant, Jewish, Muslim, and more.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
				{RELIGIOUS_TIPS.map((tip) => (
					<div
						key={tip.heading}
						className="rounded-xl border border-amber-200 bg-amber-50 p-4"
					>
						<p className="text-sm font-semibold text-slate-900 mb-1">
							{tip.heading}
						</p>
						<p className="text-sm text-slate-600 leading-relaxed">{tip.body}</p>
					</div>
				))}
			</section>

			{/* City filter */}
			<div className="mb-4">
				<p className="text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
					City
				</p>
				<div className="flex flex-wrap gap-2">
					<CityChip
						label="All cities"
						selected={cityFilter === "All"}
						onClick={() => setCityFilter("All")}
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

			{/* Faith filter */}
			<div className="mb-8">
				<p className="text-xs uppercase tracking-[0.15em] text-slate-400 font-semibold mb-2">
					Faith
				</p>
				<div className="flex flex-wrap gap-2">
					<CityChip
						label="All faiths"
						selected={faithFilter === "All"}
						onClick={() => setFaithFilter("All")}
					/>
					{ALL_FAITHS.map((f) => (
						<CityChip
							key={f}
							label={FAITH_LABEL[f]}
							selected={faithFilter === f}
							onClick={() => setFaithFilter(f)}
						/>
					))}
				</div>
			</div>

			{/* Results count */}
			<p className="text-sm text-slate-500 mb-4">
				{filtered.length} {filtered.length === 1 ? "service" : "services"} found
			</p>

			{/* Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filtered.map((service) => {
					const colors = FAITH_COLOR[service.faith];
					return (
						<article
							key={service.name}
							className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
						>
							<div className="flex items-start justify-between gap-2">
								<div className="min-w-0">
									<h2 className="font-bold text-slate-900 text-sm leading-snug">
										{service.name}
									</h2>
									<p className="text-xs text-slate-500 mt-0.5">
										{service.city}
									</p>
								</div>
								<span
									className={`flex-shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
								>
									{FAITH_LABEL[service.faith]}
								</span>
							</div>

							<div className="flex flex-wrap gap-1.5">
								<span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
									{service.serviceFrequency}
								</span>
							</div>

							{service.languagesOffered.length > 0 && (
								<div className="flex flex-wrap gap-1.5">
									{service.languagesOffered.map((lang) => (
										<span
											key={lang}
											className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-700 border border-teal-200"
										>
											{lang}
										</span>
									))}
								</div>
							)}

							<p className="text-sm text-slate-600 leading-relaxed flex-1">
								{service.why}
							</p>

							{service.address && (
								<p className="text-xs text-slate-400 leading-snug">
									📍 {service.address}
								</p>
							)}

							{service.website && (
								<a
									href={service.website}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#35cdc4] hover:underline"
								>
									Visit website →
								</a>
							)}
						</article>
					);
				})}

				{filtered.length === 0 && (
					<div className="col-span-full py-16 text-center text-slate-500">
						<p className="text-lg font-medium">
							No services match these filters.
						</p>
						<p className="text-sm mt-1">
							Try broadening your city or faith selection.
						</p>
					</div>
				)}
			</div>

			{/* Back link */}
			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-slate-900">
					← Back to the map
				</Link>
			</p>
		</main>
	);
}
