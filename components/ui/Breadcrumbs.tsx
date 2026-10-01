import Link from "next/link";

export type Crumb = { label: string; href?: string };

const SITE_URL = "https://realcy.app";

const absolute = (href: string) =>
	href.startsWith("http") ? href : `${SITE_URL}${href}`;

/** BreadcrumbList JSON-LD built from the same items the nav renders. */
export function breadcrumbJsonLd(items: Crumb[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((c, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: c.label,
			...(c.href && i < items.length - 1 ? { item: absolute(c.href) } : {}),
		})),
	};
}

/**
 * Site breadcrumb: `›` separator, last item marked as the current page, and
 * (by default) the matching BreadcrumbList JSON-LD so there is one source of truth.
 */
export function Breadcrumbs({
	items,
	jsonLd = true,
	className = "",
}: {
	items: Crumb[];
	/** Emit BreadcrumbList JSON-LD. Turn off only where a page still hand-writes it. */
	jsonLd?: boolean;
	className?: string;
}) {
	return (
		<>
			{jsonLd ? (
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(breadcrumbJsonLd(items)).replace(
							/</g,
							"\\u003c",
						),
					}}
				/>
			) : null}
			<nav
				data-pagefind-ignore
				aria-label="Breadcrumb"
				className={`text-sm text-muted ${className}`}
			>
				<ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
					{items.map((item, i) => {
						const last = i === items.length - 1;
						return (
							<li
								key={item.href ?? item.label}
								className="flex items-center gap-1.5"
							>
								{item.href && !last ? (
									<Link
										href={item.href}
										className="rounded-sm underline-offset-2 hover:text-ink hover:underline"
									>
										{item.label}
									</Link>
								) : (
									<span
										className={last ? "font-medium text-ink" : undefined}
										aria-current={last ? "page" : undefined}
									>
										{item.label}
									</span>
								)}
								{!last ? <span aria-hidden="true">›</span> : null}
							</li>
						);
					})}
				</ol>
			</nav>
		</>
	);
}
