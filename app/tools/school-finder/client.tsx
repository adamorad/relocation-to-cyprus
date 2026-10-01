"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Chip, ChipGroup } from "@/components/ui/Chip";

// ── data ──────────────────────────────────────────────────────────────────────

interface School {
	name: string;
	branch?: string;
	city: string;
	curricula: string[];
	ageRange: string;
	fees: string;
	type: string;
	notes: string;
}

const SCHOOLS: School[] = [
	{
		name: "The Grammar School",
		branch: "Limassol branch",
		city: "Limassol",
		curricula: ["British", "GCSE", "A-Level"],
		ageRange: "4-18",
		fees: "EUR 6,000–14,000/yr",
		type: "Private day",
		notes: "Long-established British school. Strong academics and sports.",
	},
	{
		name: "Heritage Private School",
		city: "Limassol",
		curricula: ["British", "IB"],
		ageRange: "3-18",
		fees: "EUR 7,000–16,000/yr",
		type: "Private day",
		notes: "IB Diploma Programme. Large expat community. Strong pastoral care.",
	},
	{
		name: "Pascal English School",
		city: "Limassol",
		curricula: ["British", "GCSE", "A-Level"],
		ageRange: "11-18",
		fees: "EUR 5,000–9,000/yr",
		type: "Private day",
		notes:
			"Secondary only. Strong academic results. Popular with local and expat families.",
	},
	{
		name: "Logos School of English Education",
		city: "Limassol",
		curricula: ["British"],
		ageRange: "3-18",
		fees: "EUR 4,500–8,000/yr",
		type: "Private day",
		notes: "Established all-through school. Nurturing environment.",
	},
	{
		name: "Foley's School",
		city: "Limassol",
		curricula: ["British"],
		ageRange: "4-11",
		fees: "EUR 4,000–7,000/yr",
		type: "Private day",
		notes: "Primary school only. Known for small class sizes.",
	},
	{
		name: "Neue Deutsche Schule Limassol",
		city: "Limassol",
		curricula: ["German", "IB"],
		ageRange: "4-18",
		fees: "EUR 5,000–10,000/yr",
		type: "Private day",
		notes:
			"German curriculum with IB option. Growing community. Bilingual German/English.",
	},
	{
		name: "Russian International School (RISE)",
		city: "Limassol",
		curricula: ["Russian", "IB"],
		ageRange: "4-18",
		fees: "EUR 4,000–9,000/yr",
		type: "Private day",
		notes:
			"Russian-language instruction alongside English. IB option available.",
	},
	{
		name: "Montessori School Limassol",
		city: "Limassol",
		curricula: ["Montessori"],
		ageRange: "3-6",
		fees: "EUR 3,000–5,000/yr",
		type: "Alternative preschool",
		notes: "Preschool only. Small, internationally-minded community.",
	},
	{
		name: "International School of Paphos (ISP)",
		city: "Paphos",
		curricula: ["British", "GCSE", "A-Level"],
		ageRange: "3-18",
		fees: "EUR 5,000–11,000/yr",
		type: "Private day",
		notes:
			"The main international school in Paphos. Popular with expat families in the region.",
	},
	{
		name: "Silver Birch International School",
		city: "Paphos",
		curricula: ["British"],
		ageRange: "3-11",
		fees: "EUR 4,500–7,500/yr",
		type: "Private day",
		notes: "Primary years only. Small class sizes. Nurturing environment.",
	},
	{
		name: "Paphos Waldorf School",
		city: "Paphos",
		curricula: ["Waldorf"],
		ageRange: "4-12",
		fees: "EUR 3,000–6,000/yr",
		type: "Alternative",
		notes:
			"Holistic Waldorf education. Small, community-oriented. Bilingual Greek/English.",
	},
	{
		name: "Larnaca English School",
		city: "Larnaca",
		curricula: ["British", "GCSE"],
		ageRange: "4-16",
		fees: "EUR 4,000–8,000/yr",
		type: "Private day",
		notes:
			"Main English-language school in Larnaca. Well-regarded by the expat community.",
	},
	{
		name: "Ayia Napa International School",
		city: "Ayia Napa",
		curricula: ["British"],
		ageRange: "4-16",
		fees: "EUR 4,000–7,500/yr",
		type: "Private day",
		notes:
			"Serves the eastern Cyprus expat community around Famagusta district.",
	},
];

// ── filter helpers ────────────────────────────────────────────────────────────

const CITIES = ["All", "Limassol", "Paphos", "Larnaca", "Ayia Napa"] as const;
type City = (typeof CITIES)[number];

const CURRICULA_OPTIONS = [
	"British",
	"IB",
	"German",
	"Russian",
	"Waldorf",
	"Montessori",
] as const;
type Curriculum = (typeof CURRICULA_OPTIONS)[number];

