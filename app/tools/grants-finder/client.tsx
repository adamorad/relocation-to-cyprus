"use client";

import { useMemo, useState } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import { SRC } from "@/lib/facts/health-transport";

type Sector =
	| "tech"
	| "hospitality"
	| "manufacturing"
	| "energy"
	| "agri"
	| "research"
	| "retail"
	| "general";

type CompanySize = "micro" | "sme" | "large";

// "check": the programme exists or existed, but whether it is open now (and
// its amounts and dates) could not be confirmed (fact-check C9-c).
type GrantStatus = "open" | "closed" | "check";

type Grant = {
	name: string;
	adminBody: string;
	targetSectors: Sector[];
	eligibility: string;
	deadline: string;
	status: GrantStatus;
	companySizes: CompanySize[];
	url: string;
	description: string;
};

const SECTOR_LABELS: Record<Sector, string> = {
	tech: "Technology",
	hospitality: "Hospitality & Tourism",
	manufacturing: "Manufacturing",
	energy: "Renewable Energy",
	agri: "Agriculture & Food",
	research: "Research & Innovation",
	retail: "Retail & Services",
	general: "All Sectors",
};

const ALL_SECTORS: Sector[] = [
	"tech",
	"hospitality",
	"manufacturing",
	"energy",
	"agri",
	"research",
	"retail",
	"general",
];
const ALL_SIZES: CompanySize[] = ["micro", "sme", "large"];
const ALL_STATUSES: GrantStatus[] = ["open", "check", "closed"];

const SIZE_LABELS: Record<CompanySize, string> = {
	micro: "Micro (<10 employees, <€2M turnover)",
	sme: "SME (<250 employees, <€50M turnover)",
	large: "Large Enterprise",
};

