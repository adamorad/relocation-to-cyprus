import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import type { SiteImage } from "@/lib/topics";
import { TemplateMain, type TemplateMainProps } from "./TemplateMain";

/**
 * City page: sky band header, an optional 16:9 hero image (the LCP, so eager
 * with high fetch priority), an "On this page" contents nav, the Sections
 * (children, each with an id matching `contents`), a call to action (for
 * example one ButtonLink to that city's new developments) and related links.
 */
export function CityTemplate({
	header,
	hero,
	contents,
	cta,
	related,
	children,
	...main
}: TemplateMainProps & {
	header: PageHeaderProps;
	/** City scene above the contents nav, aligned with the text column. */
	hero?: SiteImage;
	contents?: { id: string; label: string }[];
	cta?: ReactNode;
	related?: ReactNode;
	children: ReactNode;
}) {
	return (
		<TemplateMain {...main}>
			<PageHeader variant="band" {...header} width="wide" />
			<Container width="wide" className="pt-6 md:pt-8">
				{hero ? (
					// biome-ignore lint/performance/noImgElement: static export, hero is the LCP
					<img
						src={hero.src}
						srcSet={`${hero.srcSmall} 800w, ${hero.src} 1600w`}
						sizes="(min-width: 832px) 768px, calc(100vw - 40px)"
						width={hero.width}
						height={hero.height}
						alt={hero.alt ?? ""}
						loading="eager"
						fetchPriority="high"
						className="mb-8 aspect-video h-auto w-full max-w-3xl rounded-2xl object-cover"
					/>
				) : null}
				{contents && contents.length > 0 ? (
					<nav
						aria-label="On this page"
						data-pagefind-ignore
						className="mb-8 border-b border-line pb-6"
					>
						<p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
							On this page
						</p>
						<ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
							{contents.map((c) => (
								<li key={c.id} className="shrink-0">
									<a
										href={`#${c.id}`}
										className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:bg-sky"
									>
										{c.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				) : null}
				<div className="max-w-3xl">{children}</div>
				{cta ? <div className="mt-12">{cta}</div> : null}
				{related ? <div className="mt-12">{related}</div> : null}
			</Container>
		</TemplateMain>
	);
}
