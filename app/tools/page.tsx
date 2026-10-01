import type { Metadata } from "next";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Callout } from "@/components/ui/Callout";
import { TOOLS } from "@/lib/tools-index";
import ToolsIndexClient from "./client";

const title = "Practical tools";
const description = `${TOOLS.length} free interactive tools for life in Cyprus: rent vs buy calculator, visa pathway finder, tax residency planner, social insurance calculator, banking fee comparison, and more.`;

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/tools/" },
	openGraph: {
		title,
		description,
		url: "https://realcy.app/tools/",
		type: "website",
	},
};

export default function ToolsIndexPage() {
	return (
		<HubTemplate
			header={{
				breadcrumbs: [{ label: "Home", href: "/" }, { label: "Tools" }],
				eyebrow: `${TOOLS.length} tools`,
				title,
				intro:
					"Free calculators, planners and trackers for the most common questions about living in Cyprus.",
			}}
			after={
				<Callout tone="legal" title="Disclaimer">
					These tools provide general information only and are not legal, tax,
					or financial advice. Rates and rules change frequently: always verify
					with the Cyprus Tax Department, Civil Registry, and a local accountant
					before making decisions.
				</Callout>
			}
		>
			<ToolsIndexClient />
		</HubTemplate>
	);
}
