import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type ComponentType, Fragment } from "react";
import MortgageCalculatorClient from "@/app/tools/mortgage-calculator/client";
import RentVsBuyPage from "@/app/tools/rent-vs-buy-calculator/client";
import SocialInsuranceCalculatorPage from "@/app/tools/social-insurance-calculator/client";
import TaxSavingsCalculatorClient from "@/app/tools/tax-savings-calculator/client";
import { EmbeddedTool } from "@/components/EmbeddedTool";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";
import { ShareBar } from "@/components/ShareBar";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { InfoCards } from "@/components/ui/InfoCards";
import { Section } from "@/components/ui/Section";
import { AUTHORS, CATEGORY_AUTHOR } from "@/lib/authors";
import { GUIDE_REDIRECTS } from "@/lib/guide-redirects";
import {
	GUIDE_CATEGORY_LABEL,
	GUIDES,
	type GuideCategory,
	guideBySlug,
} from "@/lib/guides";
import { SECTIONS_INDEX } from "@/lib/sections-index";

const SITE_URL = "https://realcy.app";

const toId = (h: string) =>
	h
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

/**
 * Renders guide body text, turning in-prose /guides|tools|sections/{slug} paths
 * into real clickable links. Splitting keeps the surrounding text (and its
 * newlines, for whitespace-pre-line) intact.
 */
const BODY_LINK_RE =
	/(\[[^\]]+\]\(\/(?:guides|tools|sections)\/[a-z0-9-]+\/?\)|\/(?:guides|tools|sections)\/[a-z0-9-]+\/?)/g;
const MD_LINK_RE = /^\[([^\]]+)\]\((\/[^)]+)\)$/;
function renderBody(text: string) {
	return text.split(BODY_LINK_RE).map((part, i) => {
		if (i % 2 === 1) {
			// Supports [anchor text](/guides/slug/) as well as bare /guides/slug/ paths.
			const md = MD_LINK_RE.exec(part);
			const path = md ? md[2] : part;
			const label = md ? md[1] : part;
			const href = path.endsWith("/") ? path : `${path}/`;
			return (
				// biome-ignore lint/suspicious/noArrayIndexKey: split output is positional
				<Link
					key={i}
					href={href}
					className="text-primary font-medium underline underline-offset-2 hover:text-primary-hover"
				>
					{label}
				</Link>
			);
		}
		return part;
	});
}

const GUIDE_CATEGORY_SECTIONS: Record<GuideCategory, string[]> = {
	immigration: ["immigration-lawyers", "expat-communities"],
	tax: ["accountants"],
	business: ["accountants", "coworking", "startup-ecosystem"],
	property: ["property-lawyers", "long-term-rentals", "property-management"],
	family: [
		"childcare-nurseries",
		"after-school-activities",
		"expat-communities",
	],
	healthcare: ["specialist-doctors", "mental-health-services"],
	transport: ["public-transport"],
	lifestyle: ["expat-communities", "fitness-wellness", "sports-clubs"],
	environment: [],
};

const GUIDE_CATEGORY_TOOLS: Record<
	GuideCategory,
	Array<{ slug: string; title: string }>
> = {
	immigration: [
		{ slug: "visa-pathway-finder", title: "Visa Pathway Finder" },
		{ slug: "meu1-tracker", title: "MEU1 Registration Tracker" },
		{
			slug: "visa-renewal-reminder",
			title: "Visa & Document Renewal Reminder",
		},
	],
	tax: [
		{ slug: "tax-residency-tracker", title: "60-Day Tax Residency Tracker" },
		{ slug: "tax-filing-calendar", title: "Annual Tax Filing Calendar" },
		{ slug: "double-tax-treaty-finder", title: "Double Tax Treaty Finder" },
		{ slug: "sole-trader-vs-ltd", title: "Sole Trader vs Ltd" },
	],
	business: [
		{ slug: "sole-trader-vs-ltd", title: "Sole Trader vs Ltd" },
		{ slug: "grants-finder", title: "Grants & Incentives Finder" },
		{ slug: "banking-fee-comparison", title: "Banking Fee Comparison" },
	],
	property: [
		{ slug: "rent-vs-buy-calculator", title: "Rent vs Buy Calculator" },
		{ slug: "city-comparison", title: "City Comparison" },
	],
	family: [
		{ slug: "city-comparison", title: "City Comparison" },
		{
			slug: "health-insurance-comparison",
			title: "Health Insurance Comparison",
		},
	],
	healthcare: [
		{
			slug: "health-insurance-comparison",
			title: "Health Insurance Comparison",
		},
		{
			slug: "social-insurance-calculator",
			title: "Social Insurance Calculator",
		},
	],
	transport: [
		{ slug: "flight-connectivity", title: "Flight Connectivity" },
		{ slug: "city-comparison", title: "City Comparison" },
	],
	lifestyle: [
		{ slug: "events-calendar", title: "Annual Events & Festivals" },
		{ slug: "city-comparison", title: "City Comparison" },
	],
	environment: [{ slug: "city-comparison", title: "City Comparison" }],
};

