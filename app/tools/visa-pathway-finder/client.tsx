"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/Chip";

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
		officialLink: "https://crmd.moi.gov.cy",
		officialLabel: "Book at crmd.moi.gov.cy",
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
		officialLink: "https://crmd.moi.gov.cy",
		officialLabel: "Book at crmd.moi.gov.cy",
	},
	"self-sufficient": {
		name: "EU Registration Certificate (MEU1): Self-Sufficient",
		description:
			"EU citizens who are financially independent (not working in Cyprus) can register by proving sufficient funds to support themselves without recourse to Cyprus's social welfare system.",
		keyRequirement:
			"Bank statements showing approximately €30,000–€40,000/year income from abroad, comprehensive private health insurance, proof of accommodation.",
		processingTime: "2–4 weeks after appointment",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: "https://crmd.moi.gov.cy",
		officialLabel: "Book at crmd.moi.gov.cy",
	},
	retired: {
		name: "EU Registration Certificate (MEU1): Retired",
		description:
			"EU retired citizens follow the self-sufficient MEU1 route. Pension income qualifies as proof of sufficient funds. Cyprus has no minimum pension threshold for EU citizens, but €2,000–€3,000/month is typically sufficient in practice.",
		keyRequirement:
			"Proof of pension income, comprehensive private health insurance (recommended in addition to GeSY), proof of accommodation.",
		processingTime: "2–4 weeks after appointment",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: "https://crmd.moi.gov.cy",
		officialLabel: "Book at crmd.moi.gov.cy",
	},
};

const NON_EU_PATHWAYS: Record<NonNullable<NonEuPurpose>, Pathway> = {
	"remote-work": {
		name: "Digital Nomad Visa",
		description:
			"Cyprus's Digital Nomad Visa (DNV) is designed for non-EU nationals who work remotely for foreign employers or serve non-Cypriot clients as freelancers. Issued for 1 year, renewable up to 3 years. Covers spouse and dependent children.",
		keyRequirement:
			"Minimum net monthly income of €3,500 (€4,200 with a spouse, +15% per dependent child). Employment contract or freelance contracts with non-Cyprus clients. No working for Cyprus-based employers.",
		processingTime: "5–8 weeks from full application",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink:
			"https://www.mfa.gov.cy/mfa/mfa2016.nsf/All/0E3FE0BDC725C79AC22587100025B77E",
		officialLabel: "Apply at mfa.gov.cy",
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
		name: "Permanent Residency by Investment (Category F / Reg 6(2))",
		description:
			"Non-EU nationals who purchase qualifying Cyprus real estate can obtain Permanent Residency. No minimum stay is required once granted. Does not directly lead to citizenship (a separate 7-year naturalisation track applies).",
		keyRequirement:
			"Purchase of a newly-built residential property for at least €300,000 (ex-VAT), paid from a Cypriot bank account. Annual income of at least €50,000 from outside Cyprus (+€15,000 per spouse, +€10,000 per child).",
		processingTime: "6–12 months",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: "https://crmd.moi.gov.cy",
		officialLabel: "Civil Registry (crmd.moi.gov.cy)",
	},
	retired: {
		name: "Permanent Residency by Income (Category F / Self-Sufficient)",
		description:
			"Non-EU retirees or financially independent individuals can obtain Permanent Residency by demonstrating stable income from abroad. Property purchase of at least €300,000 is still required unless applying under a long-stay visa.",
		keyRequirement:
			"Annual income of at least €50,000 from outside Cyprus (pension, investments, rental income), property purchase of €300,000+, comprehensive health insurance.",
		processingTime: "6–12 months",
		guideSlug: "residency-and-visas",
		guideLabel: "Residency & Visas guide",
		officialLink: "https://crmd.moi.gov.cy",
		officialLabel: "Civil Registry (crmd.moi.gov.cy)",
	},
	student: {
		name: "Student Visa / Temporary Residence Permit",
		description:
			"Non-EU students enrolled at a recognised Cyprus university or educational institution can obtain a Temporary Residence Permit for the duration of their studies. Most applications are coordinated through the institution.",
		keyRequirement:
			"Acceptance letter from a recognised Cyprus institution, proof of sufficient funds to cover tuition and living costs, comprehensive health insurance.",
		processingTime: "4–8 weeks",
		officialLink: "https://crmd.moi.gov.cy",
		officialLabel: "Civil Registry (crmd.moi.gov.cy)",
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
