import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";
import { CityTemplate } from "@/components/templates/CityTemplate";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { ToolPanel, ToolTemplate } from "@/components/templates/ToolTemplate";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { DataTable, StatCard } from "@/components/ui/DataTable";
import { EmailBox } from "@/components/ui/EmailBox";
import { InfoCards } from "@/components/ui/InfoCards";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SponsorSlot } from "@/components/ui/SponsorSlot";
import { CHART_COLORS } from "@/lib/chart-colors";
import { ChipDemo, ToolDemo } from "./ChipDemo";

export const metadata: Metadata = {
	title: "Design system",
	description: "Internal component and template showcase.",
	robots: { index: false, follow: false },
};

/** Framed preview of a full template (rendered as a div, H1 as a div). */
function Preview({ label, children }: { label: string; children: ReactNode }) {
	return (
		<figure className="overflow-hidden rounded-panel border border-line">
			<figcaption className="border-b border-line bg-sky-strong px-4 py-2 text-sm font-semibold text-ink">
				{label}
			</figcaption>
			<div className="bg-white">{children}</div>
		</figure>
	);
}

const crumbs = [
	{ label: "Home", href: "/" },
	{ label: "Guides", href: "/guides/" },
	{ label: "Example page" },
];

const SWATCHES = [
	["ink", "bg-ink"],
	["muted", "bg-muted"],
	["primary", "bg-primary"],
	["primary-hover", "bg-primary-hover"],
	["sky", "bg-sky"],
	["sky-strong", "bg-sky-strong"],
	["line", "bg-line"],
	["coral (fills)", "bg-coral"],
] as const;

