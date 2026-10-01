"use client";

import { type ReactNode, useId, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";

// ── types ────────────────────────────────────────────────────────────────────

interface AmortRow {
	year: number;
	openingBalance: number;
	annualInterest: number;
	annualPrincipal: number;
	closingBalance: number;
}

// ── maths ────────────────────────────────────────────────────────────────────

function calcMonthlyPayment(
	principal: number,
	annualRate: number,
	years: number,
): number {
	const r = annualRate / 100 / 12;
	const n = years * 12;
	if (r === 0) return principal / n;
	return (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
}

function buildAmortization(
	principal: number,
	annualRate: number,
	years: number,
): AmortRow[] {
	const r = annualRate / 100 / 12;
	const monthlyPayment = calcMonthlyPayment(principal, annualRate, years);
	const rows: AmortRow[] = [];
	let balance = principal;

	for (let y = 1; y <= years; y++) {
		const openingBalance = balance;
		let annualInterest = 0;
		let annualPrincipal = 0;

		for (let m = 0; m < 12; m++) {
			const interestCharge = balance * r;
			const principalCharge = Math.min(
				monthlyPayment - interestCharge,
				balance,
			);
			annualInterest += interestCharge;
			annualPrincipal += principalCharge;
			balance = Math.max(balance - principalCharge, 0);
		}

		rows.push({
			year: y,
			openingBalance,
			annualInterest,
			annualPrincipal,
			closingBalance: balance,
		});
	}

	return rows;
}

// ── formatting ───────────────────────────────────────────────────────────────

function fmt(n: number): string {
	return "€" + Math.round(n).toLocaleString("en-IE");
}

// ── sub-components ────────────────────────────────────────────────────────────

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
				<span className="text-sm font-bold text-ink">{display}</span>
			</div>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-full accent-primary"
			/>
			<div className="flex justify-between text-sm text-muted">
				<span>
					{step < 1 ? min.toFixed(1) : min.toLocaleString("en-IE")}
					{label.toLowerCase().includes("rate") ||
					label.toLowerCase().includes("%")
						? "%"
						: ""}
				</span>
				<span>
					{step < 1 ? max.toFixed(1) : max.toLocaleString("en-IE")}
					{label.toLowerCase().includes("rate") ||
					label.toLowerCase().includes("%")
						? "%"
						: ""}
				</span>
			</div>
		</div>
	);
}

// ── main component ────────────────────────────────────────────────────────────

const TERM_OPTIONS = [10, 15, 20, 25] as const;
type Term = (typeof TERM_OPTIONS)[number];

