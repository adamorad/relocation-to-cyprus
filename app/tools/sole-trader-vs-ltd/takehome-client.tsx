"use client";

import { useId, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Badge } from "@/components/ui/Badge";
import { ChipGroup } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import {
	CORPORATE_TAX_RATE,
	eur,
	GESY_INCOME_CAP,
	GESY_RATE,
	GESY_SELF_EMPLOYED_RATE,
	pct,
	personalIncomeTax2026,
	SDC_DIVIDEND_RATE,
	SI_MAX_INSURABLE_ANNUAL,
	SI_SELF_EMPLOYED_RATE,
} from "@/lib/facts/tax";

type Structure = "sole-trader" | "ltd" | "ltd-holding";

type Inputs = {
	annualIncome: number;
	foreignIncomePercent: number;
	hasEmployees: boolean;
	plansToRaise: boolean;
	nonDomiciled: boolean;
	hasPassiveIncome: boolean;
};

type LineItem = { label: string; amount: number };

type Recommendation = {
	primary: Structure;
	profit: number;
	soleTraderItems: LineItem[];
	ltdItems: LineItem[];
	structureLabel: string;
	effectiveRateSoleTrader: number;
	effectiveRateLtd: number;
	effectiveRateLtdHolding: number | null;
	advantages: string[];
	risks: string[];
	nextSteps: string[];
	summary: string;
};

