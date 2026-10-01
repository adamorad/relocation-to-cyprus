"use client";

import { useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { CHART_COLORS } from "@/lib/chart-colors";

// ── types ────────────────────────────────────────────────────────────────────

type PetType = "dog" | "cat" | "ferret" | "bird" | "rabbit";
type OriginRegion = "eu" | "listed2" | "unlisted";

interface ChecklistItem {
	id: string;
	text: string;
	timing: "now" | "weeks" | "days" | "arrival";
	critical?: boolean;
	note?: string;
}

// ── checklist data ────────────────────────────────────────────────────────────

function getChecklist(pet: PetType, origin: OriginRegion): ChecklistItem[] {
	if (pet === "bird") {
		return [
			{
				id: "bird-cites",
				text: "Obtain CITES permit (required for most parrots and protected species)",
				timing: "now",
				critical: true,
				note: "Most parrot species are CITES Appendix II: check before purchasing or travelling.",
			},
			{
				id: "bird-import-permit",
				text: "Apply for import permit from Cyprus Veterinary Services (minimum 60 days in advance)",
				timing: "weeks",
				critical: true,
				note: "Apply at least 60 days before planned travel.",
			},
			{
				id: "bird-ai-test",
				text: "Avian influenza (H5N1) test: must be negative within 10 days before travel",
				timing: "days",
			},
			{
				id: "bird-health-cert",
				text: "Health certificate issued by an official vet within 10 days of travel",
				timing: "days",
			},
			{
				id: "bird-quarantine",
				text: "Arrange minimum 30-day quarantine in an approved facility on arrival (at your expense)",
				timing: "arrival",
				critical: true,
				note: "Book in advance: approved facilities are limited.",
			},
			{
				id: "bird-border",
				text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
				timing: "arrival",
			},
		];
	}

	if (pet === "rabbit") {
		return [
			{
				id: "rabbit-health-cert",
				text: "Health certificate from an official vet",
				timing: "days",
			},
			{
				id: "rabbit-declare",
				text: "Declare your pet at the border on arrival",
				timing: "arrival",
			},
			{
				id: "rabbit-border",
				text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
				timing: "arrival",
			},
		];
	}

	if (pet === "ferret") {
		// Ferrets follow similar rules to dogs/cats for EU/UK, and stricter for others
		const base = getDogCatChecklist(origin);
		return base;
	}

	// dog or cat
	return getDogCatChecklist(origin);
}

function getDogCatChecklist(origin: OriginRegion): ChecklistItem[] {
	if (origin === "eu") {
		return [
			{
				id: "eu-microchip",
				text: "ISO 15-digit microchip: must be implanted BEFORE or on the same day as the first rabies vaccine",
				timing: "now",
			},
			{
				id: "eu-rabies-vax",
				text: "Rabies vaccination (primary + booster if required; must be within validity period)",
				timing: "now",
			},
			{
				id: "eu-passport",
				text: "EU Pet Passport or Animal Health Certificate (AHC) issued by an official vet",
				timing: "weeks",
			},
			{
				id: "eu-tapeworm",
				text: "Tapeworm (Praziquantel) treatment by vet: required 24 to 120 hours before entering Cyprus",
				timing: "days",
				note: "Dogs only. Treatment must be recorded in the pet passport / AHC.",
			},
			{
				id: "eu-border",
				text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
				timing: "arrival",
			},
			{
				id: "eu-declaration",
				text: "Notify Cyprus Veterinary Services on arrival: complete declaration form",
				timing: "arrival",
			},
		];
	}

	if (origin === "listed2") {
		return [
			{
				id: "l2-microchip",
				text: "ISO 15-digit microchip: must be implanted FIRST, before any vaccines",
				timing: "now",
				critical: true,
				note: "If microchip is implanted after a rabies vaccine, that vaccine does not count.",
			},
			{
				id: "l2-rabies-vax",
				text: "Primary rabies vaccination (administered AFTER microchip; pet must be at least 12 weeks old)",
				timing: "now",
			},
			{
				id: "l2-titre-test",
				text: "Rabies Neutralising Antibody Titre Test (RNATT): done 30+ days after primary vaccination at an EU-approved lab; titre must be ≥ 0.5 IU/ml",
				timing: "now",
				critical: true,
				note: "If the titre fails, you must give a booster and wait 30+ days, then retest. Book an EU-approved lab in advance.",
			},
			{
				id: "l2-wait",
				text: "MANDATORY 3-month wait after a successful titre test result before travelling to Cyprus",
				timing: "weeks",
				critical: true,
				note: "This is non-negotiable. The 3-month clock starts from the date of the blood sample, not the result date.",
			},
			{
				id: "l2-health-cert",
				text: "Veterinary health certificate issued within 10 days of travel, endorsed by official authority (APHIS: USA; CFIA: Canada; AQIS: Australia)",
				timing: "days",
			},
			{
				id: "l2-tapeworm",
				text: "Tapeworm (Praziquantel) treatment by vet: 24 to 120 hours before entry (dogs only)",
				timing: "days",
				note: "Must be recorded in the health certificate.",
			},
			{
				id: "l2-border",
				text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
				timing: "arrival",
			},
			{
				id: "l2-declaration",
				text: "Notify Cyprus Veterinary Services on arrival: complete declaration form",
				timing: "arrival",
			},
		];
	}

	// unlisted
	return [
		{
			id: "ul-microchip",
			text: "ISO 15-digit microchip: must be implanted FIRST, before any vaccines",
			timing: "now",
			critical: true,
			note: "If microchip is implanted after a rabies vaccine, that vaccine does not count.",
		},
		{
			id: "ul-rabies-vax",
			text: "Primary rabies vaccination (administered AFTER microchip; pet must be at least 12 weeks old)",
			timing: "now",
		},
		{
			id: "ul-titre-test",
			text: "Rabies Neutralising Antibody Titre Test (RNATT): done 30+ days after primary vaccination at an EU-approved lab; titre must be ≥ 0.5 IU/ml",
			timing: "now",
			critical: true,
			note: "If the titre fails, you must give a booster and wait 30+ days, then retest.",
		},
		{
			id: "ul-wait",
			text: "MANDATORY 3-month wait after a successful titre test result before travelling to Cyprus",
			timing: "weeks",
			critical: true,
			note: "This is non-negotiable. The 3-month clock starts from the date of the blood sample.",
		},
		{
			id: "ul-confirm",
			text: "Contact Cyprus Veterinary Services directly to confirm current requirements for your specific country",
			timing: "now",
			critical: true,
			note: "Unlisted countries may face additional quarantine requirements on arrival at owner's cost.",
		},
		{
			id: "ul-health-cert",
			text: "Veterinary health certificate issued within 10 days of travel, endorsed by your country's official veterinary authority",
			timing: "days",
		},
		{
			id: "ul-tapeworm",
			text: "Tapeworm (Praziquantel) treatment by vet: 24 to 120 hours before entry (dogs only)",
			timing: "days",
			note: "Must be recorded in the health certificate.",
		},
		{
			id: "ul-quarantine",
			text: "Be prepared for possible isolation or quarantine on arrival at your expense: confirm with Cyprus Veterinary Services",
			timing: "arrival",
			critical: true,
		},
		{
			id: "ul-border",
			text: "Enter via approved border post only (Larnaca Airport or Limassol Port)",
			timing: "arrival",
		},
		{
			id: "ul-declaration",
			text: "Notify Cyprus Veterinary Services on arrival: complete declaration form",
			timing: "arrival",
		},
	];
}

// ── timeline data (Part 2 countries) ─────────────────────────────────────────

const TIMELINE_STEPS = [
	{ label: "Microchip", sub: "Day 0", color: CHART_COLORS.ink },
	{ label: "Rabies vaccine", sub: "Day 0+", color: CHART_COLORS.blue },
	{
		label: "Titre test",
		sub: "30+ days after vaccine",
		color: CHART_COLORS.coralFill,
	},
	{
		label: "3-month wait",
		sub: "Starts from blood draw",
		color: CHART_COLORS.coral,
	},
	{
		label: "Health cert",
		sub: "10 days before travel",
		color: CHART_COLORS.primary,
	},
	{ label: "Travel day", sub: "Tapeworm (dogs)", color: CHART_COLORS.neutral },
	{ label: "Cyprus", sub: "Declare at border", color: CHART_COLORS.primary },
];

// ── constants ─────────────────────────────────────────────────────────────────

const PET_OPTIONS: { value: PetType; label: string }[] = [
	{ value: "dog", label: "Dog" },
	{ value: "cat", label: "Cat" },
	{ value: "ferret", label: "Ferret" },
	{ value: "bird", label: "Bird / Parrot" },
	{ value: "rabbit", label: "Rabbit / Small animal" },
];

const ORIGIN_OPTIONS: {
	id: OriginRegion;
	label: string;
	sub: string;
	badge: string;
	badgeTone: BadgeTone;
}[] = [
	{
		id: "eu",
		label: "EU / EEA / Switzerland / UK",
		sub: "Easiest route: Listed Part 1",
		badge: "Straightforward",
		badgeTone: "success",
	},
	{
		id: "listed2",
		label:
			"USA, Canada, Australia, UAE, Israel, Japan, Singapore, NZ, South Korea, Chile…",
		sub: "Listed Part 2: months-long process, start immediately",
		badge: "Plan months ahead",
		badgeTone: "warning",
	},
	{
		id: "unlisted",
		label:
			"All other countries (Russia, China, India, Brazil, most of Africa, etc.)",
		sub: "Unlisted / high-risk: strictest rules, possible quarantine",
		badge: "Most complex",
		badgeTone: "danger",
	},
];

const TIMING_GROUPS: {
	key: "now" | "weeks" | "days" | "arrival";
	label: string;
}[] = [
	{ key: "now", label: "Start now" },
	{ key: "weeks", label: "Weeks before travel" },
	{ key: "days", label: "Days before travel (within 10 days)" },
	{ key: "arrival", label: "On arrival in Cyprus" },
];

// ── main component ────────────────────────────────────────────────────────────

export default function PetImportChecklistClient() {
	const [pet, setPet] = useState<PetType | null>(null);
	const [origin, setOrigin] = useState<OriginRegion | null>(null);
	const [checked, setChecked] = useState<Record<string, boolean>>({});

	const showTimeline =
		(pet === "dog" || pet === "cat" || pet === "ferret") &&
		origin === "listed2";

	const checklist = pet && origin ? getChecklist(pet, origin) : [];

	function toggleItem(id: string) {
		setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
	}

	const totalDone = checklist.filter((i) => checked[i.id]).length;
	const totalItems = checklist.length;

	return (
		<>
			<ToolPanel title="Step 1: What type of pet?">
				<ChipGroup
					label="Pet type"
					hideLabel
					options={PET_OPTIONS}
					value={(pet ?? "") as PetType}
					onChange={(v) => {
						setPet(v);
						setChecked({});
					}}
				/>
			</ToolPanel>

			<ToolPanel title="Step 2: Where are you travelling from?">
				<div className="flex flex-col gap-3">
					{ORIGIN_OPTIONS.map((opt) => (
						<button
							key={opt.id}
							type="button"
							aria-pressed={origin === opt.id}
							onClick={() => {
								setOrigin(opt.id);
								setChecked({});
							}}
							className={`min-h-11 rounded-xl border p-4 text-left transition-colors ${
								origin === opt.id
									? "border-primary bg-sky"
									: "border-line bg-white hover:border-primary"
							}`}
						>
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									<p className="text-sm font-semibold text-ink">{opt.label}</p>
									<p className="mt-0.5 text-sm text-muted">{opt.sub}</p>
								</div>
								<Badge tone={opt.badgeTone} className="whitespace-nowrap">
									{opt.badge}
								</Badge>
							</div>
						</button>
					))}
				</div>
			</ToolPanel>

			{pet && origin && checklist.length > 0 && (
				<>
					{origin === "listed2" &&
						(pet === "dog" || pet === "cat" || pet === "ferret") && (
							<Callout
								tone="warning"
								title="Months-long process: start planning immediately"
							>
								The titre test + mandatory 3-month wait means the minimum time
								from starting preparations to arriving in Cyprus is
								approximately 5 to 6 months. Begin as soon as possible.
							</Callout>
						)}

					{origin === "unlisted" && (
						<Callout
							tone="warning"
							title="High-risk / unlisted country: contact Cyprus Veterinary Services first"
						>
							Requirements for unlisted countries include all Part 2 steps plus
							possible quarantine on arrival. Confirm the current rules for your
							specific country directly with the Cyprus Veterinary Services
							(Ktiniatrikí Ypiresia) before making any arrangements.
						</Callout>
					)}

					{pet === "bird" && (
						<Callout
							tone="warning"
							title="Birds face significant import restrictions"
						>
							Very few exotic birds can enter Cyprus without substantial
							paperwork. A mandatory 30-day quarantine applies to all birds on
							arrival. Begin the import permit application at least 60 days in
							advance.
						</Callout>
					)}

					<section aria-label="Progress">
						<div className="mb-1 flex items-center justify-between">
							<p className="text-sm font-semibold text-ink">Progress</p>
							<p className="text-sm text-muted">
								{totalDone} / {totalItems} complete
							</p>
						</div>
						<div
							role="progressbar"
							aria-valuenow={totalDone}
							aria-valuemin={0}
							aria-valuemax={totalItems}
							aria-label="Checklist progress"
							className="h-2 overflow-hidden rounded-full bg-sky-strong"
						>
							<div
								className="h-full rounded-full bg-primary transition-all duration-300"
								style={{
									width:
										totalItems > 0
											? `${(totalDone / totalItems) * 100}%`
											: "0%",
								}}
							/>
						</div>
					</section>

					{showTimeline && (
						<section
							aria-labelledby="timeline-heading"
							className="overflow-x-auto rounded-card border border-line bg-sky p-5"
						>
							<h2
								id="timeline-heading"
								className="mb-4 text-sm font-bold text-ink"
							>
								Timeline overview (Listed Part 2)
							</h2>
							<div className="flex min-w-[600px] items-start">
								{TIMELINE_STEPS.map((step, i) => (
									<div key={step.label} className="flex flex-1 items-start">
										<div className="flex flex-1 flex-col items-center">
											<div
												className="mt-1 h-3 w-3 shrink-0 rounded-full"
												style={{ backgroundColor: step.color }}
											/>
											<p className="mt-1 text-center text-xs font-semibold leading-tight text-ink">
												{step.label}
											</p>
											<p className="mt-0.5 text-center text-xs leading-tight text-muted">
												{step.sub}
											</p>
										</div>
										{i < TIMELINE_STEPS.length - 1 && (
											<div className="mx-1 mt-2 h-px min-w-[16px] flex-1 bg-slate-400" />
										)}
									</div>
								))}
							</div>
						</section>
					)}

					<section aria-labelledby="checklist-heading">
						<h2
							id="checklist-heading"
							className="mb-4 text-2xl font-bold tracking-tight text-ink"
						>
							Step 3: Your checklist
						</h2>
						<div className="flex flex-col gap-6">
							{TIMING_GROUPS.map((group) => {
								const items = checklist.filter((i) => i.timing === group.key);
								if (items.length === 0) return null;
								return (
									<div key={group.key}>
										<h3 className="mb-3 border-b-2 border-line pb-2 text-base font-bold text-ink">
											{group.label}
										</h3>
										<div className="flex flex-col gap-2">
											{items.map((item) => (
												<ChecklistItemRow
													key={item.id}
													item={item}
													checked={!!checked[item.id]}
													onToggle={() => toggleItem(item.id)}
												/>
											))}
										</div>
									</div>
								);
							})}
						</div>
					</section>

					<Callout tone="info" title="Approved entry points">
						Pets may only enter Cyprus via{" "}
						<strong>Larnaca International Airport</strong> or{" "}
						<strong>Limassol Port</strong>. Entry via any other crossing is not
						permitted.
					</Callout>
				</>
			)}

			{(!pet || !origin) && (
				<div className="rounded-xl border-2 border-dashed border-line py-12 text-center text-sm text-muted">
					Select your pet type and origin above to generate your personalised
					checklist.
				</div>
			)}
		</>
	);
}

// ── sub-component ─────────────────────────────────────────────────────────────

function ChecklistItemRow({
	item,
	checked,
	onToggle,
}: {
	item: ChecklistItem;
	checked: boolean;
	onToggle: () => void;
}) {
	return (
		<div
			className={`rounded-2xl border p-3 transition-colors ${
				item.critical ? "border-amber-300 bg-amber-50" : "border-line bg-white"
			} ${checked ? "opacity-70" : ""}`}
		>
			<div className="flex items-start gap-1">
				<button
					type="button"
					onClick={onToggle}
					aria-pressed={checked}
					aria-label={`${checked ? "Mark incomplete" : "Mark complete"}: ${item.text}`}
					className="flex min-h-11 min-w-11 shrink-0 items-center justify-center"
				>
					<span
						className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
							checked ? "border-primary bg-primary" : "border-slate-500"
						}`}
					>
						{checked && (
							<svg
								aria-hidden="true"
								className="h-3 w-3 text-white"
								viewBox="0 0 12 12"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									d="M2 6l3 3 5-5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</span>
				</button>
				<div className="min-w-0 flex-1 pt-2.5">
					<p
						className={`text-sm font-medium leading-snug ${
							checked ? "text-muted line-through" : "text-ink"
						}`}
					>
						{item.critical && (
							<span className="mr-1.5 inline-block font-bold text-amber-900">
								!
							</span>
						)}
						{item.text}
					</p>
					{item.note && (
						<p className="mt-1 text-sm leading-relaxed text-muted">
							{item.note}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
