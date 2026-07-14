/**
 * Old guide slugs that have been consolidated into another guide.
 * The route still emits static HTML for these slugs (so old links/rankings
 * don't 404) but serves a canonical + client-side redirect to the target.
 */
export const GUIDE_REDIRECTS: Record<string, string> = {
	// Consolidated the two competing long-term car-rental guides (July 2026).
	"car-rental-long-term": "long-term-car-rental-cyprus",
};
