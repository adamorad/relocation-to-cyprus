import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Container, type ContainerWidth } from "@/components/ui/Container";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { TemplateMain, type TemplateMainProps } from "./TemplateMain";

/** White inputs panel with a small heading, for the top of a tool. */
export function ToolPanel({
	title,
	children,
	className = "",
}: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			aria-label={title}
			className={`rounded-card border border-line bg-white p-5 shadow-rc md:p-6 ${className}`}
		>
			<h2 className="text-lg font-bold text-ink">{title}</h2>
			<div className="mt-4 space-y-5">{children}</div>
		</section>
	);
}

/**
 * Tool page in one fixed order: header, inputs and results (children),
 * "Next steps" links, disclaimer. Calculators use `reading`, comparison
 * tables `wide`.
 */
export function ToolTemplate({
	header,
	width = "reading",
	nextSteps,
	disclaimer,
	related,
	children,
	...main
}: TemplateMainProps & {
	header: PageHeaderProps;
	width?: ContainerWidth;
	nextSteps?: { href: string; label: string }[];
	disclaimer?: ReactNode;
	related?: ReactNode;
	children: ReactNode;
}) {
	return (
		<TemplateMain {...main}>
			<PageHeader {...header} width={width} />
			<Container width={width} className="pt-6 md:pt-8">
				<div className="space-y-6">{children}</div>
				{nextSteps && nextSteps.length > 0 ? (
					<Section id="next-steps" title="Next steps" className="!mt-10">
						<div className="flex flex-wrap gap-3">
							{nextSteps.map((s) => (
								<ButtonLink key={s.href} href={s.href} variant="secondary">
									{s.label}
								</ButtonLink>
							))}
						</div>
					</Section>
				) : null}
				{disclaimer ? (
					<Callout tone="legal" title="Disclaimer" className="mt-8">
						{disclaimer}
					</Callout>
				) : null}
				{related ? <div className="mt-12">{related}</div> : null}
			</Container>
		</TemplateMain>
	);
}