const AGE_GROUPS = [
	{ label: "All ages", value: "all" },
	{ label: "Early years (3-6)", value: "early" },
	{ label: "Primary (5-11)", value: "primary" },
	{ label: "Secondary (11-18)", value: "secondary" },
] as const;
type AgeGroup = (typeof AGE_GROUPS)[number]["value"];

function ageRangeOverlaps(schoolRange: string, group: AgeGroup): boolean {
	if (group === "all") return true;
	const [lo, hi] = schoolRange.split("-").map(Number);
	if (group === "early") return lo <= 6 && hi >= 3;
	if (group === "primary") return lo <= 11 && hi >= 5;
	if (group === "secondary") return lo <= 18 && hi >= 11;
	return true;
}

// ── sub-components ────────────────────────────────────────────────────────────

function SchoolCard({ school }: { school: School }) {
	return (
		<Card
			variant="text"
			eyebrow={
				<span className="flex flex-wrap gap-1.5">
					<Badge>{school.city}</Badge>
					<Badge>{school.type}</Badge>
				</span>
			}
			title={
				<>
					{school.name}
					{school.branch && (
						<span className="text-sm font-normal text-muted">
							{" "}
							({school.branch})
						</span>
					)}
				</>
			}
			meta={
				<>
					<span className="block">
						<span className="font-semibold text-ink">Ages:</span>{" "}
						{school.ageRange}
					</span>
					<span className="block">
						<span className="font-semibold text-ink">Fees:</span> {school.fees}
					</span>
				</>
			}
			text={school.notes}
			footer={
				<span className="flex flex-wrap gap-1.5 py-1">
					{school.curricula.map((c) => (
						<Badge key={c}>{c}</Badge>
					))}
				</span>
			}
		/>
	);
}

// ── main component ────────────────────────────────────────────────────────────

export default function SchoolFinderClient() {
	const [city, setCity] = useState<City>("All");
	const [curricula, setCurricula] = useState<Set<Curriculum>>(new Set());
	const [ageGroup, setAgeGroup] = useState<AgeGroup>("all");

	function toggleCurriculum(c: Curriculum) {
		setCurricula((prev) => {
			const next = new Set(prev);
			if (next.has(c)) {
				next.delete(c);
			} else {
				next.add(c);
			}
			return next;
		});
	}

	function clearFilters() {
		setCity("All");
		setCurricula(new Set());
		setAgeGroup("all");
	}

	const filtered = useMemo(() => {
		return SCHOOLS.filter((s) => {
			if (city !== "All" && s.city !== city) return false;
			if (
				curricula.size > 0 &&
				!s.curricula.some((c) => curricula.has(c as Curriculum))
			)
				return false;
			if (!ageRangeOverlaps(s.ageRange, ageGroup)) return false;
			return true;
		});
	}, [city, curricula, ageGroup]);

	const hasFilters = city !== "All" || curricula.size > 0 || ageGroup !== "all";

	return (
		<div className="flex flex-col gap-6">
			<section
				aria-label="Filters"
				className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5"
			>
				<ChipGroup
					label="City"
					options={CITIES.map((c) => ({
						value: c,
						label: c === "All" ? "All cities" : c,
					}))}
					value={city}
					onChange={setCity}
				/>

				<fieldset className="min-w-0">
					<legend className="mb-2 text-sm font-semibold text-ink">
						Curriculum{" "}
						<span className="font-normal text-muted">(select multiple)</span>
					</legend>
					<div className="flex flex-wrap gap-2">
						{CURRICULA_OPTIONS.map((c) => (
							<Chip
								key={c}
								selected={curricula.has(c)}
								onClick={() => toggleCurriculum(c)}
							>
								{c}
							</Chip>
						))}
					</div>
				</fieldset>

				<ChipGroup
					label="Age group"
					options={AGE_GROUPS.map(({ label, value }) => ({ value, label }))}
					value={ageGroup}
					onChange={setAgeGroup}
				/>

				{hasFilters && (
					<Button variant="ghost" onClick={clearFilters}>
						Clear all filters
					</Button>
				)}
			</section>

			<h2
				className="text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No schools match your filters"
					: `${filtered.length} school${filtered.length !== 1 ? "s" : ""}`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid>
					{filtered.map((school) => (
						<CardGridItem key={school.name}>
							<SchoolCard school={school} />
						</CardGridItem>
					))}
				</CardGrid>
			) : (
				<div className="rounded-card border border-line bg-sky p-6 text-center text-base text-muted">
					No schools match the current filters.{" "}
					<Button variant="ghost" onClick={clearFilters}>
						Clear filters
					</Button>
				</div>
			)}

			<p className="text-base text-muted">
				Fees are indicative figures from 2025 and have not been re-checked.
				Contact schools for the current schedule and availability. Some schools
				charge registration and capital levy fees on top of tuition.
			</p>
		</div>
	);
}
