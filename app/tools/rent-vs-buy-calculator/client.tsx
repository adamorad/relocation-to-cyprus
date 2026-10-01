"use client";

import { useId, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { DataTable, StatCard } from "@/components/ui/DataTable";

interface Inputs {
	monthlyRent: number;
	purchasePrice: number;
	downPaymentPct: number;
	mortgageRate: number;
	investmentReturn: number;
	horizon: number;
	rentIncrease: number;
	appreciation: number;
}

interface YearRow {
	year: number;
	rentTotal: number;
	buyTotal: number;
	rentCumulative: number;
	buyCumulative: number;
	homeEquity: number;
	netBuyCost: number;
}

function calcMortgagePayment(
	principal: number,
	annualRate: number,
	years: number,
): number {
	const r = annualRate / 100 / 12;
	const n = years * 12;
	if (r === 0) return principal / n;
	return (principal * (r * (1 + r) ** n)) / ((1 + r) ** n - 1);
}

function runModel(inputs: Inputs): YearRow[] {
	const {
		monthlyRent,
		purchasePrice,
		downPaymentPct,
		mortgageRate,
		investmentReturn,
		horizon,
		rentIncrease,
		appreciation,
	} = inputs;

	const downPayment = purchasePrice * (downPaymentPct / 100);
	const loanAmount = purchasePrice - downPayment;
	const mortgageTerm = 25;
	const monthlyMortgage = calcMortgagePayment(
		loanAmount,
		mortgageRate,
		mortgageTerm,
	);

	// Buying upfront costs: assume 5% (transfer fees + legal)
	const upfrontCosts = purchasePrice * 0.05;

	const rows: YearRow[] = [];

	let rentCumulative = 0;
	let buyCumulative = upfrontCosts + downPayment;
	// Opportunity cost: the down payment + upfront costs could have been invested
	let missedInvestment = downPayment + upfrontCosts;

	let currentRent = monthlyRent;

	for (let y = 1; y <= horizon; y++) {
		// Rent side: this year's rent payments
		const rentThisYear = currentRent * 12;
		rentCumulative += rentThisYear;
		currentRent *= 1 + rentIncrease / 100;

		// Buy side: mortgage payments this year
		const mortgageThisYear = monthlyMortgage * 12;
		buyCumulative += mortgageThisYear;

		// Property value at end of year
		const homeValue = purchasePrice * (1 + appreciation / 100) ** y;

		// Remaining loan balance
		const r = mortgageRate / 100 / 12;
		const n = mortgageTerm * 12;
		const paymentsMade = Math.min(y * 12, n);
		let loanBalance = 0;
		if (paymentsMade < n && r > 0) {
			loanBalance =
				loanAmount *
				(((1 + r) ** n - (1 + r) ** paymentsMade) / ((1 + r) ** n - 1));
		}

		const homeEquity = homeValue - loanBalance;

		// Opportunity cost of invested down payment
		missedInvestment *= 1 + investmentReturn / 100;

		// Net buy cost = cumulative payments + opportunity cost of down payment - equity gained
		const netBuyCost =
			buyCumulative +
			(missedInvestment - (downPayment + upfrontCosts)) -
			homeEquity;

		rows.push({
			year: y,
			rentTotal: rentThisYear,
			buyTotal: mortgageThisYear,
			rentCumulative,
			buyCumulative: netBuyCost,
			homeEquity,
			netBuyCost,
		});
	}

	return rows;
}

function fmt(n: number): string {
	return "€" + Math.round(n).toLocaleString("en-IE");
}

function NumInput({
	label,
	value,
	onChange,
	suffix,
	min,
	max,
	step,
}: {
	label: string;
	value: number;
	onChange: (v: number) => void;
	suffix?: string;
	min?: number;
	max?: number;
	step?: number;
}) {
	const id = useId();
	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className="text-sm font-semibold text-ink">
				{label}
			</label>
			<div className="flex min-h-11 items-center gap-2 rounded-field border border-line bg-white px-3 focus-within:border-focus focus-within:ring-2 focus-within:ring-focus">
				<input
					id={id}
					type="number"
					value={value}
					min={min}
					max={max}
					step={step ?? 1}
					onChange={(e) => onChange(Number(e.target.value))}
					className="w-full bg-transparent text-base text-ink outline-none"
				/>
				{suffix && (
					<span className="shrink-0 text-sm text-muted">{suffix}</span>
				)}
			</div>
		</div>
	);
}

const NEXT_STEPS = [
	{ href: "/", label: "Browse the property map" },
	{ href: "/sections/property-lawyers/", label: "Find a property lawyer" },
	{ href: "/guides/buying-process/", label: "Read: Buying Process Guide" },
	{
		href: "/guides/rental-transition-guide/",
		label: "Read: Short-Term to Long-Term Rental",
	},
];

