import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import SoleTraderVsLtdClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Sole Trader vs Ltd — RealCy.app";
const description =
	"Compare operating as a Cyprus sole trader versus a Cyprus Ltd. Tab between take-home pay comparison and Ltd formation cost calculator — all in one place.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/sole-trader-vs-ltd/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/tools/sole-trader-vs-ltd/`,
		type: "website",
	},
};

export default function SoleTraderVsLtdPage() {
	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
			{
				"@type": "ListItem",
				position: 2,
				name: "Explore",
				item: `${SITE_URL}/explore/`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: "Tools",
				item: `${SITE_URL}/tools/`,
			},
			{ "@type": "ListItem", position: 4, name: "Sole Trader vs Ltd" },
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
					items={[
						{ label: "Home", href: "/" },
						{ label: "Explore", href: "/explore/" },
						{ label: "Tools", href: "/tools/" },
						{ label: "Sole Trader vs Ltd" },
					]}
				/>
				<header className="mb-8">
					<p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-2">
						Business
					</p>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
						Sole Trader vs Ltd
					</h1>
					<p className="mt-3 text-lg text-slate-600 leading-relaxed max-w-2xl">
						Two tools in one: compare take-home pay as a sole trader versus a
						Cyprus Ltd, then estimate what it actually costs to set up and run a
						limited company.
					</p>
				</header>
				<SoleTraderVsLtdClient />
			</main>
		</>
	);
}
