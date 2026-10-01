"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
	ALL_CITIES,
	ALL_PLATFORMS,
	type City,
	COMMUNITY_TIPS,
	EXPAT_COMMUNITIES,
	PLATFORM_LABEL,
	type Platform,
} from "@/lib/expat-communities";

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

const PLATFORM_EMOJI: Record<Platform, string> = {
	Facebook: "📘",
	WhatsApp: "💬",
	Meetup: "🤝",
	Telegram: "✈️",
	Forum: "📋",
};

export default function ExpatCommunitiesPage() {
	const [cityFilter, setCityFilter] = useState<City | "Island-wide" | "All">(
		"All",
	);
	const [platformFilter, setPlatformFilter] = useState<Platform | "All">("All");

	const filtered = EXPAT_COMMUNITIES.filter((c) => {
		const cityOk = cityFilter === "All" || c.city === cityFilter;
		const platformOk =
			platformFilter === "All" || c.platform === platformFilter;
		return cityOk && platformOk;
	});

	return (
		<main
			id="main"
			data-pagefind-body
			data-pagefind-filter="type[data-type]"
			data-type="directory"
			className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16"
		>
			<Breadcrumbs
				items={[
					{ label: "Home", href: "/" },
					{ label: "Directories", href: "/sections/" },
					{ label: "Expat Community Groups" },
				]}
			/>

			{/* Header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
					Community
				</p>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight">
					Expat Community Groups in Cyprus
				</h1>
				<p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
					Facebook groups, WhatsApp chats, Meetup events and forums for
					English-speaking expats across Cyprus — organised by city and
					platform.
				</p>
			</header>

			{/* Tips */}
			<section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
				{COMMUNITY_TIPS.map((tip) => (
					<div
						key={tip.heading}
						className="rounded-2xl border border-line bg-sky p-4"
					>
						<p className="text-sm font-semibold text-ink mb-1">{tip.heading}</p>
						<p className="text-sm text-slate-600 leading-relaxed">{tip.body}</p>
					</div>
				))}
			</section>

			{/* City filter */}
			<div className="mb-4">
				<p className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-2">
					City
				</p>
				<div className="flex flex-wrap gap-2">
					<CityChip
						label="All cities"
						selected={cityFilter === "All"}
						onClick={() => setCityFilter("All")}
					/>
					<CityChip
						label="Island-wide"
						selected={cityFilter === "Island-wide"}
						onClick={() => setCityFilter("Island-wide")}
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

			{/* Platform filter */}
			<div className="mb-8">
				<p className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-2">
					Platform
				</p>
				<div className="flex flex-wrap gap-2">
					<CityChip
						label="All platforms"
						selected={platformFilter === "All"}
						onClick={() => setPlatformFilter("All")}
					/>
					{ALL_PLATFORMS.map((p) => (
						<CityChip
							key={p}
							label={PLATFORM_LABEL[p]}
							selected={platformFilter === p}
							onClick={() => setPlatformFilter(p)}
						/>
					))}
				</div>
			</div>

			{/* Results count */}
			<p className="text-sm text-slate-500 mb-4">
				{filtered.length} {filtered.length === 1 ? "community" : "communities"}{" "}
				found
			</p>

			{/* Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filtered.map((community) => (
					<article
						key={community.name}
						className="rounded-2xl border border-line bg-white p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow"
					>
						<div className="flex items-start justify-between gap-2">
							<div className="min-w-0">
								<h2 className="font-bold text-ink text-sm leading-snug">
									{community.name}
								</h2>
								<p className="text-xs text-slate-500 mt-0.5">
									{community.city}
								</p>
							</div>
							<span
								role="img"
								className="text-lg flex-shrink-0"
								aria-label={community.platform}
							>
								{PLATFORM_EMOJI[community.platform]}
							</span>
						</div>

						<div className="flex flex-wrap gap-1.5">
							<span className="inline-flex items-center rounded-full bg-sky-strong px-2.5 py-0.5 text-xs font-medium text-ink">
								{PLATFORM_LABEL[community.platform]}
							</span>
							{community.nationalityFocus && (
								<span className="inline-flex items-center rounded-full bg-sky-strong px-2.5 py-0.5 text-xs font-medium text-ink border border-line">
									{community.nationalityFocus}
								</span>
							)}
							{community.sizeApprox && (
								<span className="inline-flex items-center rounded-full bg-sky-strong px-2.5 py-0.5 text-xs font-medium text-ink">
									{community.sizeApprox}
								</span>
							)}
						</div>

						<p className="text-sm text-slate-600 leading-relaxed flex-1">
							{community.why}
						</p>

						{community.url && (
							<a
								href={community.url}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
							>
								Join group
							</a>
						)}
					</article>
				))}

				{filtered.length === 0 && (
					<div className="col-span-full py-16 text-center text-slate-500">
						<p className="text-lg font-medium">
							No communities match these filters.
						</p>
						<p className="text-sm mt-1">
							Try broadening your city or platform selection.
						</p>
					</div>
				)}
			</div>

			{/* Back link */}
			<p className="mt-12 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
