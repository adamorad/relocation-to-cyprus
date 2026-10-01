"use client";

import { useId, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Badge } from "@/components/ui/Badge";
import { Callout, type CalloutTone } from "@/components/ui/Callout";
import { ChipGroup } from "@/components/ui/Chip";

type Condition = {
	label: string;
	pass: boolean;
	detail: string;
};

type Recommendation =
	| "183-day"
	| "60-day-qualified"
	| "60-day-marginal"
	| "not-qualifying";

function getRecommendation(
	daysInCyprus: number,
	daysInOtherCountry: number,
	hasPermanentHome: boolean,
	hasBusinessOrEmployment: boolean,
): { type: Recommendation; title: string; description: string } {
	// The 183-day test needs more than 183 days, so exactly 183 does not qualify.
	if (daysInCyprus > 183) {
		return {
			type: "183-day",
			title: "183-Day Rule: Clear Qualification",
			description:
				"You have spent more than 183 days in Cyprus this year. You qualify as a Cyprus tax resident under the straightforward 183-day test. No further conditions apply. File your TD1 return for the year by the deadline: 31 July of the following year by law, though the Tax Department can extend it (for tax year 2025 it was extended to 31 October 2026).",
		};
	}

	if (daysInCyprus >= 60) {
		const conditionsMet =
			daysInOtherCountry <= 183 && hasPermanentHome && hasBusinessOrEmployment;

		if (conditionsMet) {
			return {
				type: "60-day-qualified",
				title: "60-Day Rule: Qualified",
				description:
					"You meet the conditions for the 60-day tax residency rule. You are likely tax resident in Cyprus for this year. Maintain a detailed day diary and keep evidence of each condition. Consult a Cyprus tax accountant before filing.",
			};
		}

		return {
			type: "60-day-marginal",
			title: "60-Day Rule: Marginal, Seek Advice",
			description:
				"You meet the minimum 60 days in Cyprus but one or more supporting conditions are not met. Your tax residency status is not straightforward. You should consult a Cyprus tax accountant before making any residency claim.",
		};
	}

	return {
		type: "not-qualifying",
		title: "Not Qualifying as Cyprus Tax Resident This Year",
		description:
			"You have spent fewer than 60 days in Cyprus, which means you cannot qualify under either the 183-day or the 60-day rule. You will not be a Cyprus tax resident for this calendar year. If you intend to qualify next year, plan your travel accordingly.",
	};
}

function CheckRow({ label, pass, detail }: Condition) {
	return (
		<li className="flex items-start gap-3 border-b border-line py-3 last:border-0">
			<Badge tone={pass ? "success" : "danger"} className="mt-0.5 shrink-0">
				{pass ? "Met" : "Not met"}
			</Badge>
			<div>
				<p className="text-base font-semibold text-ink">{label}</p>
				<p className="mt-0.5 text-sm text-muted">{detail}</p>
			</div>
		</li>
	);
}

function SliderField({
	label,
	value,
	min,
	max,
	unit,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	unit: string;
	onChange: (v: number) => void;
}) {
	const id = useId();
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between gap-3">
				<label htmlFor={id} className="text-sm font-semibold text-ink">
					{label}
				</label>
				<span className="shrink-0 text-base font-bold text-ink">
					{value} {unit}
				</span>
			</div>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="h-6 w-full cursor-pointer accent-primary"
			/>
			<div className="flex justify-between text-sm text-muted">
				<span>{min}</span>
				<span>{max}</span>
			</div>
		</div>
	);
}

function YesNoField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<ChipGroup
			label={label}
			options={[
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			]}
			value={value ? "yes" : "no"}
			onChange={(v) => onChange(v === "yes")}
		/>
	);
}

