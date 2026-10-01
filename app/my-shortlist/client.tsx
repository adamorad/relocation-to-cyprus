"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
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

	const header = (
		<PageHeader
			breadcrumbs={[
				{ label: "Home", href: "/" },
				{ label: "Saved developments" },
			]}
			title="Saved developments"
			intro="New-build developments you have saved. Your list is stored in your browser, no account needed."
			width="reading"
		/>
	);

	if (!mounted) {
		return (
			<TemplateMain>
				{header}
				<Container width="reading" className="pt-8">
					<p className="text-sm text-muted">Loading...</p>
				</Container>
			</TemplateMain>
		);
	}

	return (
		<TemplateMain>
			{header}
			<Container width="reading" className="pt-8">
				{saved.length === 0 ? (
					<div className="rounded-card border border-line bg-sky p-8 text-center">
						<Icon name="heart" size={32} className="mx-auto mb-3 text-muted" />
						<p className="mb-1 font-medium text-ink">
							No saved developments yet.
						</p>
						<p className="mb-6 text-sm text-muted">
							Browse new developments and use the heart on a listing to save it.
						</p>
						<ButtonLink href="/listings/">Browse new developments</ButtonLink>
					</div>
				) : (
					<ul className="space-y-4">
						{saved.map((listing) => (
							<li key={listing.slug}>
								<ShortlistCard
									listing={listing}
									onRemove={() => handleRemove(listing.slug)}
								/>
							</li>
						))}
					</ul>
				)}
			</Container>
		</TemplateMain>
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
		<div className="rounded-card border border-line bg-white p-4 flex gap-4 relative">
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
					<p className="text-xs text-muted mt-0.5 truncate">
						{listing.location}
					</p>
				) : null}
				{listing.priceRange ? (
					<p className="text-sm font-semibold text-ink mt-1">
						{listing.priceRange}
					</p>
				) : null}
				{listing.developer?.name ? (
					<p className="text-xs text-muted mt-0.5">{listing.developer.name}</p>
				) : null}

				<div className="mt-3 flex flex-wrap gap-2">
					<ButtonLink href={`/listings/${listing.slug}/`}>
						View details
					</ButtonLink>
					<Button variant="secondary" onClick={onRemove}>
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
}
