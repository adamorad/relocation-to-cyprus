"use client";

import Link from "next/link";
import { useState } from "react";

type Bank = {
	name: string;
	shortName: string;
	type: "traditional" | "digital";
	monthlyFee: number;
	outboundWireEU: number;
	outboundWireNonEU: number;
	incomingWire: number;
	atmFreeWithdrawals: number;
	currencyExchangeMarkup: number;
	onlineBanking: boolean;
	englishApp: boolean;
	openingTimeDays: number;
	nonEUFriendly: boolean;
};

const BANKS: Bank[] = [
	{
		name: "Bank of Cyprus",
		shortName: "BOC",
		type: "traditional",
		monthlyFee: 6,
		outboundWireEU: 5,
		outboundWireNonEU: 25,
		incomingWire: 3,
		atmFreeWithdrawals: 0,
		currencyExchangeMarkup: 2.5,
		onlineBanking: true,
		englishApp: true,
		openingTimeDays: 21,
		nonEUFriendly: true,
	},
	{
		name: "Hellenic Bank",
		shortName: "Hellenic",
		type: "traditional",
		monthlyFee: 5,
		outboundWireEU: 4,
		outboundWireNonEU: 22,
		incomingWire: 3,
		atmFreeWithdrawals: 0,
		currencyExchangeMarkup: 2.5,
		onlineBanking: true,
		englishApp: true,
		openingTimeDays: 18,
		nonEUFriendly: true,
	},
	{
		name: "AstroBank",
		shortName: "Astro",
		type: "traditional",
		monthlyFee: 5,
		outboundWireEU: 6,
		outboundWireNonEU: 20,
		incomingWire: 2,
		atmFreeWithdrawals: 0,
		currencyExchangeMarkup: 2.0,
		onlineBanking: true,
		englishApp: true,
		openingTimeDays: 14,
		nonEUFriendly: true,
	},
	{
		name: "Revolut",
		shortName: "Revolut",
		type: "digital",
		monthlyFee: 0,
		outboundWireEU: 0,
		outboundWireNonEU: 3,
		incomingWire: 0,
		atmFreeWithdrawals: 5,
		currencyExchangeMarkup: 0,
		onlineBanking: true,
		englishApp: true,
		openingTimeDays: 1,
		nonEUFriendly: true,
	},
	{
		name: "Wise",
		shortName: "Wise",
		type: "digital",
		monthlyFee: 0,
		outboundWireEU: 0.5,
		outboundWireNonEU: 2,
		incomingWire: 0,
		atmFreeWithdrawals: 2,
		currencyExchangeMarkup: 0.35,
		onlineBanking: true,
		englishApp: true,
		openingTimeDays: 1,
		nonEUFriendly: true,
	},
];

type MetricKey = keyof Omit<Bank, "name" | "shortName" | "type">;

type Metric = {
	key: MetricKey;
	label: string;
	format: (v: Bank[MetricKey]) => string;
	lowerIsBetter?: boolean;
	booleanMetric?: boolean;
};

const METRICS: Metric[] = [
	{
		key: "monthlyFee",
		label: "Monthly fee (€)",
		format: (v) => `€${v as number}`,
		lowerIsBetter: true,
	},
	{
		key: "outboundWireEU",
		label: "Outbound wire — EU (€)",
		format: (v) => `€${v as number}`,
		lowerIsBetter: true,
	},
	{
		key: "outboundWireNonEU",
		label: "Outbound wire — Non-EU (€)",
		format: (v) => `€${v as number}`,
		lowerIsBetter: true,
	},
	{
		key: "incomingWire",
		label: "Incoming wire fee (€)",
		format: (v) => `€${v as number}`,
		lowerIsBetter: true,
	},
	{
		key: "atmFreeWithdrawals",
		label: "Free ATM withdrawals/mo",
		format: (v) => `${v as number}`,
		lowerIsBetter: false,
	},
	{
		key: "currencyExchangeMarkup",
		label: "FX markup (%)",
		format: (v) => `${v as number}%`,
		lowerIsBetter: true,
	},
	{
		key: "onlineBanking",
		label: "Online banking",
		format: (v) => (v ? "Yes" : "No"),
		booleanMetric: true,
	},
	{
		key: "englishApp",
		label: "English app/portal",
		format: (v) => (v ? "Yes" : "No"),
		booleanMetric: true,
	},
	{
		key: "openingTimeDays",
		label: "Account opening (days)",
		format: (v) => `~${v as number}`,
		lowerIsBetter: true,
	},
	{
		key: "nonEUFriendly",
		label: "Non-EU applicant friendly",
		format: (v) => (v ? "Yes" : "No"),
		booleanMetric: true,
	},
];

const SCENARIOS = [
	{
		need: "A CY-prefix IBAN for your landlord and utilities",
		use: "Bank of Cyprus, Hellenic Bank, or AstroBank",
		note: "Revolut/Wise use LT/BE IBANs — often rejected by landlords.",
	},
	{
		need: "The fastest account opening (arriving this week)",
		use: "Revolut or Wise",
		note: "Open the same day. Use as a bridge while your traditional account processes.",
	},
	{
		need: "Frequent international transfers at lowest cost",
		use: "Wise",
		note: "Near mid-market FX rate, low flat fee. Significantly cheaper than traditional banks for non-EU transfers.",
	},
	{
		need: "Non-EU passport or complex source of funds",
		use: "AstroBank",
		note: "Historically more accommodating for MENA, CIS, and South Asian profiles.",
	},
	{
		need: "Travelling frequently — zero ATM fees, no FX markup",
		use: "Revolut (Standard plan)",
		note: "5 free ATM withdrawals/mo, real exchange rate, instant freeze/unfreeze.",
	},
];

