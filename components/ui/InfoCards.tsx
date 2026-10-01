import type { ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";

export type InfoItem = { heading: string; body: ReactNode };

/** Collapsible info cards (`<details>`), closed by default. */
export function InfoCards({
	items,
	columns = 2,
}: {
	items: InfoItem[];
	/** 2 = two columns from md up (directories); 1 = stacked (FAQs). */
	columns?: 1 | 2;
}) {
	return (
		<div
			className={`grid grid-cols-1 gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}
		>
			{items.map((it) => (
				<details
					key={it.heading}
					className="group self-start rounded-card border border-line bg-white"
				>
					<summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-card px-4 py-3 font-semibold text-ink hover:bg-sky [&::-webkit-details-marker]:hidden">
						{it.heading}
						<Icon
							name="chevronDown"
							size={20}
							className="shrink-0 text-muted transition-transform group-open:rotate-180"
						/>
					</summary>
					<div className="px-4 pb-4 text-base leading-relaxed text-ink">
						{it.body}
					</div>
				</details>
			))}
		</div>
	);
}
