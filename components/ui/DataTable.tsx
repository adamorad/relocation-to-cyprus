import type { ReactNode } from "react";

export type DataColumn = { header: ReactNode; align?: "left" | "right" };

/**
 * Responsive table: keyboard-focusable scroll wrapper, visible caption,
 * sky header, optional zebra rows and a footer row (totals).
 */
export function DataTable({
	caption,
	hideCaption = false,
	columns,
	rows,
	footer,
	zebra = false,
	className = "",
}: {
	caption: string;
	hideCaption?: boolean;
	columns: DataColumn[];
	rows: ReactNode[][];
	footer?: ReactNode[];
	zebra?: boolean;
	className?: string;
}) {
	const align = (i: number) =>
		columns[i]?.align === "right" ? "text-right" : "text-left";
	return (
		<section
			aria-label={caption}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be keyboard reachable
			tabIndex={0}
			className={`overflow-x-auto rounded-card border border-line bg-white ${className}`}
		>
			<table className="w-full border-collapse text-base">
				<caption
					className={
						hideCaption
							? "sr-only"
							: "px-4 pb-2 pt-4 text-left text-sm font-semibold text-muted"
					}
				>
					{caption}
				</caption>
				<thead>
					<tr className="bg-sky text-ink">
						{columns.map((c, i) => (
							<th
								// biome-ignore lint/suspicious/noArrayIndexKey: columns are positional
								key={i}
								scope="col"
								className={`px-4 py-3 text-sm font-semibold ${align(i)}`}
							>
								{c.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((r, ri) => (
						<tr
							// biome-ignore lint/suspicious/noArrayIndexKey: rows are positional
							key={ri}
							className={`border-t border-line ${zebra && ri % 2 === 1 ? "bg-sky/50" : ""}`}
						>
							{r.map((cell, ci) => {
								const Cell = ci === 0 ? "th" : "td";
								return (
									<Cell
										// biome-ignore lint/suspicious/noArrayIndexKey: cells are positional
										key={ci}
										{...(ci === 0 ? { scope: "row" } : {})}
										className={`px-4 py-3 ${ci === 0 ? "font-medium text-ink" : "text-ink"} ${align(ci)}`}
									>
										{cell}
									</Cell>
								);
							})}
						</tr>
					))}
				</tbody>
				{footer ? (
					<tfoot>
						<tr className="border-t-2 border-primary bg-sky-strong font-bold text-ink">
							{footer.map((cell, ci) => (
								<td
									// biome-ignore lint/suspicious/noArrayIndexKey: cells are positional
									key={ci}
									className={`px-4 py-3 ${align(ci)}`}
								>
									{cell}
								</td>
							))}
						</tr>
					</tfoot>
				) : null}
			</table>
		</section>
	);
}

/** KPI tile: label, big value, optional hint. `highlight` uses the primary panel. */
export function StatCard({
	label,
	value,
	hint,
	highlight = false,
}: {
	label: ReactNode;
	value: ReactNode;
	hint?: ReactNode;
	highlight?: boolean;
}) {
	return (
		<div
			className={`rounded-card border p-4 ${
				highlight
					? "border-primary bg-primary text-white"
					: "border-line bg-white text-ink"
			}`}
		>
			<p
				className={`text-sm font-semibold ${highlight ? "text-white" : "text-muted"}`}
			>
				{label}
			</p>
			<p className="mt-1 text-3xl font-extrabold tracking-tight">{value}</p>
			{hint ? (
				<p
					className={`mt-1 text-sm ${highlight ? "text-white" : "text-muted"}`}
				>
					{hint}
				</p>
			) : null}
		</div>
	);
}
