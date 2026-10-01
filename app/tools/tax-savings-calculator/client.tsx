"use client";

import { useId, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";
import { GESY_INCOME_CAP, GESY_RATE, SDC_DIVIDEND_RATE } from "@/lib/facts/tax";

// ── types ────────────────────────────────────────────────────────────────────

type EmploymentType = "employed" | "self-employed" | "company-owner";

type CountryKey =
	| "UK"
	| "USA"
	| "Germany"
	| "Netherlands"
	| "France"
	| "Israel"
	| "South Africa"
	| "Australia"
	| "Canada"
	| "Portugal"
	| "Spain"
	| "UAE"
	| "Sweden"
	| "Switzerland"
	| "Other";

interface TaxResult {
	incomeTax: number;
	socialHealth: number;
	dividendTax: number;
	totalTax: number;
	effectiveRate: number;
}

// ── tax calculation helpers ──────────────────────────────────────────────────

function applyBands(
	income: number,
	bands: Array<{ upTo: number; rate: number }>,
): number {
	let tax = 0;
	let prev = 0;
	for (const { upTo, rate } of bands) {
		if (income <= prev) break;
		const slice = Math.min(income, upTo) - prev;
		tax += slice * rate;
		prev = upTo;
	}
	return tax;
}

// Returns effective income tax for source country (EUR)
function calcSourceIncomeTax(
	country: CountryKey,
	grossIncome: number,
	employmentType: EmploymentType,
	manualRate: number,
): number {
	if (country === "UAE") return 0;

	if (country === "Other") {
		return grossIncome * (manualRate / 100);
	}

	switch (country) {
		case "UK": {
			// Personal allowance £12,570 ≈ EUR14,600; bands approximated in EUR
			const bands = [
				{ upTo: 14_600, rate: 0 },
				{ upTo: 58_000, rate: 0.2 },
				{ upTo: 145_000, rate: 0.4 },
				{ upTo: Infinity, rate: 0.45 },
			];
			return applyBands(grossIncome, bands);
		}

		case "USA": {
			// Approximate effective federal+state blended rates
			if (grossIncome <= 80_000) return grossIncome * 0.22;
			if (grossIncome <= 150_000)
				return grossIncome * 0.22 + (grossIncome - 80_000) * 0.08;
			if (grossIncome <= 300_000)
				return 80_000 * 0.22 + 70_000 * 0.3 + (grossIncome - 150_000) * 0.32;
			return (
				80_000 * 0.22 +
				70_000 * 0.3 +
				150_000 * 0.32 +
				(grossIncome - 300_000) * 0.35
			);
		}

		case "Germany": {
			// Approximated progressive + solidarity
			if (grossIncome <= 10_908) return 0;
			if (grossIncome <= 62_000) return grossIncome * 0.25;
			if (grossIncome <= 120_000) return grossIncome * 0.35;
			if (grossIncome <= 200_000) return grossIncome * 0.42;
			return grossIncome * 0.45;
		}

		case "Netherlands": {
			const bands = [
				{ upTo: 73_000, rate: 0.3707 },
				{ upTo: Infinity, rate: 0.495 },
			];
			return applyBands(grossIncome, bands);
		}

		case "France": {
			const bands = [
				{ upTo: 11_000, rate: 0 },
				{ upTo: 28_000, rate: 0.11 },
				{ upTo: 82_000, rate: 0.3 },
				{ upTo: 168_000, rate: 0.41 },
				{ upTo: Infinity, rate: 0.45 },
			];
			return applyBands(grossIncome, bands);
		}

		case "Israel": {
			if (grossIncome <= 80_000) return grossIncome * 0.25;
			if (grossIncome <= 150_000) return grossIncome * 0.3;
			if (grossIncome <= 250_000) return grossIncome * 0.38;
			return grossIncome * 0.5;
		}

		case "South Africa": {
			if (grossIncome <= 50_000) return grossIncome * 0.2;
			if (grossIncome <= 100_000) return grossIncome * 0.3;
			if (grossIncome <= 200_000) return grossIncome * 0.38;
			return grossIncome * 0.45;
		}

		case "Australia": {
			// AUD approximated to EUR (1 AUD ≈ 0.6 EUR)
			const eurToAud = 1 / 0.6;
			const aud = grossIncome * eurToAud;
			let taxAud = 0;
			if (aud <= 18_200) taxAud = 0;
			else if (aud <= 45_000) taxAud = (aud - 18_200) * 0.19;
			else if (aud <= 120_000) taxAud = 5_092 + (aud - 45_000) * 0.325;
			else if (aud <= 180_000) taxAud = 29_467 + (aud - 120_000) * 0.37;
			else taxAud = 51_667 + (aud - 180_000) * 0.45;
			return taxAud * 0.6; // convert back to EUR
		}

		case "Canada": {
			if (grossIncome <= 80_000) return grossIncome * 0.28;
			if (grossIncome <= 150_000) return grossIncome * 0.33;
			return 150_000 * 0.33 + (grossIncome - 150_000) * 0.43;
		}

		case "Portugal": {
			// Standard NHR not applicable for new arrivals since 2024; standard rate
			const bands = [
				{ upTo: 7_703, rate: 0.1325 },
				{ upTo: 11_623, rate: 0.18 },
				{ upTo: 16_472, rate: 0.23 },
				{ upTo: 21_321, rate: 0.26 },
				{ upTo: 27_146, rate: 0.3288 },
				{ upTo: 39_791, rate: 0.37 },
				{ upTo: 51_997, rate: 0.435 },
				{ upTo: 81_199, rate: 0.45 },
				{ upTo: Infinity, rate: 0.48 },
			];
			return applyBands(grossIncome, bands);
		}

		case "Spain": {
			const bands = [
				{ upTo: 12_450, rate: 0.19 },
				{ upTo: 20_200, rate: 0.24 },
				{ upTo: 35_200, rate: 0.3 },
				{ upTo: 60_000, rate: 0.37 },
				{ upTo: 300_000, rate: 0.45 },
				{ upTo: Infinity, rate: 0.47 },
			];
			return applyBands(grossIncome, bands);
		}

		case "Sweden": {
			// Municipal ~32% + state above ~54k EUR
			if (grossIncome <= 54_000) return grossIncome * 0.32;
			return 54_000 * 0.32 + (grossIncome - 54_000) * 0.52;
		}

		case "Switzerland": {
			// Federal + cantonal average
			if (grossIncome <= 50_000) return grossIncome * 0.2;
			if (grossIncome <= 100_000) return grossIncome * 0.27;
			if (grossIncome <= 200_000) return grossIncome * 0.33;
			return grossIncome * 0.35;
		}

		default:
			return grossIncome * (manualRate / 100);
	}
}

// Social/health contributions by country (approximate employee/self-emp portion)
function calcSourceSocial(
	country: CountryKey,
	grossIncome: number,
	employmentType: EmploymentType,
): number {
	if (country === "UAE") return 0;
	if (country === "Other") return 0;

	switch (country) {
		case "UK":
			// NI: 8% on 12,570–50,270; 2% above
			return (
				Math.min(Math.max(grossIncome - 12_570, 0), 50_270 - 12_570) * 0.08 +
				Math.max(grossIncome - 50_270, 0) * 0.02
			);
		case "USA":
			return Math.min(grossIncome, 160_200) * 0.0765; // FICA
		case "Germany":
			return Math.min(grossIncome, 87_600) * 0.2; // approx employee share
		case "Netherlands":
			return Math.min(grossIncome, 66_000) * 0.2775;
		case "France":
			return grossIncome * (employmentType === "employed" ? 0.22 : 0.35);
		case "Israel":
			return Math.min(grossIncome, 110_000) * 0.12;
		case "South Africa":
			return Math.min(grossIncome, 15_000) * 0.01; // nominal UIF cap
		case "Australia":
			return grossIncome * 0.02; // Medicare levy
		case "Canada":
			return Math.min(grossIncome, 66_000) * 0.0595; // CPP
		case "Portugal":
			return (
				Math.min(grossIncome, 100_000) *
				(employmentType === "employed" ? 0.11 : 0.214)
			);
		case "Spain":
			return (
				Math.min(grossIncome, 54_000) *
				(employmentType === "employed" ? 0.064 : 0.306)
			);
		case "Sweden":
			return grossIncome * (employmentType === "employed" ? 0.07 : 0.2857);
		case "Switzerland":
			return Math.min(grossIncome, 88_200) * 0.053; // AHV employee share
		default:
			return 0;
	}
}

// Cyprus income tax bands (2026 reform — raised tax-free threshold to €22,000)
function calcCyprusIncomeTax(income: number): number {
	const bands = [
		{ upTo: 22_000, rate: 0 },
		{ upTo: 32_000, rate: 0.2 },
		{ upTo: 42_000, rate: 0.25 },
		{ upTo: 72_000, rate: 0.3 },
		{ upTo: Infinity, rate: 0.35 },
	];
	return applyBands(income, bands);
}

// Cyprus GeSY (healthcare)
function calcCyprusGesy(
	income: number,
	employmentType: EmploymentType,
): number {
	const rate = employmentType === "employed" ? 0.0265 : 0.04;
	return Math.min(income, 180_000) * rate;
}

// ── main calculation ─────────────────────────────────────────────────────────

interface CalcInput {
	country: CountryKey;
	employmentType: EmploymentType;
	grossIncome: number;
	salaryPct: number; // 0-100, only used for company-owner
	manualRate: number;
}

interface Comparison {
	source: TaxResult;
	cyprusStandard: TaxResult;
	cyprusNonDom: TaxResult;
}

function calculate(input: CalcInput): Comparison {
	const { country, employmentType, grossIncome, salaryPct, manualRate } = input;

	// ── Source country ──
	const srcIncomeTax = calcSourceIncomeTax(
		country,
		grossIncome,
		employmentType,
		manualRate,
	);
	const srcSocial = calcSourceSocial(country, grossIncome, employmentType);
	const srcTotalTax = srcIncomeTax + srcSocial;

	const source: TaxResult = {
		incomeTax: srcIncomeTax,
		socialHealth: srcSocial,
		dividendTax: 0,
		totalTax: srcTotalTax,
		effectiveRate: grossIncome > 0 ? srcTotalTax / grossIncome : 0,
	};

	// ── Cyprus Standard ──
	let cypStdIncomeTax: number;
	let cypStdSocial: number;
	let cypStdDividend: number;

	if (employmentType === "company-owner") {
		const salaryAmount = grossIncome * (salaryPct / 100);
		const dividendAmount = grossIncome * (1 - salaryPct / 100);
		const corporateTax = dividendAmount * 0.15; // 15% corporate tax on profit portion (2026)
		const netDividend = dividendAmount - corporateTax;

		cypStdIncomeTax = calcCyprusIncomeTax(salaryAmount);
		cypStdSocial = calcCyprusGesy(salaryAmount, "employed");
		// Standard: SDC 5% on dividends from 2026 profits, plus GeSY 2.65% (capped)
		cypStdDividend =
			netDividend * SDC_DIVIDEND_RATE +
			Math.min(netDividend, Math.max(GESY_INCOME_CAP - salaryAmount, 0)) *
				GESY_RATE +
			corporateTax;
	} else {
		cypStdIncomeTax = calcCyprusIncomeTax(grossIncome);
		cypStdSocial = calcCyprusGesy(grossIncome, employmentType);
		cypStdDividend = 0;
	}

	const cypStdTotal = cypStdIncomeTax + cypStdSocial + cypStdDividend;
	const cyprusStandard: TaxResult = {
		incomeTax: cypStdIncomeTax,
		socialHealth: cypStdSocial,
		dividendTax: cypStdDividend,
		totalTax: cypStdTotal,
		effectiveRate: grossIncome > 0 ? cypStdTotal / grossIncome : 0,
	};

	// ── Cyprus Non-Dom ──
	let cypNdIncomeTax: number;
	let cypNdSocial: number;
	let cypNdDividend: number;

	if (employmentType === "company-owner") {
		const salaryAmount = grossIncome * (salaryPct / 100);
		const dividendAmount = grossIncome * (1 - salaryPct / 100);
		const corporateTax = dividendAmount * 0.15;
		const netDividend = dividendAmount - corporateTax;

		cypNdIncomeTax = calcCyprusIncomeTax(salaryAmount);
		cypNdSocial = calcCyprusGesy(salaryAmount, "employed");
		// Non-dom: SDC exempt on dividends, only corporate tax
		cypNdDividend = corporateTax;
		// GeSY on dividends for non-dom (2.65% if employed structure, capped)
		const gesyOnDividend =
			Math.min(netDividend, Math.max(180_000 - salaryAmount, 0)) * 0.0265;
		cypNdDividend += gesyOnDividend;
	} else {
		cypNdIncomeTax = calcCyprusIncomeTax(grossIncome);
		cypNdSocial = calcCyprusGesy(grossIncome, employmentType);
		cypNdDividend = 0;
	}

	const cypNdTotal = cypNdIncomeTax + cypNdSocial + cypNdDividend;
	const cyprusNonDom: TaxResult = {
		incomeTax: cypNdIncomeTax,
		socialHealth: cypNdSocial,
		dividendTax: cypNdDividend,
		totalTax: cypNdTotal,
		effectiveRate: grossIncome > 0 ? cypNdTotal / grossIncome : 0,
	};

	return { source, cyprusStandard, cyprusNonDom };
}

// ── formatting ───────────────────────────────────────────────────────────────

function fmtEur(n: number): string {
	return "€" + Math.round(n).toLocaleString("en-IE");
}

function fmtPct(n: number): string {
	return (n * 100).toFixed(1) + "%";
}

// ── sub-components ───────────────────────────────────────────────────────────

function SliderRow({
	label,
	value,
	min,
	max,
	step,
	display,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	display: string;
	onChange: (v: number) => void;
}) {
	const id = useId();
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center justify-between gap-3">
				<label htmlFor={id} className="text-sm font-semibold text-ink">
					{label}
				</label>
				<span className="shrink-0 text-base font-bold text-ink">{display}</span>
			</div>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="h-6 w-full accent-primary"
			/>
			<div className="flex justify-between text-sm text-muted">
				<span>{min.toLocaleString("en-IE")}</span>
				<span>{max.toLocaleString("en-IE")}</span>
			</div>
		</div>
	);
}

