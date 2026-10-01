"use client";

import { useCallback, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { StatCard } from "@/components/ui/DataTable";
import { CHART_COLORS } from "@/lib/chart-colors";

// ── data ──────────────────────────────────────────────────────────────────────

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
] as const;
type Month = (typeof MONTHS)[number];

interface CyprusMonthData {
	high: number;
	low: number;
	sea: number;
	rainDays: number;
	uv: number;
}

const CYPRUS_DATA: Record<Month, CyprusMonthData> = {
	Jan: { high: 17, low: 8, sea: 17, rainDays: 8, uv: 2 },
	Feb: { high: 18, low: 8, sea: 16, rainDays: 7, uv: 3 },
	Mar: { high: 20, low: 10, sea: 17, rainDays: 5, uv: 5 },
	Apr: { high: 24, low: 13, sea: 18, rainDays: 3, uv: 7 },
	May: { high: 28, low: 17, sea: 21, rainDays: 1, uv: 9 },
	Jun: { high: 33, low: 21, sea: 24, rainDays: 0, uv: 11 },
	Jul: { high: 36, low: 24, sea: 27, rainDays: 0, uv: 11 },
	Aug: { high: 36, low: 24, sea: 28, rainDays: 0, uv: 10 },
	Sep: { high: 32, low: 22, sea: 27, rainDays: 1, uv: 8 },
	Oct: { high: 27, low: 17, sea: 25, rainDays: 4, uv: 6 },
	Nov: { high: 22, low: 12, sea: 22, rainDays: 7, uv: 3 },
	Dec: { high: 18, low: 9, sea: 19, rainDays: 9, uv: 2 },
};

interface CityData {
	highs: number[];
	lows: number[];
	rainDays: number[];
}