// Which interactive calculator to embed mid-guide, by slug (override) then category.
type EmbedKey = "tax" | "rentbuy" | "social" | "mortgage";

const GUIDE_EMBEDS: Record<
	EmbedKey,
	{
		title: string;
		subtitle: string;
		href: string;
		Comp: ComponentType<{ embedded?: boolean }>;
	}
> = {
	tax: {
		title: "Estimate your Cyprus tax saving",
		subtitle:
			"Compare your current country's tax burden against Cyprus Non-Dom. Live, no sign-up.",
		href: "/tools/tax-savings-calculator/",
		Comp: TaxSavingsCalculatorClient,
	},
	rentbuy: {
		title: "Should you rent or buy in Cyprus?",
		subtitle:
			"Compare the true long-run cost of renting versus buying over your time horizon.",
		href: "/tools/rent-vs-buy-calculator/",
		Comp: RentVsBuyPage,
	},
	social: {
		title: "What will you actually take home?",
		subtitle:
			"Calculate your Social Insurance and GeSY deductions on any Cyprus salary.",
		href: "/tools/social-insurance-calculator/",
		Comp: SocialInsuranceCalculatorPage,
	},
	mortgage: {
		title: "Estimate your Cyprus mortgage",
		subtitle:
			"Monthly repayment, total interest and amortisation for a Cyprus purchase.",
		href: "/tools/mortgage-calculator/",
		Comp: MortgageCalculatorClient,
	},
};

const EMBED_BY_SLUG: Record<string, EmbedKey> = {
	"cyprus-mortgage-foreigners": "mortgage",
};

const EMBED_BY_CATEGORY: Partial<Record<GuideCategory, EmbedKey>> = {
	tax: "tax",
	property: "rentbuy",
	business: "social",
};

export function generateStaticParams() {
	return [
		...GUIDES.map((g) => ({ slug: g.slug })),
		...Object.keys(GUIDE_REDIRECTS).map((slug) => ({ slug })),
	];
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const redirectTarget = GUIDE_REDIRECTS[slug];
	if (redirectTarget) {
		return {
			title: "Redirecting…",
			alternates: { canonical: `/guides/${redirectTarget}/` },
			robots: { index: false, follow: true },
		};
	}
	const g = guideBySlug(slug);
	if (!g) return {};
	return {
		title: g.title,
		description: g.description,
		alternates: { canonical: `/guides/${g.slug}/` },
		openGraph: {
			title: g.title,
			description: g.description,
			url: `${SITE_URL}/guides/${g.slug}/`,
			type: "article",
			...(g.heroImage && {
				images: [
					{
						url: `${SITE_URL}${g.heroImage}`,
						width: 1200,
						height: 630,
						alt: g.title,
					},
				],
			}),
		},
	};
}