function computeRecommendation(inputs: Inputs): Recommendation {
	const {
		annualIncome,
		foreignIncomePercent,
		hasEmployees,
		plansToRaise,
		nonDomiciled,
		hasPassiveIncome,
	} = inputs;
	const foreignIncome = annualIncome * (foreignIncomePercent / 100);
	const cyprusIncome = annualIncome - foreignIncome;

	// Both structures are compared on the same taxable profit: 80% of income
	// (about 20% deductible expenses).
	const estimatedProfit = annualIncome * 0.8;

	// --- Sole Trader ---
	// Income tax on the 2026 bands, self-employed social insurance (16.6% up to
	// the maximum insurable earnings) and self-employed GeSY (4% up to the GeSY
	// income ceiling), all from lib/facts/tax.ts. Contributions are not
	// deducted from taxable income here (simplification).
	const soleTraderIncomeTax = personalIncomeTax2026(estimatedProfit);
	const soleTraderSI =
		Math.min(estimatedProfit, SI_MAX_INSURABLE_ANNUAL) * SI_SELF_EMPLOYED_RATE;
	const soleTraderGesy =
		Math.min(estimatedProfit, GESY_INCOME_CAP) * GESY_SELF_EMPLOYED_RATE;
	const soleTraderTax = soleTraderIncomeTax + soleTraderSI + soleTraderGesy;
	const soleTraderEffectiveRate = Math.round(
		(soleTraderTax / annualIncome) * 100,
	);

	// --- Cyprus Ltd ---
	// 15% corporate tax on profit, all post-tax profit paid out as a dividend:
	// SDC 5% for domiciled residents (dividends from 2026 profits), 0 for
	// non-doms; GeSY 2.65% on the dividend up to the GeSY income ceiling.
	// No director's salary, so no social insurance on this side.
	const corporateTax = estimatedProfit * CORPORATE_TAX_RATE;
	const dividend = estimatedProfit - corporateTax;
	const dividendSdc = nonDomiciled ? 0 : dividend * SDC_DIVIDEND_RATE;
	const dividendGesy = Math.min(dividend, GESY_INCOME_CAP) * GESY_RATE;
	const ltdTotalTax = corporateTax + dividendSdc + dividendGesy;
	const ltdEffectiveRate = Math.round((ltdTotalTax / annualIncome) * 100);

	// --- Ltd + Holding ---
	// IP box regime or holding with participation exemption can reduce further
	// Typically effective rate 10-14% for complex structures at high income
	const holdingEffectiveRate =
		annualIncome > 150000 ? Math.max(8, ltdEffectiveRate - 4) : null;

	// --- Scoring ---
	let ltdScore = 0;
	let holdingScore = 0;

	// Income level
	if (annualIncome >= 60000) ltdScore += 3;
	if (annualIncome > 200000) holdingScore += 3;

	// Foreign income
	if (foreignIncomePercent > 80) ltdScore += 2;

	// Employees
	if (hasEmployees) ltdScore += 2;

	// Investment
	if (plansToRaise) {
		ltdScore += 3;
		holdingScore += 1;
	}

	// Non-dom
	if (nonDomiciled) ltdScore += 2;

	// Passive income
	if (hasPassiveIncome) holdingScore += 2;

	let primary: Structure;
	if (annualIncome < 40000 && !hasEmployees && !plansToRaise) {
		primary = "sole-trader";
	} else if (holdingScore > ltdScore && annualIncome > 150000) {
		primary = "ltd-holding";
	} else {
		primary = "ltd";
	}

	const structures: Record<
		Structure,
		{
			label: string;
			advantages: string[];
			risks: string[];
			nextSteps: string[];
		}
	> = {
		"sole-trader": {
			label: "Sole Trader / Self-Employed",
			advantages: [
				"Simplest setup, register with Tax Department only",
				"No company formation costs (~€500–1,500 to incorporate a Ltd)",
				"No annual audit requirement below certain thresholds",
				"Lower ongoing compliance costs (no annual returns filing)",
				annualIncome < 40000
					? "At your income level, personal tax rates are competitive with corporate"
					: "Consider Ltd once income grows",
			],
			risks: [
				"Unlimited personal liability for business debts",
				"Cannot issue equity, limits future investment options",
				"Tax rate rises above €32,000: 25% to 35% marginal rate",
				`Social insurance (${pct(SI_SELF_EMPLOYED_RATE)} up to ${eur(SI_MAX_INSURABLE_ANNUAL)} a year) and GeSY (${pct(GESY_SELF_EMPLOYED_RATE)}) on your profit`,
				"Harder to retain earnings in a tax-efficient way",
			],
			nextSteps: [
				"Register as self-employed at the nearest Tax Department office",
				"Obtain your Tax Identification Certificate (TIC)",
				"Register for VAT if turnover will exceed €15,600/year",
				"Open a Cypriot business bank account",
				"Engage a local accountant for quarterly VAT and annual tax filing",
			],
		},
		ltd: {
			label: "Cyprus Ltd (Private Company)",
			advantages: [
				"15% flat corporate tax, competitive within the EU",
				nonDomiciled
					? "As a non-dom, dividend extraction is 0% tax, highly efficient"
					: "Dividends taxed at 5% SDC (domiciled); consider non-dom status",
				"Limited liability protects personal assets",
				"Easier to bring in co-founders, issue options, or raise investment",
				"Can accumulate retained earnings at low tax rates",
				foreignIncomePercent > 50
					? "Your high % of foreign income suits a Cyprus Ltd receiving foreign-source income"
					: "Standard structure for Cyprus-based businesses",
			],
			risks: [
				"Annual audit required (audited financial statements mandatory)",
				"Company secretarial obligations: annual returns, registered office",
				"Payroll setup required if paying yourself a salary",
				"Minimum 2 weeks to incorporate; legal/accounting fees €500–2,000/year",
				"Director and beneficial ownership obligations under CRS/BEPS",
			],
			nextSteps: [
				"Engage a Cyprus lawyer to incorporate the company (€800–1,500 typical)",
				"Open a corporate bank account (allow 3–5 weeks)",
				"Register for corporate tax and VAT with the Tax Department",
				"Appoint a local registered agent and company secretary",
				"Set up payroll if you take a director's salary",
				"File annual audited accounts and corporate tax return",
			],
		},
		"ltd-holding": {
			label: "Cyprus Ltd + Holding Structure",
			advantages: [
				"Participation exemption: dividends from subsidiaries often 0% tax",
				"IP box regime: 80% exemption on qualifying IP profit, effective 3% at the 15% corporate rate",
				"Cyprus as EU hub with 65+ double tax treaties",
				"Interest deduction regime available for equity-funded holding companies",
				"Estate planning and succession benefits",
				hasPassiveIncome
					? "Your passive income profile benefits significantly from a holding layer"
					: "Consider as income grows",
			],
			risks: [
				"Significantly higher setup and annual costs: €3,000–8,000+/year in professional fees",
				"Substance requirements: must demonstrate genuine economic activity in Cyprus",
				"BEPS/OECD Pillar Two rules may affect structures above €750M turnover",
				"More complex compliance: group accounts, inter-company agreements needed",
				"Requires experienced Cyprus tax counsel, DIY is not advisable",
			],
			nextSteps: [
				"Engage a specialist Cyprus tax law firm (not just an accountant)",
				"Map out the structure: Cypriot OpCo + Cypriot or foreign HoldCo",
				"Review IP ownership and intercompany pricing before transfer",
				"Ensure Cyprus substance: office, local directors, board meetings in Cyprus",
				"Prepare a transfer pricing policy if group transactions exceed €750K",
				"Plan the structure before incorporation, restructuring later is costly",
			],
		},
	};

	const chosen = structures[primary];

	return {
		primary,
		profit: estimatedProfit,
		soleTraderItems: [
			{ label: "Income tax (2026 bands)", amount: soleTraderIncomeTax },
			{
				label: `Social insurance (${pct(SI_SELF_EMPLOYED_RATE)}, capped at ${eur(SI_MAX_INSURABLE_ANNUAL)})`,
				amount: soleTraderSI,
			},
			{
				label: `GeSY (${pct(GESY_SELF_EMPLOYED_RATE)})`,
				amount: soleTraderGesy,
			},
		],
		ltdItems: [
			{
				label: `Corporate tax (${pct(CORPORATE_TAX_RATE)})`,
				amount: corporateTax,
			},
			{
				label: nonDomiciled
					? "SDC on dividend (0% as a non-dom)"
					: `SDC on dividend (${pct(SDC_DIVIDEND_RATE)})`,
				amount: dividendSdc,
			},
			{ label: `GeSY on dividend (${pct(GESY_RATE)})`, amount: dividendGesy },
		],
		structureLabel: chosen.label,
		effectiveRateSoleTrader: soleTraderEffectiveRate,
		effectiveRateLtd: ltdEffectiveRate,
		effectiveRateLtdHolding: holdingEffectiveRate,
		advantages: chosen.advantages,
		risks: chosen.risks,
		nextSteps: chosen.nextSteps,
		summary:
			primary === "sole-trader"
				? `At €${annualIncome.toLocaleString()}/year with your profile, sole trader is the most practical starting point. Set up fast, keep compliance simple, and re-evaluate when income grows past €50–60K.`
				: primary === "ltd"
					? `A Cyprus Ltd makes strong sense at €${annualIncome.toLocaleString()}/year. The 15% corporate rate${nonDomiciled ? " plus 0% on dividends as a non-dom" : ""} gives you an estimated effective rate of ~${ltdEffectiveRate}%, materially lower than the sole trader rate of ~${soleTraderEffectiveRate}%.`
					: `At €${annualIncome.toLocaleString()}/year with passive income and your profile, a holding structure could reduce your effective rate to ~${holdingEffectiveRate}%. This requires specialist advice and real substance in Cyprus.`,
	};
}

