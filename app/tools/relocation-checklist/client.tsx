"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CHART_COLORS } from "@/lib/chart-colors";

interface Task {
	id: string;
	label: string;
	link?: { href: string; text: string };
}

interface Phase {
	id: string;
	title: string;
	tasks: Task[];
}

const PHASES: Phase[] = [
	{
		id: "phase1",
		title: "Phase 1: Pre-Move Planning",
		tasks: [
			{
				id: "p1_visa",
				label: "Decide on visa / residency route",
				link: {
					href: "/tools/visa-pathway-finder/",
					text: "Visa Pathway Finder",
				},
			},
			{
				id: "p1_tax_rule",
				label: "Research the 60-day vs 183-day tax residency rule",
				link: {
					href: "/tools/tax-residency-tracker/",
					text: "Tax Residency Tracker",
				},
			},
			{
				id: "p1_treaty",
				label: "Check your country's double tax treaty with Cyprus",
				link: {
					href: "/tools/double-tax-treaty-finder/",
					text: "Double Tax Treaty Finder",
				},
			},
			{
				id: "p1_city",
				label: "Research which city suits your lifestyle",
				link: { href: "/tools/city-comparison/", text: "City Comparison" },
			},
			{
				id: "p1_budget",
				label: "Estimate your monthly budget",
				link: { href: "/tools/budget-builder/", text: "Budget Builder" },
			},
			{
				id: "p1_docs",
				label:
					"Start gathering apostilled documents (birth cert, criminal record, marriage cert if relevant)",
			},
			{
				id: "p1_bank",
				label:
					"Set up a Cyprus-accessible bank or fintech (Revolut / Wise) before you arrive",
				link: {
					href: "/guides/banking-in-cyprus/",
					text: "Banking in Cyprus Guide",
				},
			},
			{
				id: "p1_schools",
				label: "Research schools if relocating with children",
				link: {
					href: "/guides/schools-in-cyprus/",
					text: "Schools Guide",
				},
			},
			{
				id: "p1_pets",
				label: "Arrange pet import paperwork if needed",
				link: {
					href: "/guides/moving-to-cyprus-with-pets/",
					text: "Moving with Pets Guide",
				},
			},
			{
				id: "p1_scout",
				label: "Book a scouting trip to your shortlisted cities",
			},
		],
	},
	{
		id: "phase2",
		title: "Phase 2: Arrival Week",
		tasks: [
			{
				id: "p2_bank",
				label: "Open a Cyprus bank account",
				link: {
					href: "/guides/banking-in-cyprus/",
					text: "Banking in Cyprus Guide",
				},
			},
			{
				id: "p2_sim",
				label: "Get a Cypriot SIM card (Cyta, Epic, or Primetel)",
				link: { href: "/tools/isp-comparison/", text: "ISP Comparison" },
			},
			{
				id: "p2_tic",
				label: "Register at the Tax Department (TIC number)",
				link: {
					href: "/guides/taxes-for-expats/",
					text: "Taxes for Expats Guide",
				},
			},
			{
				id: "p2_rental",
				label: "Find and sign a rental contract",
				link: {
					href: "/sections/long-term-rentals/",
					text: "Long-Term Rentals",
				},
			},
			{
				id: "p2_meu1",
				label: "Start MEU1 / ARC application (EU citizens)",
				link: { href: "/tools/meu1-tracker/", text: "MEU1 Tracker" },
			},
			{
				id: "p2_car",
				label: "Register your vehicle or rent a car",
				link: {
					href: "/guides/car-import-registration/",
					text: "Car Import & Registration Guide",
				},
			},
			{
				id: "p2_hospital",
				label: "Locate nearest hospital and pharmacy",
				link: {
					href: "/sections/specialist-doctors/",
					text: "Specialist Doctors",
				},
			},
			{
				id: "p2_expat",
				label: "Join a local expat community",
				link: {
					href: "/sections/expat-communities/",
					text: "Expat Communities",
				},
			},
		],
	},
	{
		id: "phase3",
		title: "Phase 3: Month 1",
		tasks: [
			{
				id: "p3_gesy",
				label: "Register for GeSY (national healthcare)",
				link: {
					href: "/guides/gesy-registration-guide/",
					text: "GeSY Registration Guide",
				},
			},
			{
				id: "p3_tax_decl",
				label: "File a tax residency declaration with the Tax Department",
			},
			{
				id: "p3_licence",
				label: "Convert or exchange driving licence",
				link: {
					href: "/guides/driving-licence-conversion/",
					text: "Driving Licence Conversion Guide",
				},
			},
			{
				id: "p3_utilities",
				label: "Set up utilities (electricity, internet)",
				link: {
					href: "/guides/utilities-setup-guide/",
					text: "Utilities Setup Guide",
				},
			},
			{
				id: "p3_school_reg",
				label: "Register children at school",
				link: {
					href: "/guides/child-registration-guide/",
					text: "Child Registration Guide",
				},
			},
			{
				id: "p3_accountant",
				label: "Find a local accountant if self-employed / company",
				link: { href: "/sections/accountants/", text: "Find an Accountant" },
			},
			{
				id: "p3_insurance",
				label: "Get private health insurance if not on GeSY",
				link: {
					href: "/tools/health-insurance-comparison/",
					text: "Health Insurance Comparison",
				},
			},
			{
				id: "p3_renewal",
				label: "Track visa / ARC renewal date",
				link: {
					href: "/tools/visa-renewal-reminder/",
					text: "Visa Renewal Reminder",
				},
			},
		],
	},
	{
		id: "phase4",
		title: "Phase 4: Settling In",
		tasks: [
			{
				id: "p4_language",
				label: "Start language lessons (Greek basics go a long way)",
				link: {
					href: "/guides/language-learning-cyprus/",
					text: "Language Learning in Cyprus",
				},
			},
			{
				id: "p4_explore",
				label: "Explore your neighbourhood and local markets",
				link: { href: "/sections/farmers-markets/", text: "Farmers Markets" },
			},
			{
				id: "p4_gym",
				label: "Find a gym or sports club",
				link: {
					href: "/sections/fitness-wellness/",
					text: "Fitness & Wellness",
				},
			},
			{
				id: "p4_tax_return",
				label: "File your first Cyprus tax return",
				link: {
					href: "/tools/tax-filing-calendar/",
					text: "Tax Filing Calendar",
				},
			},
			{
				id: "p4_property",
				label: "Consider long-term property purchase",
				link: {
					href: "/tools/rent-vs-buy-calculator/",
					text: "Rent vs Buy Calculator",
				},
			},
			{
				id: "p4_pr",
				label: "Review 5-year permanent residency timeline",
				link: {
					href: "/guides/permanent-residency-5year/",
					text: "Permanent Residency Guide",
				},
			},
		],
	},
];