const CITY_DATA: Record<string, CityData> = {
	London: {
		highs: [8, 9, 12, 15, 19, 22, 24, 24, 20, 16, 11, 8],
		lows: [-1, 1, 3, 5, 8, 11, 13, 13, 11, 8, 4, 1],
		rainDays: [11, 9, 10, 10, 10, 9, 8, 8, 9, 11, 11, 12],
	},
	Amsterdam: {
		highs: [5, 6, 10, 14, 18, 21, 23, 22, 19, 14, 9, 5],
		lows: [-2, -1, 2, 5, 9, 12, 14, 14, 11, 7, 3, 0],
		rainDays: [15, 12, 13, 12, 12, 13, 13, 12, 13, 14, 16, 15],
	},
	Berlin: {
		highs: [3, 5, 10, 15, 20, 24, 26, 25, 20, 13, 7, 3],
		lows: [-3, -3, 1, 5, 10, 14, 15, 15, 11, 6, 2, -2],
		rainDays: [12, 9, 11, 10, 11, 11, 11, 11, 10, 12, 12, 13],
	},
	"Tel Aviv": {
		highs: [18, 19, 22, 26, 30, 32, 34, 34, 32, 29, 24, 20],
		lows: [10, 11, 13, 17, 21, 24, 26, 27, 25, 21, 16, 12],
		rainDays: [6, 5, 3, 1, 0, 0, 0, 0, 0, 2, 4, 6],
	},
	Dubai: {
		highs: [24, 26, 30, 35, 41, 43, 44, 44, 41, 36, 31, 26],
		lows: [14, 15, 18, 22, 27, 30, 32, 32, 30, 25, 19, 15],
		rainDays: [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	},
	"New York": {
		highs: [4, 6, 11, 17, 23, 28, 30, 29, 25, 19, 12, 6],
		lows: [-5, -4, 1, 7, 13, 18, 21, 21, 16, 10, 5, -1],
		rainDays: [11, 10, 12, 12, 12, 11, 11, 10, 9, 9, 10, 11],
	},
	Toronto: {
		highs: [-1, 0, 6, 13, 19, 25, 28, 27, 22, 15, 8, 1],
		lows: [-9, -8, -3, 3, 9, 14, 17, 17, 12, 6, 1, -6],
		rainDays: [13, 11, 12, 13, 14, 13, 11, 10, 11, 13, 14, 14],
	},
	Johannesburg: {
		highs: [26, 25, 24, 21, 18, 16, 17, 20, 24, 25, 25, 26],
		lows: [15, 15, 14, 11, 7, 4, 4, 6, 10, 13, 14, 15],
		rainDays: [14, 11, 11, 8, 4, 2, 1, 2, 5, 11, 13, 14],
	},
	Sydney: {
		highs: [26, 26, 24, 22, 19, 17, 16, 18, 20, 22, 24, 25],
		lows: [19, 19, 17, 15, 11, 9, 8, 9, 11, 14, 16, 18],
		rainDays: [12, 11, 13, 14, 14, 13, 11, 11, 11, 11, 12, 12],
	},
};

const ALL_CITIES = Object.keys(CITY_DATA);
const CITY_COLORS: string[] = [CHART_COLORS.ink, CHART_COLORS.coralFill];
const CYPRUS_COLOR: string = CHART_COLORS.primary;

// ── helpers ───────────────────────────────────────────────────────────────────

function uvLabel(uv: number): string {
	if (uv <= 2) return "Low";
	if (uv <= 5) return "Moderate";
	if (uv <= 7) return "High";
	if (uv <= 10) return "Very High";
	return "Extreme";
}

// ── chart ─────────────────────────────────────────────────────────────────────

interface TooltipData {
	x: number;
	y: number;
	monthIdx: number;
}

interface ChartProps {
	selectedCities: string[];
}

function WeatherChart({ selectedCities }: ChartProps) {
	const [tooltip, setTooltip] = useState<TooltipData | null>(null);
	const svgRef = useRef<SVGSVGElement>(null);

	const W = 700;
	const H = 320;
	const PAD = { top: 20, right: 20, bottom: 40, left: 40 };
	const innerW = W - PAD.left - PAD.right;
	const innerH = H - PAD.top - PAD.bottom;
	const MIN_TEMP = -15;
	const MAX_TEMP = 48;
	const RANGE = MAX_TEMP - MIN_TEMP;

	const xPos = (i: number) => PAD.left + (i / 11) * innerW;
	const yPos = (t: number) =>
		PAD.top + innerH - ((t - MIN_TEMP) / RANGE) * innerH;

	function pointsStr(temps: number[]): string {
		return temps
			.map((t, i) => `${xPos(i).toFixed(1)},${yPos(t).toFixed(1)}`)
			.join(" ");
	}

	const cyprusHighPts = MONTHS.map((m) => CYPRUS_DATA[m].high);
	const cyprusLowPts = MONTHS.map((m) => CYPRUS_DATA[m].low);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<SVGSVGElement>) => {
			const svg = svgRef.current;
			if (!svg) return;
			const rect = svg.getBoundingClientRect();
			const scaleX = W / rect.width;
			const rawX = (e.clientX - rect.left) * scaleX - PAD.left;
			const idx = Math.round((rawX / innerW) * 11);
			if (idx < 0 || idx > 11) {
				setTooltip(null);
				return;
			}
			const svgX = xPos(idx);
			setTooltip({ x: svgX, y: 0, monthIdx: idx });
		},
		[innerW, xPos],
	);

	const handleMouseLeave = useCallback(() => setTooltip(null), []);

	// Y-axis grid lines
	const gridTemps = [-10, 0, 10, 20, 30, 40];

	return (
		// biome-ignore lint/a11y/useSemanticElements: keyboard access for scrollable regions (axe scrollable-region-focusable)
		<div
			// biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access for scrollable regions (axe scrollable-region-focusable)
			tabIndex={0}
			role="region"
			aria-label="Climate chart"
			className="w-full overflow-x-auto"
		>
			<div className="relative" style={{ minWidth: 700 }}>
				<svg
					ref={svgRef}
					viewBox={`0 0 ${W} ${H}`}
					className="w-full"
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
				>
					{/* grid lines */}
					{gridTemps.map((t) => (
						<g key={t}>
							<line
								x1={PAD.left}
								y1={yPos(t)}
								x2={W - PAD.right}
								y2={yPos(t)}
								stroke="#d9e5ef"
								strokeWidth="1"
							/>
							<text
								x={PAD.left - 6}
								y={yPos(t) + 4}
								textAnchor="end"
								fontSize="12"
								fill="#506580"
							>
								{t}°
							</text>
						</g>
					))}

					{/* x-axis labels */}
					{MONTHS.map((m, i) => (
						<text
							key={m}
							x={xPos(i)}
							y={H - 8}
							textAnchor="middle"
							fontSize="12"
							fill="#506580"
						>
							{m}
						</text>
					))}

					{/* comparison city lines */}
					{selectedCities.map((city, ci) => {
						const data = CITY_DATA[city];
						const color = CITY_COLORS[ci % CITY_COLORS.length];
						return (
							<g key={city}>
								<polyline
									points={pointsStr(data.highs)}
									fill="none"
									stroke={color}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<polyline
									points={pointsStr(data.lows)}
									fill="none"
									stroke={color}
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeDasharray="5 3"
								/>
							</g>
						);
					})}

					{/* Cyprus lines, always on top */}
					<polyline
						points={pointsStr(cyprusHighPts)}
						fill="none"
						stroke={CYPRUS_COLOR}
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<polyline
						points={pointsStr(cyprusLowPts)}
						fill="none"
						stroke={CYPRUS_COLOR}
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeDasharray="6 3"
					/>

					{/* tooltip vertical line */}
					{tooltip && (
						<line
							x1={tooltip.x}
							y1={PAD.top}
							x2={tooltip.x}
							y2={H - PAD.bottom}
							stroke="#506580"
							strokeWidth="1"
							strokeDasharray="4 2"
						/>
					)}
				</svg>

				{/* tooltip card */}
				{tooltip &&
					(() => {
						const mi = tooltip.monthIdx;
						const month = MONTHS[mi];
						const cd = CYPRUS_DATA[month];
						return (
							<div
								className="pointer-events-none absolute top-0 z-10 rounded-xl border border-line bg-white/95 p-3 shadow-sm text-xs"
								style={{
									left: `${Math.min(Math.max((tooltip.x / W) * 100, 10), 75)}%`,
									transform: "translateX(-50%)",
									minWidth: 160,
								}}
							>
								<p className="font-bold text-ink mb-2">{month}</p>
								<div className="flex items-center gap-1.5 mb-1">
									<span
										className="inline-block w-3 h-0.5 rounded"
										style={{ background: CYPRUS_COLOR }}
									/>
									<span className="text-slate-700">
										Cyprus: {cd.high}° / {cd.low}°
									</span>
								</div>
								{selectedCities.map((city, ci) => {
									const data = CITY_DATA[city];
									return (
										<div key={city} className="flex items-center gap-1.5 mb-1">
											<span
												className="inline-block w-3 h-0.5 rounded"
												style={{
													background: CITY_COLORS[ci % CITY_COLORS.length],
												}}
											/>
											<span className="text-slate-700">
												{city}: {data.highs[mi]}° / {data.lows[mi]}°
											</span>
										</div>
									);
								})}
							</div>
						);
					})()}
			</div>
		</div>
	);
}