export default async function GuidePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const redirectTarget = GUIDE_REDIRECTS[slug];
	if (redirectTarget) {
		const url = `/guides/${redirectTarget}/`;
		return (
			<main id="main">
				<Container width="reading" className="py-16 text-center">
					<meta httpEquiv="refresh" content={`0; url=${url}`} />
					<script
						// biome-ignore lint/security/noDangerouslySetInnerHtml: static-export redirect
						dangerouslySetInnerHTML={{
							__html: `location.replace(${JSON.stringify(url)});`,
						}}
					/>
					<p className="text-muted">
						This guide has moved.{" "}
						<Link
							href={url}
							className="text-primary font-medium underline underline-offset-2 hover:text-primary-hover"
						>
							Continue to the current guide
						</Link>
					</p>
				</Container>
			</main>
		);
	}
	const g = guideBySlug(slug);
	if (!g) notFound();

	const relatedTools = GUIDE_CATEGORY_TOOLS[g.category] ?? [];
	const relatedSectionSlugs = GUIDE_CATEGORY_SECTIONS[g.category] ?? [];
	const relatedSections = relatedSectionSlugs
		.map((slug) => SECTIONS_INDEX.find((s) => s.slug === slug))
		.filter((s) => s !== undefined);
	const relatedGuides = GUIDES.filter(
		(guide) => guide.category === g.category && guide.slug !== g.slug,
	).slice(0, 3);
	const embedKey = EMBED_BY_SLUG[g.slug] ?? EMBED_BY_CATEGORY[g.category];
	const embed = embedKey ? GUIDE_EMBEDS[embedKey] : null;
	const EmbedComp = embed?.Comp;
	const canonicalUrl = `${SITE_URL}/guides/${g.slug}/`;
	const author = AUTHORS[CATEGORY_AUTHOR[g.category]] ?? AUTHORS.team;
	const readingMinutes = Math.max(
		1,
		Math.round(
			g.sections.reduce((n, s) => n + s.body.split(/\s+/).length, 0) / 200,
		),
	);

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: g.title,
		description: g.description,
		author: { "@type": "Person", name: author.name, jobTitle: author.role },
		publisher: {
			"@type": "Organization",
			name: "RealCy.app",
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/apple-touch-icon.png`,
				width: 180,
				height: 180,
			},
		},
		datePublished: g.datePublished,
		dateModified: g.dateModified,
		...(g.heroImage && { image: `${SITE_URL}${g.heroImage}` }),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}/guides/${g.slug}/`,
		},
	};
	const faqJsonLd =
		g.faqs && g.faqs.length > 0
			? {
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: g.faqs.map((f) => ({
						"@type": "Question",
						name: f.q,
						acceptedAnswer: { "@type": "Answer", text: f.a },
					})),
				}
			: null;

	const lastReviewed = new Date(
		`${g.dateModified}T00:00:00Z`,
	).toLocaleDateString("en-GB", {
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	});
	const toc =
		g.sections.length > 2
			? g.sections.map((s) => ({ id: toId(s.heading), label: s.heading }))
			: undefined;
	const relatedCards = [
		...relatedGuides.map((guide) => ({
			key: `g-${guide.slug}`,
			href: `/guides/${guide.slug}/`,
			title: guide.title,
			text: guide.description,
			kind: "Guide",
			icon: undefined,
		})),
		...relatedTools.map((t) => ({
			key: `t-${t.slug}`,
			href: `/tools/${t.slug}/`,
			title: t.title,
			text: undefined,
			kind: "Tool",
			icon: "budget" as const,
		})),
		...relatedSections.map((sec) => ({
			key: `s-${sec.slug}`,
			href: `/sections/${sec.slug}/`,
			title: sec.name,
			text: undefined,
			kind: "Directory",
			icon: "pin" as const,
		})),
	];

	return (
		<ArticleTemplate
			pagefindType="guide"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Guides", href: "/guides/" },
					{ label: g.title },
				],
				eyebrow: GUIDE_CATEGORY_LABEL[g.category],
				title: g.title,
				intro: g.description,
				meta: (
					<>
						By <span className="font-semibold text-ink">{author.name}</span>
						{" · "}
						{author.role}
						{" · "}Last reviewed {lastReviewed}
						{" · "}
						{readingMinutes} min read
					</>
				),
			}}
			hero={g.heroImage ? { src: g.heroImage, alt: g.title } : undefined}
			share={<ShareBar url={canonicalUrl} title={g.title} guideSlug={g.slug} />}
			toc={toc}
			afterBody={
				g.faqs && g.faqs.length > 0 ? (
					<Section
						id="faq"
						title="Frequently asked questions"
						className="!mt-12"
					>
						<InfoCards
							items={g.faqs.map((faq) => ({ heading: faq.q, body: faq.a }))}
							columns={1}
						/>
					</Section>
				) : null
			}
			related={
				relatedCards.length > 0 ? (
					<div data-pagefind-ignore>
						<Section id="related" title="Related reading and tools">
							{(["text", "row"] as const).map((v) => {
								const cards = relatedCards.filter((c) =>
									v === "text" ? !c.icon : !!c.icon,
								);
								return cards.length > 0 ? (
									<CardGrid
										key={v}
										cols={2}
										className={v === "row" ? "mt-4" : ""}
									>
										{cards.map((c) => (
											<CardGridItem key={c.key}>
												<Card
													variant={v}
													href={c.href}
													icon={c.icon}
													eyebrow={<Badge>{c.kind}</Badge>}
													title={c.title}
													text={
														c.text ? (
															<span className="line-clamp-2">{c.text}</span>
														) : undefined
													}
												/>
											</CardGridItem>
										))}
									</CardGrid>
								) : null;
							})}
						</Section>
						<p className="mt-6">
							<ButtonLink href="/guides/" variant="secondary">
								All guides
							</ButtonLink>
						</p>
					</div>
				) : null
			}
			legal={
				<>
					This is general information, not legal or tax advice. Cyprus rules
					change frequently, so verify with the relevant Cypriot government
					department and a local advisor before acting.
				</>
			}
		>
			<MetaPixelEvent
				event="ViewContent"
				params={{ content_name: g.title, content_category: "guide" }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify([
						articleJsonLd,
						...(faqJsonLd ? [faqJsonLd] : []),
					]),
				}}
			/>
			{g.sections.map((s, i) => (
				<Fragment key={s.heading}>
					<section id={toId(s.heading)}>
						<h2>{s.heading}</h2>
						<p className="whitespace-pre-line">{renderBody(s.body)}</p>
					</section>
					{embed && EmbedComp && i === 1 && (
						<EmbeddedTool
							title={embed.title}
							subtitle={embed.subtitle}
							toolHref={embed.href}
							toolLabel="Open the full calculator"
						>
							<EmbedComp embedded />
						</EmbeddedTool>
					)}
				</Fragment>
			))}
		</ArticleTemplate>
	);
}
