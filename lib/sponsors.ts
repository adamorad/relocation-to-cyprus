/**
 * Paid placements sold on /advertise/. EMPTY by default: an empty map renders
 * nothing anywhere. How to add, schedule and remove a sponsor:
 * docs/sponsors.md.
 *
 * - DIRECTORY_FEATURED: "Featured" unit, first item above a directory's entries.
 * - GUIDE_SPONSORS: "Sponsored by" unit under a guide's header.
 * - TOPIC_SPONSORS: "Sponsored by" unit under a topic hub's header (the seven
 *   /{topic}/ hubs, /moving-to-cyprus/ as "moving-here", and /property/).
 *
 * Keys are typed from the real data (lib/topic-map.ts, lib/topics.ts), so a
 * misspelt slug fails `tsc`. One sponsor per spot is enforced by the shape: a
 * key holds one sponsor.
 *
 * Dates: `start` and `end` are ISO dates (YYYY-MM-DD), both inclusive, compared
 * with the UTC date AT BUILD TIME. The site is a static export, so nothing
 * changes on its own: a rebuild (redeploy) is needed on the day a sponsorship
 * starts and the day after it ends, or the unit appears late / stays up late.
 *
 * Server only: never import this from a "use client" file, or the date check
 * would rerun in the browser.
 */

import type { SponsorUnit } from "@/components/ui/SponsorSlot";
import type { DirectorySlug, GuideSlug } from "./topic-map";
import type { ItemTopicSlug } from "./topics";

type IsoDate = `${number}-${number}-${number}`;

export type Sponsor = Omit<SponsorUnit, "kind"> & {
	/** First day the unit shows (inclusive, UTC, needs a rebuild that day). */
	start: IsoDate;
	/** Last day the unit shows (inclusive, UTC, needs a rebuild the day after). */
	end: IsoDate;
};

/** Logos live in public/sponsors/ and are referenced as /sponsors/{file}. */
export const DIRECTORY_FEATURED: Partial<Record<DirectorySlug, Sponsor>> = {
	// accountants: {
	// 	name: "Example Accounting Ltd",
	// 	href: "https://example.com/",
	// 	text: "ICPAC-registered accountants for expat non-dom filings.",
	// 	logo: { src: "/sponsors/example-accounting.png", alt: "Example Accounting logo" },
	// 	start: "2026-11-01",
	// 	end: "2026-11-30",
	// },
};

export const GUIDE_SPONSORS: Partial<Record<GuideSlug, Sponsor>> = {
	// "banking-in-cyprus": {
	// 	name: "Example Bank",
	// 	href: "https://example.com/",
	// 	text: "Open an account online before you arrive.",
	// 	logo: { src: "/sponsors/example-bank.png", alt: "Example Bank logo" },
	// 	start: "2026-11-01",
	// 	end: "2027-01-31",
	// },
};

export const TOPIC_SPONSORS: Partial<Record<ItemTopicSlug, Sponsor>> = {
	// health: {
	// 	name: "Example Clinic",
	// 	href: "https://example.com/",
	// 	text: "English-speaking GPs in Limassol and Paphos.",
	// 	start: "2026-11-01",
	// 	end: "2026-12-31",
	// },
};

/** Today as YYYY-MM-DD in UTC (evaluated when the page is built). */
const today = () => new Date().toISOString().slice(0, 10);

function active(s: Sponsor | undefined, on = today()): Sponsor | undefined {
	return s && s.start <= on && on <= s.end ? s : undefined;
}

export const directorySponsor = (slug: DirectorySlug) =>
	active(DIRECTORY_FEATURED[slug]);
export const guideSponsor = (slug: string) =>
	active(GUIDE_SPONSORS[slug as GuideSlug]);
export const topicSponsor = (slug: ItemTopicSlug) =>
	active(TOPIC_SPONSORS[slug]);
