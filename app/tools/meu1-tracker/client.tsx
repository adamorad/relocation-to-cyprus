"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ToolPanel } from "@/components/templates/ToolTemplate";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { CHART_COLORS } from "@/lib/chart-colors";

interface ChecklistItem {
	id: string;
	label: string;
	note: string;
}

const ITEMS: ChecklistItem[] = [
	{
		id: "passport",
		label: "Valid Passport or EU National ID",
		note: "Must be in date. The Migration Department checks the original; bring certified copies. Non-EU citizens: passport only (ID cards not accepted).",
	},
	{
		id: "accommodation",
		label: "Proof of Accommodation",
		note: "A signed and stamped rental lease or property deed. Hotel invoices are not accepted. The lease must be in your name or your name must be listed.",
	},
	{
		id: "health_insurance",
		label: "Proof of Health Insurance or GeSY Registration",
		note: "Either a private health insurance policy valid in Cyprus, or proof you have enrolled in GeSY (the Cyprus General Healthcare System) at hio.org.cy.",
	},
	{
		id: "funds",
		label: "Proof of Sufficient Funds or Employment",
		note: "3 to 6 months of bank statements showing enough income or savings to support yourself without social assistance (no fixed amount is published), or an employment contract or payslips if employed in Cyprus.",
	},
	{
		id: "meu1_form",
		label: "Completed MEU1 Application Form",
		note: "Download the MEU1 form from the Migration Department's MEU1 page on gov.cy (gov.cy/mip-md). Fill in all fields in block capitals. Do not sign until instructed by the officer at your appointment.",
	},
	{
		id: "appointment",
		label: "Appointment Booked at the Migration Department",
		note: "Check on gov.cy (gov.cy/mip-md) how to book with the Migration Department. Appointment slots fill 2 to 3 weeks in advance: book as early as possible. Print the confirmation email and bring it to the appointment.",
	},
	{
		id: "attend",
		label: "Attend Migration Department Appointment",
		note: "Arrive 10 to 15 minutes early with all original documents AND copies. The officer will verify documents, stamp your form, and issue a receipt. The Department aims to decide within one month of a complete application. The application fee is €20.",
	},
	{
		id: "certificate",
		label: "Receive EU Registration Certificate",
		note: "The Registration Certificate (formerly called the Yellow Slip, now issued in blue) confirms your right of residence. Keep this safe: it is required for opening a bank account, registering with GeSY, and other official processes.",
	},
];

const STORAGE_KEY = "meu1-tracker-v1";

export default function Meu1TrackerPage() {
	const [checked, setChecked] = useState<Record<string, boolean>>({});
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				setChecked(JSON.parse(saved) as Record<string, boolean>);
			}
		} catch {
			// ignore
		}
		setMounted(true);
	}, []);

	const toggle = (id: string) => {
		setChecked((prev) => {
			const next = { ...prev, [id]: !prev[id] };
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			} catch {
				// ignore
			}
			return next;
		});
	};

	const doneCount = ITEMS.filter((i) => checked[i.id]).length;
	const total = ITEMS.length;
	const pct = Math.round((doneCount / total) * 100);

	return (
		<>
			<section aria-label="Progress" className="space-y-2">
				<div className="flex items-center justify-between">
					<p className="text-sm font-semibold text-ink">
						Progress: {doneCount} of {total} steps complete
					</p>
					<span className="text-sm font-bold text-primary-hover">{pct}%</span>
				</div>
				<div
					role="progressbar"
					aria-valuenow={pct}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="MEU1 checklist progress"
					className="h-3 w-full overflow-hidden rounded-full bg-sky-strong"
				>
					<div
						className="h-full rounded-full transition-all duration-500"
						style={{ width: `${pct}%`, backgroundColor: CHART_COLORS.primary }}
					/>
				</div>
				{pct === 100 && (
					<p className="text-sm font-semibold text-emerald-800">
						All steps complete: you should have your EU Registration
						Certificate.
					</p>
				)}
			</section>

			<ToolPanel title="Registration steps">
				<ol className="!mt-0 space-y-3">
					{ITEMS.map((item, idx) => {
						const isDone = mounted ? !!checked[item.id] : false;
						return (
							<li key={item.id}>
								<button
									type="button"
									onClick={() => toggle(item.id)}
									aria-pressed={isDone}
									className={`min-h-11 w-full rounded-xl border p-4 text-left transition-colors ${
										isDone
											? "border-emerald-200 bg-emerald-50"
											: "border-line bg-white hover:border-primary"
									}`}
								>
									<div className="flex items-start gap-3">
										<div
											className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
												isDone
													? "border-emerald-600 bg-emerald-600"
													: "border-slate-400"
											}`}
										>
											{isDone && (
												<svg
													aria-hidden="true"
													className="h-3.5 w-3.5 text-white"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={3}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M5 13l4 4L19 7"
													/>
												</svg>
											)}
										</div>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<span className="text-xs font-bold uppercase tracking-wider text-muted">
													Step {idx + 1}
												</span>
												<Badge tone={isDone ? "success" : "neutral"}>
													{isDone ? "Done" : "Pending"}
												</Badge>
											</div>
											<p
												className={`mt-0.5 text-base font-semibold ${
													isDone
														? "text-emerald-900 line-through decoration-emerald-400"
														: "text-ink"
												}`}
											>
												{item.label}
											</p>
											<p className="mt-1 text-sm leading-relaxed text-muted">
												{item.note}
											</p>
										</div>
									</div>
								</button>
							</li>
						);
					})}
				</ol>
			</ToolPanel>

			<Callout tone="info" title="EU citizens only">
				This checklist covers EU citizens registering under the EU Freedom of
				Movement. Non-EU citizens require a separate Alien Registration
				Certificate (ARC) process and, depending on your residency status,
				either a Digital Nomad Visa or Permanent Residency permit. See the{" "}
				<Link
					href="/guides/residency-and-visas/"
					className="font-medium underline underline-offset-2"
				>
					Residency &amp; Visas guide
				</Link>{" "}
				for full non-EU details.
			</Callout>
		</>
	);
}
