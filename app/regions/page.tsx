import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { REGIONS } from "@/lib/regions";

export const metadata: Metadata = {
	title: "Regions — Cyprus Relocation Guide | RealCy",
	description:
		"Explore every major region in Cyprus — Paphos, Limassol, Larnaca, Nicosia, and Ayia Napa. Compare lifestyle, property, schools, and healthcare before you relocate.",
	alternates: { canonical: "/regions/" },
};

export default function RegionsIndexPage() {
	return (
		<main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
			<Breadcrumbs
				items={[{ label: "Home", href: "/" }, { label: "Regions" }]}
			/>

			<h1 className="text-3xl font-bold text-slate-900 mb-2">
				Regions of Cyprus
			</h1>
			<p className="text-slate-600 mb-8 text-base leading-relaxed">
				Each region of Cyprus has a distinct character — from Limassol's
				high-rise coastal energy to Paphos's laid-back retirement appeal. Browse
				by region to explore property, schools, healthcare and lifestyle.
			</p>

			<div className="grid gap-4 sm:grid-cols-2">
				{REGIONS.map((region) => (
					<Link
						key={region.slug}
						href={`/regions/${region.slug}/`}
						className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-[#35cdc4] hover:shadow-md transition-all"
					>
						<div className="flex items-start justify-between gap-3">
							<div className="flex-1 min-w-0">
								<h2 className="text-base font-bold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">
									{region.name}
								</h2>
								<p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
									{region.oneLiner}
								</p>
							</div>
							<span className="flex-shrink-0 text-slate-300 group-hover:text-[#35cdc4] transition-colors text-xl mt-1">
								&rarr;
							</span>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