export default function RentVsBuyPage({
	embedded = false,
}: {
	embedded?: boolean;
} = {}) {
	const [inputs, setInputs] = useState<Inputs>({
		monthlyRent: 1400,
		purchasePrice: 300000,
		downPaymentPct: 30,
		mortgageRate: 4.5,
		investmentReturn: 6,
		horizon: 10,
		rentIncrease: 3,
		appreciation: 4,
	});

	const set = (key: keyof Inputs) => (v: number) =>
		setInputs((prev) => ({ ...prev, [key]: v }));

	const rows = useMemo(() => runModel(inputs), [inputs]);

	const breakEvenYear =
		rows.find((r) => r.buyCumulative < r.rentCumulative)?.year ?? null;

	const lastRow = rows[rows.length - 1];

	return (
		<div className="flex flex-col gap-6">
			<ToolPanel title="Your inputs">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<NumInput
						label="Monthly rent"
						value={inputs.monthlyRent}
						onChange={set("monthlyRent")}
						suffix="€"
						min={0}
						step={50}
					/>
					<NumInput
						label="Purchase price"
						value={inputs.purchasePrice}
						onChange={set("purchasePrice")}
						suffix="€"
						min={0}
						step={5000}
					/>
					<NumInput
						label="Down payment"
						value={inputs.downPaymentPct}
						onChange={set("downPaymentPct")}
						suffix="%"
						min={5}
						max={100}
						step={1}
					/>
					<NumInput
						label="Mortgage rate"
						value={inputs.mortgageRate}
						onChange={set("mortgageRate")}
						suffix="%"
						min={0}
						max={20}
						step={0.1}
					/>
					<NumInput
						label="Investment return on saved capital"
						value={inputs.investmentReturn}
						onChange={set("investmentReturn")}
						suffix="%"
						min={0}
						max={30}
						step={0.5}
					/>
					<NumInput
						label="Time horizon"
						value={inputs.horizon}
						onChange={set("horizon")}
						suffix="years"
						min={1}
						max={30}
						step={1}
					/>
					<NumInput
						label="Annual rent increase"
						value={inputs.rentIncrease}
						onChange={set("rentIncrease")}
						suffix="%"
						min={0}
						max={20}
						step={0.5}
					/>
					<NumInput
						label="Annual property appreciation"
						value={inputs.appreciation}
						onChange={set("appreciation")}
						suffix="%"
						min={-5}
						max={20}
						step={0.5}
					/>
				</div>
			</ToolPanel>

			<section
				aria-label="Results"
				className="grid grid-cols-1 gap-4 sm:grid-cols-3"
			>
				<StatCard
					highlight
					label="Break-even year"
					value={breakEvenYear ? `Year ${breakEvenYear}` : "Not within horizon"}
					hint="when buying becomes cheaper"
				/>
				<StatCard
					label={`Rent total (${inputs.horizon} yr)`}
					value={fmt(lastRow.rentCumulative)}
					hint="cumulative rent paid"
				/>
				<StatCard
					label={`Buy net cost (${inputs.horizon} yr)`}
					value={fmt(lastRow.buyCumulative)}
					hint="after equity and opportunity cost"
				/>
			</section>

			<DataTable
				caption="Year-by-year comparison of renting and buying"
				columns={[
					{ header: "Year" },
					{ header: "Cumulative rent", align: "right" },
					{ header: "Buy net cost", align: "right" },
					{ header: "Home equity", align: "right" },
					{ header: "Cheaper option", align: "right" },
				]}
				rows={rows.map((row) => [
					`Year ${row.year}`,
					fmt(row.rentCumulative),
					fmt(row.buyCumulative),
					fmt(row.homeEquity),
					<Badge key="b">
						{row.rentCumulative > row.buyCumulative
							? "Buy ahead"
							: "Rent ahead"}
					</Badge>,
				])}
				zebra
			/>

			<Callout tone="legal" title="Cyprus market assumptions">
				Based on Cyprus market assumptions. Does not include transfer fees
				(typically 3–8%), legal costs (~€2,000–4,000), or renovation. The model
				assumes a 25-year mortgage term, 5% upfront costs, and that the
				alternative to the down payment is invested at your stated return.
				Verify current mortgage rates with your bank. This calculator is for
				illustrative purposes only and does not constitute financial advice.
			</Callout>

			{embedded ? (
				<div className="flex flex-wrap gap-3">
					{NEXT_STEPS.map((s) => (
						<ButtonLink key={s.href} href={s.href} variant="secondary">
							{s.label}
						</ButtonLink>
					))}
				</div>
			) : null}
		</div>
	);
}