function savingText(n: number): string {
	return `${n > 0 ? "+" : ""}${fmtEur(n)}`;
}

function ComparisonTable({
	grossIncome,
	result,
	showDividends,
	sourceLabel,
}: {
	grossIncome: number;
	result: Comparison;
	showDividends: boolean;
	sourceLabel: string;
}) {
	const savingStd = result.source.totalTax - result.cyprusStandard.totalTax;
	const savingNd = result.source.totalTax - result.cyprusNonDom.totalTax;

	const rows: string[][] = [
		[
			"Gross income",
			fmtEur(grossIncome),
			fmtEur(grossIncome),
			fmtEur(grossIncome),
		],
		[
			"Income tax",
			fmtEur(result.source.incomeTax),
			fmtEur(result.cyprusStandard.incomeTax),
			fmtEur(result.cyprusNonDom.incomeTax),
		],
		[
			"Social / health",
			fmtEur(result.source.socialHealth),
			fmtEur(result.cyprusStandard.socialHealth),
			fmtEur(result.cyprusNonDom.socialHealth),
		],
		...(showDividends
			? [
					[
						"Dividend / corp tax",
						fmtEur(result.source.dividendTax),
						fmtEur(result.cyprusStandard.dividendTax),
						fmtEur(result.cyprusNonDom.dividendTax),
					],
				]
			: []),
		[
			"Total tax",
			fmtEur(result.source.totalTax),
			fmtEur(result.cyprusStandard.totalTax),
			fmtEur(result.cyprusNonDom.totalTax),
		],
		[
			"Effective rate",
			fmtPct(result.source.effectiveRate),
			fmtPct(result.cyprusStandard.effectiveRate),
			fmtPct(result.cyprusNonDom.effectiveRate),
		],
	];

	return (
		<DataTable
			caption="Tax comparison"
			hideCaption
			columns={[
				{ header: "Item" },
				{ header: sourceLabel, align: "right" },
				{ header: "Cyprus Standard", align: "right" },
				{ header: "Cyprus Non-Dom", align: "right" },
			]}
			rows={rows}
			footer={[
				"Est. annual saving",
				"n/a",
				savingText(savingStd),
				savingText(savingNd),
			]}
		/>
	);
}