const INCOME_MIN = 20000;
const INCOME_MAX = 500000;

/**
 * Embedded body for /tools/sole-trader-vs-ltd/ (the standalone route is a
 * redirect stub). No header, width wrapper, disclaimer or related links here:
 * the host page renders those once.
 */
export default function FreelancerVsCompanyPage() {
	const [inputs, setInputs] = useState<Inputs>({
		annualIncome: 80000,
		foreignIncomePercent: 70,
		hasEmployees: false,
		plansToRaise: false,
		nonDomiciled: true,
		hasPassiveIncome: false,
	});

	const result = useMemo(() => computeRecommendation(inputs), [inputs]);

	const incomeId = useId();
	const foreignId = useId();

	const rates = [
		{
			label: "Sole Trader",
			rate: result.effectiveRateSoleTrader,
		},
		{
			label: "Cyprus Ltd",
			rate: result.effectiveRateLtd,
		},
		...(result.effectiveRateLtdHolding !== null
			? [{ label: "Ltd + Holding", rate: result.effectiveRateLtdHolding }]
			: []),
	];

	const toggles: { key: keyof Inputs; label: string }[] = [
		{ key: "hasEmployees", label: "Do you have employees?" },
		{ key: "plansToRaise", label: "Do you plan to raise investment?" },
		{ key: "nonDomiciled", label: "Are you non-domiciled in Cyprus?" },
		{
			key: "hasPassiveIncome",
			label: "Significant passive income? (dividends, investments)",
		},
	];

	return (
		<div className="space-y-6">
			<p className="text-lg leading-relaxed text-muted">
				Answer 6 questions to get a personalised recommendation: Sole Trader,
				Cyprus Ltd, or a Holding Structure, with estimated tax rates.
			</p>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* --- Inputs --- */}
				<ToolPanel title="Your situation" className="self-start">
					<div>
						<div className="mb-2 flex items-baseline justify-between">
							<label
								htmlFor={incomeId}
								className="text-sm font-semibold text-ink"
							>
								Annual net income
							</label>
							<span className="text-lg font-bold text-primary">
								€{inputs.annualIncome.toLocaleString()}
							</span>
						</div>
						<input
							id={incomeId}
							type="range"
							min={INCOME_MIN}
							max={INCOME_MAX}
							step={5000}
							value={inputs.annualIncome}
							onChange={(e) =>
								setInputs({ ...inputs, annualIncome: Number(e.target.value) })
							}
							className="w-full accent-primary"
						/>
						<div className="mt-1 flex justify-between text-sm text-muted">
							<span>€20K</span>
							<span>€500K</span>
						</div>
					</div>

					<div>
						<div className="mb-2 flex items-baseline justify-between">
							<label
								htmlFor={foreignId}
								className="text-sm font-semibold text-ink"
							>
								Income from outside Cyprus
							</label>
							<span className="text-lg font-bold text-primary">
								{inputs.foreignIncomePercent}%
							</span>
						</div>
						<input
							id={foreignId}
							type="range"
							min={0}
							max={100}
							step={5}
							value={inputs.foreignIncomePercent}
							onChange={(e) =>
								setInputs({
									...inputs,
									foreignIncomePercent: Number(e.target.value),
								})
							}
							className="w-full accent-primary"
						/>
						<div className="mt-1 flex justify-between text-sm text-muted">
							<span>0% (all Cyprus)</span>
							<span>100% (all foreign)</span>
						</div>
					</div>

					{toggles.map(({ key, label }) => (
						<ChipGroup
							key={key}
							label={label}
							value={(inputs[key] as boolean) ? "yes" : "no"}
							onChange={(v) => setInputs({ ...inputs, [key]: v === "yes" })}
							options={[
								{ value: "yes", label: "Yes" },
								{ value: "no", label: "No" },
							]}
						/>
					))}
				</ToolPanel>

				{/* --- Results --- */}
				<div className="space-y-5">
					<div className="rounded-card border border-primary bg-sky p-5">
						<p className="mb-1 text-sm font-semibold text-muted">
							Recommended structure
						</p>
						<h2 className="text-2xl font-bold text-ink">
							{result.structureLabel}
						</h2>
						<p className="mt-2 text-base leading-relaxed text-ink">
							{result.summary}
						</p>
					</div>

					<Section title="Estimated effective tax rate" headingLevel="h3">
						<div className="rounded-card border border-line bg-white p-5">
							<div className="space-y-3">
								{rates.map(({ label, rate }) => (
									<div key={label} className="flex items-center gap-3">
										<Badge className="w-28 justify-center">{label}</Badge>
										<div className="h-2 flex-1 rounded-full bg-sky">
											<div
												className="h-2 rounded-full bg-primary transition-all duration-500"
												style={{ width: `${Math.min(rate, 40) * 2.5}%` }}
											/>
										</div>
										<span className="w-12 text-right text-sm font-bold text-ink">
											~{rate}%
										</span>
									</div>
								))}
							</div>
							<p className="mt-3 text-sm text-muted">
								Estimates assume ~20% deductible expenses. Actual rates vary.
								Non-dom status: {inputs.nonDomiciled ? "Yes" : "No"}.
							</p>
						</div>
					</Section>

					<Section title="How the estimate is built" headingLevel="h3">
						<div className="rounded-card border border-line bg-white p-5">
							<p className="mb-4 text-sm text-muted">
								Both columns use the same taxable profit of{" "}
								{eur(Math.round(result.profit))} a year.
							</p>
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
								{[
									{ title: "Sole trader", items: result.soleTraderItems },
									{
										title: "Cyprus Ltd (all profit paid as dividends)",
										items: result.ltdItems,
									},
								].map(({ title, items }) => (
									<div key={title}>
										<h4 className="mb-2 text-sm font-bold text-ink">{title}</h4>
										<dl className="space-y-1.5 text-sm">
											{items.map((item) => (
												<div
													key={item.label}
													className="flex justify-between gap-3"
												>
													<dt className="text-muted">{item.label}</dt>
													<dd className="shrink-0 font-semibold text-ink">
														{eur(Math.round(item.amount))}
													</dd>
												</div>
											))}
											<div className="flex justify-between gap-3 border-t border-line pt-1.5">
												<dt className="font-semibold text-ink">Total</dt>
												<dd className="shrink-0 font-bold text-ink">
													{eur(
														Math.round(
															items.reduce((sum, i) => sum + i.amount, 0),
														),
													)}
												</dd>
											</div>
										</dl>
									</div>
								))}
							</div>
							<p className="mt-4 text-sm text-muted">
								Sole trader social insurance is charged on profit up to the
								maximum insurable earnings and is not deducted from taxable
								income here. The Ltd column assumes no director&apos;s salary,
								so it has no social insurance.
							</p>
						</div>
					</Section>

					<div className="rounded-card border border-line bg-white p-5">
						<h3 className="mb-3 text-base font-bold text-ink">
							Key advantages for your profile
						</h3>
						<ul className="space-y-2">
							{result.advantages.filter(Boolean).map((a) => (
								<li key={a} className="flex gap-2 text-sm text-ink">
									<span
										aria-hidden="true"
										className="mt-0.5 font-bold text-primary"
									>
										+
									</span>
									<span>{a}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-card border border-line bg-white p-5">
						<h3 className="mb-3 text-base font-bold text-ink">
							Risks and complications
						</h3>
						<ul className="space-y-2">
							{result.risks.map((r) => (
								<li key={r} className="flex gap-2 text-sm text-ink">
									<span
										aria-hidden="true"
										className="mt-0.5 font-bold text-amber-800"
									>
										!
									</span>
									<span>{r}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="rounded-card border border-line bg-white p-5">
						<h3 className="mb-3 text-base font-bold text-ink">
							Recommended next steps
						</h3>
						<ol className="space-y-2">
							{result.nextSteps.map((s, i) => (
								<li key={s} className="flex gap-2 text-sm text-ink">
									<span className="mt-0.5 w-4 shrink-0 text-sm text-muted">
										{i + 1}.
									</span>
									<span>{s}</span>
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
}