const TOTAL_TASKS = PHASES.reduce((sum, p) => sum + p.tasks.length, 0);
const STORAGE_KEY = "realcy_relocation_v1";

export default function RelocationTrackerClient() {
	const [checked, setChecked] = useState<Record<string, boolean>>({});
	const [expanded, setExpanded] = useState<Record<string, boolean>>({
		phase1: true,
		phase2: false,
		phase3: false,
		phase4: false,
	});
	const [mounted, setMounted] = useState(false);
	const [confirmReset, setConfirmReset] = useState(false);

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

	const togglePhase = (phaseId: string) => {
		setExpanded((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
	};

	const resetAll = () => {
		setChecked({});
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
		setConfirmReset(false);
	};

	const totalDone = PHASES.reduce(
		(sum, phase) => sum + phase.tasks.filter((t) => checked[t.id]).length,
		0,
	);
	const overallPct = Math.round((totalDone / TOTAL_TASKS) * 100);

	return (
		<>
			<section
				aria-label="Overall progress"
				className="rounded-card border border-line bg-white p-5 shadow-rc"
			>
				<div className="mb-2 flex items-center justify-between gap-3">
					<p className="text-sm font-semibold text-ink">Overall progress</p>
					<span className="text-sm font-bold text-primary-hover">
						{mounted ? totalDone : 0} of {TOTAL_TASKS} tasks complete
					</span>
				</div>
				<div
					role="progressbar"
					aria-valuenow={mounted ? overallPct : 0}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="Overall relocation progress"
					className="h-3 w-full overflow-hidden rounded-full bg-sky-strong"
				>
					<div
						className="h-full rounded-full transition-all duration-500"
						style={{
							width: `${mounted ? overallPct : 0}%`,
							backgroundColor: CHART_COLORS.primary,
						}}
					/>
				</div>
				{mounted && overallPct === 100 && (
					<p className="mt-2 text-sm font-semibold text-emerald-800">
						All tasks complete: welcome to Cyprus!
					</p>
				)}

				<div className="mt-4 flex justify-end">
					{confirmReset ? (
						<div className="flex flex-wrap items-center gap-3">
							<span className="text-sm text-muted">Reset all progress?</span>
							<Button type="button" variant="secondary" onClick={resetAll}>
								Yes, reset
							</Button>
							<Button
								type="button"
								variant="ghost"
								onClick={() => setConfirmReset(false)}
							>
								Cancel
							</Button>
						</div>
					) : (
						<Button
							type="button"
							variant="ghost"
							onClick={() => setConfirmReset(true)}
						>
							Reset all
						</Button>
					)}
				</div>
			</section>

			<div className="space-y-4">
				{PHASES.map((phase) => {
					const phaseDone = phase.tasks.filter((t) => checked[t.id]).length;
					const phaseTotal = phase.tasks.length;
					const phasePct = Math.round((phaseDone / phaseTotal) * 100);
					const isOpen = expanded[phase.id];

					return (
						<div
							key={phase.id}
							className="overflow-hidden rounded-card border border-line bg-white"
						>
							<h2 className="m-0">
								<button
									type="button"
									onClick={() => togglePhase(phase.id)}
									aria-expanded={isOpen}
									aria-controls={`${phase.id}-tasks`}
									className="min-h-11 w-full bg-white px-5 py-4 text-left transition-colors hover:bg-sky"
								>
									<span className="flex items-center justify-between gap-4">
										<span className="min-w-0 flex-1">
											<span className="block text-base font-bold text-ink">
												{phase.title}
											</span>
											<span className="mt-2 flex items-center gap-3">
												<span className="h-2 flex-1 overflow-hidden rounded-full bg-sky-strong">
													<span
														className="block h-full rounded-full transition-all duration-500"
														style={{
															width: `${mounted ? phasePct : 0}%`,
															backgroundColor: CHART_COLORS.primary,
														}}
													/>
												</span>
												<span className="whitespace-nowrap text-sm text-muted">
													{mounted ? phaseDone : 0} / {phaseTotal}
												</span>
											</span>
										</span>
										<span
											className={`shrink-0 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
										>
											<svg
												aria-hidden="true"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</span>
									</span>
								</button>
							</h2>

							{isOpen && (
								<ul
									id={`${phase.id}-tasks`}
									className="divide-y divide-line border-t border-line"
								>
									{phase.tasks.map((task) => {
										const isDone = mounted ? !!checked[task.id] : false;
										return (
											<li
												key={task.id}
												className={isDone ? "bg-emerald-50" : "bg-white"}
											>
												<div className="flex items-start gap-1 px-3 py-1.5">
													<button
														type="button"
														onClick={() => toggle(task.id)}
														aria-pressed={isDone}
														aria-label={
															isDone
																? `Uncheck: ${task.label}`
																: `Check: ${task.label}`
														}
														className="flex min-h-11 min-w-11 shrink-0 items-center justify-center"
													>
														<span
															className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
																isDone
																	? "border-emerald-600 bg-emerald-600"
																	: "border-slate-500"
															}`}
														>
															{isDone && (
																<svg
																	aria-hidden="true"
																	className="h-3 w-3 text-white"
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
														</span>
													</button>
													<div className="min-w-0 flex-1 py-2.5 pr-2">
														<p
															className={`text-sm leading-snug ${
																isDone
																	? "text-muted line-through decoration-slate-400"
																	: "text-ink"
															}`}
														>
															{task.label}
														</p>
														{task.link && (
															<Link
																href={task.link.href}
																className="mt-1 inline-block text-sm font-semibold text-primary-hover underline underline-offset-2 hover:text-primary"
															>
																{task.link.text}
															</Link>
														)}
													</div>
												</div>
											</li>
										);
									})}
								</ul>
							)}
						</div>
					);
				})}
			</div>
		</>
	);
}
