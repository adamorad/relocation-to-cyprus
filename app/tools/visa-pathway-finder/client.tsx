"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/Chip";
import {
	DNV_EXAMINATION_WEEKS,
	DNV_NET_MONTHLY_INCOME,
	eur,
	PR_INCOME_CHILD,
	PR_INCOME_MIN,
	PR_INCOME_SPOUSE,
	PR_INVESTMENT_MIN,
	VISITOR_PERMIT_MONTHLY_INCOME,
} from "@/lib/facts/tax";

const MIGRATION_DEPT_URL = "https://www.gov.cy/mip-md/en/";
const MEU1_URL =
	"https://www.gov.cy/mip-md/en/documents/e-u-e-e-a-citizens-and-family-members-2/e-u-e-e-a-citizens-family-member/registration-of-e-u-citizens-and-members-of-their-families-who-are-also-e-u-e-e-a-citizens-meu1/";
const DNV_URL =
	"https://www.gov.cy/mip-md/en/documents/digital-nomads-and-family-members/";
const INVESTOR_URL =
	"https://www.gov.cy/mip-md/en/documents/companies-investors-permanent-residence-3/immigration-permits-for-investors/";
const VISITOR_URL =
	"https://www.gov.cy/mip-md/en/documents/visitors-and-family-members/";

type CitizenshipStatus = "eu" | "non-eu" | null;
type EuPurpose =
	| "employment"
	| "self-employed"
	| "self-sufficient"
	| "retired"
	| null;
type NonEuPurpose =
	| "remote-work"
	| "cyprus-employer"
	| "investment"
	| "retired"
	| "student"
	| null;

interface Pathway {
	name: string;
	description: string;
	keyRequirement: string;
	processingTime: string;
	guideSlug?: string;
	guideLabel?: string;
	officialLink?: string;
	officialLabel?: string;
}

