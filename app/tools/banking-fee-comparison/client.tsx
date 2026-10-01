"use client";

import { useState } from "react";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable } from "@/components/ui/DataTable";
import { Section } from "@/components/ui/Section";

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
		label: "Outbound wire: EU (€)",
		format: (v) => `€${v as number}`,
		lowerIsBetter: true,
	},
	{
		key: "outboundWireNonEU",
		label: "Outbound wire: Non-EU (€)",
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
		note: "Revolut/Wise use LT/BE IBANs: often rejected by landlords.",
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
		need: "Travelling frequently: zero ATM fees, no FX markup",
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
		<>
			<ChipGroup
				label="Bank type"
				value={filter}
				onChange={setFilter}
				options={[
					{ value: "all", label: "All banks" },
					{ value: "traditional", label: "Traditional" },
					{ value: "digital", label: "Digital / Neo" },
				]}
			/>

			<DataTable
				caption="Bank fee comparison table"
				hideCaption
				zebra
				columns={[
					{ header: "Metric" },
					...filteredBanks.map((bank) => ({
						align: "right" as const,
						header: (
							<>
								<span className="block">{bank.name}</span>
								<span className="text-xs font-normal capitalize text-muted">
									{bank.type}
								</span>
							</>
						),
					})),
				]}
				rows={METRICS.map((metric) => {
					const best = getBestValue(metric, filteredBanks);
					return [
						metric.label,
						...filteredBanks.map((bank) => {
							const val = bank[metric.key];
							const good = isBest(metric, bank, best);
							return (
								<span
									key={bank.name}
									className={
										good
											? "rounded bg-sky-strong px-2 py-0.5 font-semibold text-ink"
											: "text-muted"
									}
								>
									{metric.format(val)}
								</span>
							);
						}),
					];
				})}
			/>
			<p className="text-sm text-muted">
				Highlighted cells show the best value in each row.
			</p>

			<Section id="decision-guide" title="Decision guide: if you need...">
				<DataTable
					caption="Which bank suits which need"
					hideCaption
					columns={[
						{ header: "If you need" },
						{ header: "Use" },
						{ header: "Why" },
					]}
					rows={SCENARIOS.map((s) => [
						s.need,
						<span key="u" className="font-semibold text-primary">
							{s.use}
						</span>,
						<span key="n" className="text-muted">
							{s.note}
						</span>,
					])}
				/>
			</Section>

			<Callout tone="warning" title="Important notice">
				Fees shown are approximate values from 2025, not yet re-checked, for
				standard retail accounts and change without notice. Digital banks
				(Revolut, Wise) do not provide a Cyprus-registered IBAN, which matters
				for landlord deposits, utility direct debits, and certain tax filings.
				Always verify current fee schedules directly with each bank before
				opening an account.
			</Callout>
		</>
	);
}
