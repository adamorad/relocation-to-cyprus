"use client";

import { useId, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";
import {
	GESY_EMPLOYER_RATE,
	GESY_INCOME_CAP,
	GESY_RATE,
	GESY_SELF_EMPLOYED_RATE,
	HRDA_RATE,
	pct,
	REDUNDANCY_FUND_RATE,
	SI_EMPLOYEE_RATE,
	SI_EMPLOYER_RATE,
	SI_MAX_INSURABLE_ANNUAL,
	SI_MAX_INSURABLE_MONTHLY,
	SI_SELF_EMPLOYED_RATE,
	SOCIAL_COHESION_RATE,
} from "@/lib/facts/tax";

type EmploymentType = "employed" | "self-employed";

// 2026 rates, all from lib/facts/tax.ts. Social insurance is charged on
// earnings up to the maximum insurable earnings (€5,742 a month in 2026);
// employee and self-employed GeSY on income up to €180,000 a year.
const GESY_MAX_MONTHLY = GESY_INCOME_CAP / 12;

function formatEur(value: number): string {
	return new Intl.NumberFormat("en-IE", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

type BreakdownRow = {
	label: string;
	rate: string;
	monthly: number;
	annual: number;
	side: "employee" | "employer" | "self";
};

function BreakdownTable({
	rows,
	title,
}: {
	rows: BreakdownRow[];
	title: string;
}) {
	const totalMonthly = rows.reduce((s, r) => s + r.monthly, 0);
	const totalAnnual = rows.reduce((s, r) => s + r.annual, 0);

	return (
		<DataTable
			caption={title}
			columns={[
				{ header: "Contribution" },
				{ header: "Rate", align: "right" },
				{ header: "Monthly", align: "right" },
				{ header: "Annual", align: "right" },
			]}
			rows={rows.map((row) => [
				row.label,
				row.rate,
				formatEur(row.monthly),
				formatEur(row.annual),
			])}
			footer={["Total", "", formatEur(totalMonthly), formatEur(totalAnnual)]}
		/>
	);
}

function SummaryCard({
	label,
	monthly,
	annual,
}: {
	label: string;
	monthly: number;
	annual: number;
}) {
	return (
		<StatCard
			label={label}
			value={
				<>
					{formatEur(monthly)}
					<span className="text-base font-semibold text-muted">/mo</span>
				</>
			}
			hint={`${formatEur(annual)}/yr`}
		/>
	);
}

const NEXT_STEPS = [
	{ href: "/guides/hiring-in-cyprus/", label: "Read: Hiring in Cyprus" },
	{ href: "/sections/accountants/", label: "Find an accountant" },
];

export default function SocialInsuranceCalculatorPage({
	embedded = false,
}: {
	embedded?: boolean;
} = {}) {
	const [employmentType, setEmploymentType] =
		useState<EmploymentType>("employed");
	const [grossMonthly, setGrossMonthly] = useState(3500);
	const [cyprusRegistered, setCyprusRegistered] = useState(true);

	const annualSalary = grossMonthly * 12;

	let employeeRows: BreakdownRow[] = [];
	let employerRows: BreakdownRow[] = [];
	let selfRows: BreakdownRow[] = [];

	// Earnings that social insurance and GeSY are charged on
	const siMonthlyBase = Math.min(grossMonthly, SI_MAX_INSURABLE_MONTHLY);
	const gesyMonthlyBase = Math.min(grossMonthly, GESY_MAX_MONTHLY);

	if (employmentType === "employed") {
		const eSI = siMonthlyBase * SI_EMPLOYEE_RATE;
		const eGESY = gesyMonthlyBase * GESY_RATE;

		employeeRows = [
			{
				label: "Social Insurance (SI)",
				rate: pct(SI_EMPLOYEE_RATE),
				monthly: eSI,
				annual: eSI * 12,
				side: "employee",
			},
			{
				label: "GeSY (General Healthcare)",
				rate: pct(GESY_RATE),
				monthly: eGESY,
				annual: eGESY * 12,
				side: "employee",
			},
		];

		if (cyprusRegistered) {
			const erSI = siMonthlyBase * SI_EMPLOYER_RATE;
			const erRedundancy = grossMonthly * REDUNDANCY_FUND_RATE;
			const erTraining = grossMonthly * HRDA_RATE;
			const erCohesion = grossMonthly * SOCIAL_COHESION_RATE;
			const erGESY = grossMonthly * GESY_EMPLOYER_RATE;

			employerRows = [
				{
					label: "Social Insurance (SI)",
					rate: pct(SI_EMPLOYER_RATE),
					monthly: erSI,
					annual: erSI * 12,
					side: "employer",
				},
				{
					label: "Redundancy Fund",
					rate: pct(REDUNDANCY_FUND_RATE),
					monthly: erRedundancy,
					annual: erRedundancy * 12,
					side: "employer",
				},
				{
					label: "Industrial Training (HRDA)",
					rate: pct(HRDA_RATE),
					monthly: erTraining,
					annual: erTraining * 12,
					side: "employer",
				},
				{
					label: "Social Cohesion Fund",
					rate: pct(SOCIAL_COHESION_RATE),
					monthly: erCohesion,
					annual: erCohesion * 12,
					side: "employer",
				},
				{
					label: "GeSY (General Healthcare)",
					rate: pct(GESY_EMPLOYER_RATE),
					monthly: erGESY,
					annual: erGESY * 12,
					side: "employer",
				},
			];
		}
	} else {
		// Self-employed: SI on earnings up to the maximum insurable earnings,
		// GeSY on income up to the GeSY ceiling
		const cappedMonthly = Math.min(annualSalary, SI_MAX_INSURABLE_ANNUAL) / 12;

		const siMonthly = cappedMonthly * SI_SELF_EMPLOYED_RATE;
		const gesyMonthly = gesyMonthlyBase * GESY_SELF_EMPLOYED_RATE;

		selfRows = [
			{
				label: "Social Insurance (SI)",
				rate: pct(SI_SELF_EMPLOYED_RATE),
				monthly: siMonthly,
				annual: siMonthly * 12,
				side: "self",
			},
			{
				label: "GeSY (General Healthcare)",
				rate: pct(GESY_SELF_EMPLOYED_RATE),
				monthly: gesyMonthly,
				annual: gesyMonthly * 12,
				side: "self",
			},
		];
	}

	const employeeTotalMonthly = employeeRows.reduce((s, r) => s + r.monthly, 0);
	const employeeTotalAnnual = employeeTotalMonthly * 12;
	const employerTotalMonthly = employerRows.reduce((s, r) => s + r.monthly, 0);
	const employerTotalAnnual = employerTotalMonthly * 12;
	const selfTotalMonthly = selfRows.reduce((s, r) => s + r.monthly, 0);
	const selfTotalAnnual = selfTotalMonthly * 12;

	const isCapped = grossMonthly > SI_MAX_INSURABLE_MONTHLY;

	const sliderId = useId();

	return (
		<div className="flex flex-col gap-6">
			<ToolPanel title="Your details">
				<ChipGroup
					label="Employment type"
					options={[
						{ value: "employed" as EmploymentType, label: "Employed" },
						{
							value: "self-employed" as EmploymentType,
							label: "Self-employed",
						},
					]}
					value={employmentType}
					onChange={setEmploymentType}
				/>

				<div className="space-y-2">
					<div className="flex items-center justify-between gap-3">
						<label
							htmlFor={sliderId}
							className="text-sm font-semibold text-ink"
						>
							Gross monthly{" "}
							{employmentType === "employed" ? "salary" : "income"}
						</label>
						<span className="text-base font-bold text-ink">
							{formatEur(grossMonthly)}
							<span className="font-normal text-muted">/mo</span>
						</span>
					</div>
					<input
						id={sliderId}
						type="range"
						min={0}
						max={20000}
						step={100}
						value={grossMonthly}
						onChange={(e) => setGrossMonthly(Number(e.target.value))}
						className="h-6 w-full cursor-pointer accent-primary"
					/>
					<div className="flex justify-between text-sm text-muted">
						<span>€0</span>
						<span>€20,000</span>
					</div>
				</div>

				{isCapped && (
					<Callout tone="info">
						Social Insurance is charged on earnings up to{" "}
						{formatEur(SI_MAX_INSURABLE_MONTHLY)}/mo (
						{formatEur(SI_MAX_INSURABLE_ANNUAL)}/yr maximum insurable earnings
						for 2026). Earnings above this are not subject to Social Insurance.
						GeSY stops at {formatEur(GESY_MAX_MONTHLY)}/mo (
						{formatEur(GESY_INCOME_CAP)}/yr).
					</Callout>
				)}

				{employmentType === "employed" && (
					<ChipGroup
						label="Is your employer Cyprus-registered?"
						options={[
							{ value: "yes", label: "Yes" },
							{ value: "no", label: "No" },
						]}
						value={cyprusRegistered ? "yes" : "no"}
						onChange={(v) => setCyprusRegistered(v === "yes")}
					/>
				)}
			</ToolPanel>

			<section
				aria-label="Contribution totals"
				className={`grid grid-cols-1 gap-4 ${employmentType === "employed" && cyprusRegistered ? "sm:grid-cols-2" : ""}`}
			>
				{employmentType === "employed" ? (
					<>
						<SummaryCard
							label="Your contributions (employee)"
							monthly={employeeTotalMonthly}
							annual={employeeTotalAnnual}
						/>
						{cyprusRegistered && (
							<SummaryCard
								label="Employer contributions"
								monthly={employerTotalMonthly}
								annual={employerTotalAnnual}
							/>
						)}
					</>
				) : (
					<SummaryCard
						label="Your total contributions (self-employed)"
						monthly={selfTotalMonthly}
						annual={selfTotalAnnual}
					/>
				)}
			</section>

			<div className="space-y-4">
				{employmentType === "employed" ? (
					<>
						<BreakdownTable
							rows={employeeRows}
							title="Employee contributions"
						/>
						{cyprusRegistered && employerRows.length > 0 && (
							<BreakdownTable
								rows={employerRows}
								title="Employer contributions (Cyprus-registered)"
							/>
						)}
					</>
				) : (
					<BreakdownTable rows={selfRows} title="Self-employed contributions" />
				)}
			</div>

			<Callout tone="legal" title="Important notice">
				Employers that are not exempt from the Central Holiday Fund also pay a
				Holiday Fund contribution, which is not included here; check the rate
				with Social Insurance Services. The Redundancy Fund, HRDA, Social
				Cohesion and employer GeSY rows are shown on the full salary; ask Social
				Insurance Services or the HIO whether a ceiling applies to them. Rates
				change annually. Verify current rates at{" "}
				<a
					href="https://www.mlsi.gov.cy/mlsi/sid/sidv2.nsf/index_en/index_en"
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold underline"
				>
					the Social Insurance Services website
				</a>{" "}
				before filing. GeSY rates are set by the Health Insurance Organisation
				and may differ from the figures shown. This tool provides general
				information only and is not a substitute for professional advice.
			</Callout>

			{embedded ? (
				<div>
					<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
						Next steps
					</p>
					<div className="flex flex-wrap gap-3">
						{NEXT_STEPS.map((s) => (
							<ButtonLink key={s.href} href={s.href} variant="secondary">
								{s.label}
							</ButtonLink>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}
