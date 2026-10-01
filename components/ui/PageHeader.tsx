import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container, type ContainerWidth } from "./Container";

export type PageHeaderProps = {
	breadcrumbs: Crumb[];
	eyebrow?: ReactNode;
	title: ReactNode;
	intro?: ReactNode;
	/** Extra line under the intro (byline, counts). */
	meta?: ReactNode;
	actions?: ReactNode;
	/** `band` = full-bleed sky background. */
	variant?: "plain" | "band";
	width?: ContainerWidth;
	/** Emit BreadcrumbList JSON-LD (default true). */
	breadcrumbJsonLd?: boolean;
	/** Render the title as a div instead of an H1 (showcase previews only). */
	titleAs?: "h1" | "div";
	/** Wrap in Container (default). Templates with their own grid pass false. */
	contained?: boolean;
};

/** Breadcrumb, eyebrow, H1, intro and actions with the same top spacing everywhere. */
export function PageHeader({
	breadcrumbs,
	eyebrow,
	title,
	intro,
	meta,
	actions,
	variant = "plain",
	width = "wide",
	breadcrumbJsonLd = true,
	titleAs: TitleTag = "h1",
	contained = true,
}: PageHeaderProps) {
	const band = variant === "band";
	const Wrap = contained ? Container : Bare;
	return (
		<header
			className={
				band
					? "border-b border-line bg-sky pb-8 pt-6 md:pb-10 md:pt-8"
					: "pt-6 md:pt-8"
			}
		>
			<Wrap width={width}>
				<Breadcrumbs items={breadcrumbs} jsonLd={breadcrumbJsonLd} />
				<div className="mt-6 max-w-3xl">
					{eyebrow ? (
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							{eyebrow}
						</p>
					) : null}
					<TitleTag
						className={`text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl ${eyebrow ? "mt-2" : ""}`}
					>
						{title}
					</TitleTag>
					{intro ? (
						<p className="mt-3 text-lg leading-normal text-muted">{intro}</p>
					) : null}
					{meta ? <div className="mt-3 text-sm text-muted">{meta}</div> : null}
					{actions ? (
						<div className="mt-5 flex flex-wrap gap-3">{actions}</div>
					) : null}
				</div>
			</Wrap>
		</header>
	);
}

function Bare({ children }: { width?: ContainerWidth; children: ReactNode }) {
	return <>{children}</>;
}
