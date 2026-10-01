import type { Metadata } from "next";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SponsorSlot } from "@/components/ui/SponsorSlot";
import { GUIDES } from "@/lib/guides";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";
import { TOPICS } from "@/lib/topics";

const SITE_URL = "https://realcy.app";
const title = "Advertise on RealCy.app: Sponsored Top Spots";
const description =
	"Put your business at the top of the page people read when they need your service in Cyprus: featured directory spots, guide sponsorship and topic hub sponsorship, always clearly labelled.";

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

const SPOTS = [
	{
		name: "Top of a directory",
		label: "Featured",
		price: "From €80/month",
		where: `Any of our ${SECTIONS_INDEX.length} local directories, for example accountants, property lawyers or specialist doctors.`,
		description:
			"Your business is the first entry in the directory, above the standard listings, with a Featured label, your logo, a longer description and a direct link to your website.",
		includes: [
			"First position in your category",
			"Logo and extended description",
			"Direct link to your website",
			"Monthly click report",
		],
	},
	{
		name: "Top of a guide",
		label: "Sponsored by",
		price: "From €200/month",
		where: `Any of our ${GUIDES.length} guides, for example GeSY registration, opening a bank account or buying a car.`,
		description:
			"One sponsor per guide. Your logo and a one-line tagline sit above the guide, in front of readers researching exactly the service you offer.",
		includes: [
			"Exclusive: one sponsor per guide",
			"Logo and tagline above the guide",
			"Monthly reader count report",
			"Right of first renewal",
		],
	},
	{
		name: "Top of a topic hub",
		label: "Sponsored by",
		price: "Price on request",
		where: `One of the ${TOPICS.length} topic hubs, for example Health, Home & bills or Money & paperwork.`,
		description:
			"One sponsor per topic. Your unit sits at the top of the hub that collects every guide, directory and tool on that subject.",
		includes: [
			"Exclusive: one sponsor per topic",
			"Logo, name and one-line message",
			"Direct link to your website",
			"Monthly click report",
		],
	},
];

const STATS = [
	{ value: "40,000+", label: "People reached by our Meta campaign" },
	{ value: "IL, UK, DE, FR", label: "Primary audience countries" },
	{
		value: String(GUIDES.length + TOOLS.length),
		label: "Guides and practical tools",
	},
	{ value: String(SECTIONS_INDEX.length), label: "Local directories" },
];

const RULES = [
	{
		title: "Always labelled",
		text: "Every paid spot says Featured or Sponsored, so readers know what they are looking at.",
	},
	{
		title: "One sponsor per spot",
		text: "A guide or topic hub carries one sponsor at a time. Nobody shares the top with a competitor.",
	},
	{
		title: "Marked for search engines",
		text: 'Sponsored links carry rel="sponsored", as search engines require for paid placements.',
	},
];

const STEPS = [
	"Pick the directory, guide or topic where your customers look.",
	"Email us your business name, website and the spot you want.",
	"We confirm availability and the current traffic for that page, then your spot goes live.",
];

export default function AdvertisePage() {
	return (
		<TemplateMain>
			<PageHeader
				variant="band"
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Advertise" }]}
				eyebrow="Advertise"
				title="Be the first name people see"
				intro="When someone in Cyprus needs an accountant, a doctor or a lawyer, they open the RealCy.app page for it. A sponsored spot puts your business at the top of that page, clearly labelled."
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

			<Container width="wide" className="pt-12 md:pt-16">
				<Section
					title="What a sponsored spot looks like"
					description="The first thing on the page, before the standard entries."
				>
					<div className="max-w-2xl rounded-panel border border-line bg-sky p-4 md:p-6">
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							Example: Accountants directory
						</p>
						<div className="mt-4">
							<SponsorSlot
								preview
								sponsor={{
									kind: "featured",
									name: "Your business",
									href: "#",
									text: "One line about what you do, with a direct link to your website.",
								}}
							/>
						</div>
						<ul aria-hidden="true" className="mt-3 space-y-3">
							{[0, 1].map((i) => (
								<li
									key={i}
									className="rounded-card border border-line bg-white/60 p-4"
								>
									<span className="block h-3 w-40 rounded bg-line" />
									<span className="mt-3 block h-3 w-64 max-w-full rounded bg-line/70" />
								</li>
							))}
						</ul>
					</div>
				</Section>

				<Section title="Three top spots" className="mt-12 md:mt-16">
					<CardGrid>
						{SPOTS.map((spot) => (
							<CardGridItem key={spot.name}>
								<Card
									variant="text"
									title={spot.name}
									eyebrow={<Badge>{spot.label}</Badge>}
									meta={
										<span className="font-semibold text-primary-hover">
											{spot.price}
										</span>
									}
									text={
										<>
											<span className="block text-sm">{spot.where}</span>
											<span className="mt-3 block">{spot.description}</span>
										</>
									}
									footer={
										<ul className="space-y-1.5 pt-1 text-muted">
											{spot.includes.map((item) => (
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
			</Container>

			<section className="mt-12 bg-sky py-12 md:mt-16 md:py-14">
				<Container width="wide">
					<Section title="Paid, and clearly so">
						<ul className="grid gap-6 md:grid-cols-3">
							{RULES.map((r) => (
								<li key={r.title}>
									<h3 className="text-lg font-bold text-ink">{r.title}</h3>
									<p className="mt-2 text-base leading-relaxed text-muted">
										{r.text}
									</p>
								</li>
							))}
						</ul>
					</Section>
				</Container>
			</section>

			<Container width="wide" className="pt-12 md:pt-16">
				<Section title="How to book a spot" id="contact">
					<div className="grid gap-8 rounded-card border border-line bg-white p-6 md:grid-cols-2 md:p-8">
						<ol className="space-y-4">
							{STEPS.map((step, i) => (
								<li key={step} className="flex gap-4">
									<span
										aria-hidden="true"
										className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
									>
										{i + 1}
									</span>
									<span className="pt-1 text-base leading-relaxed text-ink">
										{step}
									</span>
								</li>
							))}
						</ol>
						<div className="rounded-card bg-sky p-6">
							<p className="text-base leading-relaxed text-ink">
								Tell us your business and the spot you have in mind. We reply
								with availability and the page's current traffic.
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
					</div>
				</Section>
			</Container>
		</TemplateMain>
	);
}
