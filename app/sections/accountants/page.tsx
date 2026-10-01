import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { ACCOUNTANT_TIPS } from "@/lib/accountants";
import { topicCrumb } from "@/lib/topic-map";
import AccountantsClient from "./client";

const SITE_URL = "https://realcy.app";
const title = "Accountants & Tax Advisors in Cyprus";
const description =
	"Accountants, tax advisors and registered office providers in Cyprus: ICPAC-registered firms across Limassol, Paphos & Larnaca. Non-dom filings & company tax.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/accountants/" },
	openGraph: {
		title,
		description,
		url: `${SITE_URL}/sections/accountants/`,
		type: "website",
	},
};

export default function AccountantsPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: ACCOUNTANT_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "accountants"),
					{ label: "Accountants & Tax Advisors" },
				],
				eyebrow: "Professional Services",
				title: title,
				intro:
					"ICPAC-registered accountants with proven experience in the non-domiciled regime, expat individual returns, corporate tax, VAT, and crypto, plus registered office providers for Cyprus companies.",
			}}
			info={ACCOUNTANT_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="Before you engage an accountant"
			notice={{
				tone: "legal",
				content:
					"This is a directory, not tax or legal advice. Always verify ICPAC membership, fees and service inclusions directly with the firm or provider.",
			}}
			related={<MoreOnTopic type="directory" slug="accountants" cols={3} />}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<AccountantsClient />
		</DirectoryTemplate>
	);
}
