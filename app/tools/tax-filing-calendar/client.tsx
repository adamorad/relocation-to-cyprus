"use client";

import { useState } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { ChipGroup } from "@/components/ui/Chip";

type TaxpayerType = "individual" | "company" | "both";

type Deadline = {
	id: string;
	month: number; // 1-12
	day: number;
	title: string;
	formRef: string;
	description: string;
	taxpayer: TaxpayerType;
};

const DEADLINES: Deadline[] = [
	{
		id: "td7",
		month: 3,
		day: 31,
		title: "Employer Payroll Return",
		formRef: "TD7",
		description:
			"Employer's annual payroll return (TD7) for the previous year. Required for all Cyprus-registered employers.",
		taxpayer: "company",
	},
	{
		id: "td1-self-assess",
		month: 3,
		day: 31,
		title: "Self-Assessment: Income over €19,500",
		formRef: "TD1",
		description:
			"For individuals whose annual income exceeded €19,500 in the previous year. Filed on paper by 31 March; electronic filing deadline is 31 July.",
		taxpayer: "individual",
	},
	{
		id: "audited-accounts",
		month: 4,
		day: 30,
		title: "Audited Accounts Submission",
		formRef: "–",
		description:
			"Companies with turnover over €70,000 must submit audited financial accounts for the previous year to the Tax Department.",
		taxpayer: "company",
	},
	{
		id: "td1-electronic",
		month: 7,
		day: 31,
		title: "Individual Income Tax Return: Electronic",
		formRef: "TD1",
		description:
			"Electronic filing deadline for individual income tax return (TD1) for the previous calendar year. This is the standard deadline for most employed and self-employed individuals.",
		taxpayer: "individual",
	},
	{
		id: "td4-provisional-1",
		month: 7,
		day: 31,
		title: "Company Provisional Tax: 1st Instalment",
		formRef: "TD4",
		description:
			"First instalment of provisional corporation tax for the current year. Based on your provisional tax return (TD6) estimate. Half of total provisional tax due.",
		taxpayer: "company",
	},
	{
		id: "td6",
		month: 9,
		day: 30,
		title: "Provisional Tax Return + 2nd Instalment",
		formRef: "TD6",
		description:
			"Submission of the provisional tax return (TD6) and payment of the second instalment. If your actual income differs from the provisional estimate, revise and adjust.",
		taxpayer: "company",
	},
	{
		id: "td4-final",
		month: 12,
		day: 31,
		title: "Provisional Tax: 3rd Instalment",
		formRef: "–",
		description:
			"Final provisional tax instalment payment for the current year. Failure to pay at least 75% of the actual tax due results in an additional 10% charge.",
		taxpayer: "company",
	},
];

const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

type Urgency = { row: string; tone: BadgeTone; text: string };

function getUrgency(daysUntil: number): Urgency {
	if (daysUntil < 0)
		return { row: "border-line", tone: "neutral", text: "Passed" };
	if (daysUntil === 0)
		return { row: "border-red-700", tone: "danger", text: "Today" };
	if (daysUntil <= 30)
		return { row: "border-red-700", tone: "danger", text: `${daysUntil}d` };
	if (daysUntil <= 60)
		return { row: "border-amber-600", tone: "warning", text: `${daysUntil}d` };
	return { row: "border-primary", tone: "neutral", text: `${daysUntil}d` };
}

