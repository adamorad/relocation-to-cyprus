/**
 * Data colours for charts and comparisons. Use these instead of page-specific
 * colours. No traffic-light red/amber/green for neutral comparisons; semantic
 * colours (Badge success/warning/danger) only for real good/bad states.
 */
export const CHART_COLORS = {
	primary: "#087f98",
	/** Coral for text and thin marks (AA on white). */
	coral: "#c2410c",
	/** Bright coral, fills only (bars, areas), never text. */
	coralFill: "#fa794d",
	ink: "#0b2145",
	blue: "#3b82f6",
	/** "Other" / remainder series. */
	neutral: "#94a3b8",
} as const;

export type ChartColor = keyof typeof CHART_COLORS;

/** Default categorical order for multi-series charts. */
export const CHART_SERIES: readonly string[] = [
	CHART_COLORS.primary,
	CHART_COLORS.coralFill,
	CHART_COLORS.ink,
	CHART_COLORS.blue,
	CHART_COLORS.neutral,
];

/** Colour for series `i`, cycling through CHART_SERIES. */
export const seriesColor = (i: number) => CHART_SERIES[i % CHART_SERIES.length];