const GRANTS: ReadonlyArray<Grant> = [
	{
		name: "INNOVATE: Innovate for Competitiveness",
		adminBody: "Research and Innovation Foundation (RIF)",
		targetSectors: ["tech", "manufacturing", "research", "general"],
		eligibility:
			"Cyprus-registered SMEs with a demonstrable R&D component and market readiness. Partnerships with research institutions preferred.",
		deadline:
			"Closed. Check the Research and Innovation Foundation for the next call",
		status: "closed",
		companySizes: ["sme"],
		url: "https://www.research.org.cy",
		description:
			"Supports innovation and technology transfer, including collaborative R&D projects between businesses and research organisations.",
	},
	{
		name: "MECIT Digital Transformation Subsidy",
		adminBody: "Ministry of Energy, Commerce and Industry (MECIT)",
		targetSectors: ["tech", "manufacturing", "retail", "general"],
		eligibility:
			"Cypriot SMEs pursuing digital transformation. Must be registered and operating in Cyprus.",
		deadline:
			"Not confirmed. Check the funding programmes portal for current calls",
		status: "check",
		companySizes: ["micro", "sme"],
		url: SRC.fundingPortal.url,
		description:
			"Supports SME digitisation: ERP systems, e-commerce, cybersecurity, cloud adoption and digital marketing investments.",
	},
	{
		name: "MECIT Green Business Programme",
		adminBody: "Ministry of Energy, Commerce and Industry (MECIT)",
		targetSectors: ["energy", "manufacturing", "general"],
		eligibility:
			"Cyprus-registered businesses investing in green practices, energy efficiency, and circular economy. All sizes eligible.",
		deadline: "Closed. Check MECIT for the next call",
		status: "closed",
		companySizes: ["micro", "sme", "large"],
		url: "https://www.mcit.gov.cy",
		description:
			"Incentivises environmentally responsible business practices: energy audits, renewable energy installation, waste reduction, sustainable supply chains.",
	},
	{
		name: "INTERREG Med: Blue Mediterranean Platform",
		adminBody: "EU INTERREG Mediterranean Programme",
		targetSectors: ["hospitality", "agri", "energy", "general"],
		eligibility:
			"Organisations in EU Mediterranean coastal regions (including Cyprus). Requires a transnational project partnership with at least 3 countries.",
		deadline:
			"Closed. Check the Interreg Mediterranean programme for the next call",
		status: "closed",
		companySizes: ["micro", "sme", "large"],
		url: "https://interreg-med.eu",
		description:
			"Cross-border cooperation for sustainable development in the Mediterranean. Covers blue economy, sustainable tourism, and climate resilience.",
	},
	{
		name: "INTERREG VI-A Greece-Cyprus 2021-2027",
		adminBody: "EU INTERREG Greece-Cyprus Programme",
		targetSectors: ["tech", "energy", "agri", "research", "general"],
		eligibility:
			"Organisations in Cyprus and eligible Greek regions. Partnership with Greek counterpart required. Public bodies, NGOs, research orgs and businesses eligible.",
		deadline:
			"Closed. Check the Interreg Greece-Cyprus programme for the next call",
		status: "closed",
		companySizes: ["micro", "sme", "large"],
		url: "https://www.greece-cyprus.eu",
		description:
			"Joint Greece-Cyprus programme covering smart growth, green transition, cross-border cooperation and cultural/tourism development.",
	},
	{
		name: "Cyprus SME Competitiveness Grant",
		adminBody: "Deputy Ministry of Research, Innovation and Digital Policy",
		targetSectors: ["manufacturing", "tech", "retail", "general"],
		eligibility:
			"SMEs registered and operating in Cyprus for at least 2 years. Must demonstrate impact on competitiveness, exports or employment.",
		deadline:
			"Closed. Check the Deputy Ministry of Research, Innovation and Digital Policy for the next call",
		status: "closed",
		companySizes: ["micro", "sme"],
		url: "https://www.gov.cy/dmrid/en/",
		description:
			"Broad competitiveness support for Cypriot SMEs. Covers equipment, process improvement, certification, quality management and market access.",
	},
	{
		name: "Agri-Food Innovation Fund (AIFUND)",
		adminBody: "Ministry of Agriculture, Rural Development and Environment",
		targetSectors: ["agri"],
		eligibility:
			"Agricultural businesses, food processors and agri-tech startups. Must be operating in Cyprus with activities in primary production or processing.",
		deadline:
			"Not confirmed. Check the funding programmes portal for current calls",
		status: "check",
		companySizes: ["micro", "sme"],
		url: SRC.fundingPortal.url,
		description:
			"Supports innovation in Cyprus's agri-food sector: precision farming, food safety, organic certification, vertical farming and export development.",
	},
	{
		name: "Rural Development Programme: Business Support",
		adminBody:
			"Ministry of Agriculture, Rural Development and Environment (EAFRD)",
		targetSectors: ["agri", "hospitality", "general"],
		eligibility:
			"Businesses and agricultural holdings in rural areas of Cyprus. Strong preference for projects that create local employment.",
		deadline:
			"Not confirmed. Check the funding programmes portal for current calls",
		status: "check",
		companySizes: ["micro", "sme"],
		url: SRC.fundingPortal.url,
		description:
			"EU-funded rural development support. Covers diversification of agricultural activity, agro-tourism, rural infrastructure and village business development.",
	},
	{
		name: "Tourism Competitiveness and Sustainability Grant",
		adminBody: "Deputy Ministry of Tourism",
		targetSectors: ["hospitality"],
		eligibility:
			"Hotels, agro-tourism operators, tour operators and hospitality businesses registered in Cyprus. Minimum 2 years of operation.",
		deadline: "Closed. Check the Deputy Ministry of Tourism for the next call",
		status: "closed",
		companySizes: ["micro", "sme", "large"],
		url: "https://www.visitcyprus.com",
		description:
			"Supports tourism product quality improvement, sustainability certification, accessible tourism investment, and digital marketing for Cyprus tourism businesses.",
	},
	{
		name: "Horizon Europe: EIC Accelerator",
		adminBody: "European Innovation Council (European Commission)",
		targetSectors: ["tech", "research", "energy", "general"],
		eligibility:
			"Deep-tech startups and scale-ups from EU member states (including Cyprus). Must target breakthrough innovation. Open to individuals and incorporated companies.",
		deadline:
			"Not confirmed. Check the European Innovation Council for current cut-off dates",
		status: "check",
		companySizes: ["micro", "sme"],
		url: "https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en",
		description:
			"The EU's flagship deep-tech startup funding programme, combining grant funding with equity investment. Highly competitive.",
	},
	{
		name: "Digital Economy and Society Investment Plan",
		adminBody: "Deputy Ministry of Research, Innovation and Digital Policy",
		targetSectors: ["tech", "retail", "general"],
		eligibility:
			"Micro and small businesses investing in digital tools. Businesses must be registered and operating in Cyprus.",
		deadline:
			"Closed. Check the Deputy Ministry of Research, Innovation and Digital Policy for the next call",
		status: "closed",
		companySizes: ["micro"],
		url: "https://www.gov.cy/dmrid/en/",
		description:
			"Vouchers and grants for micro-businesses to adopt digital tools: websites, accounting software, digital payments, online marketing and cybersecurity.",
	},
	{
		name: "Employment Incentive Scheme: Hiring Support",
		adminBody: "Human Resources Development Authority (HRDA)",
		targetSectors: ["general"],
		eligibility:
			"Cyprus-registered businesses hiring unemployed persons or persons from vulnerable groups. Valid employment contract required.",
		deadline:
			"Not confirmed. Check the funding programmes portal for current calls",
		status: "check",
		companySizes: ["micro", "sme", "large"],
		url: "https://www.hrdauth.org.cy",
		description:
			"Wage subsidy when hiring unemployed or disadvantaged workers. Check current terms with the HRDA.",
	},
	{
		name: "HRDA Training Grants for Employers",
		adminBody: "Human Resources Development Authority (HRDA)",
		targetSectors: ["general"],
		eligibility:
			"All Cyprus-registered employers with at least one employee. Training must relate to business operations and be approved in advance.",
		deadline:
			"Not confirmed. Check the funding programmes portal for current calls",
		status: "check",
		companySizes: ["micro", "sme", "large"],
		url: "https://www.hrdauth.org.cy",
		description:
			"Reimburses part of approved training costs: external courses, certifications, language training and professional development programmes. Check current terms with the HRDA.",
	},
	{
		name: "InvestEU guarantees (through Cypriot partner banks)",
		adminBody: "European Investment Fund (InvestEU)",
		targetSectors: ["general"],
		eligibility:
			"SMEs in Cyprus seeking business loans, through banks that take part in InvestEU.",
		deadline: "Ask your bank whether it offers InvestEU-backed loans",
		status: "check",
		companySizes: ["micro", "sme"],
		url: "https://single-market-economy.ec.europa.eu/access-finance/policy-areas/eu-supported-loans-guarantees-and-equity-investments_en",
		description:
			"EU-backed loan guarantees under InvestEU, which replaced the COSME loan guarantee facility. Ask your bank whether it offers InvestEU-backed SME loans.",
	},
	{
		name: "InvestCyprus Incentive Package",
		adminBody: "Invest Cyprus (Cyprus Investment Promotion Agency)",
		targetSectors: ["tech", "energy", "manufacturing", "research", "general"],
		eligibility:
			"Foreign investors and international companies establishing or expanding operations in Cyprus. Various incentives available depending on investment size and sector.",
		deadline: "Not confirmed. Check with Invest Cyprus",
		status: "check",
		companySizes: ["sme", "large"],
		url: "https://www.investcyprus.org.cy",
		description:
			"Package of fiscal incentives, fast-track licensing, and support services for foreign direct investment into Cyprus. Tailored by sector and investment size.",
	},
];

