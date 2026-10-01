"use client";

import Link from "next/link";
import { useState } from "react";
import {
	SECTION_CATEGORIES,
	SECTIONS_INDEX,
	type SectionCategory,
} from "@/lib/sections-index";

export default function SectionsIndexPage() {
	const [active, setActive] = useState<SectionCategory | "all">("all");

	const visible =
		active === "all"
			? SECTIONS_INDEX
			: SECTIONS_INDEX.filter((s) => s.category === active);

	const countFor = (cat: SectionCategory) =>
		SECTIONS_INDEX.filter((s) => s.category === cat).length;

	return (
		<main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
			<nav className="text-xs text-slate-600 mb-6">
				<Link href="/" className="hover:text-ink">
					Home
				</Link>{" "}
				&rsaquo;{" "}
				<Link href="/explore/" className="hover:text-ink">
					Explore
				</Link>{" "}
				&rsaquo; <span className="text-ink">Directories</span>
			</nav>

			<header className="mb-8">
				<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
					Curated Directories
				</p>
				<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
					Cyprus Directories
				</h1>
				<p className="mt-3 text-slate-700 leading-relaxed">
					Curated, researched directories covering every practical need for your
					Cyprus relocation — from property lawyers to expat communities.
				</p>
			</header>

			{/* Category filter */}
			<div className="mb-6 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={() => setActive("all")}
					className={`rounded-full px-4 min-h-11 text-xs font-semibold border transition-colors ${
						active === "all"
							? "bg-ink text-white border-ink"
							: "bg-white text-ink border-line hover:bg-sky"
					}`}
				>
					All ({SECTIONS_INDEX.length})
				</button>
				{SECTION_CATEGORIES.map((cat) => (
					<button
						key={cat}
						type="button"
						onClick={() => setActive(cat)}
						className={`rounded-full px-4 min-h-11 text-xs font-semibold border transition-colors ${
							active === cat
								? "bg-ink text-white border-ink"
								: "bg-white text-ink border-line hover:bg-sky"
						}`}
					>
						{cat} ({countFor(cat)})
					</button>
				))}
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{visible.map((s) => (
					<Link
						key={s.slug}
						href={`/sections/${s.slug}`}
						className="group block bg-white border border-line rounded-2xl p-5 hover:border-primary hover:shadow-sm transition-all"
					>
						<div className="flex items-start justify-between gap-3">
							<div className="flex-1 min-w-0">
								<span className="inline-block text-xs font-semibold uppercase tracking-wider text-ink bg-sky-strong rounded-full px-2.5 py-0.5 mb-2">
									{s.category}
								</span>
								<h2 className="text-base font-bold text-ink group-hover:text-primary transition-colors leading-snug">
									{s.name}
								</h2>
								<p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
									{s.description}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>

			<p className="mt-10 text-xs text-slate-500">
				<Link href="/explore/" className="underline hover:text-ink">
					Back to Explore
				</Link>
			</p>
		</main>
	);
}
