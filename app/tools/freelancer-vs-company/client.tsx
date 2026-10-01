"use client";

import { useId, useMemo, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";

type Structure = "sole-trader" | "ltd" | "ltd-holding";

type Inputs = {
	annualIncome: number;
	foreignIncomePercent: number;
	hasEmployees: boolean;
	plansToRaise: boolean;
	nonDomiciled: boolean;
	hasPassiveIncome: boolean;
};

type Recommendation = {
	primary: Structure;
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

	// --- Sole Trader effective tax estimate ---
	// Cyprus personal income tax brackets 2025
	// 0-19,500: 0%
	// 19,501-28,000: 20%
	// 28,001-36,300: 25%
	// 36,301-60,000: 30%
	// 60,001+: 35%
	// Plus GeSY (NHIS) contributions: 2.65% of gross income
	// Plus SDC (Special Defence Contribution) on dividends for domiciled residents

	function personalIncomeTax(income: number): number {
		let tax = 0;
		if (income > 60000) tax += (income - 60000) * 0.35;
		if (income > 36300) tax += (Math.min(income, 60000) - 36300) * 0.3;
		if (income > 28000) tax += (Math.min(income, 36300) - 28000) * 0.25;
		if (income > 19500) tax += (Math.min(income, 28000) - 19500) * 0.2;
		return tax;
	}

	const soleTraderTax = personalIncomeTax(annualIncome) + annualIncome * 0.0265;
	const soleTraderEffectiveRate = Math.round(
		(soleTraderTax / annualIncome) * 100,
	);

	// --- Cyprus Ltd effective tax estimate ---
	// 15% corporate tax on net profit (raised from 12.5% on 1 Jan 2026)
	// Assuming 80% of income is taxable profit (20% expenses)
	const estimatedProfit = annualIncome * 0.8;
	const corporateTax = estimatedProfit * 0.15;
	// Dividend extraction: non-dom pays 0 on dividends; dom pays 17% SDC
	const dividendTax = nonDomiciled ? 0 : estimatedProfit * 0.17;
	const ltdTotalTax = corporateTax + dividendTax;
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
				"Tax rate scales steeply above €28,000: 25%–35% marginal rate",
				"Social insurance contributions (GESY + SI) on full income",
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
					: "Dividends taxed at 17% SDC (domiciled); consider non-dom status",
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
				"IP box regime: 80% exemption on qualifying IP income → effective ~2.5% on IP profits",
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

			<Callout tone="legal" title="Disclaimer">
				This tool provides a general orientation only. Tax rates shown are
				estimates based on simplified assumptions. Your actual tax position
				depends on your specific income mix, deductions, residency status,
				home-country obligations and the structure of your business. Tax
				optimization should always be confirmed with a qualified Cyprus
				accountant and, where relevant, a tax adviser in your home country.
			</Callout>

			<Section title="Related guides" headingLevel="h3">
				<div className="flex flex-wrap gap-3">
					<ButtonLink
						href="/guides/company-types-comparison/"
						variant="secondary"
					>
						Read: Company Types in Cyprus
					</ButtonLink>
					<ButtonLink href="/guides/taxes-for-expats/" variant="secondary">
						Read: Taxes for Expats
					</ButtonLink>
					<ButtonLink href="/sections/accountants/" variant="secondary">
						Find an accountant
					</ButtonLink>
				</div>
			</Section>
		</div>
	);
}
