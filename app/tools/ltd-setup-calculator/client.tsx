"use client";

import { type ReactNode, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";

// ── types ────────────────────────────────────────────────────────────────────

type Directors = "1" | "2" | "3+";
type ResidentDirector = "yes" | "no";
type RegisteredAddress = "yes" | "no";
type Turnover = "under50k" | "50k-200k" | "200k-500k" | "500k+";
type VatNeed = "yes" | "no" | "notsure";
type BusinessType = "tech" | "consulting" | "trading" | "holding";

interface CostRange {
	low: number;
	high: number;
}

// ── cost data ─────────────────────────────────────────────────────────────────

const SETUP_COSTS: CostRange = { low: 1500, high: 2400 };

const REGISTERED_ADDRESS_ANNUAL: CostRange = { low: 600, high: 1200 };

const BOOKKEEPING_MONTHLY: Record<Turnover, CostRange> = {
	under50k: { low: 100, high: 200 },
	"50k-200k": { low: 200, high: 400 },
	"200k-500k": { low: 400, high: 800 },
	"500k+": { low: 400, high: 800 },
};

const AUDIT_ANNUAL: Record<Turnover, CostRange> = {
	under50k: { low: 1200, high: 2000 },
	"50k-200k": { low: 1800, high: 3000 },
	"200k-500k": { low: 3000, high: 5000 },
	"500k+": { low: 3000, high: 5000 },
};

const ANNUAL_RETURN: CostRange = { low: 350, high: 350 };
const CIPA_LEVY: CostRange = { low: 350, high: 350 };
const NOMINEE_DIRECTOR: CostRange = { low: 800, high: 1500 };
const COMPANY_SEAL: CostRange = { low: 30, high: 50 };

// ── formatting ────────────────────────────────────────────────────────────────

function fmtRange(low: number, high: number): string {
	if (low === high) return "€" + Math.round(low).toLocaleString("en-IE");
	return (
		"€" +
		Math.round(low).toLocaleString("en-IE") +
		" to €" +
		Math.round(high).toLocaleString("en-IE")
	);
}

// ── sub-components ────────────────────────────────────────────────────────────

function eur(n: number): string {
	return `€${Math.round(n).toLocaleString("en-IE")}`;
}

function costCells(
	label: string,
	low: number,
	high: number,
	note?: string,
): ReactNode[] {
	return [
		<>
			{label}
			{note && (
				<span className="ml-1 text-sm font-normal italic text-muted">
					{note}
				</span>
			)}
		</>,
		eur(low),
		eur(high),
	];
}

// ── main component ────────────────────────────────────────────────────────────

/**
 * Embedded body for /tools/sole-trader-vs-ltd/ (the standalone route is a
 * redirect stub). No header, width wrapper, disclaimer or related links here:
 * the host page renders those once.
 */
export default function LtdSetupCalculatorClient() {
	const [directors, setDirectors] = useState<Directors>("1");
	const [residentDirector, setResidentDirector] =
		useState<ResidentDirector>("yes");
	const [registeredAddress, setRegisteredAddress] =
		useState<RegisteredAddress>("yes");
	const [turnover, setTurnover] = useState<Turnover>("under50k");
	const [vatNeed, setVatNeed] = useState<VatNeed>("notsure");
	const [businessType, setBusinessType] = useState<BusinessType>("tech");
	const [includePayroll, setIncludePayroll] = useState(false);
	const [includeSeal, setIncludeSeal] = useState(false);

	const costs = useMemo(() => {
		// One-time setup
		const setupLow = SETUP_COSTS.low;
		const setupHigh = SETUP_COSTS.high;

		// Annual costs
		const bookkeepingMonthly = BOOKKEEPING_MONTHLY[turnover];
		const bookkeepingAnnualLow = bookkeepingMonthly.low * 12;
		const bookkeepingAnnualHigh = bookkeepingMonthly.high * 12;

		const audit = AUDIT_ANNUAL[turnover];
		const annualReturnLow = ANNUAL_RETURN.low;
		const annualReturnHigh = ANNUAL_RETURN.high;
		const cipaLow = CIPA_LEVY.low;
		const cipaHigh = CIPA_LEVY.high;

		const addressLow =
			registeredAddress === "yes" ? REGISTERED_ADDRESS_ANNUAL.low : 0;
		const addressHigh =
			registeredAddress === "yes" ? REGISTERED_ADDRESS_ANNUAL.high : 0;

		const nomineeLow = residentDirector === "no" ? NOMINEE_DIRECTOR.low : 0;
		const nomineeHigh = residentDirector === "no" ? NOMINEE_DIRECTOR.high : 0;

		const payrollMonthlyLow = includePayroll ? 50 : 0;
		const payrollMonthlyHigh = includePayroll ? 100 : 0;
		const payrollAnnualLow = payrollMonthlyLow * 12;
		const payrollAnnualHigh = payrollMonthlyHigh * 12;

		// One-time extras
		const sealLow = includeSeal ? COMPANY_SEAL.low : 0;
		const sealHigh = includeSeal ? COMPANY_SEAL.high : 0;

		const annualLow =
			bookkeepingAnnualLow +
			audit.low +
			annualReturnLow +
			cipaLow +
			addressLow +
			nomineeLow +
			payrollAnnualLow;

		const annualHigh =
			bookkeepingAnnualHigh +
			audit.high +
			annualReturnHigh +
			cipaHigh +
			addressHigh +
			nomineeHigh +
			payrollAnnualHigh;

		const year1Low = setupLow + sealLow + annualLow;
		const year1High = setupHigh + sealHigh + annualHigh;

		return {
			setup: { low: setupLow + sealLow, high: setupHigh + sealHigh },
			bookkeepingAnnual: {
				low: bookkeepingAnnualLow,
				high: bookkeepingAnnualHigh,
			},
			bookkeepingMonthly,
			audit,
			annualReturn: ANNUAL_RETURN,
			cipa: CIPA_LEVY,
			address: { low: addressLow, high: addressHigh },
			nominee: { low: nomineeLow, high: nomineeHigh },
			payrollAnnual: { low: payrollAnnualLow, high: payrollAnnualHigh },
			seal: { low: sealLow, high: sealHigh },
			annualTotal: { low: annualLow, high: annualHigh },
			year1Total: { low: year1Low, high: year1High },
			monthlyEquivalent: {
				low: annualLow / 12,
				high: annualHigh / 12,
			},
		};
	}, [
		turnover,
		registeredAddress,
		residentDirector,
		includePayroll,
		includeSeal,
	]);

	// Derive VAT note
	const vatNote = useMemo(() => {
		if (vatNeed === "yes")
			return "VAT registration required (mandatory above €15,600/yr turnover). Typically no extra cost if your accountant handles it.";
		if (turnover !== "under50k" && vatNeed !== "no")
			return "VAT registration is likely required at your expected turnover level (threshold: €15,600/yr).";
		return null;
	}, [vatNeed, turnover]);

	const setupRows: ReactNode[][] = [
		costCells("CIPA registration + stamp duty", 700, 900, "one-time"),
		costCells(
			"Legal / corporate lawyer",
			800,
			1500,
			"M&A drafting, registration",
		),
		...(includeSeal
			? [
					costCells(
						"Company seal",
						COMPANY_SEAL.low,
						COMPANY_SEAL.high,
						"one-time",
					),
				]
			: []),
	];

	const annualRows: ReactNode[][] = [
		...(registeredAddress === "yes"
			? [
					costCells(
						"Registered address service",
						REGISTERED_ADDRESS_ANNUAL.low,
						REGISTERED_ADDRESS_ANNUAL.high,
						"per year",
					),
				]
			: []),
		costCells(
			"Bookkeeping / accounting",
			costs.bookkeepingAnnual.low,
			costs.bookkeepingAnnual.high,
			`€${costs.bookkeepingMonthly.low} to €${costs.bookkeepingMonthly.high}/mo x 12`,
		),
		costCells(
			"Statutory audit (mandatory)",
			costs.audit.low,
			costs.audit.high,
			"required for all CY companies",
		),
		costCells(
			"Annual return to Registrar",
			ANNUAL_RETURN.low,
			ANNUAL_RETURN.high,
			"per year",
		),
		costCells("CIPA annual levy", CIPA_LEVY.low, CIPA_LEVY.high, "per year"),
		...(residentDirector === "no"
			? [
					costCells(
						"Nominee director service",
						NOMINEE_DIRECTOR.low,
						NOMINEE_DIRECTOR.high,
						"non-resident only",
					),
				]
			: []),
		...(includePayroll
			? [
					costCells(
						"Payroll service",
						costs.payrollAnnual.low,
						costs.payrollAnnual.high,
						"€50 to €100/mo x 12",
					),
				]
			: []),
	];

	const costColumns = [
		{ header: "Cost item" },
		{ header: "Low (€)", align: "right" as const },
		{ header: "High (€)", align: "right" as const },
	];

	return (
		<div className="space-y-6">
			<p className="text-lg leading-relaxed text-muted">
				Estimate the one-time registration costs and annual running costs of a
				Cyprus limited company based on your specific situation.
			</p>

			<ToolPanel title="Your company profile">
				<ChipGroup<Directors>
					label="Number of directors"
					options={[
						{ value: "1", label: "1 director" },
						{ value: "2", label: "2 directors" },
						{ value: "3+", label: "3+ directors" },
					]}
					value={directors}
					onChange={setDirectors}
				/>

				<ChipGroup<ResidentDirector>
					label="Will you be a resident director in Cyprus?"
					options={[
						{ value: "yes", label: "Yes: I live / will live in Cyprus" },
						{ value: "no", label: "No: need a nominee director" },
					]}
					value={residentDirector}
					onChange={setResidentDirector}
				/>

				<ChipGroup<RegisteredAddress>
					label="Need a registered address service?"
					options={[
						{ value: "yes", label: "Yes" },
						{ value: "no", label: "No (I have a Cyprus address)" },
					]}
					value={registeredAddress}
					onChange={setRegisteredAddress}
				/>

				<ChipGroup<Turnover>
					label="Expected annual company turnover"
					options={[
						{ value: "under50k", label: "Under €50k" },
						{ value: "50k-200k", label: "€50k to €200k" },
						{ value: "200k-500k", label: "€200k to €500k" },
						{ value: "500k+", label: "€500k+" },
					]}
					value={turnover}
					onChange={setTurnover}
				/>

				<ChipGroup<VatNeed>
					label="Need VAT registration?"
					options={[
						{ value: "yes", label: "Yes" },
						{ value: "no", label: "No" },
						{ value: "notsure", label: "Not sure" },
					]}
					value={vatNeed}
					onChange={setVatNeed}
				/>

				<ChipGroup<BusinessType>
					label="Business type (affects accounting complexity)"
					options={[
						{ value: "tech", label: "Tech / IT / Software" },
						{ value: "consulting", label: "Consulting / Professional" },
						{ value: "trading", label: "Trading / E-commerce" },
						{ value: "holding", label: "Holding / Investment" },
					]}
					value={businessType}
					onChange={setBusinessType}
				/>

				<fieldset className="min-w-0">
					<legend className="mb-2 text-sm font-semibold text-ink">
						Optional extras
					</legend>
					<div className="flex flex-col">
						<label className="flex min-h-11 cursor-pointer select-none items-center gap-3">
							<input
								type="checkbox"
								checked={includePayroll}
								onChange={(e) => setIncludePayroll(e.target.checked)}
								className="h-4 w-4 accent-primary"
							/>
							<span className="text-sm text-ink">
								Include payroll service (€50 to €100/mo extra), if paying
								yourself a salary
							</span>
						</label>
						<label className="flex min-h-11 cursor-pointer select-none items-center gap-3">
							<input
								type="checkbox"
								checked={includeSeal}
								onChange={(e) => setIncludeSeal(e.target.checked)}
								className="h-4 w-4 accent-primary"
							/>
							<span className="text-sm text-ink">
								Include company seal (€30 to €50 one-time)
							</span>
						</label>
					</div>
				</fieldset>
			</ToolPanel>

			{vatNote && (
				<Callout tone="info" title="VAT note">
					{vatNote}
				</Callout>
			)}

			<section
				aria-label="Summary"
				className="grid grid-cols-1 gap-3 sm:grid-cols-3"
			>
				<StatCard
					highlight
					label="Year 1 total"
					value={fmtRange(costs.year1Total.low, costs.year1Total.high)}
					hint="setup + first year running costs"
				/>
				<StatCard
					label="Year 2+ annual"
					value={fmtRange(costs.annualTotal.low, costs.annualTotal.high)}
					hint="ongoing running costs per year"
				/>
				<StatCard
					label="Monthly equivalent"
					value={fmtRange(
						costs.monthlyEquivalent.low,
						costs.monthlyEquivalent.high,
					)}
					hint="year 2+ annual / 12"
				/>
			</section>

			<section aria-labelledby="ltd-breakdown" className="space-y-4">
				<h3 id="ltd-breakdown" className="text-xl font-bold text-ink">
					Detailed cost breakdown
				</h3>
				<DataTable
					caption="One-time setup costs"
					columns={costColumns}
					rows={setupRows}
					footer={["Total setup", eur(costs.setup.low), eur(costs.setup.high)]}
				/>
				<DataTable
					caption="Annual ongoing costs"
					columns={costColumns}
					rows={annualRows}
					footer={[
						"Annual total (year 2+)",
						eur(costs.annualTotal.low),
						eur(costs.annualTotal.high),
					]}
				/>
				<DataTable
					caption="Year 1 grand total"
					hideCaption
					columns={costColumns}
					rows={[]}
					footer={[
						"Year 1 Grand Total",
						eur(costs.year1Total.low),
						eur(costs.year1Total.high),
					]}
				/>
			</section>

			<section
				aria-labelledby="ltd-why"
				className="rounded-card border border-line bg-sky p-5"
			>
				<h3 id="ltd-why" className="mb-3 text-base font-bold text-ink">
					Why Cyprus? Key tax advantages
				</h3>
				<ul className="list-disc space-y-2 pl-5 text-sm text-ink">
					<li>15% corporate tax: competitive within the EU</li>
					<li>0% dividend tax for non-dom shareholders (17% SDC exemption)</li>
					<li>IP Box: 2.5% effective rate on qualifying IP income</li>
					<li>0% capital gains tax (except Cyprus immovable property)</li>
					<li>EU-compliant with a full double-tax treaty network</li>
				</ul>
			</section>

			<Callout tone="info" title="Breakeven note">
				A Cyprus Ltd typically becomes cost-efficient for annual profits above
				approximately <strong>€35,000 to €50,000</strong> after all fees. Below
				this threshold, the compliance overhead may outweigh the tax savings.
			</Callout>

			<Callout tone="info" title="Optional: Corporate Banking">
				Not included above. Typical options: Bank of Cyprus / Hellenic Bank (€0
				to €100/mo account fees) or Revolut Business (from €0/mo). Opening a
				traditional bank account can take 2 to 6 months for new companies.
			</Callout>
		</div>
	);
}
