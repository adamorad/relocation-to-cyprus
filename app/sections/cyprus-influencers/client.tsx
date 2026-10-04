"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardGrid, CardGridItem } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chip";
import { trackEvent } from "@/lib/analytics";
import {
	ALL_CATEGORIES,
	ALL_PLATFORMS,
	followersLabel,
	INFLUENCERS,
	instagramUrl,
	NOTE,
	type Platform,
	tiktokUrl,
} from "@/lib/cyprus-influencers";

const linkClass =
	"inline-flex min-h-11 items-center font-semibold text-primary-hover underline-offset-2 hover:underline";

/** Filters first, then the account cards. Header lives in page.tsx. */
export default function CyprusInfluencersClient() {
	const [categoryFilter, setCategoryFilter] = useState<string>("All");
	const [platformFilter, setPlatformFilter] = useState<Platform | "All">("All");

	const filtered = INFLUENCERS.filter((i) => {
		const categoryOk = categoryFilter === "All" || i.category === categoryFilter;
		const platformOk =
			platformFilter === "All" ||
			(platformFilter === "Instagram" ? !!i.instagram : !!i.tiktok);
		return categoryOk && platformOk;
	});

	return (
		<>
			<div className="space-y-4 rounded-card border border-line bg-sky p-4 md:p-5">
				<ChipGroup
					label="Category"
					value={categoryFilter}
					onChange={setCategoryFilter}
					options={[
						{ value: "All", label: "All categories" },
						...ALL_CATEGORIES.map((c) => ({ value: c, label: c })),
					]}
				/>
				<ChipGroup
					label="Platform"
					value={platformFilter}
					onChange={setPlatformFilter}
					options={[
						{ value: "All", label: "All platforms" },
						...ALL_PLATFORMS.map((p) => ({ value: p, label: p })),
					]}
				/>
			</div>

			<p className="mt-4 text-sm text-ink">{NOTE}</p>

			<h2
				className="mt-8 text-2xl font-bold tracking-tight text-ink"
				aria-live="polite"
			>
				{filtered.length === 0
					? "No accounts match these filters"
					: `${filtered.length} ${
							filtered.length === 1 ? "account" : "accounts"
						} found`}
			</h2>

			{filtered.length > 0 ? (
				<CardGrid className="mt-5">
					{filtered.map((a) => (
						<CardGridItem key={a.name}>
							<Card
								variant="text"
								eyebrow={
									<span className="flex flex-wrap gap-1.5">
										<Badge>{a.category}</Badge>
										<Badge>{a.language}</Badge>
									</span>
								}
								title={a.name}
								meta={a.city}
								text={a.why}
								footer={
									<span className="flex flex-col">
										{a.instagram ? (
											<a
												href={instagramUrl(a.instagram.handle)}
												target="_blank"
												rel="noopener noreferrer"
												data-umami-event="influencer_click"
												data-umami-event-account={a.name}
												data-umami-event-platform="instagram"
												onClick={() =>
													trackEvent("influencer_click", {
														account: a.name,
														platform: "instagram",
													})
												}
												className={linkClass}
											>
												Instagram: {followersLabel(a.instagram.followers)}
											</a>
										) : null}
										{a.tiktok ? (
											<a
												href={tiktokUrl(a.tiktok.handle)}
												target="_blank"
												rel="noopener noreferrer"
												data-umami-event="influencer_click"
												data-umami-event-account={a.name}
												data-umami-event-platform="tiktok"
												onClick={() =>
													trackEvent("influencer_click", {
														account: a.name,
														platform: "tiktok",
													})
												}
												className={linkClass}
											>
												TikTok: {followersLabel(a.tiktok.followers)}
											</a>
										) : null}
									</span>
								}
							/>
						</CardGridItem>
					))}
				</CardGrid>
			) : null}
		</>
	);
}
