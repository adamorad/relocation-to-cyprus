"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface Props {
	/** Display name (title case). */
	name: string;
	/** Internal developer page, when one exists. */
	developerHref?: string;
	/** External web search, only when the developer has no page here. */
	searchHref?: string;
	slug: string;
}

export default function DeveloperCTA({
	name,
	developerHref,
	searchHref,
	slug,
}: Props) {
	return (
		<section
			aria-label="Developer"
			className="rounded-card border border-line bg-sky p-5"
		>
			<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
				Developer
			</p>
			<p className="mt-1 text-lg font-bold text-ink">{name}</p>
			<div className="mt-4 flex flex-col gap-3">
				{developerHref ? (
					<Link
						href={developerHref}
						className={buttonClasses({ variant: "primary", fullWidth: true })}
						onClick={() =>
							trackEvent("developer_click", { slug, developer: name })
						}
					>
						See all {name} projects
					</Link>
				) : null}
				{searchHref ? (
					<a
						href={searchHref}
						target="_blank"
						rel="noopener noreferrer"
						className={buttonClasses({
							variant: developerHref ? "secondary" : "primary",
							fullWidth: true,
						})}
						onClick={() =>
							trackEvent("developer_click", { slug, developer: name })
						}
					>
						Find {name} online
					</a>
				) : null}
			</div>
		</section>
	);
}
