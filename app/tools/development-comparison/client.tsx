"use client";

import { useMemo, useState } from "react";
import { formatListingPrice, titleCaseName } from "@/app/listings/format";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import type { EnrichedListing } from "@/lib/listingsData";
import { LISTINGS } from "@/lib/listingsData";

const MAX_SELECTED = 3;

function getBedrooms(listing: EnrichedListing): string {
	const beds = new Set<string>();
	for (const offer of listing.offers) {
		const b =
			offer.bedrooms ??
			(offer.features as Record<string, string> | undefined)?.bedrooms ??
			null;
		if (b) beds.add(b);
	}
	if (beds.size === 0) return "n/a";
	return Array.from(beds)
		.sort()
		.map((b) => `${b} bed`)
		.join(", ");
}

function spec(listing: EnrichedListing, key: string): string {
	return listing.specs[key] ?? "n/a";
}

const ROW_LABELS: { label: string; key: string }[] = [
	{ label: "Developer", key: "__developer" },
	{ label: "Location", key: "__location" },
	{ label: "Price Range", key: "__priceRange" },
	{ label: "Bedrooms", key: "__bedrooms" },
	{ label: "Pool", key: "Pool" },
	{ label: "Parking", key: "Parking" },
	{ label: "Energy Efficiency", key: "Energy Efficiency" },
	{ label: "Pet-friendly", key: "Pet-friendly" },
	{ label: "Photovoltaic", key: "Photovoltaic" },
	{ label: "View", key: "View" },
	{ label: "Completion", key: "Construction period" },
];

function getCellValue(listing: EnrichedListing, key: string): string {
	if (key === "__developer")
		return listing.developer?.name
			? titleCaseName(listing.developer.name)
			: "n/a";
	if (key === "__location")
		return listing.location ?? listing.regionCity ?? "n/a";
	if (key === "__priceRange") return formatListingPrice(listing.priceRange);
	if (key === "__bedrooms") return getBedrooms(listing);
	return spec(listing, key);
}

export default function DevelopmentComparisonClient() {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<EnrichedListing[]>([]);

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return LISTINGS.filter(
			(l) =>
				!selected.some((s) => s.id === l.id) &&
				(l.title.toLowerCase().includes(q) ||
					(l.location ?? "").toLowerCase().includes(q) ||
					l.regionCity.toLowerCase().includes(q)),
		).slice(0, 12);
	}, [query, selected]);

	function addListing(listing: EnrichedListing) {
		if (selected.length >= MAX_SELECTED) return;
		setSelected((prev) => [...prev, listing]);
		setQuery("");
	}

	function removeListing(id: number) {
		setSelected((prev) => prev.filter((l) => l.id !== id));
	}

	return (
		<>
			{/* Search box */}
			<div className="relative">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					aria-label="Search developments by name or location"
					placeholder={
						selected.length >= MAX_SELECTED
							? "Maximum 3 developments selected"
							: "Search by name or location..."
					}
					disabled={selected.length >= MAX_SELECTED}
					className="min-h-11 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-focus disabled:bg-sky disabled:text-muted"
				/>
				{results.length > 0 && (
					<ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-72 overflow-y-auto rounded-xl border border-line bg-white shadow-rc">
						{results.map((l) => (
							<li key={l.id}>
								<button
									type="button"
									onClick={() => addListing(l)}
									className="min-h-11 w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-sky"
								>
									<span className="font-medium text-ink">
										{titleCaseName(l.title)}
									</span>
									<span className="ml-2 text-xs text-muted">
										{l.location ?? l.regionCity}
									</span>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Selected chips */}
			{selected.length > 0 && (
				<ul className="flex flex-wrap gap-2">
					{selected.map((l) => (
						<li key={l.id}>
							<span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary pl-4 pr-1 text-sm font-semibold text-white">
								{titleCaseName(l.title)}
								<button
									type="button"
									onClick={() => removeListing(l.id)}
									aria-label={`Remove ${titleCaseName(l.title)}`}
									className="inline-flex h-9 w-9 items-center justify-center rounded-full leading-none hover:bg-primary-hover"
								>
									×
								</button>
							</span>
						</li>
					))}
				</ul>
			)}

			{/* Empty state */}
			{selected.length === 0 && (
				<div className="rounded-card border border-dashed border-line bg-white py-16 text-center text-sm text-muted">
					Search and select up to 3 developments to compare
				</div>
			)}

			{/* Comparison table */}
			{selected.length > 0 && (
				<>
					{/* Desktop: table layout */}
					<div className="hidden md:block">
						<DataTable
							caption="Development comparison"
							hideCaption
							zebra
							columns={[
								{ header: <span className="sr-only">Attribute</span> },
								...selected.map((l) => ({
									header: (
										<>
											<span className="block font-bold">
												{titleCaseName(l.title)}
											</span>
											<span className="text-xs font-normal text-muted">
												{l.location ?? l.regionCity}
											</span>
										</>
									),
								})),
							]}
							rows={[
								...ROW_LABELS.map(({ label, key }) => [
									label,
									...selected.map((l) => getCellValue(l, key)),
								]),
								[
									"Details",
									...selected.map((l) => (
										<ButtonLink
											key={l.id}
											href={`/listings/${l.slug}/`}
											variant="secondary"
										>
											More info
										</ButtonLink>
									)),
								],
							]}
						/>
					</div>

					{/* Mobile: stacked cards */}
					<div className="space-y-4 md:hidden">
						{selected.map((l) => (
							<section
								key={l.id}
								aria-label={titleCaseName(l.title)}
								className="overflow-hidden rounded-card border border-line bg-white"
							>
								<div className="bg-sky px-4 py-3">
									<h2 className="text-base font-bold text-ink">
										{titleCaseName(l.title)}
									</h2>
									<p className="mt-0.5 text-sm text-muted">
										{l.location ?? l.regionCity}
									</p>
								</div>
								<dl className="divide-y divide-line">
									{ROW_LABELS.map(({ label, key }) => (
										<div key={key} className="flex gap-4 px-4 py-2.5">
											<dt className="w-32 flex-shrink-0 pt-0.5 text-sm font-semibold text-muted">
												{label}
											</dt>
											<dd className="min-w-0 text-sm text-ink">
												{getCellValue(l, key)}
											</dd>
										</div>
									))}
								</dl>
								<div className="border-t border-line px-4 py-3">
									<ButtonLink href={`/listings/${l.slug}/`} variant="secondary">
										More info
									</ButtonLink>
								</div>
							</section>
						))}
					</div>
				</>
			)}
		</>
	);
}