// ── main component ────────────────────────────────────────────────────────────

const COUNTRIES: CountryKey[] = [
	"UK",
	"USA",
	"Germany",
	"Netherlands",
	"France",
	"Israel",
	"South Africa",
	"Australia",
	"Canada",
	"Portugal",
	"Spain",
	"UAE",
	"Sweden",
	"Switzerland",
	"Other",
];

const COUNTRY_NOTES: Partial<Record<CountryKey, string>> = {
	USA: "US rates are approximate federal + average state blended. Actual state taxes vary significantly.",
	Australia:
		"AUD rates converted to EUR at approx. 0.60 exchange rate. Medicare levy included.",
	Portugal:
		"Standard progressive rates shown. Former NHR regime (flat 20%) closed to new applicants from Jan 2024.",
	UAE: "UAE has no personal income tax.",
};

export default function TaxSavingsCalculatorClient({
	embedded = false,
}: {
	embedded?: boolean;
} = {}) {
	const [country, setCountry] = useState<CountryKey>("UK");
	const [employmentType, setEmploymentType] =
		useState<EmploymentType>("employed");
	const [grossIncome, setGrossIncome] = useState(80_000);
	const [salaryPct, setSalaryPct] = useState(40);
	const [manualRate, setManualRate] = useState(30);

	const result = useMemo(
		() =>
			calculate({
				country,
				employmentType,
				grossIncome,
				salaryPct,
				manualRate,
			}),
		[country, employmentType, grossIncome, salaryPct, manualRate],
	);

	const showDividends = employmentType === "company-owner";
	const countryNote = COUNTRY_NOTES[country];

	const savingNd = result.source.totalTax - result.cyprusNonDom.totalTax;

	return (
		<div className="flex flex-col gap-6">
			<ToolPanel title="Your details">
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="tax-country"
						className="text-sm font-semibold text-ink"
					>
						Current country of residence
					</label>
					<select
						id="tax-country"
						value={country}
						onChange={(e) => setCountry(e.target.value as CountryKey)}
						className="min-h-11 w-full rounded-field border border-line bg-white px-3 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus"
					>
						{COUNTRIES.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
					{countryNote && <p className="text-sm text-muted">{countryNote}</p>}
				</div>

				{country === "Other" && (
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="tax-manual-rate"
							className="text-sm font-semibold text-ink"
						>
							Your effective income tax rate (%)
						</label>
						<div className="flex items-center gap-3">
							<input
								id="tax-manual-rate"
								type="number"
								min={0}
								max={70}
								step={0.5}
								value={manualRate}
								onChange={(e) => setManualRate(Number(e.target.value))}
								className="min-h-11 w-28 rounded-field border border-line bg-white px-3 text-base text-ink focus:outline-none focus:ring-2 focus:ring-focus"
							/>
							<span className="text-base text-muted">% effective rate</span>
						</div>
						<p className="text-sm text-muted">
							Social contributions not included for &quot;Other&quot;. Enter
							your combined effective rate if preferred.
						</p>
					</div>
				)}

				<ChipGroup
					label="Employment type"
					options={[
						{ value: "employed" as EmploymentType, label: "Employed" },
						{
							value: "self-employed" as EmploymentType,
							label: "Self-employed",
						},
						{
							value: "company-owner" as EmploymentType,
							label: "Company owner (dividends)",
						},
					]}
					value={employmentType}
					onChange={setEmploymentType}
				/>

				<SliderRow
					label="Annual gross income (EUR)"
					value={grossIncome}
					min={10_000}
					max={500_000}
					step={5_000}
					display={fmtEur(grossIncome)}
					onChange={setGrossIncome}
				/>

				{showDividends && (
					<div className="flex flex-col gap-1.5 rounded-card border border-line bg-sky p-4">
						<SliderRow
							label="Income split: salary vs dividends"
							value={salaryPct}
							min={0}
							max={100}
							step={5}
							display={`${salaryPct}% salary / ${100 - salaryPct}% dividends`}
							onChange={setSalaryPct}
						/>
						<div className="flex justify-between text-sm text-muted">
							<span>0% salary (all dividends)</span>
							<span>100% salary</span>
						</div>
						<p className="mt-1 text-sm text-muted">
							Cyprus corporate tax: 15% on profits (2026). Non-dom: no SDC (5%
							on dividends for domiciled residents).
						</p>
					</div>
				)}
			</ToolPanel>

			{savingNd > 0 ? (
				<StatCard
					highlight
					label={`Estimated annual tax saving with Cyprus Non-Dom vs ${country}`}
					value={fmtEur(savingNd)}
					hint={`At ${fmtEur(grossIncome)} gross income`}
				/>
			) : (
				<Callout tone="info">
					At this income level, Cyprus may not offer a lower tax burden than{" "}
					{country}. Try adjusting the income or employment type.
				</Callout>
			)}

			<section aria-labelledby="tax-comparison" className="space-y-3">
				<h2
					id="tax-comparison"
					className="text-2xl font-bold tracking-tight text-ink"
				>
					Tax comparison
				</h2>
				<ComparisonTable
					grossIncome={grossIncome}
					result={result}
					showDividends={showDividends}
					sourceLabel={country}
				/>
			</section>

			<Callout title="Why Cyprus?">
				<ul className="space-y-2 text-base leading-relaxed">
					<li>
						<span className="font-semibold">Non-Dom regime:</span> Exempt from
						Special Defence Contribution (SDC): 5% on dividends from 2026
						profits and 17% on interest, for 17 years after obtaining non-dom
						status.
					</li>
					<li>
						<span className="font-semibold">15% corporate tax:</span> A
						competitive rate within the EU. Companies pay 15% on net profits
						(raised from 12.5% in 2026).
					</li>
					<li>
						<span className="font-semibold">No inheritance tax:</span> Cyprus
						abolished inheritance tax in 2000.
					</li>
					<li>
						<span className="font-semibold">No capital gains tax</span> on
						disposal of securities (shares, bonds, etc.). CGT applies only to
						immovable property in Cyprus.
					</li>
					<li>
						<span className="font-semibold">Income tax relief:</span> New
						residents with foreign-source employment income may qualify for a
						50% income tax exemption on earnings above €100,000 (five-year new
						resident relief).
					</li>
				</ul>
			</Callout>

			<Callout tone="legal" title="Simplified illustration">
				This tool uses approximate effective tax rates for illustration
				purposes. Actual tax liability depends on your personal circumstances,
				deductions, tax treaties, residency status, and applicable law. Always
				consult a Cyprus-qualified accountant and legal adviser before making
				relocation decisions.
			</Callout>
		</div>
	);
}