export default function DesignSystemPage() {
	return (
		<TemplateMain>
			<PageHeader
				variant="band"
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Design system" }]}
				eyebrow="Internal"
				title="Design system"
				intro="Every shared component and template in one place. Not indexed."
				actions={
					<>
						<ButtonLink href="#components">Components</ButtonLink>
						<ButtonLink href="#templates" variant="secondary">
							Templates
						</ButtonLink>
					</>
				}
			/>
			<Container width="wide" className="pt-8">
				<Section id="tokens" title="Tokens">
					<ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
						{SWATCHES.map(([name, cls]) => (
							<li
								key={name}
								className="rounded-card border border-line bg-white p-3"
							>
								<span
									className={`block h-12 rounded-field border border-line ${cls}`}
								/>
								<span className="mt-2 block text-sm font-semibold text-ink">
									{name}
								</span>
							</li>
						))}
					</ul>
					<h3 className="mt-6 text-lg font-bold text-ink">
						Chart colours (lib/chart-colors.ts)
					</h3>
					<ul className="mt-3 flex flex-wrap gap-3">
						{Object.entries(CHART_COLORS).map(([name, hex]) => (
							<li key={name} className="flex items-center gap-2 text-sm">
								<span
									className="inline-block h-6 w-6 rounded-md border border-line"
									style={{ background: hex }}
								/>
								<span className="text-ink">
									{name} {hex}
								</span>
							</li>
						))}
					</ul>
				</Section>

				<Section id="components" title="Components">
					<div className="space-y-10">
						<Section
							headingLevel="h3"
							title="Breadcrumbs"
							description="One style, › separator, JSON-LD from the same items."
						>
							<Breadcrumbs items={crumbs} jsonLd={false} />
						</Section>

						<Section
							headingLevel="h3"
							title="PageHeader (plain)"
							description="Breadcrumb, eyebrow, H1, intro, actions."
						>
							<div className="rounded-card border border-line pb-6">
								<PageHeader
									breadcrumbs={crumbs}
									breadcrumbJsonLd={false}
									eyebrow="Healthcare"
									title="Example page title"
									titleAs="div"
									intro="Intro text sits in muted ink at 18px."
									actions={
										<ButtonLink href="/guides/">Primary action</ButtonLink>
									}
								/>
							</div>
						</Section>

						<Section headingLevel="h3" title="Buttons">
							<div className="flex flex-wrap items-center gap-3">
								<Button>Primary</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="ghost">Ghost</Button>
								<Button size="lg">Primary large</Button>
								<Button disabled>Disabled</Button>
								<ButtonLink href="/tools/">ButtonLink</ButtonLink>
							</div>
							<div className="mt-3 max-w-sm">
								<Button fullWidth>Full width</Button>
							</div>
						</Section>

						<Section headingLevel="h3" title="Chips">
							<ChipDemo />
						</Section>

						<Section headingLevel="h3" title="Badges">
							<div className="flex flex-wrap gap-2">
								<Badge>Neutral</Badge>
								<Badge tone="success">Success</Badge>
								<Badge tone="warning">Warning</Badge>
								<Badge tone="danger">Danger</Badge>
							</div>
						</Section>

						<Section headingLevel="h3" title="Cards">
							<CardGrid>
								<CardGridItem>
									<Card
										variant="icon"
										href="/guides/"
										icon="healthcare"
										title="Icon card"
										text="Icon tile, title and text, like the homepage topics."
										headingLevel="h4"
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="text"
										href="/guides/"
										eyebrow={<Badge>Healthcare</Badge>}
										title="Text card"
										text="Badge, title and text. Used for guides and directory entries."
										headingLevel="h4"
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="photo"
										href="/regions/limassol/"
										image={{ src: "/og-default.webp", alt: "Cyprus coastline" }}
										title="Photo card"
										text="16:9 image on top, lazy loaded."
										headingLevel="h4"
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="row"
										href="/tools/budget-builder/"
										icon="budget"
										title="Row card"
										text="Compact horizontal card."
										headingLevel="h4"
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="text"
										eyebrow={<Badge>Halal</Badge>}
										title="Static entry card"
										meta="Limassol · Restaurant"
										text="No href: an article with a footer for contact links."
										footer={
											<a
												href="tel:+35700000000"
												className="inline-flex min-h-11 items-center font-semibold text-ink"
											>
												+357 00 000000
											</a>
										}
										headingLevel="h4"
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="photo"
										href="/listings/"
										icon="building"
										title="Photo card without image"
										text="Falls back to the icon panel."
										headingLevel="h4"
									/>
								</CardGridItem>
								<CardGridItem>
									<Card
										variant="text"
										href="/developers/"
										logo={{ initial: "Developer" }}
										title="Logo card"
										meta="12 projects"
										text="Logo tile (image, or an initial as fallback) above the title."
										headingLevel="h4"
									/>
								</CardGridItem>
							</CardGrid>
						</Section>

						<Section headingLevel="h3" title="Callouts">
							<div className="space-y-3">
								<Callout tone="info" title="Info">
									Helpful context on a sky panel.
								</Callout>
								<Callout tone="warning" title="Warning">
									Verify current details directly before relying on them.
								</Callout>
								<Callout tone="legal">
									This is general information, not legal or tax advice.
								</Callout>
							</div>
						</Section>

						<Section headingLevel="h3" title="DataTable and StatCard">
							<div className="grid gap-3 sm:grid-cols-3">
								<StatCard
									highlight
									label="Monthly total"
									value="€2,450"
									hint="Limassol · Couple"
								/>
								<StatCard label="Rent" value="€1,300" />
								<StatCard label="Groceries" value="€640" hint="2 people" />
							</div>
							<DataTable
								className="mt-4"
								caption="Example monthly costs"
								columns={[
									{ header: "Category" },
									{ header: "Est. / month", align: "right" },
								]}
								rows={[
									["Rent", "€1,300"],
									["Groceries", "€640"],
									["Transport", "€350"],
								]}
								footer={["Total", "€2,290"]}
								zebra
							/>
						</Section>

						<Section headingLevel="h3" title="InfoCards (collapsible)">
							<InfoCards
								items={[
									{ heading: "First question", body: "Answer text." },
									{ heading: "Second question", body: "Answer text." },
								]}
							/>
						</Section>

						<Section
							headingLevel="h3"
							title="EmailBox"
							description="One form per page. The footer form is always present, so pages opt in."
						>
							<EmailBox source="design-system" />
						</Section>

						<Section
							headingLevel="h3"
							title="SponsorSlot"
							description="Renders nothing without data; with data:"
						>
							<SponsorSlot sponsor={null} />
							<div className="max-w-md">
								<SponsorSlot
									sponsor={{
										kind: "featured",
										name: "Example sponsor",
										href: "https://example.com/",
										text: "Native unit sold on the Advertise page.",
									}}
								/>
							</div>
						</Section>
					</div>
				</Section>

				<Section id="templates" title="Templates">
					<div className="space-y-10">
						<Preview label="HubTemplate">
							<HubTemplate
								as="div"
								header={{
									breadcrumbs: crumbs,
									breadcrumbJsonLd: false,
									title: "Hub title",
									titleAs: "div",
									intro: "Band header, filters, card grid.",
								}}
								filters={<ToolDemo />}
							>
								<CardGrid>
									{["One", "Two", "Three"].map((t) => (
										<CardGridItem key={t}>
											<Card
												href="/guides/"
												title={`Card ${t}`}
												text="Card text."
												headingLevel="h4"
											/>
										</CardGridItem>
									))}
								</CardGrid>
							</HubTemplate>
						</Preview>

						<Preview label="ArticleTemplate">
							<ArticleTemplate
								as="div"
								header={{
									breadcrumbs: crumbs,
									breadcrumbJsonLd: false,
									eyebrow: "Healthcare",
									title: "Article title",
									titleAs: "div",
									intro: "Reading width body, TOC rail on wide screens.",
									meta: "By RealCy team · 5 min read",
								}}
								toc={[
									{ id: "ds-one", label: "First section" },
									{ id: "ds-two", label: "Second section" },
									{ id: "ds-three", label: "Third section" },
								]}
								legal="This is general information, not legal or tax advice."
							>
								<section id="ds-one">
									<h3>First section</h3>
									<p>Body copy uses the .guide-body typography.</p>
								</section>
								<section id="ds-two">
									<h3>Second section</h3>
									<p>
										Links look <a href="/guides/">like this</a>.
									</p>
								</section>
								<section id="ds-three">
									<h3>Third section</h3>
									<p>Embedded tools can sit between sections.</p>
								</section>
							</ArticleTemplate>
						</Preview>

						<Preview label="DirectoryTemplate">
							<DirectoryTemplate
								as="div"
								header={{
									breadcrumbs: crumbs,
									breadcrumbJsonLd: false,
									eyebrow: "Food & Dining",
									title: "Directory title",
									titleAs: "div",
									intro: "Filters first, then entries.",
								}}
								info={[{ heading: "Tip", body: "Collapsible info card." }]}
								notice={{ content: "Verify details with the venue." }}
							>
								<ToolDemo />
							</DirectoryTemplate>
						</Preview>

						<Preview label="ToolTemplate">
							<ToolTemplate
								as="div"
								header={{
									breadcrumbs: crumbs,
									breadcrumbJsonLd: false,
									eyebrow: "Interactive tool",
									title: "Tool title",
									titleAs: "div",
								}}
								nextSteps={[{ href: "/tools/", label: "All tools" }]}
								disclaimer="Indicative estimates only."
							>
								<ToolPanel title="Your situation">
									<ToolDemo />
								</ToolPanel>
								<StatCard highlight label="Result" value="€1,234" />
							</ToolTemplate>
						</Preview>

						<Preview label="CityTemplate">
							<CityTemplate
								as="div"
								header={{
									breadcrumbs: crumbs,
									breadcrumbJsonLd: false,
									eyebrow: "Region guide",
									title: "City title",
									titleAs: "div",
								}}
								contents={[{ id: "ds-city-life", label: "Daily life" }]}
								cta={
									<ButtonLink href="/listings/" size="lg">
										New developments in City
									</ButtonLink>
								}
							>
								<Section id="ds-city-life" title="Daily life" headingLevel="h3">
									<p className="text-base text-ink">Section body.</p>
								</Section>
							</CityTemplate>
						</Preview>
					</div>
				</Section>
			</Container>
		</TemplateMain>
	);
}
