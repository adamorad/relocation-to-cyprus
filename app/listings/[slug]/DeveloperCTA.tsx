"use client";

import { trackEvent } from "@/lib/analytics";

interface Props {
	name: string;
	searchHref: string;
	slug: string;
}

export default function DeveloperCTA({ name, searchHref, slug }: Props) {
	return (
		<section className="mt-6 p-4 bg-sky rounded-2xl border border-line">
			<p className="text-xs text-muted mb-0.5">Developer</p>
			<p className="text-sm font-semibold text-ink">{name}</p>
			<a
				href={searchHref}
				target="_blank"
				rel="noopener noreferrer"
				className="mt-3 block w-full text-center min-h-11 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
				onClick={() => trackEvent("developer_click", { slug, developer: name })}
			>
				Find {name} online
			</a>
		</section>
	);
}
