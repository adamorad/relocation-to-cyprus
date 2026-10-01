"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	ALL_PROVIDER_TYPES,
	type City,
	MENTAL_HEALTH_PROVIDERS,
	MENTAL_HEALTH_TIPS,
	PROVIDER_TYPE_LABEL,
	type ProviderType,
} from "@/lib/mental-health";

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
			className={`rounded-full inline-flex min-h-11 items-center px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors md:min-h-0 ${
				selected
					? "bg-primary text-white border border-primary"
					: "bg-white text-ink border border-line hover:bg-sky"
			}`}
		>
			{label}
		</button>
	);
}

function ProviderCard({
	provider,
}: {
	provider: (typeof MENTAL_HEALTH_PROVIDERS)[number];
}) {
	return (
		<li className="rounded-2xl border border-line bg-white p-4 text-sm flex flex-col gap-2">
			<div>
				<p className="font-bold text-ink">{provider.name}</p>
				<p className="text-xs text-slate-500 mt-0.5">
					{provider.title} · {provider.city}
				</p>
			</div>

			<div className="flex flex-wrap gap-1.5">
				<span className="rounded-full bg-sky-strong text-ink px-2 py-0.5 text-xs font-semibold">
					{PROVIDER_TYPE_LABEL[provider.type]}
				</span>
				{provider.onlineAvailable && (
					<span className="rounded-full bg-sky-strong text-ink px-2 py-0.5 text-xs font-semibold">
						Online available
					</span>
				)}
				{provider.sessionFrom && (
					<span className="rounded-full bg-sky-strong text-ink px-2 py-0.5 text-xs font-semibold">
						From €{provider.sessionFrom}/session
					</span>
				)}
			</div>

			{provider.approaches.length > 0 && (
				<p className="text-xs text-slate-500">
					<span className="font-semibold">Approaches: </span>
					{provider.approaches.join(" · ")}
				</p>
			)}

			<p className="text-xs text-slate-500">
				<span className="font-semibold">Languages: </span>
				{provider.languages.join(", ")}
			</p>

			<p className="text-slate-700 leading-relaxed text-xs">{provider.why}</p>

			{provider.website && (
				<div className="mt-1">
					<a
						href={provider.website}
						target="_blank"
						rel="noopener noreferrer"
						className="text-xs font-semibold text-primary hover:text-primary-hover"
					>
						Website
					</a>
				</div>
			)}
		</li>
	);
}

export default function MentalHealthServicesPage() {
	const [cityFilter, setCityFilter] = useState<City | "All">("All");
	const [typeFilter, setTypeFilter] = useState<ProviderType | "All">("All");

	const filtered = MENTAL_HEALTH_PROVIDERS.filter(
		(p) =>
			(cityFilter === "All" || p.city === cityFilter) &&
			(typeFilter === "All" || p.type === typeFilter),
	);

	return (
		<main
			id="main"
			data-pagefind-body
			data-pagefind-filter="type[data-type]"
			data-type="directory"
			className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16"
		>
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Mental Health Services" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Healthcare
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Mental Health Services in Cyprus
					<br />
					<span className="text-2xl md:text-3xl font-semibold text-slate-600">
						Private Clinics & English-Speaking Therapists
					</span>
				</h1>
				<p className="mt-4 text-base text-slate-700 leading-relaxed max-w-2xl">
					Psychologists, psychotherapists, psychiatrists, and counsellors across
					Cyprus who work in English — including those experienced with expat
					adjustment issues and relocation.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-10">
				<h2 className="text-lg font-bold text-ink mb-3">What to know first</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{MENTAL_HEALTH_TIPS.map((tip) => (
						<div
							key={tip.heading}
							className="rounded-2xl border border-line bg-sky p-4 text-xs"
						>
							<p className="font-bold text-sm text-ink">{tip.heading}</p>
							<p className="mt-1.5 text-slate-700 leading-relaxed">
								{tip.body}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* City filter */}
			<div className="mb-4">
				<p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
					City
				</p>
				<div className="flex flex-wrap gap-1.5">
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
			<div className="mb-8">
				<p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
					Provider type
				</p>
				<div className="flex flex-wrap gap-1.5">
					<TypeChip
						label="All types"
						selected={typeFilter === "All"}
						onClick={() => setTypeFilter("All")}
					/>
					{ALL_PROVIDER_TYPES.map((t) => (
						<TypeChip
							key={t}
							label={PROVIDER_TYPE_LABEL[t]}
							selected={typeFilter === t}
							onClick={() => setTypeFilter(t)}
						/>
					))}
				</div>
			</div>

			{/* Results count */}
			<p className="text-xs text-slate-500 mb-4">
				{filtered.length} provider{filtered.length !== 1 ? "s" : ""} listed
				{cityFilter !== "All" ? ` in ${cityFilter}` : ""}
				{typeFilter !== "All" ? ` · ${PROVIDER_TYPE_LABEL[typeFilter]}` : ""}
			</p>

			{/* Provider grid */}
			{filtered.length === 0 ? (
				<div className="rounded-xl border border-line bg-sky px-6 py-8 text-center text-sm text-slate-500">
					No providers match the current filters.
				</div>
			) : (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((provider) => (
						<ProviderCard
							key={`${provider.name}-${provider.city}`}
							provider={provider}
						/>
					))}
				</ul>
			)}

			<aside className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
				<p className="font-semibold text-ink mb-1">Crisis support in Cyprus</p>
				<p>
					EAPN Cyprus crisis line:{" "}
					<a href="tel:1480" className="font-semibold text-amber-900 underline">
						1480
					</a>{" "}
					(free, 24/7). Lifeline Cyprus:{" "}
					<a
						href="https://www.lifeline.org.cy"
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-amber-900 underline"
					>
						lifeline.org.cy
					</a>
					. In acute crisis, go to Nicosia General Hospital or Limassol General
					Hospital psychiatric emergency.
				</p>
			</aside>

			<p className="mt-8 text-xs text-slate-500 leading-relaxed max-w-2xl">
				This directory is general information. Always verify availability,
				session fees, and provider credentials directly. For medical emergencies
				call 112.
			</p>
		</main>
	);
}
