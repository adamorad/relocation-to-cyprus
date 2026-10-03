"use client";

import { useState } from "react";
import { Callout } from "@/components/ui/Callout";
import { Chip } from "@/components/ui/Chip";
import { DataTable } from "@/components/ui/DataTable";

type Country = "Cyprus" | "Portugal" | "Malta" | "Greece" | "Spain" | "Italy";

interface CountryData {
	corpTax: string;
	topIncomeTax: string;
	specialRegime: string;
	specialRegimeTax: string;
	nonDomYears: string;
	avgPropPrice: string;
	monthlyCost: string;
	euVisaNonEU: string;
	cryptoFriendly: string;
	englishSpoken: string;
	climate: string;
}

const DATA: Record<Country, CountryData> = {
	Cyprus: {
		corpTax: "15%",
		topIncomeTax: "35%",
		specialRegime: "Non-dom",
		specialRegimeTax: "0% divs",
		nonDomYears: "17 yrs",
		avgPropPrice: "€2,800",
		monthlyCost: "€2,000",
		euVisaNonEU: "Yes / D7",
		cryptoFriendly: "8% on gains (2026)",
		englishSpoken: "High",
		climate: "★★★★★",
	},
	Portugal: {
		corpTax: "21%",
		topIncomeTax: "48%",
		specialRegime: "NHR / IFICI",
		specialRegimeTax: "20% flat",
		nonDomYears: "10 yrs",
		avgPropPrice: "€2,900",
		monthlyCost: "€2,200",
		euVisaNonEU: "Yes / D7",
		cryptoFriendly: "Partial",
		englishSpoken: "Medium",
		climate: "★★★★",
	},
	Malta: {
		corpTax: "15%",
		topIncomeTax: "35%",
		specialRegime: "Global Res",
		specialRegimeTax: "15% flat",
		nonDomYears: "N/A",
		avgPropPrice: "€4,500",
		monthlyCost: "€2,500",
		euVisaNonEU: "Yes",
		cryptoFriendly: "Yes",
		englishSpoken: "High",
		climate: "★★★★",
	},
	Greece: {
		corpTax: "22%",
		topIncomeTax: "44%",
		specialRegime: "Non-dom",
		specialRegimeTax: "7% flat",
		nonDomYears: "15 yrs",
		avgPropPrice: "€2,000",
		monthlyCost: "€1,800",
		euVisaNonEU: "No",
		cryptoFriendly: "No",
		englishSpoken: "Low",
		climate: "★★★★",
	},
	Spain: {
		corpTax: "25%",
		topIncomeTax: "47%",
		specialRegime: "Beckham",
		specialRegimeTax: "24% flat",
		nonDomYears: "6 yrs",
		avgPropPrice: "€1,800",
		monthlyCost: "€1,900",
		euVisaNonEU: "Yes / D",
		cryptoFriendly: "No",
		englishSpoken: "Low",
		climate: "★★★★",
	},
	Italy: {
		corpTax: "24%",
		topIncomeTax: "43%",
		specialRegime: "Impatriates",
		specialRegimeTax: "50% exempt",
		nonDomYears: "5 yrs",
		avgPropPrice: "€1,700",
		monthlyCost: "€2,000",
		euVisaNonEU: "Yes / Nomad",
		cryptoFriendly: "Partial",
		englishSpoken: "Low",
		climate: "★★★★",
	},
};

const ALL_COUNTRIES: Country[] = [
	"Cyprus",
	"Portugal",
	"Malta",
	"Greece",
	"Spain",
	"Italy",
];

interface MetricDef {
	key: keyof CountryData;
	label: string;
	note?: string;
}

const METRICS: MetricDef[] = [
	{
		key: "corpTax",
		label: "Corporate tax rate",
		note: "Standard headline rate",
	},
	{ key: "topIncomeTax", label: "Top income tax rate" },
	{ key: "specialRegime", label: "Special tax regime name" },
	{ key: "specialRegimeTax", label: "Special regime benefit" },
	{ key: "nonDomYears", label: "Regime duration" },
	{ key: "avgPropPrice", label: "Avg property €/sqm" },
	{ key: "monthlyCost", label: "Monthly cost (1 person, mid)" },
	{ key: "euVisaNonEU", label: "EU visa for non-EU nationals" },
	{ key: "cryptoFriendly", label: "Crypto tax treatment" },
	{ key: "englishSpoken", label: "English proficiency" },
	{ key: "climate", label: "Climate rating" },
];

export default function CountryComparisonClient() {
	const [visible, setVisible] = useState<Set<Country>>(new Set(ALL_COUNTRIES));

	const toggleCountry = (country: Country) => {
		if (country === "Cyprus") return; // Cyprus always visible
		setVisible((prev) => {
			const next = new Set(prev);
			if (next.has(country)) {
				if (next.size <= 2) return prev; // keep at least Cyprus + 1
				next.delete(country);
			} else {
				next.add(country);
			}
			return next;
		});
	};

	const visibleCountries = ALL_COUNTRIES.filter((c) => visible.has(c));

	return (
		<>
			<fieldset className="min-w-0">
				<legend className="mb-2 text-sm font-semibold text-ink">
					Toggle countries (Cyprus always shown)
				</legend>
				<div className="flex flex-wrap gap-2">
					{ALL_COUNTRIES.map((country) => (
						<Chip
							key={country}
							selected={visible.has(country)}
							onClick={() => toggleCountry(country)}
						>
							{country}
						</Chip>
					))}
				</div>
			</fieldset>

			<DataTable
				caption="Cyprus compared with other European countries"
				hideCaption
				zebra
				columns={[
					{ header: "Metric" },
					...visibleCountries.map((country) => ({
						header: country === "Cyprus" ? "Cyprus (highlighted)" : country,
						align: "right" as const,
					})),
				]}
				rows={METRICS.map((metric) => [
					<>
						{metric.label}
						{metric.note ? (
							<span className="block text-xs font-normal text-muted">
								{metric.note}
							</span>
						) : null}
					</>,
					...visibleCountries.map((country) => (
						<span
							key={country}
							className={
								country === "Cyprus"
									? "rounded bg-sky-strong px-2 py-0.5 font-semibold"
									: ""
							}
						>
							{DATA[country][metric.key]}
						</span>
					)),
				])}
			/>

			<Callout tone="info" title="Cyprus Non-Dom explained">
				Cyprus non-dom status grants{" "}
				<strong>0% tax on dividends and interest</strong> for up to{" "}
				<strong>17 years</strong> for qualifying individuals. Combined with the
				15% corporate tax rate, it remains one of the more efficient structures
				available within the EU.
			</Callout>
		</>
	);
}
