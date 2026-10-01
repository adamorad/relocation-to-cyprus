import type { Metadata } from "next";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { GUIDES } from "@/lib/guides";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";

const SITE_URL = "https://realcy.app";
const title = "Advertise on RealCy.app: Reach People Relocating to Cyprus";
const description =
	"Reach a targeted audience of people actively planning a move to Cyprus. Featured directory listings, guide sponsorship, and newsletter placement for law firms, accountants, healthcare providers, and other professional services.";

export const metadata: Metadata = {
	title: { absolute: title },
	description,
	alternates: { canonical: "/advertise/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/advertise/`,
		type: "website",
	},
};

const TIERS = [
	{
		name: "Featured Listing",
		price: "From €80/month",
		ideal:
			"Property lawyers, immigration specialists, accountants, insurance brokers",
		description:
			"Your firm appears at the top of the relevant service directory: highlighted with a Featured badge, your logo, an extended description, and a direct link to your website. Standard listings have no badge and lower visibility.",
		includes: [
			"Priority placement in your category",
			"Logo and extended description",
			"Direct link to your website",
			"Monthly click report",
		],
	},
	{
		name: "Guide Sponsorship",
		price: "From €200/month",
		ideal: "Law firms, accountants, health insurance providers, banks",
		description:
			"Exclusive sponsorship of a single guide: one sponsor per guide. Your firm appears at the top of the guide with logo and tagline, seen by readers who are actively researching the exact topic your service covers.",
		includes: [
			"Exclusive placement (one sponsor per guide)",
			"Logo and tagline above the guide body",
			"Monthly reader count report",
			"Right of first renewal",
		],
	},
	{
		name: "Newsletter Sponsorship",
		price: "From €300/send",
		ideal: "Professional services, property developers, financial advisors",
		description:
			"One sponsor per monthly email. Placement includes a short paragraph, logo, and link: sent to subscribers who have explicitly opted in to Cyprus relocation updates.",
		includes: [
			"Exclusive placement per issue",
			"Logo, short copy, and link",
			"Subscriber count disclosed before booking",
			"Plain-text and HTML variants",
		],
	},
];

const STATS = [
	{ value: "40,000+", label: "People reached by our Meta campaign" },
	{ value: "IL, UK, DE, FR", label: "Primary audience countries" },
	{
		value: String(GUIDES.length + TOOLS.length),
		label: "Guides and planning tools",
	},
	{ value: String(SECTIONS_INDEX.length), label: "Service directories" },
];

export default function AdvertisePage() {
	return (
		<TemplateMain>
			<PageHeader
				variant="band"
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Advertise" }]}
				eyebrow="Advertise with RealCy"
				title="Reach people actively planning a move to Cyprus"
				intro="RealCy.app is an independent portal for life in Cyprus: guides, tools, and service directories used by people researching immigration, property, tax, and healthcare before they move."
				width="wide"
			/>

			<Container width="wide" className="pt-8 md:pt-10">
				<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{STATS.map((s) => (
						<li key={s.label} className="flex">
							<div className="w-full">
								<StatCard label={s.label} value={s.value} />
							</div>
						</li>
					))}
				</ul>
			</Container>

			<section className="mt-12 bg-sky py-12 md:mt-16 md:py-14">
				<Container width="reading">
					<Section title="High intent. Nowhere else to go.">
						<div className="grid gap-6 text-base leading-relaxed text-ink md:grid-cols-2">
							<p>
								People relocating to Cyprus need a property lawyer, an
								accountant, a healthcare provider, and a bank, typically within
								the first three months of arriving. They are actively searching,
								they have money to spend, and they have no existing local
								relationships to lean on.
							</p>
							<p>
								RealCy.app is where they do that research. The guides on
								property law, tax, GeSY registration, and visas are written for
								exactly the moment when someone is deciding which firms to
								contact. A featured listing in the right directory is a direct
								introduction at the right time.
							</p>
						</div>
					</Section>
				</Container>
			</section>

			<Container width="wide" className="pt-12 md:pt-16">
				<Section
					title="Three ways to be visible"
					description="Placement options"
				>
					<CardGrid>
						{TIERS.map((tier, i) => (
							<CardGridItem key={tier.name}>
								<Card
									variant="text"
									title={tier.name}
									eyebrow={<Badge>{String(i + 1).padStart(2, "0")}</Badge>}
									meta={
										<span className="font-semibold text-primary-hover">
											{tier.price}
										</span>
									}
									text={
										<>
											<span className="block text-sm">
												Ideal for: {tier.ideal}
											</span>
											<span className="mt-3 block">{tier.description}</span>
										</>
									}
									footer={
										<ul className="space-y-1.5 pt-1 text-muted">
											{tier.includes.map((item) => (
												<li key={item} className="flex items-start gap-2">
													<span
														aria-hidden="true"
														className="text-primary-hover"
													>
														&#10003;
													</span>
													{item}
												</li>
											))}
										</ul>
									}
								/>
							</CardGridItem>
						))}
					</CardGrid>
				</Section>

				<Section title="Get in touch" className="mt-12 md:mt-16">
					<div className="rounded-card border border-line bg-sky p-6 md:p-8">
						<p className="max-w-xl text-base leading-relaxed text-ink">
							Send us a short note about your firm and the placement you have in
							mind. We will share current traffic numbers for the relevant
							directory or guide and confirm availability.
						</p>
						<div className="mt-5">
							<ButtonLink href="mailto:hello@realcy.app" size="lg">
								hello@realcy.app
							</ButtonLink>
						</div>
						<p className="mt-4 text-sm text-muted">
							We typically respond within one business day.
						</p>
					</div>
				</Section>
			</Container>
		</TemplateMain>
	);
}