export default function MortgageCalculatorClient({
	embedded = false,
}: {
	embedded?: boolean;
} = {}) {
	const [price, setPrice] = useState(400_000);
	const [downPct, setDownPct] = useState(30);
	const [rate, setRate] = useState(4.5);
	const [term, setTerm] = useState<Term>(20);

	const loanAmount = useMemo(
		() => price * (1 - downPct / 100),
		[price, downPct],
	);

	const monthlyPayment = useMemo(
		() => calcMonthlyPayment(loanAmount, rate, term),
		[loanAmount, rate, term],
	);

	const totalRepaid = useMemo(
		() => monthlyPayment * term * 12,
		[monthlyPayment, term],
	);
	const totalInterest = useMemo(
		() => totalRepaid - loanAmount,
		[totalRepaid, loanAmount],
	);

	const amortization = useMemo(
		() => buildAmortization(loanAmount, rate, term),
		[loanAmount, rate, term],
	);

	// Build display rows: first 5, ellipsis row, last year
	const tableRows = useMemo(() => {
		if (term <= 6) return amortization;
		const first5 = amortization.slice(0, 5);
		const last = amortization[amortization.length - 1];
		return { first5, last, middle: term - 6 };
	}, [amortization, term]);

	const isShort = Array.isArray(tableRows);

	const H = embedded ? "h3" : "h2";

	const inputs = (
		<>
			<SliderRow
				label="Property price"
				value={price}
				min={50_000}
				max={2_000_000}
				step={10_000}
				display={fmt(price)}
				onChange={setPrice}
			/>

			<SliderRow
				label="Down payment %"
				value={downPct}
				min={20}
				max={70}
				step={1}
				display={`${downPct}% (${fmt(price * (downPct / 100))})`}
				onChange={setDownPct}
			/>

			<SliderRow
				label="Annual interest rate"
				value={rate}
				min={2.0}
				max={9.0}
				step={0.1}
				display={`${rate.toFixed(1)}%`}
				onChange={setRate}
			/>

			<ChipGroup
				label="Loan term"
				options={TERM_OPTIONS.map((t) => ({
					value: String(t),
					label: `${t} yr`,
				}))}
				value={String(term)}
				onChange={(v) => setTerm(Number(v) as Term)}
			/>
		</>
	);

	const amortRows: AmortRow[] = isShort ? tableRows : tableRows.first5;
	const amortCells = amortRows.map((row) => amortCellsFor(row));
	const rows: ReactNode[][] = [...amortCells];
	if (!isShort) {
		const { last, middle } = tableRows;
		rows.push([`... ${middle} years remaining`, "", "", ""]);
		rows.push(amortCellsFor(last));
	}

	const body = (
		<>
			<Callout tone="info" title="Cyprus mortgage context">
				Non-residents: max 70% LTV. Residents: up to 80%. Current market rates:
				3.5 to 5.5% for a standard mortgage. Rates vary by bank, currency (EUR),
				and applicant profile.
			</Callout>

			{embedded ? (
				<div className="space-y-5">
					<p className="text-sm font-bold text-ink">Your inputs</p>
					{inputs}
				</div>
			) : (
				<ToolPanel title="Your inputs">{inputs}</ToolPanel>
			)}

			<section
				aria-label="Summary"
				className="grid grid-cols-2 gap-3 sm:grid-cols-4"
			>
				<StatCard
					label="Loan amount"
					value={fmt(loanAmount)}
					hint="price minus down payment"
				/>
				<StatCard
					highlight
					label="Monthly payment"
					value={fmt(monthlyPayment)}
					hint={`${term} yr term`}
				/>
				<StatCard
					label="Total repaid"
					value={fmt(totalRepaid)}
					hint="principal + interest"
				/>
				<StatCard
					label="Total interest"
					value={fmt(totalInterest)}
					hint="cost of borrowing"
				/>
			</section>

			<section aria-labelledby="amort-heading" className="space-y-3">
				<H
					id="amort-heading"
					className={
						embedded
							? "text-base font-bold text-ink"
							: "text-2xl font-bold tracking-tight text-ink"
					}
				>
					Amortization summary
				</H>
				<DataTable
					caption="Amortization summary by year"
					hideCaption
					columns={[
						{ header: "Year" },
						{ header: "Balance (open)", align: "right" },
						{ header: "Annual interest", align: "right" },
						{ header: "Annual principal", align: "right" },
					]}
					rows={rows}
				/>
			</section>

			{embedded ? (
				<>
					<div>
						<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
							Next steps
						</p>
						<div className="flex flex-wrap gap-3">
							<ButtonLink
								href="/tools/rent-vs-buy-calculator/"
								variant="secondary"
							>
								Rent vs Buy Calculator
							</ButtonLink>
							<ButtonLink href="/" variant="secondary">
								Browse the property map
							</ButtonLink>
							<ButtonLink
								href="/tools/tax-residency-tracker/"
								variant="secondary"
							>
								Tax Residency Planner
							</ButtonLink>
						</div>
					</div>
					<Callout tone="legal" title="Disclaimer">
						{DISCLAIMER}
					</Callout>
				</>
			) : null}
		</>
	);

	return embedded ? <div className="space-y-6">{body}</div> : body;
}

const DISCLAIMER =
	"This calculator is for illustrative purposes only and does not constitute financial advice. Actual mortgage rates, LTV limits, fees, and eligibility criteria vary by bank and applicant profile. Always consult a licensed mortgage adviser and your chosen bank before making financial decisions.";

// ── helper table row ──────────────────────────────────────────────────────────

function amortCellsFor(row: AmortRow): string[] {
	return [
		`Year ${row.year}`,
		fmt(row.openingBalance),
		fmt(row.annualInterest),
		fmt(row.annualPrincipal),
	];
}