export default function TaxResidencyPlannerClient() {
	const [daysInCyprus, setDaysInCyprus] = useState(75);
	const [daysInOtherCountry, setDaysInOtherCountry] = useState(120);
	const [hasPermanentHome, setHasPermanentHome] = useState(true);
	const [hasBusinessOrEmployment, setHasBusinessOrEmployment] = useState(true);

	const qualifies183 = daysInCyprus > 183;

	const sixtyDayConditions: Condition[] = [
		{
			label: "At least 60 days in Cyprus",
			pass: daysInCyprus >= 60,
			detail: `You have entered ${daysInCyprus} days. Minimum required: 60.`,
		},
		{
			label: "No more than 183 days in any single other country",
			pass: daysInOtherCountry <= 183,
			detail: `You entered ${daysInOtherCountry} days in one other country. Maximum allowed: 183.`,
		},
		{
			label: "Permanent residence in Cyprus (rented or owned)",
			pass: hasPermanentHome,
			detail:
				"You must maintain a home available to you in Cyprus throughout the year.",
		},
		{
			label: "Business activity or employment based in Cyprus",
			pass: hasBusinessOrEmployment,
			detail:
				"You must carry on business, hold employment, or hold an office in a Cyprus-resident entity.",
		},
	];

	const sixtyDayAllPass = sixtyDayConditions.every((c) => c.pass);

	const recommendation = getRecommendation(
		daysInCyprus,
		daysInOtherCountry,
		hasPermanentHome,
		hasBusinessOrEmployment,
	);

	const recTone: Record<Recommendation, CalloutTone> = {
		"183-day": "info",
		"60-day-qualified": "info",
		"60-day-marginal": "warning",
		"not-qualifying": "warning",
	};

	return (
		<div className="flex flex-col gap-6">
			<ToolPanel title="Your days">
				<SliderField
					label="Days spent in Cyprus this year"
					value={daysInCyprus}
					min={0}
					max={365 - daysInOtherCountry}
					unit="days"
					onChange={setDaysInCyprus}
				/>
				<SliderField
					label="Days in any single other country"
					value={daysInOtherCountry}
					min={0}
					max={365 - daysInCyprus}
					unit="days"
					onChange={setDaysInOtherCountry}
				/>
				{daysInCyprus + daysInOtherCountry > 183 && (
					<Callout tone="info">
						Combined days in Cyprus and the other country:{" "}
						{daysInCyprus + daysInOtherCountry}. The 183-day threshold is a key
						test: spending more than 183 days in another country will disqualify
						the 60-day rule.
					</Callout>
				)}
			</ToolPanel>

			<ToolPanel title="Your situation">
				<YesNoField
					label="Do you have a permanent home in Cyprus?"
					value={hasPermanentHome}
					onChange={setHasPermanentHome}
				/>
				<YesNoField
					label="Do you have business or employment in Cyprus?"
					value={hasBusinessOrEmployment}
					onChange={setHasBusinessOrEmployment}
				/>
				<p className="text-sm text-muted">
					From 1 January 2026, being tax resident in another country no longer
					rules out the 60-day rule; the other conditions still apply.
				</p>
			</ToolPanel>

			<section aria-labelledby="residency-results" className="space-y-4">
				<h2
					id="residency-results"
					className="text-2xl font-bold tracking-tight text-ink"
				>
					Your result
				</h2>

				<Callout
					tone={recTone[recommendation.type]}
					title={recommendation.title}
				>
					{recommendation.description}
				</Callout>

				<div className="rounded-card border border-line bg-white p-5">
					<div className="mb-1 flex items-center gap-2">
						<h3 className="text-base font-bold text-ink">183-day rule</h3>
						<Badge tone={qualifies183 ? "success" : "neutral"}>
							{qualifies183 ? "Qualifies" : "Not yet"}
						</Badge>
					</div>
					<p className="text-base text-muted">
						{qualifies183
							? `You have spent ${daysInCyprus} days in Cyprus, above the 183-day threshold. You qualify.`
							: `You have spent ${daysInCyprus} days in Cyprus. You need ${184 - daysInCyprus} more days (more than 183) to qualify under this rule.`}
					</p>
				</div>

				<div className="rounded-card border border-line bg-white p-5">
					<div className="mb-2 flex items-center gap-2">
						<h3 className="text-base font-bold text-ink">
							60-day rule conditions
						</h3>
						<Badge tone={sixtyDayAllPass ? "success" : "neutral"}>
							{sixtyDayAllPass ? "All met" : "Not all met"}
						</Badge>
					</div>
					<ul>
						{sixtyDayConditions.map((c) => (
							<CheckRow key={c.label} {...c} />
						))}
					</ul>
				</div>
			</section>
		</div>
	);
}
