import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import { TemplateMain, type TemplateMainProps } from "./TemplateMain";

/**
 * Hub page (guides, tools, directories, cities): sky band header, optional
 * filters, then the card grid, all in the wide container.
 *
 * <HubTemplate header={{ breadcrumbs, title, intro }} filters={<ChipGroup ... />}>
 *   <CardGrid>...</CardGrid>
 * </HubTemplate>
 */
export function HubTemplate({
	header,
	filters,
	after,
	children,
	...main
}: TemplateMainProps & {
	header: PageHeaderProps;
	/** Filter row (ChipGroup) shown above the grid. */
	filters?: ReactNode;
	/** Content after the grid (related links, notes). */
	after?: ReactNode;
	children: ReactNode;
}) {
	return (
		<TemplateMain {...main}>
			<PageHeader variant="band" {...header} width="wide" />
			<Container width="wide" className="pt-8 md:pt-10">
				{filters ? <div className="mb-6">{filters}</div> : null}
				{children}
				{after ? <div className="mt-12">{after}</div> : null}
			</Container>
		</TemplateMain>
	);
}
