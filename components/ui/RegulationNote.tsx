import type { ReactNode } from "react";
import type { FactSource } from "@/components/ui/SourcesNote";

/**
 * Visible callout flagging a claim that may conflict with a law or regulation.
 * `lead` is the bold opening sentence; `children` is the explanation; `source`
 * links the official reference.
 */
export function RegulationNote({
	lead,
	children,
	source,
	className = "",
}: {
	lead: string;
	children: ReactNode;
	source?: FactSource;
	className?: string;
}) {
	return (
		<aside
			role="note"
			className={`rounded-card border border-line border-l-4 border-l-primary bg-white p-4 text-sm text-muted ${className}`}
		>
			<p>
				<strong className="text-ink">{lead}</strong> {children}
			</p>
			{source && (
				<p className="mt-2">
					Source:{" "}
					<a
						href={source.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary-hover underline underline-offset-2 hover:text-ink"
					>
						{source.label}
					</a>
				</p>
			)}
		</aside>
	);
}
