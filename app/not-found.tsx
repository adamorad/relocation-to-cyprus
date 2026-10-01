import type { Metadata } from "next";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false },
};

const LINKS = [
	{
		href: "/guides/",
		icon: "paperwork",
		title: "Guides",
		text: "Practical guides for living in Cyprus.",
	},
	{
		href: "/sections/",
		icon: "community",
		title: "Local directories",
		text: "Curated services and communities.",
	},
	{
		href: "/tools/",
		icon: "checklist",
		title: "Practical tools",
		text: "Calculators, planners and trackers.",
	},
	{
		href: "/regions/",
		icon: "pin",
		title: "Cities",
		text: "Paphos, Limassol, Larnaca and Ayia Napa.",
	},
] as const;

export default function NotFound() {
	return (
		<TemplateMain>
			<PageHeader
				variant="band"
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Page not found" },
				]}
				eyebrow="404"
				title="This page could not be found."
				intro="The link may be out of date. Try the home page, search the site, or pick a section below."
				actions={
					<>
						<ButtonLink href="/">Home page</ButtonLink>
						<ButtonLink href="/explore/" variant="secondary">
							Search the site
						</ButtonLink>
					</>
				}
			/>
			<Container width="wide" className="pt-8 md:pt-10">
				<Section title="Popular places to start">
					<CardGrid cols={4}>
						{LINKS.map((l) => (
							<CardGridItem key={l.href}>
								<Card
									variant="icon"
									icon={l.icon}
									href={l.href}
									title={l.title}
									text={l.text}
								/>
							</CardGridItem>
						))}
					</CardGrid>
				</Section>
			</Container>
		</TemplateMain>
	);
}