function getBestValue(metric: Metric, banks: Bank[]): number | boolean {
	if (metric.booleanMetric) return true;
	const vals = banks.map((b) => b[metric.key] as number);
	return metric.lowerIsBetter ? Math.min(...vals) : Math.max(...vals);
}

function isBest(metric: Metric, bank: Bank, best: number | boolean): boolean {
	if (metric.booleanMetric) return bank[metric.key] === true;
	return (bank[metric.key] as number) === best;
}

export default function BankingFeeComparisonPage() {
	const [filter, setFilter] = useState<"all" | "traditional" | "digital">(
		"all",
	);

	const filteredBanks =
		filter === "all" ? BANKS : BANKS.filter((b) => b.type === filter);

	return (
		<main id="main" className="max-w-5xl mx-auto px-6 py-10 md:py-16">
			<nav className="text-xs text-slate-600 mb-6">
				<Link href="/" className="hover:text-ink">
					Home
				</Link>{" "}
				&rsaquo;{" "}
				<Link href="/tools" className="hover:text-ink">
					Tools
				</Link>{" "}
				&rsaquo; <span className="text-ink">Banking Fee Comparison</span>
			</nav>

			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
					Interactive Tool
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Cyprus Banking Fee Comparison
				</h1>
				<p className="mt-3 text-slate-600 leading-relaxed">
					Compare fees and features across the main banks available to Cyprus
					residents. Green cells highlight the best value in each row.
				</p>
			</header>

			{/* Filter */}
			<div className="flex gap-2 mb-5">
				{(["all", "traditional", "digital"] as const).map((f) => (
					<button
						key={f}
						onClick={() => setFilter(f)}
						className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors capitalize ${
							filter === f
								? "bg-primary border-primary text-white"
								: "bg-white border-line text-slate-600 hover:border-line"
						}`}
					>
						{f === "all"
							? "All banks"
							: f === "traditional"
								? "Traditional"
								: "Digital / Neo"}
					</button>
				))}
			</div>

			{/* Comparison table */}
			{/* biome-ignore lint/a11y/useSemanticElements: keyboard access for scrollable regions (axe scrollable-region-focusable) */}
			<div
				// biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access for scrollable regions (axe scrollable-region-focusable)
				tabIndex={0}
				role="region"
				aria-label="Bank fee comparison table"
				className="overflow-x-auto rounded-2xl border border-line mb-8"
			>
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-ink text-white">
							<th className="text-left px-5 py-3 font-medium text-slate-300 w-52">
								Metric
							</th>
							{filteredBanks.map((bank) => (
								<th
									key={bank.name}
									className="text-center px-4 py-3 font-semibold min-w-[120px]"
								>
									<span className="block">{bank.name}</span>
									<span className="text-xs font-normal text-slate-400 capitalize">
										{bank.type}
									</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{METRICS.map((metric, i) => {
							const best = getBestValue(metric, filteredBanks);
							return (
								<tr
									key={metric.key}
									className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
								>
									<td className="px-5 py-3 text-slate-600 font-medium text-xs">
										{metric.label}
									</td>
									{filteredBanks.map((bank) => {
										const val = bank[metric.key];
										const good = isBest(metric, bank, best);
										const isNo = metric.booleanMetric && val === false;
										return (
											<td
												key={bank.name}
												className={`text-center px-4 py-3 font-medium ${
													good
														? "text-green-800 bg-green-50"
														: isNo
															? "text-red-700"
															: "text-slate-700"
												}`}
											>
												{metric.format(val)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* Decision guide */}
			<section className="bg-white border border-line rounded-2xl overflow-hidden mb-8">
				<div className="bg-ink px-5 py-3">
					<h2 className="text-sm font-semibold text-white">
						Decision Guide — "If you need..."
					</h2>
				</div>
				<div className="divide-y divide-slate-100">
					{SCENARIOS.map((s) => (
						<div key={s.need} className="px-5 py-4">
							<div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
								<div className="sm:w-72 flex-shrink-0">
									<p className="text-sm font-medium text-ink">{s.need}</p>
								</div>
								<div>
									<p className="text-sm font-semibold text-primary">{s.use}</p>
									<p className="text-xs text-slate-500 mt-0.5">{s.note}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<aside className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-900">
				<p className="font-semibold text-ink mb-1">Important notice</p>
				<p>
					Fees shown are approximate 2025 values for standard retail accounts
					and change without notice. Digital banks (Revolut, Wise) do not
					provide a Cyprus-registered IBAN — this matters for landlord deposits,
					utility direct debits, and certain tax filings. Always verify current
					fee schedules directly with each bank before opening an account.
				</p>
			</aside>

			<p className="mt-8 text-xs text-slate-500">
				<Link href="/tools" className="underline hover:text-ink">
					← Back to Tools
				</Link>
			</p>

			<aside className="mt-10 p-5 rounded-2xl bg-sky border border-line">
				<p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
					Next steps
				</p>
				<div className="flex flex-wrap gap-3">
					<Link
						href="/guides/banking-in-cyprus/"
						className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Read: Banking in Cyprus Guide
					</Link>{" "}
					<Link
						href="/sections/accountants/"
						className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Find an accountant
					</Link>
				</div>
			</aside>
		</main>
	);
}
