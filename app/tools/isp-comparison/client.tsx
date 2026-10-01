"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable } from "@/components/ui/DataTable";

type CoverageCity =
	| "Limassol"
	| "Paphos"
	| "Larnaca"
	| "Ayia Napa"
	| "Island-wide";

type BroadbandISP = {
	name: string;
	type: "fibre" | "cable";
	maxSpeedDown: number; // Mbps
	maxSpeedUp: number; // Mbps
	monthlyPrice: number; // €
	contractMonths: number;
	setupFee: number; // €
	coverage: CoverageCity[];
	englishSupport: boolean;
	notes: string;
	website: string;
};

type MobileCarrier = {
	name: string;
	unlimitedDataPlan: number; // €/mo
	prepay10GBCost: number; // €
	coverage: number; // percent
	eSIM: boolean;
	internationalRoaming: boolean;
	notes: string;
	website: string;
};

const BROADBAND: BroadbandISP[] = [
	{
		name: "Cyta (Cytanet)",
		type: "fibre",
		maxSpeedDown: 1000,
		maxSpeedUp: 1000,
		monthlyPrice: 49,
		contractMonths: 12,
		setupFee: 0,
		coverage: ["Limassol", "Paphos", "Larnaca", "Ayia Napa"],
		englishSupport: true,
		notes:
			"State-owned incumbent. Largest coverage including rural areas. VDSL widely available; FTTH (fibre-to-the-home) rolling out fast in urban centres. Reliable customer service with English support. Bundle discounts available with Cyta mobile (MTN partnership). 1 Gbps symmetrical available in covered FTTH areas.",
		website: "https://www.cyta.com.cy",
	},
	{
		name: "Epic",
		type: "fibre",
		maxSpeedDown: 1000,
		maxSpeedUp: 1000,
		monthlyPrice: 45,
		contractMonths: 12,
		setupFee: 0,
		coverage: ["Limassol", "Paphos", "Larnaca"],
		englishSupport: true,
		notes:
			"Private telecoms company offering competitive fibre speeds in major cities. Generally regarded as slightly more agile than Cyta on pricing and customer support. Strong presence in Limassol. FTTH available in urban areas with 1 Gbps speeds. No Ayia Napa coverage. Bundle with Epic mobile for additional savings.",
		website: "https://www.epic.com.cy",
	},
	{
		name: "Primetel",
		type: "fibre",
		maxSpeedDown: 500,
		maxSpeedUp: 500,
		monthlyPrice: 42,
		contractMonths: 12,
		setupFee: 25,
		coverage: ["Limassol", "Larnaca"],
		englishSupport: true,
		notes:
			"Third-largest provider, operating in the main cities only. Competitive pricing with no contract options available (higher monthly rate). TV bundle (Primetel TV) popular with expat households wanting international channels. Fibre coverage more limited than Cyta or Epic; check availability at your specific address before signing.",
		website: "https://www.primetel.com.cy",
	},
	{
		name: "Cablenet",
		type: "cable",
		maxSpeedDown: 1000,
		maxSpeedUp: 500,
		monthlyPrice: 39,
		contractMonths: 12,
		setupFee: 30,
		coverage: ["Limassol", "Paphos", "Larnaca", "Ayia Napa"],
		englishSupport: true,
		notes:
			"Cable-based provider (DOCSIS 3.1) delivering some of the fastest real-world download speeds in Cyprus. Highly regarded for consistency and actual speeds versus advertised. Island-wide cable network including tourist areas. Upload speeds are asymmetric on the cable technology (lower than download). Strong reputation among remote workers and gamers for low latency.",
		website: "https://www.cablenet.com.cy",
	},
];

const MOBILE: MobileCarrier[] = [
	{
		name: "Cyta (MTN Cyprus)",
		unlimitedDataPlan: 22,
		prepay10GBCost: 12,
		coverage: 98,
		eSIM: true,
		internationalRoaming: true,
		notes:
			"Largest network coverage including rural and mountain areas. The Cyta and MTN networks are now operated together. Best for those spending time outside the main cities. Unlimited plans start at €22/mo; family plans available. Good roaming across EU (standard EU roaming rules apply). eSIM available.",
		website: "https://www.mtn.com.cy",
	},
	{
		name: "Epic",
		unlimitedDataPlan: 20,
		prepay10GBCost: 10,
		coverage: 95,
		eSIM: true,
		internationalRoaming: true,
		notes:
			"Strong urban coverage with competitive pricing. The cheapest unlimited data option at €20/mo. Slightly lower rural coverage than Cyta/MTN. 5G available in parts of Limassol. eSIM available. EU roaming included. Popular among expats for value-for-money.",
		website: "https://www.epic.com.cy",
	},
	{
		name: "Primetel Mobile",
		unlimitedDataPlan: 25,
		prepay10GBCost: 15,
		coverage: 90,
		eSIM: false,
		internationalRoaming: true,
		notes:
			"Smallest of the three mobile operators. Coverage focused on urban areas and main roads; gaps in rural and mountain areas. No eSIM currently. Better known for broadband than mobile. Worth considering for bundle deals if you are already using Primetel broadband. EU roaming included.",
		website: "https://www.primetel.com.cy",
	},
];