// Filter chips only for values that at least one programme has, so no chip
// leads to an empty list (e.g. no programme is "open" between calls).
const SECTOR_OPTIONS = ALL_SECTORS.filter((s) =>
	GRANTS.some((g) => g.targetSectors.includes(s)),
);
const SIZE_OPTIONS = ALL_SIZES.filter((s) =>
	GRANTS.some((g) => g.companySizes.includes(s)),
);
const STATUS_OPTIONS = ALL_STATUSES.filter((s) =>
	GRANTS.some((g) => g.status === s),
);

export default function GrantsFinderPage() {
	const [selectedSector, setSelectedSector] = useState<Sector | "all">("all");
	const [selectedSize, setSelectedSize] = useState<CompanySize | "all">("all");
	const [selectedStatus, setSelectedStatus] = useState<GrantStatus | "all">(
		"all",
	);

	const filtered = useMemo(() => {
		return GRANTS.filter((g) => {
			const matchesSector =
				selectedSector === "all" || g.targetSectors.includes(selectedSector);
			const matchesSize =
				selectedSize === "all" || g.companySizes.includes(selectedSize);
			const matchesStatus =
				selectedStatus === "all" || g.status === selectedStatus;
			return matchesSector && matchesSize && matchesStatus;
		});
	}, [selectedSector, selectedSize, selectedStatus]);

	const statusTones: Record<GrantStatus, BadgeTone> = {
		open: "success",
		check: "warning",
		closed: "neutral",
	};

	const statusLabels: Record<GrantStatus, string> = {
		open: "Open",
		check: "Check status",
		closed: "Closed",
	};

	return (
		<>
			{/* Filters */}
			<div className="space-y-5 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="Sector"
					value={selectedSector}
					onChange={setSelectedSector}
					options={[
						{ value: "all", label: "All Sectors" },
						...SECTOR_OPTIONS.map((s) => ({
							value: s,
							label: SECTOR_LABELS[s],
						})),
					]}
				/>
				<div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-8">
					<ChipGroup
						label="Company size"
						value={selectedSize}
						onChange={setSelectedSize}
						options={[
							{ value: "all", label: "Any size" },
							...SIZE_OPTIONS.map((s) => ({
								value: s,
								label: s === "micro" ? "Micro" : s === "sme" ? "SME" : "Large",
							})),
						]}
					/>
					<ChipGroup
						label="Status"
						value={selectedStatus}
						onChange={setSelectedStatus}
						options={[
							{ value: "all", label: "All" },
							...STATUS_OPTIONS.map((s) => ({
								value: s,
								label: statusLabels[s],
							})),
						]}
					/>
				</div>
			</div>

			{/* Result count */}
			<h2
				className="text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				Showing {filtered.length} of {GRANTS.length} programmes
			</h2>

			{filtered.length === 0 && (
				<div className="py-12 text-center text-muted">
					No grants match your current filters. Try broadening your search.
				</div>
			)}
			<CardGrid cols={1}>
				{filtered.map((g) => (
					<CardGridItem key={g.name}>
						<article className="w-full rounded-card border border-line bg-white p-5">
							<div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
								<div>
									<div className="mb-1 flex flex-wrap items-center gap-2">
										<Badge tone={statusTones[g.status]}>
											{statusLabels[g.status]}
										</Badge>
										{g.targetSectors.map((s) => (
											<span
												key={s}
												className="rounded-full bg-sky px-2 py-0.5 text-xs text-ink"
											>
												{SECTOR_LABELS[s]}
											</span>
										))}
									</div>
									<h3 className="text-base font-bold leading-snug text-ink">
										{g.name}
									</h3>
									<p className="mt-0.5 text-sm text-muted">{g.adminBody}</p>
								</div>
							</div>

							<p className="mb-3 text-sm leading-relaxed text-ink">
								{g.description}
							</p>

							<div className="grid grid-cols-1 gap-3 border-t border-line pt-3 text-sm sm:grid-cols-2">
								<div>
									<p className="mb-1 text-sm font-semibold text-muted">
										Eligibility
									</p>
									<p className="text-sm leading-relaxed text-ink">
										{g.eligibility}
									</p>
								</div>
								<div>
									<div className="mb-2">
										<p className="mb-1 text-sm font-semibold text-muted">
											Deadline
										</p>
										<p className="text-sm font-semibold text-ink">
											{g.deadline}
										</p>
									</div>
									<div>
										<p className="mb-1 text-sm font-semibold text-muted">
											Company sizes
										</p>
										<div className="flex flex-wrap gap-1">
											{g.companySizes.map((s) => (
												<Badge key={s}>
													{s === "sme"
														? "SME"
														: s.charAt(0).toUpperCase() + s.slice(1)}
												</Badge>
											))}
										</div>
									</div>
								</div>
							</div>

							{g.url && (
								<div className="mt-3 border-t border-line pt-3">
									<a
										href={g.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline hover:text-primary-hover"
									>
										Official source
									</a>
								</div>
							)}
						</article>
					</CardGridItem>
				))}
			</CardGrid>
		</>
	);
}
