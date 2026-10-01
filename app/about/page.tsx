import type { Metadata } from "next";
import Link from "next/link";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { REGIONS } from "@/lib/regions";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";

const SITE_URL = "https://realcy.app";
const title = "About RealCy.app";
const description =
	"RealCy.app is an independent guide to living in Cyprus: practical guides, service directories, planning tools and new-build real estate.";

export const metadata: Metadata = {
	title: { absolute: title },
	description,
	alternates: { canonical: "/about/" },
	openGraph: { title, description, url: `${SITE_URL}/about/`, type: "website" },
};

const OFFER = [
	{
		href: "/guides/",
		icon: "paperwork",
		title: "Guides",
		text: `${GUIDES.length} practical guides on healthcare, transport, residency, tax, property and cost of living.`,
	},
	{
		href: "/sections/",
		icon: "community",
		title: "Local directories",
		text: `${SECTIONS_INDEX.length} curated directories of services and communities.`,
	},
	{
		href: "/tools/",
		icon: "checklist",
		title: "Practical tools",
		text: `${TOOLS.length} free calculators, planners and trackers.`,
	},
	{
		href: "/regions/",
		icon: "pin",
		title: "Cities",
		text: `City pages for ${REGIONS.length} places across Cyprus.`,
	},
] as const;

export default function AboutPage() {
	return (
		<ArticleTemplate
			header={{
				breadcrumbs: [{ label: "Home", href: "/" }, { label: "About" }],
				eyebrow: "About",
				title: "Everyday life in Cyprus, made easier",
				intro:
					"RealCy.app makes everyday life in Cyprus easier to find, compare and plan. We started with new-build real estate and grew into practical guides for people who already live here and for those planning the move.",
			}}
			related={
				<Section
					title="What you can use today"
					description="Everything below is live and free to use."
				>
					<CardGrid cols={2}>
						{OFFER.map((o) => (
							<CardGridItem key={o.href}>
								<Card
									variant="icon"
									icon={o.icon}
									href={o.href}
									title={o.title}
									text={o.text}
								/>
							</CardGridItem>
						))}
					</CardGrid>
					<div className="mt-6">
						<ButtonLink href="/contact/" variant="secondary">
							Have a question or a correction? Tell us
						</ButtonLink>
					</div>
				</Section>
			}
		>
			<section id="offer">
				<h2>What the site offers</h2>
				<p>
					Read guides and region pages, find local services in curated
					directories, and use tools for the questions that come up most often
					when you live in or move to Cyprus. New-build developments are listed
					in a separate section, so you can browse them on their own.
				</p>
			</section>

			<section id="how-we-work">
				<h2>How we work</h2>
				<p>
					RealCy.app aggregates publicly listed Cyprus developments and presents
					them in one place. We do not currently broker sales: when you find
					something you like, we point you to the developer to take it from
					there. If a listing is inaccurate or you are a developer who wants
					their project represented better, get in touch.
				</p>
			</section>

			<section id="promise">
				<h2>No-fluff promise</h2>
				<ul>
					<li>No paywalls, no signup walls, no dark patterns.</li>
					<li>No invented testimonials, no stock-photo team.</li>
				</ul>
			</section>

			<section id="built-by">
				<h2>Built by</h2>
				<p>
					RealCy.app is an independent project built by a Cyprus relocator:
					someone who went through this process and found the available
					information scattered, outdated, or written for an audience that
					already knew Cyprus. The site is not affiliated with any real-estate
					agency, law firm, or government body. If you have corrections,
					additions, or feedback, <Link href="/contact/">get in touch</Link>.
				</p>
			</section>
		</ArticleTemplate>
	);
}
