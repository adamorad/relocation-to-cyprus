import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ToolsIndexClient from "./client";

export const metadata: Metadata = {
	title: "Cyprus Relocation Tools — RealCy.app",
	description:
		"Free interactive tools for Cyprus relocators: rent vs buy calculator, visa pathway finder, tax residency planner, social insurance calculator, banking fee comparison, and more.",
	alternates: { canonical: "/tools/" },
};

const SITE_URL = "https://realcy.app";

export default function ToolsIndexPage() {
	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
			{ "@type": "ListItem", position: 2, name: "Tools" },
		],
	};
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
				<Breadcrumbs
					items={[{ label: "Home", href: "/" }, { label: "Tools" }]}
				/>

				<header className="mb-10">
					<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
						Interactive Tools
					</p>
					<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
						Cyprus Relocation Tools
					</h1>
					<p className="mt-4 text-lg text-slate-700 leading-relaxed">
						Free calculators, planners, and trackers for the most common
						questions when relocating to Cyprus.
					</p>
				</header>

				<ToolsIndexClient />

				<aside className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-900">
					<p className="font-semibold text-amber-900 mb-1">Disclaimer</p>
					<p>
						These tools provide general information only and are not legal, tax,
						or financial advice. Rates and rules change frequently — always
						verify with the Cyprus Tax Department, Civil Registry, and a local
						accountant before making decisions.
					</p>
				</aside>

				<p className="mt-8 text-xs text-slate-500">
					<Link href="/" className="underline hover:text-ink">
						Back to home
					</Link>
				</p>
			</main>
		</>
	);
}
