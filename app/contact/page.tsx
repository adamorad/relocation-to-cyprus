import type { Metadata } from "next";
import { MetaPixelEvent } from "@/components/MetaPixelEvent";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Contact RealCy.app";
const description =
	"Get in touch with RealCy.app: questions about a Cyprus listing, suggestions, partnerships, or a category you want us to build next.";

export const metadata: Metadata = {
	title: { absolute: title },
	description,
	alternates: { canonical: "/contact/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/contact/`,
		type: "website",
	},
};

const EMAIL = "hello@realcy.app";

const TOPICS = [
	{
		label: "Buyer enquiries",
		text: "we forward you to the developer; we are not the listing agent.",
	},
	{
		label: "Developers",
		text: "if your project is missing or shown with outdated info, send the corrections and we update the next build.",
	},
	{
		label: "Press / partnerships",
		text: "short pitches please.",
	},
	{
		label: "Feedback",
		text: "things that broke, categories you want next, regions that should be split out.",
	},
];

export default function ContactPage() {
	return (
		<TemplateMain>
			<MetaPixelEvent event="Contact" />
			<PageHeader
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
				eyebrow="Contact"
				title="Get in touch."
				intro='Questions about a listing, a development you would like added, a partnership idea, or an "I would use this portal more if you had X" note: we read everything.'
				width="reading"
			/>
			<Container width="reading" className="pt-8">
				<div className="rounded-card border border-line bg-white p-6 shadow-rc md:p-8">
					<p className="text-xs font-semibold uppercase tracking-wider text-muted">
						Email
					</p>
					<p className="mt-2 text-2xl font-bold md:text-3xl">
						<a
							href={`mailto:${EMAIL}`}
							className="text-ink underline-offset-4 hover:text-primary-hover hover:underline"
						>
							{EMAIL}
						</a>
					</p>
					<p className="mt-3 text-sm text-muted">
						We reply within a couple of working days. Please include the listing
						URL or developer name if your question is about a specific project.
					</p>
				</div>

				<Section title="Common things people email us about" className="mt-10">
					<ul className="list-disc space-y-1 pl-6 leading-relaxed text-ink">
						{TOPICS.map((t) => (
							<li key={t.label}>
								<span className="font-semibold">{t.label}:</span> {t.text}
							</li>
						))}
					</ul>
				</Section>
			</Container>
		</TemplateMain>
	);
}
