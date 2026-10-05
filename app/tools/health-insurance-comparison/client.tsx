"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable } from "@/components/ui/DataTable";
import { Section } from "@/components/ui/Section";
import {
	eur,
	GESY_AE_COPAY,
	GESY_ANNUAL_CAP,
	GESY_ANNUAL_CAP_REDUCED,
	GESY_RX_ITEM_COPAY,
} from "@/lib/facts/health-transport";

type ProviderType = "local" | "international" | "public";

type InsuranceProvider = {
	name: string;
	type: ProviderType;
	coverageRegion: string;
	annualPremiumSingle30yo: number | null;
	annualPremiumFamily4: number | null;
	maternity: boolean;
	dental: boolean;
	preExistingCovered: boolean;
	gesyCompatible: boolean;
	directBillingCyprusHospitals: boolean;
	keyNote: string;
	website?: string;
};

const PROVIDERS: ReadonlyArray<InsuranceProvider> = [
	{
		name: "GeSY (Public Healthcare)",
		type: "public",
		coverageRegion: "Cyprus only",
		annualPremiumSingle30yo: 0,
		annualPremiumFamily4: 0,
		maternity: true,
		dental: false,
		preExistingCovered: true,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote: `Public health system funded by income-based contributions, with no separate premium. Co-payments apply: ${eur(GESY_AE_COPAY)} per A&E visit and ${eur(GESY_RX_ITEM_COPAY)} per prescription item, capped at ${eur(GESY_ANNUAL_CAP)} a year per person (${eur(GESY_ANNUAL_CAP_REDUCED)} for under-21s, minimum-income recipients and low-income pensioners). Ask the HIO (contact centre 17000) whether you are a beneficiary. Covers GP, specialists, most hospital care. No dental or vision. Wait times for non-emergency specialist appointments can be 4–8 weeks. Most relocators use GeSY + supplemental private insurance.`,
		website: "https://www.gesy.org.cy",
	},
	{
		name: "AXA PPP / AXA Health",
		type: "international",
		coverageRegion: "Worldwide",
		annualPremiumSingle30yo: 1400,
		annualPremiumFamily4: 4800,
		maternity: true,
		dental: true,
		preExistingCovered: false,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote:
			"Strong international coverage and established direct billing network at major Cypriot private hospitals (Apollonion, Aretaeio, Iasis). Maternity cover after 10-month waiting period. Pre-existing conditions excluded on standard plan; declared-condition cover available at premium. Good for people who split time between Cyprus and Europe.",
		website: "https://www.axa.com",
	},
	{
		name: "Bupa International",
		type: "international",
		coverageRegion: "Worldwide (excl. USA on standard plan)",
		annualPremiumSingle30yo: 1800,
		annualPremiumFamily4: 5800,
		maternity: true,
		dental: true,
		preExistingCovered: false,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote:
			"Premium international insurer with a strong reputation for claim handling. 24/7 English-speaking helpline. Dental included in comprehensive plans. Maternity cover after 12 months. USA coverage available as add-on, important for frequent travellers. Higher premiums but reliable for complex medical situations.",
		website: "https://www.bupaglobal.com",
	},
	{
		name: "Cigna Global",
		type: "international",
		coverageRegion: "Worldwide (incl. USA)",
		annualPremiumSingle30yo: 1600,
		annualPremiumFamily4: 5200,
		maternity: true,
		dental: true,
		preExistingCovered: false,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote:
			"Highly customisable modular plan, start with core cover and add dental, maternity, and mental health separately. Competitive for under-40s. Good online portal and claims app. USA cover included on Silver/Gold/Platinum tiers. Strong choice for tech workers relocating from the US or serving US clients.",
		website: "https://www.cignahealthbenefits.com",
	},
	{
		name: "Allianz Care",
		type: "international",
		coverageRegion: "Worldwide",
		annualPremiumSingle30yo: 1500,
		annualPremiumFamily4: 5000,
		maternity: true,
		dental: true,
		preExistingCovered: false,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote:
			"Part of Allianz Global group. Solid worldwide cover with competitive family premiums. Maternity cover from day one on some plans (after 10-month waiting period on others, confirm at quote stage). Mental health cover included. Good for families. Dental available as optional add-on on standard plan.",
		website: "https://www.allianzcare.com",
	},
	{
		name: "InterGlobal (now part of AXA)",
		type: "international",
		coverageRegion: "Worldwide",
		annualPremiumSingle30yo: 1300,
		annualPremiumFamily4: 4400,
		maternity: false,
		dental: false,
		preExistingCovered: false,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote:
			"Now integrated into AXA's international portfolio. Historically competitive on premiums for healthy individuals. Maternity and dental available as optional extras at additional cost. Good for young, healthy individuals who want solid hospital cover without the extras.",
		website: "https://www.interhealth.com",
	},
	{
		name: "Laiki Asfalistiki (Local Cyprus)",
		type: "local",
		coverageRegion: "Cyprus only",
		annualPremiumSingle30yo: 650,
		annualPremiumFamily4: 2200,
		maternity: true,
		dental: false,
		preExistingCovered: false,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote:
			"Major local insurer. Most competitive premiums for Cyprus-only coverage. Ideal as a top-up to GeSY for faster private specialist access and private room hospitalisation. Direct billing at most Cypriot private hospitals. No international coverage. Good choice if you rarely travel or have international coverage through an employer.",
	},
	{
		name: "CNP Asfalistiki (Cyprus)",
		type: "local",
		coverageRegion: "Cyprus + EU emergency",
		annualPremiumSingle30yo: 750,
		annualPremiumFamily4: 2500,
		maternity: true,
		dental: true,
		preExistingCovered: false,
		gesyCompatible: true,
		directBillingCyprusHospitals: true,
		keyNote:
			"Local insurer with wider EU emergency coverage. Dental included in comprehensive plans. Good balance of cost and coverage for Cyprus-based workers who occasionally travel within Europe. Not suitable as standalone for frequent international travellers. English-language customer service available.",
	},
];

