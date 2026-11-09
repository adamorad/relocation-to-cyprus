import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ListingContact } from "@/components/ui/ListingContact";
import { CORPORATE_SERVICE_PROVIDERS } from "@/lib/corporate-services";
import { listingId } from "@/lib/food";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { topicCrumb } from "@/lib/topic-map";

const SITE_URL = "https://realcy.app";
const title = "Corporate Services in Cyprus";
const description =
	"Corporate service providers in Cyprus, with contact details confirmed by each firm.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/corporate-services/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/corporate-services/`,
		type: "website",
	},
};

export default function CorporateServicesPage() {
	return (
		<DirectoryTemplate
			slug="corporate-services"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "corporate-services"),
					{ label: "Corporate Services" },
				],
				eyebrow: "Professional Services",
				title,
				intro:
					"Corporate service providers in Cyprus, with contact details confirmed by each firm. Contact the firm to check its licence, scope of services and fees.",
			}}
			notice={{
				tone: "legal",
				content:
					"This is a directory, not legal or tax advice. Always verify licences, scope and fees directly with the firm.",
			}}
			related={
				<MoreOnTopic type="directory" slug="corporate-services" cols={3} />
			}
		>
			<h2 className="mt-8 text-2xl font-bold tracking-tight text-ink">
				{CORPORATE_SERVICE_PROVIDERS.length} provider
				{CORPORATE_SERVICE_PROVIDERS.length !== 1 ? "s" : ""} listed
			</h2>
			<CardGrid className="mt-5">
				{CORPORATE_SERVICE_PROVIDERS.map((p) => (
					<CardGridItem key={p.name} id={listingId(p.name)}>
						<Card
							variant="text"
							eyebrow={
								<span className="flex flex-wrap gap-1.5">
									{p.cities.map((c) => (
										<Badge key={c}>{c}</Badge>
									))}
								</span>
							}
							title={p.name}
							meta={p.contact ? `Contact: ${p.contact}` : undefined}
							text={p.why}
							footer={
								<ListingContact
									address={p.address}
									phone={p.phone}
									email={p.email}
									website={p.website}
								/>
							}
						/>
					</CardGridItem>
				))}
			</CardGrid>
		</DirectoryTemplate>
	);
}
