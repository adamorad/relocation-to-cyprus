"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Chip, ChipGroup } from "@/components/ui/Chip";
import { DataTable } from "@/components/ui/DataTable";

// ── data ─────────────────────────────────────────────────────────────────────

interface Neighbourhood {
	name: string;
	city: string;
	rent1br: string;
	rent2br: string;
	vibe: string[];
	beach: string;
	walkability: number;
	expatDensity: number;
	schoolsNearby: number;
	valueForMoney: number;
	description: string;
}

const NEIGHBOURHOODS: Neighbourhood[] = [
	// LIMASSOL
	{
		name: "Marina / Enaerios",
		city: "Limassol",
		rent1br: "EUR1,200–2,500",
		rent2br: "EUR2,000–4,500",
		vibe: ["Luxury", "Seafront", "Expat hub", "New builds"],
		beach: "0 min walk",
		walkability: 5,
		expatDensity: 5,
		schoolsNearby: 3,
		valueForMoney: 2,
		description:
			"Limassol's most prestigious seafront district. New towers, high-end restaurants and marina. Popular with tech workers and high-net-worth relocators.",
	},
	{
		name: "Germasogeia / Tourist Area",
		city: "Limassol",
		rent1br: "EUR700–1,400",
		rent2br: "EUR1,100–2,200",
		vibe: ["Expat hub", "Restaurants", "Beach access", "Active nightlife"],
		beach: "5 min walk",
		walkability: 4,
		expatDensity: 5,
		schoolsNearby: 4,
		valueForMoney: 3,
		description:
			"The original expat strip. Dense with international restaurants, cafes, and bars. Easy beach access. Popular with Israeli, Russian and UK communities.",
	},
	{
		name: "Mouttayiaka / Ag. Athanasios",
		city: "Limassol",
		rent1br: "EUR600–1,200",
		rent2br: "EUR900–1,800",
		vibe: ["Up-and-coming", "Quiet", "Families", "New builds"],
		beach: "15 min drive",
		walkability: 3,
		expatDensity: 3,
		schoolsNearby: 4,
		valueForMoney: 4,
		description:
			"Quieter residential neighbourhood east of the tourist area. Growing expat presence. Good international schools nearby. More local feel.",
	},
	{
		name: "Limassol Old Town / Agora",
		city: "Limassol",
		rent1br: "EUR550–950",
		rent2br: "EUR850–1,500",
		vibe: ["Character", "Walkable", "Arts & culture", "Cafes"],
		beach: "10 min walk",
		walkability: 5,
		expatDensity: 3,
		schoolsNearby: 2,
		valueForMoney: 4,
		description:
			"Charming historic centre with medieval castle, markets, and boutiques. Walking distance to the seafront. Older building stock but great atmosphere.",
	},
	{
		name: "Mesa Geitonia",
		city: "Limassol",
		rent1br: "EUR480–850",
		rent2br: "EUR750–1,300",
		vibe: ["Residential", "Local feel", "Central", "Good transport"],
		beach: "20 min drive",
		walkability: 3,
		expatDensity: 2,
		schoolsNearby: 3,
		valueForMoney: 4,
		description:
			"Central residential area. Mainly local Cypriots. Good access to the city centre. More affordable than coastal areas.",
	},
	{
		name: "Polemidia",
		city: "Limassol",
		rent1br: "EUR450–750",
		rent2br: "EUR650–1,100",
		vibe: ["Quiet", "Families", "Suburban", "Good value"],
		beach: "25 min drive",
		walkability: 2,
		expatDensity: 2,
		schoolsNearby: 3,
		valueForMoney: 5,
		description:
			"Suburban neighbourhood away from the coast. Larger apartments at lower prices. Families and couples. Less convenient for beach lovers.",
	},
	// PAPHOS
	{
		name: "Kato Paphos / Harbour",
		city: "Paphos",
		rent1br: "EUR500–950",
		rent2br: "EUR750–1,400",
		vibe: ["Tourist hub", "Seafront", "Restaurants", "Historic"],
		beach: "5 min walk",
		walkability: 4,
		expatDensity: 4,
		schoolsNearby: 2,
		valueForMoney: 4,
		description:
			"Paphos town centre around the famous harbour and mosaics. Tourist-centric but pleasant to live in. Good dining and nightlife.",
	},
	{
		name: "Peyia / Coral Bay",
		city: "Paphos",
		rent1br: "EUR550–1,000",
		rent2br: "EUR800–1,600",
		vibe: ["Expat village", "Stunning views", "Quiet", "Coastal"],
		beach: "5 min walk",
		walkability: 3,
		expatDensity: 5,
		schoolsNearby: 2,
		valueForMoney: 4,
		description:
			"Clifftop expat community north of Paphos. Stunning sea views, British-dominated community. Very popular with UK retirees. Quieter than Limassol.",
	},
	{
		name: "Chlorakas",
		city: "Paphos",
		rent1br: "EUR480–850",
		rent2br: "EUR700–1,300",
		vibe: ["Residential", "Families", "British school", "Quiet"],
		beach: "15 min drive",
		walkability: 2,
		expatDensity: 3,
		schoolsNearby: 5,
		valueForMoney: 4,
		description:
			"Popular with families. Close to ISP (International School of Paphos). Residential feel with amenities. Mix of locals and expats.",
	},
	{
		name: "Universal / Paphos Centre",
		city: "Paphos",
		rent1br: "EUR430–780",
		rent2br: "EUR650–1,100",
		vibe: ["Up-and-coming", "Central", "Good value", "Mixed"],
		beach: "10 min drive",
		walkability: 3,
		expatDensity: 2,
		schoolsNearby: 3,
		valueForMoney: 5,
		description:
			"Central Paphos area with good amenities. More local feel. Good value compared to coastal areas. Growing number of new builds.",
	},
	{
		name: "Tala",
		city: "Paphos",
		rent1br: "EUR450–800",
		rent2br: "EUR700–1,250",
		vibe: ["Hilltop village", "Views", "Expat community", "Peaceful"],
		beach: "20 min drive",
		walkability: 2,
		expatDensity: 4,
		schoolsNearby: 2,
		valueForMoney: 4,
		description:
			"Beautiful hilltop village with panoramic views. Popular with British expats. Peaceful and green. Worth the drive to the beach.",
	},
	// LARNACA
	{
		name: "Finikoudes / Seafront",
		city: "Larnaca",
		rent1br: "EUR550–1,000",
		rent2br: "EUR800–1,500",
		vibe: ["Seafront promenade", "Palm trees", "Restaurants", "Central"],
		beach: "0 min walk",
		walkability: 5,
		expatDensity: 3,
		schoolsNearby: 2,
		valueForMoney: 4,
		description:
			"Larnaca's iconic seafront with palm-lined promenade. Central, walkable, and vibrant. Best beach access in the city.",
	},
	{
		name: "McKenzie / Makenzy",
		city: "Larnaca",
		rent1br: "EUR500–900",
		rent2br: "EUR750–1,350",
		vibe: ["Beach bars", "Young crowd", "Lively", "Up-and-coming"],
		beach: "2 min walk",
		walkability: 4,
		expatDensity: 3,
		schoolsNearby: 2,
		valueForMoney: 4,
		description:
			"Popular beach area near the airport (surprisingly quiet). Known for beach bars and cafes. Young, international crowd. One of Larnaca's most desirable areas.",
	},
	{
		name: "Drosia",
		city: "Larnaca",
		rent1br: "EUR550–950",
		rent2br: "EUR800–1,400",
		vibe: ["Residential", "Expat enclave", "Villas", "Quiet"],
		beach: "15 min drive",
		walkability: 2,
		expatDensity: 4,
		schoolsNearby: 3,
		valueForMoney: 3,
		description:
			"Premium residential suburb. Popular with expat families and professionals. Mix of villas and apartments. Quiet and green.",
	},
	{
		name: "Aradippou / Livadia",
		city: "Larnaca",
		rent1br: "EUR380–650",
		rent2br: "EUR550–950",
		vibe: ["Affordable", "Families", "Suburban", "Local"],
		beach: "20 min drive",
		walkability: 2,
		expatDensity: 1,
		schoolsNearby: 3,
		valueForMoney: 5,
		description:
			"Budget-friendly suburb. Primarily local Cypriot community. Larger properties at lower prices. Less convenient for beach lovers and city life.",
	},
	// AYIA NAPA
	{
		name: "Town Centre",
		city: "Ayia Napa",
		rent1br: "EUR400–700",
		rent2br: "EUR600–1,000",
		vibe: ["Party hub", "Seasonal", "Cheap off-season", "Beach nearby"],
		beach: "10 min walk",
		walkability: 4,
		expatDensity: 2,
		schoolsNearby: 1,
		valueForMoney: 5,
		description:
			"Party capital of Cyprus May–September. Very quiet off-season with great deals on rent. Only suitable as year-round base for those who embrace the seasonal swings.",
	},
	{
		name: "Protaras / Fig Tree Bay",
		city: "Ayia Napa",
		rent1br: "EUR450–800",
		rent2br: "EUR650–1,100",
		vibe: ["Family-friendly", "Beautiful beaches", "Quieter", "Seasonal"],
		beach: "5 min walk",
		walkability: 3,
		expatDensity: 2,
		schoolsNearby: 1,
		valueForMoney: 4,
		description:
			"Home to one of the best beaches in the Mediterranean. Quieter than Ayia Napa town. Family-friendly in summer but very seasonal: limited services in winter.",
	},
];

