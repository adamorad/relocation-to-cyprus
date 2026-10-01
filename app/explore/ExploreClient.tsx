"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GUIDE_CATEGORY_LABEL, GUIDES } from "@/lib/guides";
import { SECTIONS_INDEX } from "@/lib/sections-index";
import { TOOLS } from "@/lib/tools-index";

type ToolEntry = {
	name: string;
	slug: string;
	tag: string;
	description: string;
};

const TOOLS_LIST: ToolEntry[] = TOOLS.map((t) => ({
	name: t.title,
	slug: t.href.replace(/^\/tools\//, "").replace(/\/$/, ""),
	tag: t.tag,
	description: t.description,
}));

type SectionItem = { name: string; href: string };
type Category = { title: string; items: SectionItem[] };

const CATEGORIES: Category[] = [
	{
		title: "Property & Housing",
		items: [
			{ name: "Long-Term Rentals", href: "/sections/long-term-rentals/" },
			{ name: "Co-Living", href: "/sections/co-living/" },
			{ name: "Property Management", href: "/sections/property-management/" },
		],
	},
	{
		title: "Legal & Professional",
		items: [
			{ name: "Property Lawyers", href: "/sections/property-lawyers/" },
			{ name: "Immigration Lawyers", href: "/sections/immigration-lawyers/" },
			{ name: "Accountants", href: "/sections/accountants/" },
		],
	},
	{
		title: "Business",
		items: [
			{ name: "Startup Ecosystem", href: "/sections/startup-ecosystem/" },
			{ name: "Registered Address", href: "/sections/registered-address/" },
			{ name: "Coworking", href: "/sections/coworking/" },
		],
	},
	{
		title: "Family & Education",
		items: [
			{ name: "Childcare & Nurseries", href: "/sections/childcare-nurseries/" },
			{
				name: "After-School Activities",
				href: "/sections/after-school-activities/",
			},
			{ name: "Summer Camps", href: "/sections/summer-camps/" },
		],
	},
	{
		title: "Healthcare",
		items: [
			{ name: "Specialist Doctors", href: "/sections/specialist-doctors/" },
			{
				name: "Mental Health Services",
				href: "/sections/mental-health-services/",
			},
			{ name: "Veterinary Services", href: "/sections/veterinary-services/" },
		],
	},
	{
		title: "Active Living",
		items: [
			{ name: "Fitness & Wellness", href: "/sections/fitness-wellness/" },
			{ name: "Sports Clubs", href: "/sections/sports-clubs/" },
			{ name: "EV Charging", href: "/sections/ev-charging/" },
		],
	},
	{
		title: "Getting Around",
		items: [{ name: "Public Transport", href: "/sections/public-transport/" }],
	},
	{
		title: "Community",
		items: [
			{ name: "Expat Communities", href: "/sections/expat-communities/" },
			{ name: "Religious Services", href: "/sections/religious-services/" },
			{ name: "Volunteering", href: "/sections/volunteering/" },
		],
	},
	{
		title: "Arts & Culture",
		items: [
			{ name: "Art & Culture", href: "/sections/art-culture/" },
			{ name: "Wineries", href: "/sections/wineries/" },
		],
	},
	{
		title: "Food & Drink",
		items: [
			{ name: "Farmers Markets", href: "/sections/farmers-markets/" },
			{
				name: "International Grocery",
				href: "/sections/international-grocery/",
			},
			{ name: "Halal & Kosher", href: "/sections/halal-kosher/" },
			{ name: "Rooftop Bars", href: "/sections/rooftop-bars/" },
		],
	},
	{
		title: "Environment",
		items: [
			{ name: "Community Gardens", href: "/sections/community-gardens/" },
		],
	},
	{
		title: "Guides",
		items: [{ name: "All Relocation Guides", href: "/guides/" }],
	},
	{
		title: "Interactive Tools",
		items: [{ name: "All Relocation Tools", href: "/tools/" }],
	},
	{
		title: "Property Developers",
		items: [{ name: "Developer Profiles", href: "/developers/" }],
	},
	{
		title: "My Lists",
		items: [{ name: "Saved Shortlist", href: "/my-shortlist/" }],
	},
];

type SearchResult =
	| {
			kind: "guide";
			title: string;
			slug: string;
			category: string;
			description: string;
	  }
	| {
			kind: "tool";
			name: string;
			slug: string;
			tag: string;
			description: string;
	  }
	| {
			kind: "section";
			name: string;
			slug: string;
			category: string;
			description: string;
	  };

function stem(w: string): string {
	if (w.length > 4 && w.endsWith("ies")) return `${w.slice(0, -3)}y`;
	if (w.length > 4 && /(ss|x|z|ch|sh)es$/.test(w)) return w.slice(0, -2);
	if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss"))
		return w.slice(0, -1);
	if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
	return w;
}

function tokenize(text: string): string[] {
	return text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, " ")
		.split(" ")
		.filter(Boolean)
		.map(stem);
}

