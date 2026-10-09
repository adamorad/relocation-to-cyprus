import type { Metadata } from "next";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import { SourcesNote } from "@/components/ui/SourcesNote";
import { DIETARY_TIPS, HALAL_KOSHER_VENUES } from "@/lib/halal-kosher";
import { topicCrumb } from "@/lib/topic-map";
import HalalKosherClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = "Halal & Kosher Food in Cyprus";

const halalVenues = HALAL_KOSHER_VENUES.filter(
	(v) => v.certification !== "kosher",
);
const kosherVenues = HALAL_KOSHER_VENUES.filter(
	(v) => v.certification !== "halal",
);
const cityList = (venues: ReadonlyArray<{ city: string }>) => {
	const cities = [...new Set(venues.map((v) => v.city))];
	return cities.length > 1
		? `${cities.slice(0, -1).join(", ")} and ${cities[cities.length - 1]}`
		: cities[0];
};
const metaTitle = `${title}: ${halalVenues.length} Halal Venues by City`;
const description = `${halalVenues.length} halal restaurants and butchers in ${cityList(halalVenues)}, plus kosher outlets in ${cityList(kosherVenues)}. Each halal venue links to a current listing; verify certification with the venue.`;

export const metadata: Metadata = {
	title: metaTitle,
	description,
	alternates: { canonical: "/sections/halal-kosher/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title: metaTitle,
		description,
		url: `${SITE_URL}/sections/halal-kosher/`,
		type: "website",
	},
};

export default function HalalKosherPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: DIETARY_TIPS.map((t) => ({
			"@type": "Question",
			name: t.heading,
			acceptedAnswer: { "@type": "Answer", text: t.body },
		})),
	};

	return (
		<DirectoryTemplate
			slug="halal-kosher"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "halal-kosher"),
					{ label: "Halal & Kosher Food" },
				],
				eyebrow: "Food & Dining",
				title,
				intro:
					"Halal and kosher food in Cyprus for Muslim and Jewish residents. Every halal venue below has a current listing we checked on 2 October 2026: Syrian, Lebanese and Arabic halal kitchens in all four cities and a halal butcher in Paphos, plus the kosher outlets listed by Chabad of Limassol.",
			}}
			info={DIETARY_TIPS.map((t) => ({ heading: t.heading, body: t.body }))}
			infoTitle="What to know before you search"
			notice={{
				tone: "warning",
				content:
					"Always verify current certification directly with the venue before relying on it for religious requirements. Certifications can change.",
			}}
			related={
				<>
					<SourcesNote
						lastChecked="2026-10-02"
						sources={[
							{
								label: "Zabihah: halal places in Limassol",
								url: "https://www.zabihah.com/subregion/5046879e-9f3a-11ef-956c-6045bdeb9f57/limassol",
							},
							{
								label: "Zabihah: Maqam Al-Sultan, Larnaca",
								url: "https://www.zabihah.com/restaurants/2bf3d3b7-c6b1-44ea-8079-c327fd864302/maqam-al-sultan-larnaka-larnaka",
							},
							{
								label: "Watar Ziryab: official website",
								url: "https://www.watarziryab-cyprus.com/",
							},
							{
								label: "Wolt: Cairo Food Halal, Limassol",
								url: "https://wolt.com/en/cyp/limassol/restaurant/cairo",
							},
							{
								label: "Wolt: Amir Butchery Halal, Paphos",
								url: "https://wolt.com/en/cyp/paphos/venue/amir-butchery",
							},
							{
								label: "Wolt: Lemar Tavern Halal, Paphos",
								url: "https://wolt.com/en/cyp/paphos/restaurant/alamir-restaurant",
							},
							{
								label: "Wanderlog: Helen Take Away, Paphos",
								url: "https://wanderlog.com/place/details/3956601/helen-take-awayarabic-halal-food",
							},
							{
								label: "Wanderlog: Lemar, Paphos",
								url: "https://wanderlog.com/place/details/12483648/lemar-arabic-halal-fast-food",
							},
							{
								label: "Restaurant Guru: Syrian Restaurant, Germasogeia",
								url: "https://restaurantguru.com/Syrian-restaurant-limassol-Limassol",
							},
							{
								label: "Restaurant Guru: ZAATAR Food Arts, Ayia Napa",
								url: "https://restaurantguru.com/Zaatar-food-and-arts-project-Ayia-Napa-2",
							},
							{
								label: "Guide to Ayia Napa: halal restaurants",
								url: "https://guidetoayianapa.com/food-and-drinks/halal-restaurants/",
							},
							{
								label: "Chabad of Limassol: kosher food",
								url: "https://chabadlimassol.com/en/c/food/",
							},
						]}
					/>
					<div className="mt-12">
						<MoreOnTopic type="directory" slug="halal-kosher" cols={3} />
					</div>
				</>
			}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SEO JSON-LD
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<HalalKosherClient />
		</DirectoryTemplate>
	);
}
