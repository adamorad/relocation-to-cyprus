import type { Metadata } from "next";
import Link from "next/link";
import type { IconName } from "@/components/icons/Icon";
import { HubTemplate } from "@/components/templates/HubTemplate";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GUIDE_CATEGORY_LABEL, GUIDES, type GuideCategory } from "@/lib/guides";

const CATEGORIES: ReadonlyArray<GuideCategory> = [
	"immigration",
	"tax",
	"property",
	"business",
];

const title = "Moving to Cyprus: Visas, Tax and Property Guides";
const description =
	"Guides for planning a move to Cyprus: visas and residency, tax, buying property and setting up a business.";

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/moving-to-cyprus/" },
	openGraph: {
		title,
		description,
		url: "https://realcy.app/moving-to-cyprus/",
		type: "website",
	},
};

const CATEGORY_ICON: Record<string, IconName> = {
	immigration: "paperwork",
	tax: "legal",
	property: "home",
	business: "building",
};

export default function MovingToCyprusPage() {
	return (
		<HubTemplate
			pagefindType="page"
			header={{
				breadcrumbs: [
					{ label: "Home", href: "/" },
					{ label: "Moving to Cyprus" },
				],
				eyebrow: "Planning a move",
				title: "Moving to Cyprus",
				intro: (
					<>
						Planning a move? Start with residency and tax, then property and
						business. Already here? See the everyday guides on the{" "}
						<Link
							href="/"
							className="text-primary-hover underline hover:text-ink"
						>
							homepage
						</Link>
						.
					</>
				),
			}}
		>
			{CATEGORIES.map((cat) => {
				const guides = GUIDES.filter((g) => g.category === cat);
				if (guides.length === 0) return null;
				return (
					<Section
						key={cat}
						id={cat}
						title={GUIDE_CATEGORY_LABEL[cat]}
						description={`${guides.length} guides`}
					>
						<CardGrid>
							{guides.map((g) => (
								<CardGridItem key={g.slug}>
									<Card
										variant="icon"
										icon={CATEGORY_ICON[cat] ?? "paperwork"}
										href={`/guides/${g.slug}/`}
										title={g.title}
										text={<span className="line-clamp-3">{g.description}</span>}
									/>
								</CardGridItem>
							))}
						</CardGrid>
					</Section>
				);
			})}
		</HubTemplate>
	);
}
