"use client";

import { useId, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import {
	eur,
	LICENCE_FEE,
	LICENCE_MEDICAL_AGE,
} from "@/lib/facts/health-transport";

// ── data ─────────────────────────────────────────────────────────────────────

type LicenceCategory = "car" | "motorcycle" | "both" | "other";

type ExchangeType = "direct" | "tests" | null;

interface CountryOption {
	value: string;
	label: string;
	group: "eu_eea" | "uk" | "bilateral" | "other";
}

const EU_EEA_COUNTRIES: CountryOption[] = [
	{ value: "AT", label: "Austria", group: "eu_eea" },
	{ value: "BE", label: "Belgium", group: "eu_eea" },
	{ value: "BG", label: "Bulgaria", group: "eu_eea" },
	{ value: "HR", label: "Croatia", group: "eu_eea" },
	{ value: "CZ", label: "Czech Republic", group: "eu_eea" },
	{ value: "DK", label: "Denmark", group: "eu_eea" },
	{ value: "EE", label: "Estonia", group: "eu_eea" },
	{ value: "FI", label: "Finland", group: "eu_eea" },
	{ value: "FR", label: "France", group: "eu_eea" },
	{ value: "DE", label: "Germany", group: "eu_eea" },
	{ value: "GR", label: "Greece", group: "eu_eea" },
	{ value: "HU", label: "Hungary", group: "eu_eea" },
	{ value: "IE", label: "Ireland", group: "eu_eea" },
	{ value: "IT", label: "Italy", group: "eu_eea" },
	{ value: "LV", label: "Latvia", group: "eu_eea" },
	{ value: "LT", label: "Lithuania", group: "eu_eea" },
	{ value: "LU", label: "Luxembourg", group: "eu_eea" },
	{ value: "MT", label: "Malta", group: "eu_eea" },
	{ value: "NL", label: "Netherlands", group: "eu_eea" },
	{ value: "PL", label: "Poland", group: "eu_eea" },
	{ value: "PT", label: "Portugal", group: "eu_eea" },
	{ value: "RO", label: "Romania", group: "eu_eea" },
	{ value: "SK", label: "Slovakia", group: "eu_eea" },
	{ value: "SI", label: "Slovenia", group: "eu_eea" },
	{ value: "ES", label: "Spain", group: "eu_eea" },
	{ value: "SE", label: "Sweden", group: "eu_eea" },
	{ value: "NO", label: "Norway", group: "eu_eea" },
	{ value: "IS", label: "Iceland", group: "eu_eea" },
	{ value: "LI", label: "Liechtenstein", group: "eu_eea" },
];

const UK_COUNTRIES: CountryOption[] = [
	{ value: "GB", label: "United Kingdom", group: "uk" },
];

const BILATERAL_COUNTRIES: CountryOption[] = [
	{ value: "US", label: "USA (all 50 states)", group: "bilateral" },
	{ value: "CA", label: "Canada (all provinces)", group: "bilateral" },
	{ value: "AU", label: "Australia", group: "bilateral" },
	{ value: "NZ", label: "New Zealand", group: "bilateral" },
	{ value: "CH", label: "Switzerland", group: "bilateral" },
	{ value: "JP", label: "Japan", group: "bilateral" },
	{ value: "KR", label: "South Korea", group: "bilateral" },
	{ value: "AE", label: "UAE", group: "bilateral" },
	{ value: "IL", label: "Israel", group: "bilateral" },
];

const ALL_COUNTRIES = [
	...EU_EEA_COUNTRIES,
	...UK_COUNTRIES,
	...BILATERAL_COUNTRIES,
];

function getGroup(
	countryValue: string,
): "eu_eea" | "uk" | "bilateral" | "other" {
	const found = ALL_COUNTRIES.find((c) => c.value === countryValue);
	return found ? found.group : "other";
}

// ── cost calculation ──────────────────────────────────────────────────────────

function calcCost(
	group: "eu_eea" | "uk" | "bilateral" | "other",
	needsMedical: boolean,
): { breakdown: { label: string; amount: string }[]; total: string } | null {
	if (group === "other") return null;

	const breakdown: { label: string; amount: string }[] = [
		{ label: "Licence fee", amount: eur(LICENCE_FEE) },
	];

	if (needsMedical) {
		breakdown.push({ label: "Medical certificate", amount: "Doctor's fee" });
	}

	return {
		breakdown,
		total: needsMedical ? `${eur(LICENCE_FEE)} + medical` : eur(LICENCE_FEE),
	};
}

// ── document checklist ────────────────────────────────────────────────────────

const BASE_DOCUMENTS = [
	"Valid original foreign driving licence (both sides if card format)",
	"Valid passport or EU ID card",
	"2 recent passport photos (45×35 mm, white background)",
	"Proof of Cyprus residence (utility bill, bank statement, or municipality registration)",
	"Completed application form (available at District Transport Department)",
	"Payment of applicable fee",
];

const EU_CITIZEN_DOCS = ["MEU1 certificate (EU citizens)"];

const NON_EU_DOCS = ["ARC card (Alien Registration Certificate)"];

const TRANSLATION_NOTE =
	"Certified translation of licence (required if not issued in Latin alphabet or Greek, EU documents are exempt)";

const MEDICAL_DOC_TEST_ROUTE =
	"Medical certificate (eye test + GP declaration of fitness)";

const MEDICAL_DOC_EXCHANGE = `Medical certificate (eye test and fitness to drive), needed because you are ${LICENCE_MEDICAL_AGE} or over or hold lorry or bus categories`;

function getDocuments(
	group: "eu_eea" | "uk" | "bilateral" | "other",
	countryValue: string,
	needsMedical: boolean,
): string[] {
	const isEuCitizen = group === "eu_eea";
	const needsTranslation =
		group === "bilateral" && ["JP", "KR", "AE", "IL"].includes(countryValue);

	const docs = [...BASE_DOCUMENTS];

	if (group === "other") {
		docs.splice(3, 0, MEDICAL_DOC_TEST_ROUTE);
	} else if (needsMedical) {
		docs.splice(3, 0, MEDICAL_DOC_EXCHANGE);
	}

	if (isEuCitizen) {
		docs.push(EU_CITIZEN_DOCS[0]);
	} else {
		docs.push(NON_EU_DOCS[0]);
		if (needsTranslation) {
			docs.push(TRANSLATION_NOTE);
		}
	}

	if (group === "other") {
		docs.push(TRANSLATION_NOTE);
	}

	return docs;
}

// ── process steps ─────────────────────────────────────────────────────────────

function getSteps(group: "eu_eea" | "uk" | "bilateral" | "other"): string[] {
	if (group === "other") {
		return [
			"You may drive on your valid foreign licence for up to 6 months from establishing Cyprus residency.",
			"Enrol in a Cyprus-approved driving school (recommended: €40–60/lesson, typically 5–15 lessons needed).",
			"Apply for a learner's permit at the District Transport Department.",
			"Book and pass the theory test (available in Greek, English, Russian, Turkish), fee €17.",
			"Book and pass the practical driving test, fee €34.",
			"Upon passing, collect your Cyprus driving licence from the District Transport Department.",
		];
	}

	return [
		"Gather all required documents listed below.",
		"Book an appointment at your nearest District Transport Department (Limassol, Larnaca, or Paphos).",
		"Attend your appointment and submit your original foreign licence along with all documents.",
		"Your foreign licence will be surrendered and returned to the issuing country's authority.",
		"Your Cyprus driving licence will be issued within approximately 4–6 weeks.",
	];
}

// ── sub-components ────────────────────────────────────────────────────────────

function CheckItem({ text }: { text: string }) {
	const [checked, setChecked] = useState(false);
	const id = useId();
	return (
		<li>
			<label
				htmlFor={id}
				className="flex min-h-11 cursor-pointer items-start gap-3 py-1"
			>
				<input
					id={id}
					type="checkbox"
					checked={checked}
					onChange={() => setChecked((v) => !v)}
					className="mt-1 h-5 w-5 flex-shrink-0 accent-primary"
				/>
				<span
					className={`text-sm leading-relaxed transition-colors ${
						checked ? "text-muted line-through" : "text-ink"
					}`}
				>
					{text}
				</span>
			</label>
		</li>
	);
}

function StepItem({ n, text }: { n: number; text: string }) {
	return (
		<li className="flex items-start gap-3">
			<span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
				{n}
			</span>
			<span className="text-sm text-ink leading-relaxed pt-0.5">{text}</span>
		</li>
	);
}

// ── main component ────────────────────────────────────────────────────────────

export default function DriversLicenceExchangeClient() {
	const [countryValue, setCountryValue] = useState("");
	const [category, setCategory] = useState<LicenceCategory>("car");
	const [aged70, setAged70] = useState<"no" | "yes">("no");

	const group = countryValue ? getGroup(countryValue) : null;
	const exchangeType: ExchangeType =
		group === null ? null : group === "other" ? "tests" : "direct";

	// RTD: a medical certificate is needed only at 70+ or for lorry/bus categories.
	const needsMedical = aged70 === "yes" || category === "other";
	const cost =
		group && exchangeType === "direct" ? calcCost(group, needsMedical) : null;
	const documents = group
		? getDocuments(group, countryValue, needsMedical)
		: [];
	const steps = group ? getSteps(group) : [];

	const isUkBilateralCategoryNote =
		group === "uk" &&
		(category === "motorcycle" || category === "both" || category === "other");

	return (
		<>
			<ToolPanel title="Step 1: Where was your licence issued?">
				<div>
					<label
						htmlFor="licence-country"
						className="mb-2 block text-sm font-semibold text-ink"
					>
						Country of issue
					</label>
					<select
						id="licence-country"
						value={countryValue}
						onChange={(e) => setCountryValue(e.target.value)}
						className="min-h-11 w-full rounded-field border border-line bg-white px-3 py-2.5 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus"
					>
						<option value="">Select your country</option>
						<optgroup label="EU / EEA countries (direct exchange, no test)">
							{EU_EEA_COUNTRIES.map((c) => (
								<option key={c.value} value={c.value}>
									{c.label}
								</option>
							))}
						</optgroup>
						<optgroup label="United Kingdom (direct exchange, no test)">
							{UK_COUNTRIES.map((c) => (
								<option key={c.value} value={c.value}>
									{c.label}
								</option>
							))}
						</optgroup>
						<optgroup label="Bilateral agreement countries (direct exchange, no test)">
							{BILATERAL_COUNTRIES.map((c) => (
								<option key={c.value} value={c.value}>
									{c.label}
								</option>
							))}
						</optgroup>
						<optgroup label="All other countries (tests required)">
							<option value="OTHER">Other country (not listed above)</option>
						</optgroup>
					</select>
				</div>
				<p className="text-sm leading-relaxed text-muted">
					If your country isn&rsquo;t listed, choose &ldquo;Other country&rdquo;
					at the bottom. Countries in the &ldquo;bilateral agreement&rdquo;
					group have a specific agreement with Cyprus allowing direct licence
					exchange without retesting.
				</p>
			</ToolPanel>

			{countryValue && (
				<ToolPanel title="Step 2: Your licence category and age">
					<ChipGroup
						label="Licence category"
						hideLabel
						value={category}
						onChange={setCategory}
						options={[
							{ value: "car", label: "Car (B)" },
							{ value: "motorcycle", label: "Motorcycle (A)" },
							{ value: "both", label: "Both B + A" },
							{ value: "other", label: "Other (C, D, etc.)" },
						]}
					/>
					<ChipGroup
						label={`Are you ${LICENCE_MEDICAL_AGE} or over?`}
						value={aged70}
						onChange={setAged70}
						options={[
							{ value: "no", label: "No" },
							{ value: "yes", label: "Yes" },
						]}
					/>
				</ToolPanel>
			)}

			{group && (
				<Section id="result" title="Step 3: Your personalised result">
					<div className="space-y-5">
						<div className="flex items-start gap-4 rounded-card border border-line bg-white p-5">
							<div>
								<Badge tone={exchangeType === "direct" ? "success" : "warning"}>
									{exchangeType === "direct"
										? "Direct exchange"
										: "Tests required"}
								</Badge>
								<p className="mt-2 text-lg font-bold text-ink">
									{exchangeType === "direct"
										? "Direct exchange: no test required"
										: "Tests required"}
								</p>
								<p className="mt-0.5 text-sm text-muted">
									{exchangeType === "direct"
										? "You can exchange your licence directly at the District Transport Department."
										: "Your country does not have a bilateral agreement with Cyprus. You must pass theory and practical tests."}
								</p>
							</div>
						</div>

						{isUkBilateralCategoryNote && (
							<Callout tone="info" title="Note for UK licence holders">
								The UK bilateral agreement covers car licences (Category B). For
								motorcycle (A), commercial vehicle (C), or bus (D) categories,
								please confirm current requirements directly with the Cyprus
								Road Transport Department.
							</Callout>
						)}

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="rounded-card border border-line bg-white p-4">
								<p className="mb-1 text-sm text-muted">Estimated timeline</p>
								<p className="text-xl font-bold text-ink">
									{exchangeType === "direct" ? "4 to 6 weeks" : "3 to 6 months"}
								</p>
								<p className="mt-1 text-sm text-muted">
									{exchangeType === "direct"
										? "From appointment to licence receipt"
										: "Including test waiting times"}
								</p>
							</div>

							<div className="rounded-card border border-line bg-white p-4">
								<p className="mb-1 text-sm text-muted">Estimated cost</p>
								{exchangeType === "direct" && cost ? (
									<>
										<p className="text-xl font-bold text-ink">{cost.total}</p>
										<ul className="mt-2 space-y-0.5">
											{cost.breakdown.map((item) => (
												<li
													key={item.label}
													className="flex justify-between gap-3 text-sm text-muted"
												>
													<span>{item.label}</span>
													<span className="font-semibold">{item.amount}</span>
												</li>
											))}
										</ul>
									</>
								) : (
									<>
										<p className="text-xl font-bold text-ink">€350–750+</p>
										<ul className="mt-2 space-y-0.5 text-sm text-muted">
											<li className="flex justify-between gap-3">
												<span>Theory test</span>
												<span className="font-semibold">€17</span>
											</li>
											<li className="flex justify-between gap-3">
												<span>Practical test</span>
												<span className="font-semibold">€34</span>
											</li>
											<li className="flex justify-between gap-3">
												<span>Driving lessons (5–15 lessons)</span>
												<span className="font-semibold">€300–700</span>
											</li>
											<li className="flex justify-between gap-3">
												<span>Medical certificate</span>
												<span className="font-semibold">€15–30</span>
											</li>
										</ul>
									</>
								)}
							</div>
						</div>

						<div className="rounded-card border border-line bg-white p-5">
							<h3 className="mb-4 text-lg font-bold text-ink">
								Step-by-step process
							</h3>
							<ol className="space-y-3">
								{steps.map((step, i) => (
									<StepItem key={step} n={i + 1} text={step} />
								))}
							</ol>
						</div>

						<div className="rounded-card border border-line bg-white p-5">
							<h3 className="mb-1 text-lg font-bold text-ink">
								Required documents checklist
							</h3>
							<p className="mb-3 text-sm text-muted">
								Tick each item once you have gathered it.
							</p>
							<ul>
								{documents.map((doc) => (
									<CheckItem key={doc} text={doc} />
								))}
							</ul>
						</div>

						<div className="rounded-card border border-line bg-sky p-4">
							<h3 className="mb-2 text-sm font-bold text-ink">
								District Transport Department offices
							</h3>
							<ul className="list-inside list-disc space-y-1 text-sm text-ink marker:text-primary">
								<li>Limassol District Transport Department</li>
								<li>Larnaca District Transport Department</li>
								<li>Paphos District Transport Department</li>
							</ul>
							<p className="mt-2 text-sm text-muted">
								All offices open weekday mornings. Check MCIT website for
								current hours and appointment availability.
							</p>
						</div>

						<Callout tone="info" title="Always confirm before your appointment">
							Requirements can change. Always verify current requirements with
							the Cyprus Road Transport Department (MCIT) before attending your
							appointment.
						</Callout>
					</div>
				</Section>
			)}
		</>
	);
}
