import type { Metadata } from "next";
import Link from "next/link";
import { DirectoryTemplate } from "@/components/templates/DirectoryTemplate";
import { MoreOnTopic } from "@/components/templates/MoreOnTopic";
import {
	BUSINESS_COUNT,
	HOME_SERVICES_DESCRIPTION,
	HOME_SERVICES_NOTE,
	HOME_SERVICES_TITLE,
} from "@/lib/home-services";
import { topicCrumb } from "@/lib/topic-map";
import HomeServicesClient from "./client";
import { DEFAULT_OG_IMAGE } from "@/lib/og";

const SITE_URL = "https://realcy.app";
const title = HOME_SERVICES_TITLE;
const description = HOME_SERVICES_DESCRIPTION;

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/sections/home-services/" },
	openGraph: {
		images: [DEFAULT_OG_IMAGE],
		title,
		description,
		url: `${SITE_URL}/sections/home-services/`,
		type: "website",
	},
};

export default function HomeServicesPage() {
	return (
		<DirectoryTemplate
			slug="home-services"
			pagefindType="directory"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					topicCrumb("directory", "home-services"),
					{ label: "Home services" },
				],
				eyebrow: "Home",
				title: "Home Services in Cyprus",
				intro: `Plumbers, electricians, air conditioning, handyman, locksmith and pest control businesses in Limassol, Paphos and Larnaca. ${BUSINESS_COUNT} businesses, each with its own website.`,
			}}
			notice={{
				tone: "warning",
				title: "Before you call",
				content: HOME_SERVICES_NOTE,
			}}
			related={<MoreOnTopic type="directory" slug="home-services" cols={3} />}
		>
			<p className="mb-4 rounded-card border border-line bg-sky p-4 text-base text-ink">
				<strong>Guide:</strong>{" "}
				<Link
					href="/guides/finding-tradespeople-cyprus/"
					className="text-primary-hover underline underline-offset-2 hover:text-ink"
				>
					Finding tradespeople in Cyprus: licences, checks, quotes and
					complaints
				</Link>
			</p>
			<p className="mb-4 text-sm text-ink">
				Not endorsements. Each business's own website was checked on 4 October
				2026. Ask for licences and a written quote before work starts.
			</p>
			<HomeServicesClient />
		</DirectoryTemplate>
	);
}
