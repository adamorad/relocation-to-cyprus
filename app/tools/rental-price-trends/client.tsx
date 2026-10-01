"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

// ── data ─────────────────────────────────────────────────────────────────────

const PERIODS = [
	"2021",
	"2022",
	"2023",
	"2024 Q1",
	"2024 Q3",
	"2025 Q1",
	"2025 H2 est",
];
const CITIES = ["Limassol", "Paphos", "Larnaca", "Ayia Napa"] as const;
type City = (typeof CITIES)[number];

const CITY_COLOURS: Record<City, string> = {
	Limassol: "#087f98",
	Paphos: "#fa794d",
	Larnaca: "#3b82f6",
	"Ayia Napa": "#0b2145",
};

type DataSet = {
	periods: string[];
	Limassol: number[];
	Paphos: number[];
	Larnaca: number[];
	"Ayia Napa": number[];
};

const DATA_1BR: DataSet = {
	periods: PERIODS,
	Limassol: [650, 800, 980, 1050, 1100, 1150, 1200],
	Paphos: [480, 570, 680, 720, 750, 780, 810],
	Larnaca: [420, 490, 580, 620, 650, 680, 700],
	"Ayia Napa": [380, 440, 510, 540, 560, 590, 610],
};

const DATA_2BR: DataSet = {
	periods: PERIODS,
	Limassol: [900, 1100, 1350, 1450, 1520, 1600, 1680],
	Paphos: [650, 780, 950, 1000, 1050, 1100, 1150],
	Larnaca: [580, 680, 800, 850, 890, 930, 970],
	"Ayia Napa": [520, 600, 700, 750, 790, 830, 860],
};

const DATA_3BR: DataSet = {
	periods: PERIODS,
	Limassol: [1300, 1600, 1950, 2100, 2200, 2300, 2420],
	Paphos: [900, 1100, 1350, 1450, 1500, 1570, 1640],
	Larnaca: [800, 950, 1100, 1180, 1230, 1280, 1340],
	"Ayia Napa": [700, 820, 980, 1050, 1100, 1150, 1200],
};

const DATASETS: Record<"1BR" | "2BR" | "3BR", DataSet> = {
	"1BR": DATA_1BR,
	"2BR": DATA_2BR,
	"3BR": DATA_3BR,
};

// ── chart constants ───────────────────────────────────────────────────────────

const VB_W = 800;
const VB_H = 300;
const PAD = { top: 20, right: 20, bottom: 50, left: 60 };
const CHART_W = VB_W - PAD.left - PAD.right;
const CHART_H = VB_H - PAD.top - PAD.bottom;

// ── helpers ───────────────────────────────────────────────────────────────────

function pct(val: number, base: number) {
	if (base === 0) return "—";
	const p = Math.round(((val - base) / base) * 100);
	return (p >= 0 ? "+" : "") + p + "%";
}

function changeColour(val: number, base: number): string {
	if (base === 0) return "";
	const p = ((val - base) / base) * 100;
	if (p < 20) return "bg-green-100 text-green-800";
	if (p <= 60) return "bg-amber-100 text-amber-900";
	return "bg-red-100 text-red-800";
}

// ── SVG Line Chart ────────────────────────────────────────────────────────────

interface TooltipData {
	periodIdx: number;
	x: number;
	y: number;
}

