import { SponsorSlot } from "@/components/ui/SponsorSlot";
import { guideSponsor, topicSponsor } from "@/lib/sponsors";
import type { ItemTopicSlug } from "@/lib/topics";

/** The guide's active "Sponsored by" unit, or null (ArticleTemplate `sponsor`). */
export function guideSponsorUnit(slug: string) {
	const s = guideSponsor(slug);
	return s ? (
		<SponsorSlot
			spot="guide"
			placement={slug}
			sponsor={{ ...s, kind: "sponsored" }}
		/>
	) : null;
}

/** The hub's active "Sponsored by" unit, or null (HubTemplate `sponsor`). */
export function topicSponsorUnit(slug: ItemTopicSlug) {
	const s = topicSponsor(slug);
	return s ? (
		<SponsorSlot
			spot="topic"
			placement={slug}
			sponsor={{ ...s, kind: "sponsored" }}
		/>
	) : null;
}
