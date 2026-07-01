import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { allListings } from "@/lib/listings";

export const metadata: Metadata = {
	title: "New Developments — Cyprus Property Listings | RealCy",
	description:
		"Browse all new-build developments across Cyprus. Compare prices, locations and features in Paphos, Limassol, Larnaca, Nicosia and Ayia Napa.",
	alternates: { canonical: "/listings/" },
};

export default function ListingsIndexPage() {
	const listings = allListings();

	return (
		<main id="main" className="max-w-4xl mx-auto px-6 py-10 md:py-16">
			<Breadcrumbs
				items={[{ label: "Home", href: "/" }, { label: "Listings" }]}
			/>

			<h1 className="text-3xl font-bold text-slate-900 mb-2">
				New Developments in Cyprus
			</h1>
			<p className="text-slate-600 mb-8 text-base leading-relaxed">
				{listings.length} new-build developments across Cyprus. Browse by
				project to compare prices, locations and unit types.
			</p>

			<div className="grid gap-4 sm:grid-cols-2">
				{listings.map((listing) => (
					<Link
						key={listing.slug}
						href={`/listings/${listing.slug}/`}
						className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-[#35cdc4] hover:shadow-md transition-all"
					>
						<div className="flex items-start justify-between gap-3">
							<div className="flex-1 min-w-0">
								<span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 mb-2">
									{listing.location ?? listing.regionCity}
								</span>
								<h2 className="text-base font-bold text-slate-900 group-hover:text-[#35cdc4] transition-colors leading-snug">
									{listing.title}
								</h2>
								{listing.priceRange && (
									<p className="mt-1 text-sm font-medium text-slate-700">
										{listing.priceRange}
									</p>
								)}
								{listing.description && (
									<p className="mt-1.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
										{listing.description}
									</p>
								)}
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