type FilterState = {
	coverageType: "all" | "individual" | "family";
	maternity: boolean | null;
	preExisting: boolean | null;
	providerType: "all" | "local" | "international" | "public";
};

const FEATURE_KEYS = [
	{ key: "maternity", label: "Maternity" },
	{ key: "dental", label: "Dental" },
	{ key: "preExistingCovered", label: "Pre-existing" },
	{ key: "gesyCompatible", label: "GeSY top-up" },
	{ key: "directBillingCyprusHospitals", label: "Direct billing CY" },
] as const;

export default function HealthInsuranceComparisonPage() {
	const [filters, setFilters] = useState<FilterState>({
		coverageType: "all",
		maternity: null,
		preExisting: null,
		providerType: "all",
	});

	const filtered = useMemo(() => {
		return PROVIDERS.filter((p) => {
			if (
				filters.coverageType === "individual" &&
				p.annualPremiumSingle30yo === null
			)
				return false;
			if (filters.coverageType === "family" && p.annualPremiumFamily4 === null)
				return false;
			if (filters.maternity === true && !p.maternity) return false;
			if (filters.preExisting === true && !p.preExistingCovered) return false;
			if (filters.providerType !== "all" && p.type !== filters.providerType)
				return false;
			return true;
		});
	}, [filters]);

	const typeLabels: Record<ProviderType, string> = {
		public: "Public",
		local: "Local",
		international: "International",
	};

	function premiumDisplay(amount: number | null): string {
		if (amount === null) return "n/a";
		if (amount === 0) return "No premium";
		return `€${amount.toLocaleString()}/yr`;
	}

	return (
		<>
			<Callout tone="info" title="How GeSY fits in">
				GeSY (the public General Healthcare System) has no separate premium: it
				is funded by income-based contributions, and visits carry small
				co-payments ({eur(GESY_AE_COPAY)} per A&amp;E visit,{" "}
				{eur(GESY_RX_ITEM_COPAY)} per prescription item, capped at{" "}
				{eur(GESY_ANNUAL_CAP)} a year). Whether you are a beneficiary depends on
				your status: check with the Health Insurance Organisation (contact
				centre 17000) before you rely on it. For beneficiaries, GeSY handles
				everyday healthcare and emergencies, while a private policy speeds up
				specialist access and adds dental/maternity cover. You don&apos;t have
				to choose one or the other.
			</Callout>

			{/* Filters */}
			<div className="space-y-5 rounded-card border border-line bg-sky p-4 md:p-5">
				<h2 className="text-lg font-bold text-ink">Filter providers</h2>
				<div className="grid gap-5 sm:grid-cols-2">
					<ChipGroup
						label="Coverage for"
						value={filters.coverageType}
						onChange={(v) => setFilters({ ...filters, coverageType: v })}
						options={[
							{ value: "all", label: "All" },
							{ value: "individual", label: "Individual" },
							{ value: "family", label: "Family" },
						]}
					/>
					<ChipGroup
						label="Provider type"
						value={filters.providerType}
						onChange={(v) => setFilters({ ...filters, providerType: v })}
						options={(["all", "public", "local", "international"] as const).map(
							(t) => ({
								value: t,
								label: t.charAt(0).toUpperCase() + t.slice(1),
							}),
						)}
					/>
					<ChipGroup
						label="Maternity cover"
						value={filters.maternity === true ? "required" : "any"}
						onChange={(v) =>
							setFilters({
								...filters,
								maternity: v === "required" ? true : null,
							})
						}
						options={[
							{ value: "any", label: "Any" },
							{ value: "required", label: "Required" },
						]}
					/>
					<ChipGroup
						label="Pre-existing conditions"
						value={filters.preExisting === true ? "covered" : "any"}
						onChange={(v) =>
							setFilters({
								...filters,
								preExisting: v === "covered" ? true : null,
							})
						}
						options={[
							{ value: "any", label: "Any" },
							{ value: "covered", label: "Covered" },
						]}
					/>
				</div>
			</div>

			{/* Result count */}
			<h2
				className="text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				Showing {filtered.length} of {PROVIDERS.length} providers
			</h2>

			{/* Comparison table, desktop */}
			<div className="hidden md:block">
				<DataTable
					caption="Health insurance provider comparison"
					hideCaption
					zebra
					columns={[
						{ header: "Provider" },
						{ header: "Coverage" },
						{ header: "Single (30yo)", align: "right" },
						{ header: "Family (4)", align: "right" },
						...FEATURE_KEYS.map((f) => ({ header: f.label })),
					]}
					rows={filtered.map((p) => [
						<>
							<span className="block font-semibold">{p.name}</span>
							<Badge className="mt-1">{typeLabels[p.type]}</Badge>
						</>,
						<span key="c" className="text-muted">
							{p.coverageRegion}
						</span>,
						<span key="s" className="font-bold text-primary">
							{premiumDisplay(p.annualPremiumSingle30yo)}
						</span>,
						<span key="f" className="font-bold">
							{premiumDisplay(p.annualPremiumFamily4)}
						</span>,
						...FEATURE_KEYS.map((f) =>
							(p[f.key] as boolean) ? (
								<span key={f.key} className="font-semibold text-ink">
									Yes
								</span>
							) : (
								<span key={f.key} className="text-muted">
									No
								</span>
							),
						),
					])}
				/>
			</div>

			{/* Mobile cards */}
			<ul className="space-y-4 md:hidden">
				{filtered.map((p) => (
					<li
						key={p.name}
						className="rounded-card border border-line bg-white p-4"
					>
						<div className="mb-3 flex items-start justify-between gap-3">
							<div>
								<h3 className="font-bold text-ink">{p.name}</h3>
								<Badge className="mt-1">{typeLabels[p.type]}</Badge>
							</div>
							<div className="text-right">
								<p className="text-sm text-muted">Single/yr</p>
								<p className="font-bold text-primary">
									{premiumDisplay(p.annualPremiumSingle30yo)}
								</p>
							</div>
						</div>
						<p className="mb-3 text-sm text-muted">{p.coverageRegion}</p>
						<div className="mb-3 flex flex-wrap gap-2">
							{FEATURE_KEYS.map((f) => (
								<span
									key={f.key}
									className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
										(p[f.key] as boolean)
											? "bg-sky-strong text-ink"
											: "bg-sky text-muted line-through"
									}`}
								>
									{f.label}
									<span className="sr-only">
										{(p[f.key] as boolean) ? " (included)" : " (not included)"}
									</span>
								</span>
							))}
						</div>
						<p className="text-sm leading-relaxed text-ink">{p.keyNote}</p>
						{p.website && (
							<a
								href={p.website}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline hover:text-primary-hover"
							>
								Visit website
							</a>
						)}
					</li>
				))}
			</ul>

			{/* Detail notes, desktop only (shown below table) */}
			<div className="hidden md:block">
				<Section id="provider-notes" title="Provider notes">
					<div className="space-y-3">
						{filtered.map((p) => (
							<div
								key={`note-${p.name}`}
								className="rounded-card border border-line bg-white p-4"
							>
								<div className="mb-1 flex items-center gap-3">
									<h3 className="text-base font-semibold text-ink">{p.name}</h3>
									{p.website && (
										<a
											href={p.website}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline hover:text-primary-hover"
										>
											Website
										</a>
									)}
								</div>
								<p className="text-sm leading-relaxed text-ink">{p.keyNote}</p>
							</div>
						))}
					</div>
				</Section>
			</div>
		</>
	);
}
