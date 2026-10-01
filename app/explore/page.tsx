import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
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
	return (
		<TemplateMain>
			<PageHeader
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
				eyebrow="Search"
				title="Search RealCy.app"
				intro="Find guides, directories, tools, city pages and new developments."
			/>
			<Container width="wide" className="pt-8">
				<Suspense fallback={<div className="min-h-11" aria-hidden="true" />}>
					<ExploreClient />
				</Suspense>

				<Section title="Browse by category" className="mt-12">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{CATEGORIES.map((category) => (
							<div
								key={category.title}
								className="rounded-card border border-line bg-white p-5"
							>
								<h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">
									{category.title}
								</h3>
								<ul className="space-y-1.5">
									{category.items.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className="flex min-h-11 items-center py-1 text-sm text-ink transition-colors hover:text-primary-hover"
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</Section>
			</Container>
		</TemplateMain>
	);
}
