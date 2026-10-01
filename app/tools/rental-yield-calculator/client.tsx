"use client";

import { useId, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";

interface Inputs {
	purchasePrice: number;
	monthlyRent: number;
	managementFeePct: number;
	annualMaintenance: number;
	vacancyRatePct: number;
	appreciationPct: number;
	horizon: 5 | 10 | 15;
}

interface YearRow {
	year: number;
	cumRentIncome: number;
	propertyValue: number;
	cumTotalGain: number;
}

interface Results {
	grossYieldPct: number;
	annualExpenses: number;
	netYieldPct: number;
	annualCashFlow: number;
	breakEvenYears: number | null;
	totalReturnAtHorizon: number;
	annualisedReturnPct: number;
	rows: YearRow[];
	propertyTax: number;
}

function runModel(inputs: Inputs): Results {
	const {
		purchasePrice,
		monthlyRent,
		managementFeePct,
		annualMaintenance,
		vacancyRatePct,
		appreciationPct,
		horizon,
	} = inputs;

	const annualRent = monthlyRent * 12;
	const propertyTax = purchasePrice * 0.001; // 0.1% of purchase price
	const managementFee = annualRent * (managementFeePct / 100);
	const vacancyLoss = annualRent * (vacancyRatePct / 100);
	const annualExpenses =
		managementFee + annualMaintenance + propertyTax + vacancyLoss;

	const grossYieldPct = (annualRent / purchasePrice) * 100;
	const netYieldPct = ((annualRent - annualExpenses) / purchasePrice) * 100;
	const annualCashFlow = annualRent - annualExpenses;

	const breakEvenYears =
		annualCashFlow > 0 ? purchasePrice / annualCashFlow : null;

	const appreciationGain =
		purchasePrice * (1 + appreciationPct / 100) ** horizon - purchasePrice;
	const cumulativeCashFlow = annualCashFlow * horizon;
	const totalReturnAtHorizon = cumulativeCashFlow + appreciationGain;
	const totalGainRatio = totalReturnAtHorizon / purchasePrice;
	const annualisedReturnPct =
		totalGainRatio > -1
			? ((1 + totalGainRatio) ** (1 / horizon) - 1) * 100
			: -100;

	const rows: YearRow[] = [];
	for (let y = 1; y <= horizon; y++) {
		const cumRentIncome = annualCashFlow * y;
		const propertyValue = purchasePrice * (1 + appreciationPct / 100) ** y;
		const appreciationGainY = propertyValue - purchasePrice;
		const cumTotalGain = cumRentIncome + appreciationGainY;
		rows.push({ year: y, cumRentIncome, propertyValue, cumTotalGain });
	}

	return {
		grossYieldPct,
		annualExpenses,
		netYieldPct,
		annualCashFlow,
		breakEvenYears,
		totalReturnAtHorizon,
		annualisedReturnPct,
		rows,
		propertyTax,
	};
}

function fmt(n: number): string {
	return "€" + Math.round(n).toLocaleString("en-IE");
}

function fmtPct(n: number, dp = 1): string {
	return n.toFixed(dp) + "%";
}

function SliderInput({
	label,
	value,
	onChange,
	min,
	max,
	step,
	display,
	note,
}: {
	label: string;
	value: number;
	onChange: (v: number) => void;
	min: number;
	max: number;
	step: number;
	display: string;
	note?: string;
}) {
	const id = useId();
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-baseline justify-between gap-2">
				<label htmlFor={id} className="text-sm font-semibold text-ink">
					{label}
				</label>
				<span className="text-base font-bold tabular-nums text-ink">
					{display}
				</span>
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
				<span>
					{typeof min === "number" && min >= 1000
						? "€" + min.toLocaleString("en-IE")
						: min}
				</span>
				<span>
					{typeof max === "number" && max >= 1000
						? "€" + max.toLocaleString("en-IE")
						: max}
				</span>
			</div>
			{note && <p className="text-sm text-muted">{note}</p>}
		</div>
	);
}