/** Every query word must match (as a substring) a stemmed word in one of the fields. */
function matches(words: string[], fields: string[]): boolean {
	const hay = tokenize(fields.join(" "));
	return words.every((w) => hay.some((t) => t.includes(w)));
}

export default function ExploreClient() {
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("q") ?? "");

	useEffect(() => {
		const q = searchParams.get("q");
		if (q) setQuery(q);
	}, [searchParams]);

	const q = query.trim().toLowerCase();
	const words = tokenize(q);

	const results: SearchResult[] =
		q.length < 2 || words.length === 0
			? []
			: [
					...GUIDES.filter((g) =>
						matches(words, [
							g.title,
							g.description,
							g.slug,
							GUIDE_CATEGORY_LABEL[g.category],
						]),
					).map(
						(g): SearchResult => ({
							kind: "guide",
							title: g.title,
							slug: g.slug,
							category: GUIDE_CATEGORY_LABEL[g.category],
							description: g.description,
						}),
					),
					...TOOLS_LIST.filter((t) =>
						matches(words, [t.name, t.description, t.tag]),
					).map((t): SearchResult => ({ kind: "tool", ...t })),
					...SECTIONS_INDEX.filter((s) =>
						matches(words, [s.name, s.description, s.category, s.slug]),
					).map((s): SearchResult => ({ kind: "section", ...s })),
				];

	const guideResults = results.filter((r) => r.kind === "guide") as Extract<
		SearchResult,
		{ kind: "guide" }
	>[];
	const toolResults = results.filter((r) => r.kind === "tool") as Extract<
		SearchResult,
		{ kind: "tool" }
	>[];
	const sectionResults = results.filter((r) => r.kind === "section") as Extract<
		SearchResult,
		{ kind: "section" }
	>[];

	return (
		<main id="main" className="max-w-5xl mx-auto px-6 py-10 md:py-16">
			<nav className="text-xs text-slate-600 mb-6">
				<Link href="/" className="hover:text-ink">
					Home
				</Link>{" "}
				&rsaquo; <span className="text-ink">Explore</span>
			</nav>

			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Site Directory
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Explore RealCy.app
				</h1>
				<p className="mt-3 text-slate-700 leading-relaxed">
					Everything you need to plan your move to Cyprus — organised by
					category.
				</p>
			</header>

			{/* Search */}
			<div className="mb-8">
				<div className="relative">
					<svg
						className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.35-4.35" />
					</svg>
					<input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search guides, tools, sections…"
						className="w-full pl-9 pr-4 min-h-11 border border-line rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
						aria-label="Search all content"
					/>
					{query && (
						<button
							type="button"
							onClick={() => setQuery("")}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-slate-700 text-lg leading-none"
							aria-label="Clear search"
						>
							×
						</button>
					)}
				</div>
			</div>

			{/* Search results */}
			{q.length >= 2 ? (
				results.length === 0 ? (
					<div className="py-10 text-center">
						<p className="text-slate-500 text-sm">
							No results for &ldquo;{query}&rdquo;
						</p>
						<p className="text-muted text-xs mt-1">
							Try a different term, or browse by category below.
						</p>
						<button
							type="button"
							onClick={() => setQuery("")}
							className="mt-4 text-xs text-primary underline"
						>
							Clear search
						</button>
					</div>
				) : (
					<div className="space-y-8 mb-10">
						{guideResults.length > 0 && (
							<section>
								<h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
									Guides ({guideResults.length})
								</h2>
								<ul className="space-y-2">
									{guideResults.map((r) => (
										<li key={r.slug}>
											<Link
												href={`/guides/${r.slug}/`}
												className="flex items-start gap-3 p-3 border border-line rounded-2xl hover:border-primary hover:shadow-sm transition-all group"
											>
												<span className="flex-shrink-0 inline-block text-xs font-semibold uppercase tracking-wider text-ink bg-sky-strong rounded-full px-2.5 py-0.5 mt-0.5">
													{r.category}
												</span>
												<div className="min-w-0">
													<p className="text-sm font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
														{r.title}
													</p>
													<p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
														{r.description}
													</p>
												</div>
											</Link>
										</li>
									))}
								</ul>
							</section>
						)}

						{toolResults.length > 0 && (
							<section>
								<h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
									Tools ({toolResults.length})
								</h2>
								<ul className="space-y-2">
									{toolResults.map((r) => (
										<li key={r.slug}>
											<Link
												href={`/tools/${r.slug}/`}
												className="flex items-start gap-3 p-3 border border-line rounded-2xl hover:border-primary hover:shadow-sm transition-all group"
											>
												<span className="flex-shrink-0 inline-block text-xs font-semibold uppercase tracking-wider text-ink bg-sky-strong rounded-full px-2.5 py-0.5 mt-0.5">
													{r.tag}
												</span>
												<div className="min-w-0">
													<p className="text-sm font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
														{r.name}
													</p>
													<p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
														{r.description}
													</p>
												</div>
											</Link>
										</li>
									))}
								</ul>
							</section>
						)}

						{sectionResults.length > 0 && (
							<section>
								<h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
									Directories ({sectionResults.length})
								</h2>
								<ul className="space-y-2">
									{sectionResults.map((r) => (
										<li key={r.slug}>
											<Link
												href={`/sections/${r.slug}/`}
												className="flex items-start gap-3 p-3 border border-line rounded-2xl hover:border-primary hover:shadow-sm transition-all group"
											>
												<span className="flex-shrink-0 inline-block text-xs font-semibold uppercase tracking-wider text-ink bg-sky-strong rounded-full px-2.5 py-0.5 mt-0.5">
													{r.category}
												</span>
												<div className="min-w-0">
													<p className="text-sm font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
														{r.name}
													</p>
													<p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
														{r.description}
													</p>
												</div>
											</Link>
										</li>
									))}
								</ul>
							</section>
						)}

						<button
							type="button"
							onClick={() => setQuery("")}
							className="text-xs text-muted underline hover:text-slate-700"
						>
							Clear search — browse by category
						</button>
					</div>
				)
			) : (
				/* Category grid — shown when no search query */
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{CATEGORIES.map((category) => (
						<div
							key={category.title}
							className="bg-white border border-line rounded-2xl p-5"
						>
							<h2 className="text-sm font-bold text-ink uppercase tracking-wide mb-3">
								{category.title}
							</h2>
							<ul className="space-y-1.5">
								{category.items.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className="text-sm text-slate-700 hover:text-primary transition-colors flex items-center gap-1.5 group py-1"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}

			<p className="mt-10 text-xs text-slate-500">
				<Link href="/" className="underline hover:text-ink">
					Back to home
				</Link>
			</p>
		</main>
	);
}
