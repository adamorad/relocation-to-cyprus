export type FactSource = { label: string; url: string };

/** Formats an ISO date (YYYY-MM-DD) as "October 2026". */
export function formatChecked(iso: string): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	});
}

/**
 * "Last checked" line plus the official sources behind a page's facts.
 * Used on guides (from GuideInfo.sources) and on tools and directories.
 */
export function SourcesNote({
	lastChecked,
	sources,
	className = "",
}: {
	lastChecked: string;
	sources: ReadonlyArray<FactSource>;
	className?: string;
}) {
	if (sources.length === 0) return null;
	return (
		<section
			aria-labelledby="sources-title"
			className={`rounded-card border border-line bg-white p-5 text-sm text-muted ${className}`}
		>
			<h2 id="sources-title" className="text-base font-bold text-ink">
				Sources
			</h2>
			<p className="mt-1">Last checked {formatChecked(lastChecked)}.</p>
			<ul className="mt-3 space-y-1.5">
				{sources.map((s) => (
					<li key={s.url}>
						<a
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary-hover underline underline-offset-2 hover:text-ink"
						>
							{s.label}
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