const CITIES = ["All", "Limassol", "Paphos", "Larnaca", "Ayia Napa"] as const;
type City = (typeof CITIES)[number];

const VIBE_FILTERS = [
	"Expat hub",
	"Families",
	"Beach access",
	"Quiet",
	"Up-and-coming",
	"Good value",
	"Walkable",
] as const;
type VibeFilter = (typeof VIBE_FILTERS)[number];

// Map filter chips to vibe tags that appear in data
const VIBE_MAP: Record<VibeFilter, string[]> = {
	"Expat hub": [
		"Expat hub",
		"Expat village",
		"Expat community",
		"Expat enclave",
	],
	Families: ["Families", "Family-friendly"],
	"Beach access": [
		"Seafront",
		"Coastal",
		"Beach nearby",
		"Beach bars",
		"Beautiful beaches",
	],
	Quiet: ["Quiet", "Peaceful"],
	"Up-and-coming": ["Up-and-coming"],
	"Good value": ["Good value", "Affordable", "Cheap off-season"],
	Walkable: ["Walkable"],
};

// ── sub-components ────────────────────────────────────────────────────────────

function RatingDots({
	value,
	label,
	max = 5,
}: {
	value: number;
	label: string;
	max?: number;
}) {
	return (
		<span
			role="img"
			aria-label={`${label}: ${value} out of ${max}`}
			className="flex gap-0.5"
		>
			{Array.from({ length: max }, (_, i) => `dot-${i}`).map((k, i) => (
				<span
					key={k}
					className={`inline-block h-2 w-2 rounded-full ${
						i < value ? "bg-primary" : "bg-slate-300"
					}`}
				/>
			))}
		</span>
	);
}

