import type { ReactNode } from "react";

/** H2 + optional description + content with consistent vertical spacing. */
export function Section({
	id,
	title,
	description,
	action,
	headingLevel = "h2",
	className = "",
	children,
}: {
	id?: string;
	title?: ReactNode;
	description?: ReactNode;
	/** Optional link or button shown beside the heading on wide screens. */
	action?: ReactNode;
	headingLevel?: "h2" | "h3";
	className?: string;
	children?: ReactNode;
}) {
	const H = headingLevel;
	const headingId = id ? `${id}-title` : undefined;
	return (
		<section
			id={id}
			aria-labelledby={title ? headingId : undefined}
			className={`mt-10 scroll-mt-24 first:mt-0 md:mt-12 ${className}`}
		>
			{title || description || action ? (
				<div className="mb-5 flex flex-wrap items-end justify-between gap-3">
					<div className="min-w-0">
						{title ? (
							<H
								id={headingId}
								className={
									H === "h2"
										? "text-[clamp(26px,2.4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink"
										: "text-xl font-bold leading-snug text-ink"
								}
							>
								{title}
							</H>
						) : null}
						{description ? (
							<p className="mt-2 text-base leading-normal text-muted">
								{description}
							</p>
						) : null}
					</div>
					{action ? <div className="shrink-0">{action}</div> : null}
				</div>
			) : null}
			{children}
		</section>
	);
}
