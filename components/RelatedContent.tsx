import { ButtonLink } from "@/components/ui/Button";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { EmailBox } from "./ui/EmailBox";

type LinkItem = { href: string; title: string; desc?: string };

/**
 * "Next steps" block for otherwise dead-end pages: curated related guides as
 * cards, tool links as secondary buttons and, only when `emailSource` is
 * given, an email box. Pages that already have the footer form omit it.
 */
export function RelatedContent({
	heading,
	blurb,
	guides,
	tools,
	emailSource,
	emailRegion,
}: {
	heading: string;
	blurb?: string;
	guides: LinkItem[];
	tools?: LinkItem[];
	emailSource?: string;
	emailRegion?: string;
}) {
	return (
		<div data-pagefind-ignore className="mt-12 border-t border-line pt-8">
			<Section title={heading} description={blurb}>
				<CardGrid cols={2}>
					{guides.map((g) => (
						<CardGridItem key={g.href}>
							<Card variant="row" href={g.href} title={g.title} text={g.desc} />
						</CardGridItem>
					))}
				</CardGrid>
				{tools && tools.length > 0 ? (
					<div className="mt-4 flex flex-wrap gap-3">
						{tools.map((t) => (
							<ButtonLink key={t.href} href={t.href} variant="secondary">
								{t.title}
							</ButtonLink>
						))}
					</div>
				) : null}
			</Section>
			{emailSource ? (
				<div className="mt-8">
					<EmailBox source={emailSource} region={emailRegion} />
				</div>
			) : null}
		</div>
	);
}