function getDaysUntil(month: number, day: number, today: Date): number {
	const target = new Date(today.getFullYear(), month - 1, day);
	return Math.floor(
		(target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	);
}

function taxpayerLabel(type: TaxpayerType): string {
	if (type === "individual") return "Individual";
	if (type === "company") return "Company";
	return "Individual & Company";
}

export default function TaxFilingCalendarPage() {
	const [filter, setFilter] = useState<TaxpayerType | "all">("all");

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const filteredDeadlines = DEADLINES.filter((d) => {
		if (filter === "all") return true;
		return d.taxpayer === filter || d.taxpayer === "both";
	});

	// Group by month
	const byMonth: Record<number, Deadline[]> = {};
	for (let m = 1; m <= 12; m++) {
		const items = filteredDeadlines.filter((d) => d.month === m);
		if (items.length > 0) byMonth[m] = items;
	}

	const currentMonth = today.getMonth() + 1; // 1-indexed

	return (
		<div className="flex flex-col gap-6">
			<ChipGroup
				label="Show deadlines for"
				options={[
					{ value: "all" as const, label: "All deadlines" },
					{ value: "individual" as const, label: "Individual" },
					{ value: "company" as const, label: "Company" },
				]}
				value={filter}
				onChange={setFilter}
			/>

			<ul
				aria-label="Deadlines by urgency"
				className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink"
			>
				<li className="flex items-center gap-1.5">
					<span
						aria-hidden="true"
						className="inline-block h-3 w-3 rounded-full bg-red-700"
					/>
					Within 30 days
				</li>
				<li className="flex items-center gap-1.5">
					<span
						aria-hidden="true"
						className="inline-block h-3 w-3 rounded-full bg-amber-600"
					/>
					31 to 60 days
				</li>
				<li className="flex items-center gap-1.5">
					<span
						aria-hidden="true"
						className="inline-block h-3 w-3 rounded-full bg-primary"
					/>
					More than 60 days
				</li>
				<li className="flex items-center gap-1.5">
					<span
						aria-hidden="true"
						className="inline-block h-3 w-3 rounded-full bg-slate-400"
					/>
					Passed
				</li>
			</ul>

			<div className="space-y-4">
				{Object.entries(byMonth).map(([monthStr, deadlines]) => {
					const month = Number(monthStr);
					const isCurrentMonth = month === currentMonth;

					return (
						<section
							key={month}
							aria-labelledby={`month-${month}`}
							className={`overflow-hidden rounded-card border bg-white ${
								isCurrentMonth
									? "border-primary ring-2 ring-primary"
									: "border-line"
							}`}
						>
							<div
								className={`flex items-center gap-2 px-5 py-3 ${
									isCurrentMonth ? "bg-primary text-white" : "bg-sky text-ink"
								}`}
							>
								<h2 id={`month-${month}`} className="text-lg font-bold">
									{MONTH_NAMES[month - 1]}
								</h2>
								{isCurrentMonth && (
									<span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-hover">
										Current
									</span>
								)}
							</div>
							<ul className="divide-y divide-line">
								{deadlines.map((deadline) => {
									const daysUntil = getDaysUntil(
										deadline.month,
										deadline.day,
										today,
									);
									const urgency = getUrgency(daysUntil);

									return (
										<li
											key={deadline.id}
											className={`border-l-4 p-5 ${urgency.row}`}
										>
											<div className="flex items-start justify-between gap-3">
												<div className="min-w-0 flex-1">
													<div className="mb-1 flex flex-wrap items-center gap-2">
														<span className="text-base font-bold text-ink">
															{deadline.day} {MONTH_NAMES[month - 1]}
														</span>
														{deadline.formRef !== "–" && (
															<Badge>{deadline.formRef}</Badge>
														)}
														<Badge>{taxpayerLabel(deadline.taxpayer)}</Badge>
													</div>
													<p className="mb-1 text-base font-semibold text-ink">
														{deadline.title}
													</p>
													<p className="text-base leading-relaxed text-muted">
														{deadline.description}
													</p>
												</div>
												<Badge tone={urgency.tone} className="shrink-0">
													{urgency.text}
												</Badge>
											</div>
										</li>
									);
								})}
							</ul>
						</section>
					);
				})}
			</div>

			{filteredDeadlines.length === 0 && (
				<p className="py-12 text-center text-muted">
					No deadlines found for this filter.
				</p>
			)}
		</div>
	);
}
