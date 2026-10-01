import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CATEGORIES } from "./categories";
import ExploreClient from "./ExploreClient";

const SITE_URL = "https://realcy.app";
const title = "Search guides, directories and tools";
const description =
	"Search every guide, directory, tool, city page and new development on RealCy.app, or browse by category.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/explore/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/explore/`,
		type: "website",
	},
};

export default function ExplorePage() {
	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
			{ "@type": "ListItem", position: 2, name: "Search" },
		],
	};
	return (
		<main id="main" className="mx-auto max-w-5xl px-6 py-10 md:py-16">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Breadcrumbs
				items={[{ label: "Home", href: "/" }, { label: "Search" }]}
			/>

			<header className="mb-8">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
					Search
				</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
					Search RealCy.app
				</h1>
				<p className="mt-3 leading-relaxed text-slate-700">
					Find guides, directories, tools, city pages and new developments.
				</p>
			</header>

			<Suspense fallback={<div className="min-h-11" aria-hidden="true" />}>
				<ExploreClient />
			</Suspense>

			<section aria-labelledby="browse-heading" className="mt-12">
				<h2
					id="browse-heading"
					className="mb-4 text-xl font-bold tracking-tight text-ink"
				>
					Browse by category
				</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{CATEGORIES.map((category) => (
						<div
							key={category.title}
							className="rounded-2xl border border-line bg-white p-5"
						>
							<h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
								{category.title}
							</h3>
							<ul className="space-y-1.5">
								{category.items.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="group flex items-center gap-1.5 py-1 text-sm text-slate-700 transition-colors hover:text-primary"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<p className="mt-10 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
