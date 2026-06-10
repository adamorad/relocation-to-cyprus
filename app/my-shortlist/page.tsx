"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LISTINGS } from "@/lib/listingsData";
import { getShortlist, toggleShortlist } from "@/lib/shortlist";
import type { EnrichedListing } from "@/lib/listingsData";

export default function MyShortlistPage() {
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
        <Link href="/" className="hover:underline">Home</Link>
        {" › "}
        <span>My Shortlist</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">My Shortlist</h1>
      <p className="text-sm text-slate-600 mb-8">
        Developments you have saved. Your list is stored in your browser — no account needed.
      </p>

      {saved.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-2xl mb-3">♡</p>
          <p className="text-slate-700 font-medium mb-1">No saved listings yet.</p>
          <p className="text-sm text-slate-500 mb-6">
            Browse the map and tap ♡ to save developments.
          </p>
          <Link
            href="/"
            className="inline-block text-xs font-semibold px-4 py-2 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            Browse the map
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
        <Link href="/" className="underline hover:text-slate-900 text-sm">
          ← Back to map
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
    <div className="rounded-xl border border-slate-200 bg-white p-4 flex gap-4 relative">
      {listing.images && listing.images.length > 0 ? (
        <img
          src={listing.images[0]}
          alt=""
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-slate-100"
          loading="lazy"
        />
      ) : (
        <div className="w-20 h-20 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 text-xs">
          No image
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold mb-0.5">
          {listing.regionCity}
        </p>
        <h2 className="font-bold text-slate-900 leading-snug truncate">
          {listing.title}
        </h2>
        {listing.location ? (
          <p className="text-xs text-slate-500 mt-0.5 truncate">{listing.location}</p>
        ) : null}
        {listing.priceRange ? (
          <p className="text-sm font-semibold text-slate-900 mt-1">{listing.priceRange}</p>
        ) : null}
        {listing.developer?.name ? (
          <p className="text-xs text-slate-500 mt-0.5">{listing.developer.name}</p>
        ) : null}

        <div className="flex gap-2 mt-3 flex-wrap">
          <Link
            href={`/listings/${listing.slug}/`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#35cdc4] text-slate-900 hover:bg-teal-400 transition-colors"
          >
            View details
          </Link>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
