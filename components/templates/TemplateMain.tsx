import type { ReactNode } from "react";

export type TemplateMainProps = {
	/** "main" on real pages (the one `<main id="main">`); "div" for previews. */
	as?: "main" | "div";
	/** Pagefind type filter (guide, directory, tool, city, hub). Omit to keep the page out of search. */
	pagefindType?: string;
};

/** Page landmark shared by all templates; forwards the Pagefind attributes. */
export function TemplateMain({
	as = "main",
	pagefindType,
	className = "",
	children,
}: TemplateMainProps & { className?: string; children: ReactNode }) {
	const Tag = as;
	return (
		<Tag
			id={as === "main" ? "main" : undefined}
			{...(pagefindType
				? {
						"data-pagefind-body": "",
						"data-pagefind-filter": "type[data-type]",
						"data-type": pagefindType,
					}
				: {})}
			className={`pb-12 md:pb-16 ${className}`}
		>
			{children}
		</Tag>
	);
}