interface CardProps {
	n: Neighbourhood;
	selected: boolean;
	onToggle: () => void;
	compareCount: number;
}

function NeighbourhoodCard({ n, selected, onToggle, compareCount }: CardProps) {
	const canAdd = selected || compareCount < 3;
	return (
		<article className="relative flex flex-col rounded-card border border-line bg-white p-5">
			<div className="mb-3 flex items-start justify-between gap-3">
				<h2 className="text-base font-bold leading-tight text-ink">{n.name}</h2>
				<label className="-my-2 -mr-2 flex min-h-11 shrink-0 cursor-pointer select-none items-center gap-1.5 px-2">
					<input
						type="checkbox"
						checked={selected}
						onChange={onToggle}
						disabled={!canAdd}
						className="h-4 w-4 cursor-pointer accent-primary disabled:cursor-not-allowed"
					/>
					<span className="text-sm font-medium text-muted">Compare</span>
				</label>
			</div>

			<div className="mb-3 flex flex-wrap gap-1.5">
				<Badge>{n.city}</Badge>
				<Badge>{`1BR ${n.rent1br}`}</Badge>
			</div>

			<ul className="mb-3 flex flex-wrap gap-1">
				{n.vibe.map((v) => (
					<li
						key={v}
						className="rounded-full border border-line px-2 py-0.5 text-xs text-ink"
					>
						{v}
					</li>
				))}
			</ul>

			<p className="mb-3 text-sm text-muted">Beach: {n.beach}</p>

			<div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2">
				{(
					[
						["Walkability", n.walkability],
						["Expat presence", n.expatDensity],
						["Schools nearby", n.schoolsNearby],
						["Value for money", n.valueForMoney],
					] as [string, number][]
				).map(([label, val]) => (
					<div key={label} className="flex flex-col gap-0.5">
						<span className="text-xs text-muted">{label}</span>
						<RatingDots value={val} label={label} />
					</div>
				))}
			</div>

			<p className="line-clamp-2 text-sm leading-relaxed text-muted">
				{n.description}
			</p>
		</article>
	);
}

// ── comparison table ──────────────────────────────────────────────────────────

