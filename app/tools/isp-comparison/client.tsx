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
		coverage: ["Limassol", "Paphos", "Larnaca", "Ayia Napa"],
		englishSupport: true,
		notes:
			"State-owned incumbent. Largest coverage including rural areas. VDSL widely available; FTTH (fibre-to-the-home) rolling out fast in urban centres. Reliable customer service with English support. Bundle discounts available with Cyta mobile (MTN partnership).",
		website: "https://www.cyta.com.cy",
	},
	{
		name: "Epic",
		type: "fibre",
		coverage: ["Limassol", "Paphos", "Larnaca"],
		englishSupport: true,
		notes:
			"Private telecoms company offering competitive fibre speeds in major cities. Generally regarded as slightly more agile than Cyta on pricing and customer support. Strong presence in Limassol. FTTH available in urban areas. No Ayia Napa coverage. Bundle with Epic mobile for additional savings.",
		website: "https://www.epic.com.cy",
	},
	{
		name: "Primetel",
		type: "fibre",
		coverage: ["Limassol", "Larnaca"],
		englishSupport: true,
		notes:
			"Third-largest provider, operating in the main cities only. TV bundle (Primetel TV) popular with expat households wanting international channels. Fibre coverage more limited than Cyta or Epic; check availability at your specific address before signing.",
		website: "https://www.primetel.com.cy",
	},
	{
		name: "Cablenet",
		type: "cable",
		coverage: ["Limassol", "Paphos", "Larnaca", "Ayia Napa"],
		englishSupport: true,
		notes:
			"Cable-based provider (DOCSIS 3.1) with an island-wide network including tourist areas. Upload speeds are asymmetric on the cable technology (lower than download).",
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

					<h2 className="text-xl font-semibold text-ink">
						Fastest home internet in Cyprus: 1 Gbps plans compared
					</h2>
					<p className="text-sm leading-relaxed text-muted">
						Speeds, prices and contract terms change often and depend on
						bundles and promotions, so this page does not quote them. Use the
						links below to see current plans on each provider site.
					</p>
					<DataTable
						caption="Home broadband providers in Cyprus"
						hideCaption
						zebra
						columns={[
							{ header: "Provider" },
							{ header: "Type" },
							{ header: "Current plans and prices" },
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
							<a
								key="l"
								href={isp.website}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								Check plans
							</a>,
							isp.englishSupport ? "Yes" : "No",
						])}
					/>

					<h2 className="text-xl font-semibold text-ink">
						Check availability at your address
					</h2>
					<p className="text-sm leading-relaxed text-muted">
						Fibre and cable coverage differs street by street. Confirm
						availability for your exact address on the provider site before
						signing.
					</p>
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
