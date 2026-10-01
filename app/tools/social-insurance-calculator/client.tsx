"use client";

import { useId, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";
import { DataTable, StatCard } from "@/components/ui/DataTable";

type EmploymentType = "employed" | "self-employed";

// 2025 Cyprus Social Insurance rates
const EMPLOYED_RATES = {
	employee: {
		socialInsurance: 0.083,
		gesy: 0.0265,
	},
	employer: {
		socialInsurance: 0.083,
		redundancyFund: 0.012,
		holidayFund: 0.08,
		industrialTraining: 0.005,
		socialCohesion: 0.02,
		gesy: 0.029,
	},
};

// Self-employed: 16.6% SI on insurable earnings, capped at €54,864/yr (2025 rate)
const SELF_EMPLOYED_SI_RATE = 0.166;
const SELF_EMPLOYED_GESY_RATE = 0.0265;
const SELF_EMPLOYED_MAX_ANNUAL = 54864;

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

	if (employmentType === "employed") {
		const eSI = grossMonthly * EMPLOYED_RATES.employee.socialInsurance;
		const eGESY = grossMonthly * EMPLOYED_RATES.employee.gesy;

		employeeRows = [
			{
				label: "Social Insurance (SI)",
				rate: "8.3%",
				monthly: eSI,
				annual: eSI * 12,
				side: "employee",
			},
			{
				label: "GeSY (General Healthcare)",
				rate: "2.65%",
				monthly: eGESY,
				annual: eGESY * 12,
				side: "employee",
			},
		];

		if (cyprusRegistered) {
			const erSI = grossMonthly * EMPLOYED_RATES.employer.socialInsurance;
			const erRedundancy =
				grossMonthly * EMPLOYED_RATES.employer.redundancyFund;
			const erHoliday = grossMonthly * EMPLOYED_RATES.employer.holidayFund;
			const erTraining =
				grossMonthly * EMPLOYED_RATES.employer.industrialTraining;
			const erCohesion = grossMonthly * EMPLOYED_RATES.employer.socialCohesion;
			const erGESY = grossMonthly * EMPLOYED_RATES.employer.gesy;

			employerRows = [
				{
					label: "Social Insurance (SI)",
					rate: "8.3%",
					monthly: erSI,
					annual: erSI * 12,
					side: "employer",
				},
				{
					label: "Redundancy Fund",
					rate: "1.2%",
					monthly: erRedundancy,
					annual: erRedundancy * 12,
					side: "employer",
				},
				{
					label: "Holiday Fund",
					rate: "8.0%",
					monthly: erHoliday,
					annual: erHoliday * 12,
					side: "employer",
				},
				{
					label: "Industrial Training",
					rate: "0.5%",
					monthly: erTraining,
					annual: erTraining * 12,
					side: "employer",
				},
				{
					label: "Social Cohesion Fund",
					rate: "2.0%",
					monthly: erCohesion,
					annual: erCohesion * 12,
					side: "employer",
				},
				{
					label: "GeSY (General Healthcare)",
					rate: "2.90%",
					monthly: erGESY,
					annual: erGESY * 12,
					side: "employer",
				},
			];
		}
	} else {
		// Self-employed: cap insurable earnings
		const cappedAnnual = Math.min(annualSalary, SELF_EMPLOYED_MAX_ANNUAL);
		const cappedMonthly = cappedAnnual / 12;

		const siMonthly = cappedMonthly * SELF_EMPLOYED_SI_RATE;
		const gesyMonthly = grossMonthly * SELF_EMPLOYED_GESY_RATE;

		selfRows = [
			{
				label: "Social Insurance (SI)",
				rate: "16.6%",
				monthly: siMonthly,
				annual: siMonthly * 12,
				side: "self",
			},
			{
				label: "GeSY (General Healthcare)",
				rate: "2.65%",
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

	const isCapped =
		employmentType === "self-employed" &&
		annualSalary > SELF_EMPLOYED_MAX_ANNUAL;

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
						SI is capped at {formatEur(SELF_EMPLOYED_MAX_ANNUAL / 12)}/mo (
						{formatEur(SELF_EMPLOYED_MAX_ANNUAL)}/yr insurable earnings). Income
						above this cap is not subject to Social Insurance.
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
				Rates change annually. Verify current rates at{" "}
				<a
					href="https://www.socialinsurance.gov.cy"
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold underline"
				>
					socialinsurance.gov.cy
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
