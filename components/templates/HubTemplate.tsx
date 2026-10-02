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
	sponsor,
	filters,
	after,
	children,
	...main
}: TemplateMainProps & {
	header: PageHeaderProps;
	/** Decorative illustration for the band (alt=""; the H1 names the page). */
	headerImage?: SiteImage;
	/** Paid "Sponsored by" unit (SponsorSlot), first thing under the header. */
	sponsor?: ReactNode;
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
								<HeaderArt image={headerImage} />
							</>
						}
					/>
				</div>
			) : (
				<PageHeader variant="band" {...header} width="wide" />
			)}
			<Container width="wide" className="pt-8 md:pt-10">
				{sponsor ? <div className="mb-8 max-w-2xl">{sponsor}</div> : null}
				{filters ? <div className="mb-6">{filters}</div> : null}
				{children}
				{after ? <div className="mt-12">{after}</div> : null}
			</Container>
		</TemplateMain>
	);
}

/**
 * One <img>: under the intro below xl, then lifted to the band's bottom right
 * (aligned with the 1280px container edge) from xl up. Lazy, so React emits
 * no image preload hint: otherwise every next/link prefetch of a hub (footer,
 * Topics menu, breadcrumbs) would download the illustration on the current
 * page.
 */
function HeaderArt({ image }: { image: SiteImage }) {
	return (
		// biome-ignore lint/performance/noImgElement: static export, pre-sized WebP
		<img
			src={image.srcSmall}
			alt=""
			width={image.width / 2}
			height={Math.round(image.height / 2)}
			loading="lazy"
			decoding="async"
			className="pointer-events-none h-auto w-48 object-contain sm:w-56 xl:absolute xl:bottom-8 xl:right-[max(2rem,calc((100%_-_1280px)/2_+_2rem))] xl:max-h-[calc(100%_-_3rem)] xl:w-[280px]"
		/>
	);
}