const EU_PATHWAYS: Record<NonNullable<EuPurpose>, Pathway> = {
	employment: {
		name: "EU Registration Certificate (MEU1): Employed",
		description:
			"EU citizens working in Cyprus do not need a visa. After 90 days, you must register your residence at the Civil Registry. As an employed person you present your employment contract.",
		keyRequirement:
			"Employment contract with a Cyprus-registered employer, proof of accommodation, valid EU passport or ID.",
		processingTime: "2–4 weeks after appointment",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: MEU1_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
	"self-employed": {
		name: "EU Registration Certificate (MEU1): Self-Employed",
		description:
			"EU citizens running their own business in Cyprus register via the MEU1 process. You need to demonstrate genuine economic activity — typically via a company registration, tax registration (TIC), or freelance income evidence.",
		keyRequirement:
			"Proof of self-employment (company registration or freelance contracts), accommodation, health insurance or GeSY registration, sufficient funds.",
		processingTime: "2–4 weeks after appointment",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: MEU1_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
	"self-sufficient": {
		name: "EU Registration Certificate (MEU1): Self-Sufficient",
		description:
			"EU citizens who are financially independent (not working in Cyprus) can register by proving sufficient funds to support themselves without recourse to Cyprus's social welfare system.",
		keyRequirement:
			"Evidence of enough regular income or savings to support yourself without social assistance (no fixed amount is published), comprehensive health insurance, proof of accommodation.",
		processingTime: "2–4 weeks after appointment",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: MEU1_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
	retired: {
		name: "EU Registration Certificate (MEU1): Retired",
		description:
			"EU retired citizens follow the self-sufficient MEU1 route. Pension income qualifies as proof of sufficient funds. No fixed amount is published: you show enough regular income to support yourself without social assistance.",
		keyRequirement:
			"Proof of pension income, comprehensive private health insurance (recommended in addition to GeSY), proof of accommodation.",
		processingTime: "2–4 weeks after appointment",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: MEU1_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
};

const NON_EU_PATHWAYS: Record<NonNullable<NonEuPurpose>, Pathway> = {
	"remote-work": {
		name: "Digital Nomad Visa",
		description:
			"Cyprus's Digital Nomad Visa (DNV) is designed for non-EU nationals who work remotely for foreign employers or serve non-Cypriot clients as freelancers. Issued for 1 year and can be renewed for up to two more years. Covers spouse and dependent children.",
		keyRequirement: `Minimum net monthly income of ${eur(DNV_NET_MONTHLY_INCOME)} (€4,200 with a spouse, +15% per dependent child). Employment contract or freelance contracts with non-Cyprus clients. No working for Cyprus-based employers.`,
		processingTime: `${DNV_EXAMINATION_WEEKS.from} to ${DNV_EXAMINATION_WEEKS.to} weeks from a complete application (official examination time)`,
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: DNV_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
	"cyprus-employer": {
		name: "Work Permit (Employment Visa, Category E)",
		description:
			"Non-EU nationals who have a job offer from a Cyprus-registered employer need a work permit. The employer usually initiates the application with the Department of Labour. The process involves demonstrating no suitable EU candidate was available for the role.",
		keyRequirement:
			"Job offer from a Cyprus employer, employer demonstrates labour market test (proof no EU candidate was available), clean criminal record, medical certificate.",
		processingTime: "2–4 months (employer-led application)",
		officialLink:
			"https://www.mlsi.gov.cy/mlsi/dl/dl.nsf/index_en/index_en?OpenDocument",
		officialLabel: "Labour Department (mlsi.gov.cy)",
	},
	investment: {
		name: "Permanent Residency by Investment (Regulation 6(2))",
		description:
			"Non-EU nationals who purchase qualifying Cyprus real estate can obtain Permanent Residency. No minimum stay is required once granted. Does not directly lead to citizenship (a separate 7-year naturalisation track applies).",
		keyRequirement: `Purchase of a new house or apartment from a developer for at least ${eur(PR_INVESTMENT_MIN)} (ex-VAT), paid with funds transferred to Cyprus from abroad, from your own (or your spouse's) bank account. Secured annual income from abroad of at least ${eur(PR_INCOME_MIN)} (+${eur(PR_INCOME_SPOUSE)} for a spouse, +${eur(PR_INCOME_CHILD)} per dependent child).`,
		processingTime:
			"About 2 months to examine a complete application (Migration Department estimate)",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: INVESTOR_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
	retired: {
		name: "Visitor residence permit (retirees and passive income)",
		description:
			"Non-EU retirees and others living on a pension or other passive income, without working in Cyprus, usually apply for a Visitor temporary residence permit. It is issued for one year and renewed. Permanent residence is a separate route (by investment, or the Category F income-based immigration permit).",
		keyRequirement: `Transfers from abroad of at least ${eur(VISITOR_PERMIT_MONTHLY_INCOME)} a month (€24,000 a year), +20% for a spouse, +15% per child; 10-year bank guarantee; health insurance; accommodation.`,
		processingTime:
			"Check current examination times with the Migration Department",
		guideSlug: "retiring-in-cyprus",
		guideLabel: "Retiring in Cyprus guide",
		officialLink: VISITOR_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
	student: {
		name: "Student Visa / Temporary Residence Permit",
		description:
			"Non-EU students enrolled at a recognised Cyprus university or educational institution can obtain a Temporary Residence Permit for the duration of their studies. Most applications are coordinated through the institution.",
		keyRequirement:
			"Acceptance letter from a recognised Cyprus institution, proof of sufficient funds to cover tuition and living costs, comprehensive health insurance.",
		processingTime: "4–8 weeks",
		officialLink: MIGRATION_DEPT_URL,
		officialLabel: "Migration Department (gov.cy)",
	},
};

export default function VisaPathwayFinderPage() {
	const [citizenship, setCitizenship] = useState<CitizenshipStatus>(null);
	const [euPurpose, setEuPurpose] = useState<EuPurpose>(null);
	const [nonEuPurpose, setNonEuPurpose] = useState<NonEuPurpose>(null);

	const reset = () => {
		setCitizenship(null);
		setEuPurpose(null);
		setNonEuPurpose(null);
	};

	let pathway: Pathway | null = null;
	if (citizenship === "eu" && euPurpose) {
		pathway = EU_PATHWAYS[euPurpose];
	} else if (citizenship === "non-eu" && nonEuPurpose) {
		pathway = NON_EU_PATHWAYS[nonEuPurpose];
	}

	return (
		<div className="flex flex-col gap-6">
			<section
				aria-labelledby="visa-q1"
				className="space-y-3 rounded-card border border-line bg-white p-5 shadow-rc"
			>
				<div className="flex items-center justify-between gap-3">
					<h2 id="visa-q1" className="text-lg font-bold text-ink">
						Q1. What is your citizenship status?
					</h2>
					{citizenship && (
						<Button variant="ghost" onClick={reset}>
							Reset
						</Button>
					)}
				</div>
				<ChipGroup
					label="Citizenship status"
					hideLabel
					options={[
						{ value: "eu", label: "EU citizen" },
						{ value: "non-eu", label: "Non-EU citizen" },
					]}
					value={citizenship ?? ""}
					onChange={(v) => {
						setCitizenship(v as CitizenshipStatus);
						setEuPurpose(null);
						setNonEuPurpose(null);
					}}
				/>
			</section>

			{citizenship === "eu" && (
				<section
					aria-labelledby="visa-q2"
					className="space-y-3 rounded-card border border-line bg-white p-5 shadow-rc"
				>
					<h2 id="visa-q2" className="text-lg font-bold text-ink">
						Q2. What will you be doing in Cyprus?
					</h2>
					<ChipGroup
						label="Purpose of stay"
						hideLabel
						options={[
							{ value: "employment", label: "Employed" },
							{ value: "self-employed", label: "Self-employed" },
							{ value: "self-sufficient", label: "Self-sufficient" },
							{ value: "retired", label: "Retired" },
						]}
						value={euPurpose ?? ""}
						onChange={(v) => setEuPurpose(v as EuPurpose)}
					/>
				</section>
			)}

			{citizenship === "non-eu" && (
				<section
					aria-labelledby="visa-q2"
					className="space-y-3 rounded-card border border-line bg-white p-5 shadow-rc"
				>
					<h2 id="visa-q2" className="text-lg font-bold text-ink">
						Q2. What will you do in Cyprus?
					</h2>
					<ChipGroup
						label="Purpose of stay"
						hideLabel
						options={[
							{
								value: "remote-work",
								label: "Remote work for foreign employer",
							},
							{ value: "cyprus-employer", label: "Work for Cyprus employer" },
							{ value: "investment", label: "Investment / wealth" },
							{ value: "retired", label: "Retired" },
							{ value: "student", label: "Student" },
						]}
						value={nonEuPurpose ?? ""}
						onChange={(v) => setNonEuPurpose(v as NonEuPurpose)}
					/>
				</section>
			)}

			{pathway && (
				<section
					aria-labelledby="visa-result"
					className="rounded-card border-2 border-primary bg-white p-5 md:p-6"
				>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-hover">
						Recommended pathway
					</p>
					<h2 id="visa-result" className="mb-3 mt-1 text-xl font-bold text-ink">
						{pathway.name}
					</h2>
					<p className="mb-4 text-base leading-relaxed text-ink">
						{pathway.description}
					</p>
					<dl className="mb-5 space-y-3">
						<div>
							<dt className="text-sm font-semibold text-muted">
								Key requirement
							</dt>
							<dd className="text-base text-ink">{pathway.keyRequirement}</dd>
						</div>
						<div>
							<dt className="text-sm font-semibold text-muted">
								Processing time
							</dt>
							<dd className="text-base text-ink">{pathway.processingTime}</dd>
						</div>
					</dl>
					<div className="flex flex-wrap gap-3">
						{pathway.guideSlug && (
							<ButtonLink href={`/guides/${pathway.guideSlug}/`}>
								{pathway.guideLabel || "Read the guide"}
							</ButtonLink>
						)}
						{pathway.officialLink && (
							<ButtonLink href={pathway.officialLink} variant="secondary">
								{pathway.officialLabel || "Official site"}
							</ButtonLink>
						)}
					</div>
				</section>
			)}
		</div>
	);
}
