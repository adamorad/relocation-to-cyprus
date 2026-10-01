import type { Metadata } from "next";
import Link from "next/link";
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

export default function MovingToCyprusPage() {
	return (
		<main
			id="main"
			data-pagefind-body
			data-pagefind-filter="type[data-type]"
			data-type="page"
			className="max-w-5xl mx-auto px-6 py-12"
		>
			<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
				Moving to Cyprus
			</h1>
			<p className="mt-3 text-slate-700 max-w-2xl">
				Planning a move? Start with residency and tax, then property and
				business. Already here? See the everyday guides on the{" "}
				<Link
					href="/"
					className="text-primary underline hover:text-primary-hover"
				>
					homepage
				</Link>
				.
			</p>
			{CATEGORIES.map((cat) => {
				const guides = GUIDES.filter((g) => g.category === cat);
				if (guides.length === 0) return null;
				return (
					<section key={cat} className="mt-10">
						<h2 className="text-xl font-semibold text-ink">
							{GUIDE_CATEGORY_LABEL[cat]}
						</h2>
						<ul className="mt-3 grid md:grid-cols-2 gap-x-8 gap-y-2">
							{guides.map((g) => (
								<li key={g.slug}>
									<Link
										href={`/guides/${g.slug}/`}
										className="text-primary hover:underline"
									>
										{g.title}
									</Link>
								</li>
							))}
						</ul>
					</section>
				);
			})}
		</main>
	);
}