const COVERAGE_CITIES: CoverageCity[] = [
	"Limassol",
	"Paphos",
	"Larnaca",
	"Ayia Napa",
	"Island-wide",
];

const TYPE_LABEL = {
	fibre: "Fibre (FTTH)",
	cable: "Cable",
};

export default function ISPComparisonPage() {
	const [tab, setTab] = useState<"broadband" | "mobile">("broadband");
	const [cityFilter, setCityFilter] = useState<CoverageCity | "all">("all");

	const filteredBroadband = useMemo(() => {
		if (cityFilter === "all" || cityFilter === "Island-wide") return BROADBAND;
		return BROADBAND.filter(
			(isp) =>
				isp.coverage.includes(cityFilter) ||
				isp.coverage.includes("Island-wide"),
		);
	}, [cityFilter]);

	const providerLink = (name: string, website: string) => (
		<a
			href={website}
			target="_blank"
			rel="noopener noreferrer"
			className="font-bold text-ink hover:text-primary"
		>
			{name}
		</a>
	);

	return (
		<>
			<ChipGroup
				label="Show"
				hideLabel
				options={[
					{ value: "broadband", label: "Home broadband" },
					{ value: "mobile", label: "Mobile" },
				]}
				value={tab}
				onChange={setTab}
			/>

			{tab === "broadband" && (
				<>
					<ChipGroup
						label="Filter by city coverage"
						options={[
							{ value: "all" as const, label: "All areas" },
							...COVERAGE_CITIES.filter((c) => c !== "Island-wide").map(
								(c) => ({ value: c, label: c }),
							),
						]}
						value={cityFilter}
						onChange={setCityFilter}
					/>

					<DataTable
						caption="Home broadband providers in Cyprus"
						hideCaption
						zebra
						columns={[
							{ header: "Provider" },
							{ header: "Type" },
							{ header: "Max down", align: "right" },
							{ header: "Max up", align: "right" },
							{ header: "Price/mo", align: "right" },
							{ header: "Contract", align: "right" },
							{ header: "Setup fee", align: "right" },
							{ header: "English" },
						]}
						rows={filteredBroadband.map((isp) => [
							<>
								{providerLink(isp.name, isp.website)}
								<span className="mt-0.5 block text-xs font-normal text-muted">
									{isp.coverage.join(", ")}
								</span>
							</>,
							<Badge key="t">{TYPE_LABEL[isp.type]}</Badge>,
							`${isp.maxSpeedDown} Mbps`,
							`${isp.maxSpeedUp} Mbps`,
							<span key="p" className="font-bold text-primary-hover">
								€{isp.monthlyPrice}
							</span>,
							`${isp.contractMonths} mo`,
							isp.setupFee === 0 ? "Free" : `€${isp.setupFee}`,
							isp.englishSupport ? "Yes" : "No",
						])}
					/>

					<div className="space-y-4">
						{filteredBroadband.map((isp) => (
							<div
								key={isp.name}
								className="rounded-card border border-line bg-white p-4"
							>
								<h2 className="mb-1 text-base font-semibold text-ink">
									{isp.name}
								</h2>
								<p className="text-sm leading-relaxed text-muted">
									{isp.notes}
								</p>
							</div>
						))}
					</div>
				</>
			)}

			{tab === "mobile" && (
				<>
					<DataTable
						caption="Mobile carriers in Cyprus"
						hideCaption
						zebra
						columns={[
							{ header: "Carrier" },
							{ header: "Unlimited plan", align: "right" },
							{ header: "Prepay 10 GB", align: "right" },
							{ header: "Coverage", align: "right" },
							{ header: "eSIM" },
							{ header: "EU roaming" },
						]}
						rows={MOBILE.map((c) => [
							providerLink(c.name, c.website),
							<span key="p" className="font-bold text-primary-hover">
								€{c.unlimitedDataPlan}/mo
							</span>,
							`€${c.prepay10GBCost}`,
							`${c.coverage}%`,
							c.eSIM ? "Yes" : "No",
							c.internationalRoaming ? "Yes" : "No",
						])}
					/>

					<div className="space-y-4">
						{MOBILE.map((carrier) => (
							<div
								key={carrier.name}
								className="rounded-card border border-line bg-white p-4"
							>
								<h2 className="mb-1 text-base font-semibold text-ink">
									{carrier.name}
								</h2>
								<p className="text-sm leading-relaxed text-muted">
									{carrier.notes}
								</p>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}