function CompareTable({ items }: { items: Neighbourhood[] }) {
	const RATING_ROWS: [
		string,
		"walkability" | "expatDensity" | "schoolsNearby" | "valueForMoney",
	][] = [
		["Walkability", "walkability"],
		["Expat presence", "expatDensity"],
		["Schools nearby", "schoolsNearby"],
		["Value for money", "valueForMoney"],
	];

	return (
		<section aria-labelledby="compare-heading" className="mt-10 space-y-4">
			<h2
				id="compare-heading"
				className="text-2xl font-bold tracking-tight text-ink"
			>
				Comparing {items.length} neighbourhood{items.length > 1 ? "s" : ""}
			</h2>
			<DataTable
				caption="Neighbourhood comparison"
				hideCaption
				columns={[
					{ header: "Metric" },
					...items.map((n) => ({
						header: (
							<>
								<span className="block">{n.name}</span>
								<Badge className="mt-1">{n.city}</Badge>
							</>
						),
					})),
				]}
				rows={[
					["1BR rent", ...items.map((n) => n.rent1br)],
					["2BR rent", ...items.map((n) => n.rent2br)],
					[
						"Vibe",
						...items.map((n) => (
							<ul key={n.name} className="flex flex-wrap gap-1">
								{n.vibe.map((v) => (
									<li
										key={v}
										className="rounded-full border border-line px-2 py-0.5 text-xs"
									>
										{v}
									</li>
								))}
							</ul>
						)),
					],
					["Beach", ...items.map((n) => n.beach)],
					...RATING_ROWS.map(([label, key]) => [
						label,
						...items.map((n) => (
							<RatingDots key={n.name} value={n[key]} label={label} />
						)),
					]),
				]}
				zebra
			/>
		</section>
	);
}

// ── main component ────────────────────────────────────────────────────────────

export default function NeighbourhoodExplorerClient() {
	const [city, setCity] = useState<City>("All");
	const [vibeFilters, setVibeFilters] = useState<Set<VibeFilter>>(new Set());
	const [compareSet, setCompareSet] = useState<Set<string>>(new Set());

	const toggleVibe = (v: VibeFilter) => {
		setVibeFilters((prev) => {
			const next = new Set(prev);
			if (next.has(v)) next.delete(v);
			else next.add(v);
			return next;
		});
	};

	const toggleCompare = (name: string) => {
		setCompareSet((prev) => {
			const next = new Set(prev);
			if (next.has(name)) next.delete(name);
			else if (next.size < 3) next.add(name);
			return next;
		});
	};

	const filtered = useMemo(() => {
		return NEIGHBOURHOODS.filter((n) => {
			if (city !== "All" && n.city !== city) return false;
			if (vibeFilters.size > 0) {
				const matchesAny = [...vibeFilters].some((filter) => {
					const tags = VIBE_MAP[filter];
					return tags.some((tag) => n.vibe.includes(tag));
				});
				if (!matchesAny) return false;
			}
			return true;
		});
	}, [city, vibeFilters]);

	const compareItems = useMemo(
		() => NEIGHBOURHOODS.filter((n) => compareSet.has(n.name)),
		[compareSet],
	);

	return (
		<>
			<div className="space-y-5">
				<ChipGroup
					label="City"
					options={CITIES.map((c) => ({ value: c, label: c }))}
					value={city}
					onChange={setCity}
				/>

				<fieldset className="min-w-0">
					<legend className="mb-2 text-sm font-semibold text-ink">Vibe</legend>
					<div className="flex flex-wrap gap-2">
						{VIBE_FILTERS.map((v) => (
							<Chip
								key={v}
								selected={vibeFilters.has(v)}
								onClick={() => toggleVibe(v)}
							>
								{v}
							</Chip>
						))}
						{vibeFilters.size > 0 && (
							<button
								type="button"
								onClick={() => setVibeFilters(new Set())}
								className="min-h-11 px-3 text-sm font-semibold text-primary-hover underline underline-offset-2"
							>
								Clear filters
							</button>
						)}
					</div>
				</fieldset>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-2">
				<p className="text-sm text-muted" aria-live="polite">
					{filtered.length} neighbourhood{filtered.length !== 1 ? "s" : ""}{" "}
					shown
				</p>
				{compareSet.size > 0 && (
					<p className="text-sm font-medium text-primary-hover">
						{compareSet.size} selected:{" "}
						{compareSet.size < 3
							? `select up to ${3 - compareSet.size} more or `
							: ""}
						<button
							type="button"
							className="min-h-11 underline"
							onClick={() => setCompareSet(new Set())}
						>
							clear
						</button>
					</p>
				)}
			</div>

			{filtered.length === 0 ? (
				<div className="py-16 text-center text-sm text-muted">
					No neighbourhoods match your current filters.{" "}
					<button
						type="button"
						className="min-h-11 underline hover:text-ink"
						onClick={() => {
							setCity("All");
							setVibeFilters(new Set());
						}}
					>
						Reset all
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((n) => (
						<NeighbourhoodCard
							key={n.name}
							n={n}
							selected={compareSet.has(n.name)}
							onToggle={() => toggleCompare(n.name)}
							compareCount={compareSet.size}
						/>
					))}
				</div>
			)}

			{compareItems.length >= 2 && <CompareTable items={compareItems} />}
		</>
	);
}
