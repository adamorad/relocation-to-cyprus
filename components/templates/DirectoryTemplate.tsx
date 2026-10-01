import type { ReactNode } from "react";
import { Callout, type CalloutTone } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { InfoCards, type InfoItem } from "@/components/ui/InfoCards";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { TemplateMain, type TemplateMainProps } from "./TemplateMain";

export { InfoCards, type InfoItem };

/**
 * Directory page: header, then the interactive filters and entries FIRST
 * (pass them as children, usually one client component rendering a ChipGroup
 * and a CardGrid), then collapsible info cards, a warning/legal note, related.
 */
export function DirectoryTemplate({
	header,
	info,
	infoTitle = "What to know",
	notice,
	related,
	children,
	...main
}: TemplateMainProps & {
	header: PageHeaderProps;
	info?: InfoItem[];
	infoTitle?: string;
	notice?: { tone?: CalloutTone; title?: string; content: ReactNode };
	related?: ReactNode;
	children: ReactNode;
}) {
	return (
		<TemplateMain {...main}>
			<PageHeader {...header} width="wide" />
			<Container width="wide" className="pt-6 md:pt-8">
				{children}
				{info && info.length > 0 ? (
					<Section id="what-to-know" title={infoTitle} className="!mt-12">
						<InfoCards items={info} />
					</Section>
				) : null}
				{notice ? (
					<Callout
						tone={notice.tone ?? "warning"}
						title={notice.title}
						className="mt-8"
					>
						{notice.content}
					</Callout>
				) : null}
				{related ? <div className="mt-12">{related}</div> : null}
			</Container>
		</TemplateMain>
	);
}
