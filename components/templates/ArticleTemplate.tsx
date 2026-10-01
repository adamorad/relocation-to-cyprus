import type { ReactNode } from "react";
import { Callout } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { EmailBox } from "@/components/ui/EmailBox";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import { TemplateMain, type TemplateMainProps } from "./TemplateMain";

export type TocItem = { id: string; label: string };

/**
 * Article page (guides, About): plain header, reading-width body with
 * `.guide-body` typography, optional TOC (right rail on wide screens, block at
 * the top on mobile), then extras, related block, legal note.
 *
 * `children` must be the prose `<section id>` elements themselves (the
 * `.guide-body > section[id]` styles use the child combinator). Embedded tools
 * can sit between them.
 */
export function ArticleTemplate({
	header,
	hero,
	share,
	toc,
	tocLabel = "In this guide",
	afterBody,
	related,
	legal,
	showInlineEmail = false,
	emailSource = "article",
	children,
	...main
}: TemplateMainProps & {
	header: PageHeaderProps;
	/**
	 * Hero image above the body (eager, it is the LCP). With `srcSmall`,
	 * `width` and `height` it renders an 800w/1600w srcset at that ratio.
	 */
	hero?: {
		src: string;
		alt: string;
		srcSmall?: string;
		width?: number;
		height?: number;
	};
	share?: ReactNode;
	toc?: TocItem[];
	tocLabel?: string;
	/** FAQ or other blocks after the body. */
	afterBody?: ReactNode;
	/** Related block, usually a Section with a CardGrid. */
	related?: ReactNode;
	/** Legal / disclaimer text, rendered as a legal Callout. */
	legal?: ReactNode;
	/** Opt in to an inline EmailBox; the footer form covers the rest (one form per page). */
	showInlineEmail?: boolean;
	emailSource?: string;
	children: ReactNode;
}) {
	const hasToc = !!toc && toc.length > 0;
	return (
		<TemplateMain {...main}>
			<Container width={hasToc ? "wide" : "reading"}>
				<div
					className={
						hasToc
							? "lg:grid lg:grid-cols-[minmax(0,720px)_240px] lg:justify-center lg:gap-x-12 lg:[grid-template-areas:'header_toc'_'body_toc']"
							: undefined
					}
				>
					<div className="min-w-0 lg:[grid-area:header]">
						<PageHeader {...header} contained={false} />
						{hero ? (
							// <picture> stops React emitting an image preload hint into the
							// RSC payload, so prefetching this guide from another page does
							// not download its hero there.
							<picture className="mt-6 block overflow-hidden rounded-card">
								<img
									src={hero.src}
									srcSet={
										hero.srcSmall
											? `${hero.srcSmall} 800w, ${hero.src} 1600w`
											: undefined
									}
									sizes={
										hero.srcSmall
											? "(min-width: 1024px) 720px, calc(100vw - 40px)"
											: undefined
									}
									alt={hero.alt}
									className={`${hero.width ? "h-auto" : "aspect-[2/1]"} w-full object-cover`}
									loading="eager"
									fetchPriority="high"
									width={hero.width ?? 1200}
									height={hero.height ?? 630}
								/>
							</picture>
						) : null}
						{share}
					</div>

					{hasToc ? (
						<nav
							aria-label={tocLabel}
							data-pagefind-ignore
							className="mt-6 rounded-card border border-line bg-sky p-4 lg:sticky lg:top-24 lg:mt-8 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:[grid-area:toc]"
						>
							<p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
								{tocLabel}
							</p>
							<ol className="list-inside list-decimal space-y-1.5 text-sm text-ink lg:list-none">
								{toc.map((t) => (
									<li key={t.id}>
										<a
											href={`#${t.id}`}
											className="text-primary-hover underline underline-offset-2 hover:text-ink"
										>
											{t.label}
										</a>
									</li>
								))}
							</ol>
						</nav>
					) : null}

					<div className="min-w-0 lg:[grid-area:body]">
						<article className="guide-body mt-8">{children}</article>
						{afterBody}
						{related ? <div className="mt-12">{related}</div> : null}
						{showInlineEmail ? (
							<EmailBox source={emailSource} className="mt-10" />
						) : null}
						{legal ? (
							<Callout tone="legal" className="mt-10">
								{legal}
							</Callout>
						) : null}
					</div>
				</div>
			</Container>
		</TemplateMain>
	);
}
