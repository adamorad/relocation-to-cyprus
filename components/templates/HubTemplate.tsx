import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import type { SiteImage } from "@/lib/topics";
import { TemplateMain, type TemplateMainProps } from "./TemplateMain";

/**
 * Hub page (guides, tools, directories, cities): sky band header, optional
 * filters, then the card grid, all in the wide container. `headerImage` is a
 * decorative spot illustration (transparent WebP): beside the title on wide
 * screens, under the intro on smaller ones.
 *
 * <HubTemplate header={{ breadcrumbs, title, intro }} filters={<ChipGroup ... />}>
 *   <CardGrid>...</CardGrid>
 * </HubTemplate>
 */
export function HubTemplate({
	header,
	headerImage,
	filters,
	after,
	children,
	...main
}: TemplateMainProps & {
	header: PageHeaderProps;
	/** Decorative illustration for the band (alt=""; the H1 names the page). */
	headerImage?: SiteImage;
	/** Filter row (ChipGroup) shown above the grid. */
	filters?: ReactNode;
	/** Content after the grid (related links, notes). */
	after?: ReactNode;
	children: ReactNode;
}) {
	return (
		<TemplateMain {...main}>
			{headerImage ? (
				<div className="relative">
					<PageHeader
						variant="band"
						{...header}
						width="wide"
						actions={
							<>
								{header.actions}
								<HeaderArt
									image={headerImage}
									className="w-48 sm:w-56 xl:hidden"
								/>
							</>
						}
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 hidden xl:block"
					>
						<Container width="wide" className="relative h-full">
							<HeaderArt
								image={headerImage}
								className="absolute bottom-8 right-8 max-h-[calc(100%-3rem)] w-[280px]"
							/>
						</Container>
					</div>
				</div>
			) : (
				<PageHeader variant="band" {...header} width="wide" />
			)}
			<Container width="wide" className="pt-8 md:pt-10">
				{filters ? <div className="mb-6">{filters}</div> : null}
				{children}
				{after ? <div className="mt-12">{after}</div> : null}
			</Container>
		</TemplateMain>
	);
}

function HeaderArt({
	image,
	className,
}: {
	image: SiteImage;
	className: string;
}) {
	return (
		// biome-ignore lint/performance/noImgElement: static export, pre-sized WebP
		<img
			src={image.srcSmall}
			alt=""
			width={image.width / 2}
			height={Math.round(image.height / 2)}
			className={`h-auto object-contain ${className}`}
		/>
	);
}
