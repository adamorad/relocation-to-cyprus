import Link from "next/link";
import type { ReactNode } from "react";
import { Callout, type CalloutTone } from "@/components/ui/Callout";
import { Container } from "@/components/ui/Container";
import { InfoCards, type InfoItem } from "@/components/ui/InfoCards";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SponsorSlot } from "@/components/ui/SponsorSlot";
import { directorySponsor } from "@/lib/sponsors";
import type { DirectorySlug } from "@/lib/topic-map";
import { DirectoryFeaturedProvider } from "./DirectoryFeatured";
import { TemplateMain, type TemplateMainProps } from "./TemplateMain";

export { InfoCards, type InfoItem };

/**
 * Directory page: header, then the interactive filters and entries FIRST
 * (pass them as children, usually one client component rendering a ChipGroup
 * and a CardGrid), then collapsible info cards, a warning/legal note, related.
 *
 * `slug` picks the paid "Featured" unit (lib/sponsors.ts). The children render
 * it with <DirectoryFeatured /> after their filters. With no active sponsor, a
 * quiet "Advertise" line closes the page instead. `null` (demos) shows neither.
 */
export function DirectoryTemplate({
	slug,
	header,
	info,
	infoTitle = "What to know",
	notice,
	related,
	children,
	...main
}: TemplateMainProps & {
	slug: DirectorySlug | null;
	header: PageHeaderProps;
	info?: InfoItem[];
	infoTitle?: string;
	notice?: { tone?: CalloutTone; title?: string; content: ReactNode };
	related?: ReactNode;
	children: ReactNode;
}) {
	const sponsor = slug ? directorySponsor(slug) : undefined;
	return (
		<TemplateMain {...main}>
			<PageHeader {...header} width="wide" />
			<Container width="wide" className="pt-6 md:pt-8">
				<DirectoryFeaturedProvider
					unit={
						sponsor ? (
							<SponsorSlot
								spot="directory"
								placement={slug ?? ""}
								sponsor={{ ...sponsor, kind: "featured" }}
							/>
						) : null
					}
				>
					{children}
				</DirectoryFeaturedProvider>
				{info && info.length > 0 ? (
					<Section id="what-to-know" title={infoTitle} className="!mt-12">
						<InfoCards items={info} />
					</Section>
				) : null}
				{notice ? (
					<Callout
						tone={notice.tone ?? "warning"}
						title={notice.title}
						className="mt-8"
					>
						{notice.content}
					</Callout>
				) : null}
				{related ? <div className="mt-12">{related}</div> : null}
				{slug && !sponsor ? (
					<p data-pagefind-ignore className="mt-12 text-sm text-muted">
						Want your business featured here?{" "}
						<Link
							href="/advertise/#contact"
							className="text-primary-hover underline underline-offset-2 hover:text-ink"
						>
							Advertise on RealCy.app
						</Link>
					</p>
				) : null}
			</Container>
		</TemplateMain>
	);
}
