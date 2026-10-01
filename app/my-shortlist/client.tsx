"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { EnrichedListing } from "@/lib/listingsData";
import { LISTINGS } from "@/lib/listingsData";
import { getShortlist, toggleShortlist } from "@/lib/shortlist";

export default function ShortlistClient() {
	const [slugs, setSlugs] = useState<string[]>([]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setSlugs(getShortlist());
		setMounted(true);
	}, []);

	const saved = LISTINGS.filter((l) => slugs.includes(l.slug));

	function handleRemove(slug: string) {
		toggleShortlist(slug);
		setSlugs(getShortlist());
	}

	if (!mounted) {
		return (
			<main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
				<p className="text-slate-500 text-sm">Loading…</p>
			</main>
		);
	}

	return (
		<main id="main" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
			<nav className="text-xs text-slate-600 mb-6">
				<Link href="/" className="hover:underline">
					Home
				</Link>
				{" › "}
				<span>My Shortlist</span>
			</nav>

			<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">
				My Shortlist
			</h1>
			<p className="text-sm text-slate-600 mb-8">
				Developments you have saved. Your list is stored in your browser — no
				account needed.
			</p>

			{saved.length === 0 ? (
				<div className="rounded-2xl border border-line bg-sky p-8 text-center">
					<Icon name="heart" size={32} className="mx-auto mb-3 text-muted" />
					<p className="text-slate-700 font-medium mb-1">
						No saved listings yet.
					</p>
					<p className="text-sm text-muted mb-6">
						Browse new developments and use the heart on a listing to save it.
					</p>
					<Link
						href="/listings/"
						className="inline-flex items-center min-h-11 text-sm font-semibold px-5 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						Browse new developments
					</Link>
				</div>
			) : (
				<div className="space-y-4">
					{saved.map((listing) => (
						<ShortlistCard
							key={listing.slug}
							listing={listing}
							onRemove={() => handleRemove(listing.slug)}
						/>
					))}
				</div>
			)}

			<div className="mt-10">
				<Link href="/" className="underline hover:text-ink text-sm">
					Back to home
				</Link>
			</div>
		</main>
	);
}

function ShortlistCard({
	listing,
	onRemove,
}: {
	listing: EnrichedListing;
	onRemove: () => void;
}) {
	return (
		<div className="rounded-2xl border border-line bg-white p-4 flex gap-4 relative">
			{listing.images && listing.images.length > 0 ? (
				<img
					src={listing.images[0]}
					alt=""
					className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-sky"
					loading="lazy"
				/>
			) : (
				<div className="w-20 h-20 rounded-xl bg-sky flex-shrink-0 flex items-center justify-center text-muted text-xs">
					No image
				</div>
			)}

			<div className="min-w-0 flex-1">
				<p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-0.5">
					{listing.regionCity}
				</p>
				<h2 className="font-bold text-ink leading-snug truncate">
					{listing.title}
				</h2>
				{listing.location ? (
					<p className="text-xs text-slate-500 mt-0.5 truncate">
						{listing.location}
					</p>
				) : null}
				{listing.priceRange ? (
					<p className="text-sm font-semibold text-ink mt-1">
						{listing.priceRange}
					</p>
				) : null}
				{listing.developer?.name ? (
					<p className="text-xs text-slate-500 mt-0.5">
						{listing.developer.name}
					</p>
				) : null}

				<div className="flex gap-2 mt-3 flex-wrap">
					<Link
						href={`/listings/${listing.slug}/`}
						className="inline-flex items-center min-h-11 text-xs font-semibold px-4 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors"
					>
						View details
					</Link>
					<button
						type="button"
						onClick={onRemove}
						className="inline-flex items-center min-h-11 text-xs font-semibold px-4 rounded-xl border border-line bg-white text-ink hover:bg-sky transition-colors"
					>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
}