// ── monthly cards ─────────────────────────────────────────────────────────────

function MonthCards() {
	return (
		// biome-ignore lint/a11y/useSemanticElements: keyboard access for scrollable regions (axe scrollable-region-focusable)
		<div
			// biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access for scrollable regions (axe scrollable-region-focusable)
			tabIndex={0}
			role="region"
			aria-label="Monthly climate cards"
			className="flex gap-3 overflow-x-auto pb-2 snap-x"
		>
			{MONTHS.map((m) => {
				const d = CYPRUS_DATA[m];
				return (
					<div
						key={m}
						className="snap-start flex-none w-32 rounded-card border border-line bg-white p-3 text-center"
					>
						<p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted">
							{m}
						</p>
						<p className="text-2xl font-bold text-ink">{d.high}°</p>
						<p className="text-sm text-muted">{d.low}° low</p>
						<p className="mt-2 text-sm text-ink">Sea {d.sea}°</p>
						<p className="mt-0.5 text-sm text-muted">Rain {d.rainDays}d</p>
						<Badge className="mt-2">
							UV {d.uv} · {uvLabel(d.uv)}
						</Badge>
					</div>
				);
			})}
		</div>
	);
}

// ── main component ────────────────────────────────────────────────────────────

export default function WeatherClimateClient() {
	const [selectedCities, setSelectedCities] = useState<string[]>([]);

	function toggleCity(city: string) {
		setSelectedCities((prev) => {
			if (prev.includes(city)) return prev.filter((c) => c !== city);
			if (prev.length >= 2) return [...prev.slice(1), city];
			return [...prev, city];
		});
	}

	// Fun comparison: count months where Cyprus high > city high
	function warmerMonths(city: string): number {
		const data = CITY_DATA[city];
		return MONTHS.filter((m, i) => CYPRUS_DATA[m].high > data.highs[i]).length;
	}

	return (
		<div className="flex flex-col gap-6">
			<section
				aria-label="Cyprus climate at a glance"
				className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
			>
				<StatCard highlight label="Annual sunshine" value="3,280 hrs" />
				<StatCard label="Beach season" value="May – Oct" />
				<StatCard label="Avg summer high" value="33–36°C" />
				<StatCard label="Avg winter high" value="17–20°C" />
			</section>

			<section aria-labelledby="compare-cities" className="space-y-3">
				<h2 id="compare-cities" className="text-lg font-bold text-ink">
					Compare Cyprus to{" "}
					<span className="text-base font-normal text-muted">
						(pick up to 2 cities)
					</span>
				</h2>
				<div className="flex flex-wrap gap-2">
					{ALL_CITIES.map((city) => (
						<Chip
							key={city}
							selected={selectedCities.includes(city)}
							onClick={() => toggleCity(city)}
						>
							{city}
						</Chip>
					))}
				</div>
			</section>

			<section
				aria-label="Temperature chart"
				className="rounded-card border border-line bg-white p-4 shadow-rc"
			>
				<ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink">
					<li className="flex items-center gap-1.5">
						<span
							aria-hidden="true"
							className="inline-block h-1 w-6 rounded"
							style={{ background: CYPRUS_COLOR }}
						/>
						Cyprus high
					</li>
					<li className="flex items-center gap-1.5">
						<span
							aria-hidden="true"
							className="inline-block w-6 border-t-4 border-dashed"
							style={{ borderColor: CYPRUS_COLOR }}
						/>
						Cyprus low
					</li>
					{selectedCities.map((city, ci) => (
						<li key={city} className="flex items-center gap-1.5">
							<span
								aria-hidden="true"
								className="inline-block h-1 w-6 rounded"
								style={{ background: CITY_COLORS[ci % CITY_COLORS.length] }}
							/>
							{city} high
						</li>
					))}
					{selectedCities.map((city, ci) => (
						<li key={`${city}-low`} className="flex items-center gap-1.5">
							<span
								aria-hidden="true"
								className="inline-block w-6 border-t-4 border-dashed"
								style={{ borderColor: CITY_COLORS[ci % CITY_COLORS.length] }}
							/>
							{city} low
						</li>
					))}
				</ul>
				<WeatherChart selectedCities={selectedCities} />
			</section>

			{selectedCities.length > 0 && (
				<section
					aria-labelledby="compare-result"
					className="rounded-card border border-line bg-sky p-5"
				>
					<h2 id="compare-result" className="mb-2 text-lg font-bold text-ink">
						How does Cyprus compare?
					</h2>
					<div className="flex flex-col gap-1.5">
						{selectedCities.map((city) => {
							const n = warmerMonths(city);
							return (
								<p key={city} className="text-base text-ink">
									Cyprus is warmer than{" "}
									<span className="font-semibold">{city}</span> in{" "}
									<span className="font-bold">{n} out of 12 months</span>.
								</p>
							);
						})}
					</div>
				</section>
			)}

			<section aria-labelledby="month-by-month" className="space-y-3">
				<h2
					id="month-by-month"
					className="text-2xl font-bold tracking-tight text-ink"
				>
					Month-by-month in Cyprus
				</h2>
				<MonthCards />
				<p className="text-sm text-muted">
					Scroll right to see all months. Sea temperature, rain days and UV
					index are shown on each card.
				</p>
			</section>
		</div>
	);
}