export default function RentalYieldCalculatorClient() {
	const [inputs, setInputs] = useState<Inputs>({
		purchasePrice: 350000,
		monthlyRent: 1200,
		managementFeePct: 8,
		annualMaintenance: 1500,
		vacancyRatePct: 5,
		appreciationPct: 3,
		horizon: 10,
	});

	const set =
		<K extends keyof Inputs>(key: K) =>
		(v: Inputs[K]) =>
			setInputs((prev) => ({ ...prev, [key]: v }));

	const results = useMemo(() => runModel(inputs), [inputs]);

	const {
		grossYieldPct,
		annualExpenses,
		netYieldPct,
		annualCashFlow,
		breakEvenYears,
		totalReturnAtHorizon,
		annualisedReturnPct,
		rows,
		propertyTax,
	} = results;

	return (
		<div className="flex flex-col gap-6">
			<ToolPanel title="Property inputs">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<SliderInput
						label="Purchase price"
						value={inputs.purchasePrice}
						onChange={set("purchasePrice")}
						min={100000}
						max={1500000}
						step={5000}
						display={"€" + inputs.purchasePrice.toLocaleString("en-IE")}
					/>
					<SliderInput
						label="Monthly rent"
						value={inputs.monthlyRent}
						onChange={set("monthlyRent")}
						min={500}
						max={5000}
						step={50}
						display={"€" + inputs.monthlyRent.toLocaleString("en-IE") + "/mo"}
					/>
					<SliderInput
						label="Management fee"
						value={inputs.managementFeePct}
						onChange={set("managementFeePct")}
						min={0}
						max={15}
						step={0.5}
						display={fmtPct(inputs.managementFeePct)}
						note="Typical letting agent fee"
					/>
					<SliderInput
						label="Annual maintenance"
						value={inputs.annualMaintenance}
						onChange={set("annualMaintenance")}
						min={0}
						max={5000}
						step={100}
						display={"€" + inputs.annualMaintenance.toLocaleString("en-IE")}
					/>
					<div className="flex flex-col gap-1.5">
						<div className="flex items-baseline justify-between gap-2">
							<p className="text-sm font-semibold text-ink">
								Property tax (IPT)
							</p>
							<span className="text-base font-bold tabular-nums text-ink">
								{fmt(propertyTax)}/yr
							</span>
						</div>
						<p className="text-sm text-muted">
							0.1% of purchase price, calculated automatically
						</p>
					</div>
					<SliderInput
						label="Vacancy rate"
						value={inputs.vacancyRatePct}
						onChange={set("vacancyRatePct")}
						min={0}
						max={20}
						step={1}
						display={fmtPct(inputs.vacancyRatePct)}
					/>
					<SliderInput
						label="Annual appreciation"
						value={inputs.appreciationPct}
						onChange={set("appreciationPct")}
						min={0}
						max={8}
						step={0.5}
						display={fmtPct(inputs.appreciationPct)}
					/>
					<ChipGroup
						label="Investment horizon"
						options={([5, 10, 15] as const).map((h) => ({
							value: String(h),
							label: `${h} yr`,
						}))}
						value={String(inputs.horizon)}
						onChange={(v) => set("horizon")(Number(v) as 5 | 10 | 15)}
					/>
				</div>
			</ToolPanel>

			<section aria-labelledby="yield-results" className="space-y-4">
				<h2
					id="yield-results"
					className="text-2xl font-bold tracking-tight text-ink"
				>
					Results summary
				</h2>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<StatCard
						highlight
						label="Gross yield"
						value={fmtPct(grossYieldPct)}
					/>
					<StatCard label="Net yield" value={fmtPct(netYieldPct)} />
					<StatCard label="Annual cash flow" value={fmt(annualCashFlow)} />
					<StatCard
						label="Break-even"
						value={
							breakEvenYears !== null
								? breakEvenYears <= 99
									? `${Math.ceil(breakEvenYears)} yr`
									: "100+ yr"
								: "N/A"
						}
					/>
				</div>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
					<StatCard
						label="Annual expenses"
						value={fmt(annualExpenses)}
						hint="Management + maintenance + IPT + vacancy"
					/>
					<StatCard
						label={`Total return (${inputs.horizon} yr)`}
						value={fmt(totalReturnAtHorizon)}
						hint="Cash flow income + appreciation gain"
					/>
					<StatCard
						label="Annualised return"
						value={fmtPct(annualisedReturnPct)}
						hint={`IRR approximation over ${inputs.horizon} years`}
					/>
				</div>
			</section>

			<DataTable
				caption="Year-by-year projection"
				columns={[
					{ header: "Year" },
					{ header: "Cum. rent income", align: "right" },
					{ header: "Property value", align: "right" },
					{ header: "Cum. total gain", align: "right" },
				]}
				rows={rows.map((row) => [
					`Year ${row.year}`,
					fmt(row.cumRentIncome),
					fmt(row.propertyValue),
					fmt(row.cumTotalGain),
				])}
				zebra
			/>

			<Callout title="Cyprus IPT and rental tax notes">
				Cyprus IPT (Immovable Property Tax) is assessed by local municipalities
				and is typically 0.1–0.2% of the government-assessed value, which is
				usually below market price. Non-resident landlords pay income tax on
				rental income at progressive rates. Verify current rates with a Cyprus
				accountant.
			</Callout>
		</div>
	);
}