function LineChart({
	data,
	activeCities,
}: {
	data: DataSet;
	activeCities: Set<City>;
}) {
	const [tooltip, setTooltip] = useState<TooltipData | null>(null);

	const nPeriods = data.periods.length;
	const allValues = CITIES.flatMap((c) => data[c]);
	const maxVal = Math.max(...allValues) + 200;
	const minVal = 0;

	function xPos(i: number) {
		return PAD.left + (i / (nPeriods - 1)) * CHART_W;
	}
	function yPos(v: number) {
		return PAD.top + CHART_H - ((v - minVal) / (maxVal - minVal)) * CHART_H;
	}

	// Y axis ticks
	const yTicks: number[] = [];
	const step = Math.ceil(maxVal / 5 / 200) * 200;
	for (let v = 0; v <= maxVal; v += step) yTicks.push(v);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<SVGSVGElement>) => {
			const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
			const svgX = ((e.clientX - rect.left) / rect.width) * VB_W;
			const relX = svgX - PAD.left;
			const idx = Math.min(
				nPeriods - 1,
				Math.max(0, Math.round((relX / CHART_W) * (nPeriods - 1))),
			);
			setTooltip({ periodIdx: idx, x: xPos(idx), y: PAD.top });
		},
		[nPeriods],
	);

	const handleMouseLeave = useCallback(() => setTooltip(null), []);

	const isEstimate = (i: number) => i === nPeriods - 1;

	return (
		<div
			tabIndex={0}
			role="region"
			aria-label="Rental price chart"
			className="w-full overflow-x-auto"
		>
			<div className="relative w-full min-w-[800px]">
				<svg
					viewBox={`0 0 ${VB_W} ${VB_H}`}
					className="w-full h-auto"
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					style={{ cursor: "crosshair" }}
				>
					{/* Y grid lines + labels */}
					{yTicks.map((v) => (
						<g key={v}>
							<line
								x1={PAD.left}
								y1={yPos(v)}
								x2={PAD.left + CHART_W}
								y2={yPos(v)}
								stroke="#d9e5ef"
								strokeWidth={1}
							/>
							<text
								x={PAD.left - 6}
								y={yPos(v)}
								textAnchor="end"
								dominantBaseline="middle"
								fontSize={12}
								fill="#506580"
							>
								€{v >= 1000 ? (v / 1000).toFixed(1) + "k" : v}
							</text>
						</g>
					))}

					{/* X axis labels */}
					{data.periods.map((p, i) => (
						<text
							key={p}
							x={xPos(i)}
							y={PAD.top + CHART_H + 16}
							textAnchor={
								i === 0 ? "start" : i === nPeriods - 1 ? "end" : "middle"
							}
							fontSize={12}
							fill={isEstimate(i) ? "#506580" : "#0b2145"}
						>
							{p}
						</text>
					))}

					{/* "estimate" label */}
					<text
						x={xPos(nPeriods - 1)}
						y={PAD.top + CHART_H + 30}
						textAnchor="end"
						fontSize={12}
						fill="#506580"
						fontStyle="italic"
					>
						estimate
					</text>

					{/* Lines per city */}
					{CITIES.filter((c) => activeCities.has(c)).map((city) => {
						const pts = data[city];
						// Draw solid segment up to second-to-last, dashed last segment
						const solidPoints = pts
							.slice(0, -1)
							.map((v, i) => `${xPos(i)},${yPos(v)}`)
							.join(" ");
						const lastSolid = `${xPos(nPeriods - 2)},${yPos(pts[nPeriods - 2])}`;
						const lastDashed = `${xPos(nPeriods - 1)},${yPos(pts[nPeriods - 1])}`;

						return (
							<g key={city}>
								{/* solid polyline */}
								<polyline
									points={solidPoints}
									fill="none"
									stroke={CITY_COLOURS[city]}
									strokeWidth={2.5}
									strokeLinejoin="round"
								/>
								{/* dashed last segment */}
								<line
									x1={lastSolid.split(",")[0]}
									y1={lastSolid.split(",")[1]}
									x2={lastDashed.split(",")[0]}
									y2={lastDashed.split(",")[1]}
									stroke={CITY_COLOURS[city]}
									strokeWidth={2}
									strokeDasharray="5,4"
									opacity={0.7}
								/>
								{/* dots */}
								{pts.map((v, i) => (
									<circle
										key={i}
										cx={xPos(i)}
										cy={yPos(v)}
										r={isEstimate(i) ? 3 : 4}
										fill={isEstimate(i) ? "white" : CITY_COLOURS[city]}
										stroke={CITY_COLOURS[city]}
										strokeWidth={isEstimate(i) ? 2 : 0}
										opacity={isEstimate(i) ? 0.7 : 1}
									/>
								))}
							</g>
						);
					})}

					{/* Hover vertical line */}
					{tooltip && (
						<line
							x1={tooltip.x}
							y1={PAD.top}
							x2={tooltip.x}
							y2={PAD.top + CHART_H}
							stroke="#506580"
							strokeWidth={1}
							strokeDasharray="3,3"
						/>
					)}
				</svg>

				{/* Tooltip card */}
				{tooltip && (
					<div
						className="absolute top-2 pointer-events-none z-10"
						style={{
							left: `${(tooltip.x / VB_W) * 100}%`,
							transform:
								tooltip.periodIdx >= nPeriods - 2
									? "translateX(-110%)"
									: "translateX(8px)",
						}}
					>
						<div className="bg-white border border-line rounded-xl shadow-sm px-4 py-3 text-xs min-w-[150px]">
							<p className="font-bold text-ink mb-2">
								{data.periods[tooltip.periodIdx]}
								{isEstimate(tooltip.periodIdx) && (
									<span className="ml-1 text-muted font-normal">(est.)</span>
								)}
							</p>
							{CITIES.filter((c) => activeCities.has(c)).map((city) => (
								<div
									key={city}
									className="flex items-center justify-between gap-3 py-0.5"
								>
									<span className="flex items-center gap-1.5">
										<span
											className="inline-block w-2 h-2 rounded-full flex-shrink-0"
											style={{ background: CITY_COLOURS[city] }}
										/>
										<span className="text-slate-600">{city}</span>
									</span>
									<span className="font-semibold text-ink">
										€{data[city][tooltip.periodIdx].toLocaleString()}
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// ── main component ────────────────────────────────────────────────────────────

type BRType = "1BR" | "2BR" | "3BR";

export default function RentalPriceTrendsClient() {
	const [brType, setBrType] = useState<BRType>("1BR");
	const [activeCities, setActiveCities] = useState<Set<City>>(new Set(CITIES));

	const data = DATASETS[brType];

	function toggleCity(city: City) {
		setActiveCities((prev) => {
			const next = new Set(prev);
			if (next.has(city)) {
				if (next.size === 1) return prev; // keep at least one
				next.delete(city);
			} else {
				next.add(city);
			}
			return next;
		});
	}

	// Summary stats
	const lastIdx = data.periods.length - 1;
	const idx2021 = 0;
	const idx2023 = 2;

	return (
		<main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
			{/* breadcrumb */}
			<nav className="text-xs text-slate-600 mb-6">
				<Link href="/" className="hover:text-primary">
					Home
				</Link>{" "}
				&rsaquo;{" "}
				<Link href="/tools/" className="hover:text-primary">
					Tools
				</Link>{" "}
				&rsaquo; <span className="text-ink">Cyprus Rental Price Trends</span>
			</nav>

			{/* header */}
			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Research
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Cyprus Rental Price Trends
				</h1>
				<p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-2xl">
					Monthly asking rents across Limassol, Paphos, Larnaca, and Ayia Napa
					from 2021 to 2025. Select a bedroom type and toggle cities to explore
					the data.
				</p>
			</header>

			{/* bedroom type toggle */}
			<div className="flex gap-2 mb-5">
				{(["1BR", "2BR", "3BR"] as BRType[]).map((t) => (
					<button
						key={t}
						type="button"
						onClick={() => setBrType(t)}
						className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
							brType === t
								? "bg-primary text-white"
								: "bg-white border border-line text-slate-700 hover:border-primary"
						}`}
					>
						{t}
					</button>
				))}
			</div>

			{/* city toggles */}
			<div className="flex flex-wrap gap-2 mb-6">
				{CITIES.map((city) => {
					const active = activeCities.has(city);
					return (
						<button
							key={city}
							type="button"
							onClick={() => toggleCity(city)}
							className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
								active
									? "border-2 bg-sky text-ink"
									: "bg-white border-line text-muted"
							}`}
							style={active ? { borderColor: CITY_COLOURS[city] } : {}}
						>
							<span
								className="w-2 h-2 rounded-full inline-block"
								style={{
									background: CITY_COLOURS[city],
								}}
							/>
							{city}
						</button>
					);
				})}
			</div>

			{/* chart */}
			<section className="p-4 bg-white border border-line rounded-2xl mb-8 overflow-hidden">
				<p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
					Average monthly asking rent (EUR) — {brType} apartments
				</p>
				<LineChart data={data} activeCities={activeCities} />
			</section>

			{/* summary stats table */}
			<section className="mb-8">
				<h2 className="text-sm font-bold text-ink mb-3">
					Summary — {brType} apartments (2025 H2 estimate)
				</h2>
				<div
					tabIndex={0}
					role="region"
					aria-label="Rental price table"
					className="overflow-x-auto rounded-xl border border-line"
				>
					<table className="w-full text-xs">
						<thead>
							<tr className="bg-sky text-muted uppercase tracking-wide text-xs">
								<th className="px-4 py-2.5 text-left font-semibold">City</th>
								<th className="px-4 py-2.5 text-right font-semibold">
									Current avg
								</th>
								<th className="px-4 py-2.5 text-right font-semibold">
									vs 2021
								</th>
								<th className="px-4 py-2.5 text-right font-semibold">
									vs 2023
								</th>
							</tr>
						</thead>
						<tbody>
							{CITIES.map((city) => {
								const cur = data[city][lastIdx];
								const base2021 = data[city][idx2021];
								const base2023 = data[city][idx2023];
								return (
									<tr key={city} className="border-t border-line hover:bg-sky">
										<td className="px-4 py-2.5">
											<span className="flex items-center gap-2 font-semibold text-ink">
												<span
													className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
													style={{ background: CITY_COLOURS[city] }}
												/>
												{city}
											</span>
										</td>
										<td className="px-4 py-2.5 text-right font-bold text-ink">
											€{cur.toLocaleString()}/mo
										</td>
										<td className="px-4 py-2.5 text-right">
											<span
												className={`px-2 py-0.5 rounded-full font-semibold ${changeColour(cur, base2021)}`}
											>
												{pct(cur, base2021)}
											</span>
										</td>
										<td className="px-4 py-2.5 text-right">
											<span
												className={`px-2 py-0.5 rounded-full font-semibold ${changeColour(cur, base2023)}`}
											>
												{pct(cur, base2023)}
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</section>

			{/* context callout */}
			<aside className="mb-8 p-5 bg-sky border border-line rounded-2xl text-sm text-slate-700 leading-relaxed">
				<p className="font-semibold text-ink mb-2">What is driving rents up?</p>
				<p>
					Cyprus rents have risen 60&ndash;85% since 2021. The main drivers:
					arrival of tens of thousands of tech workers (primarily from Russia,
					Ukraine, and Israel post-2022), limited new housing supply, and rising
					construction costs. Limassol has seen the steepest increases; Larnaca
					remains the most affordable major city.
				</p>
			</aside>

			{/* related tools */}
			<aside className="mb-8 p-5 bg-sky border border-line rounded-2xl">
				<p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
					Related tools
				</p>
				<div className="flex flex-wrap gap-3">
					<Link
						href="/tools/rent-vs-buy-calculator/"
						className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Rent vs Buy Calculator
					</Link>
					<Link
						href="/tools/rental-yield-calculator/"
						className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Rental Yield Calculator
					</Link>
					<Link
						href="/tools/mortgage-calculator/"
						className="text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Mortgage Calculator
					</Link>
				</div>
			</aside>

			{/* data disclaimer */}
			<aside className="mt-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-900">
				<p className="font-semibold text-ink mb-1">Data disclaimer</p>
				<p>
					Figures are estimates based on aggregated public market data. Actual
					rents depend heavily on exact location, condition, furnishing, and
					negotiation. General information only &mdash; not legal, tax, or
					financial advice.
				</p>
			</aside>

			<p className="mt-8 text-xs text-muted">
				<Link href="/tools/" className="underline hover:text-primary">
					&larr; Back to Tools
				</Link>
			</p>
		</main>
	);
}
