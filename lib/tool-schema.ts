import { TOOLS } from "./tools-index";

const CATEGORY_MAP: Record<string, string> = {
	"Tax & Contributions": "FinanceApplication",
	"Property & Rent": "FinanceApplication",
	"Cost & Budget": "FinanceApplication",
	"Work & Business": "BusinessApplication",
	"Visa & Residency": "BusinessApplication",
	"Location & Living": "TravelApplication",
	"Trackers & Calendars": "BusinessApplication",
};

/** Per-href overrides for tools whose tag/category alone is ambiguous. */
const HREF_OVERRIDES: Record<string, string> = {
	"/tools/events-calendar/": "TravelApplication",
	"/tools/tax-filing-calendar/": "FinanceApplication",
	"/tools/sole-trader-vs-ltd/": "FinanceApplication",
};

function applicationCategory(href: string, category: string): string {
	return (
		HREF_OVERRIDES[href] ?? CATEGORY_MAP[category] ?? "UtilitiesApplication"
	);
}

/**
 * Returns a schema.org WebApplication JSON-LD object for the given tool slug,
 * or null if the slug is not found in TOOLS (e.g. redirect stub pages).
 */
export function toolWebAppJsonLd(slug: string): object | null {
	const tool = TOOLS.find((t) => t.href === `/tools/${slug}/`);
	if (!tool) return null;
	return {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: tool.title,
		description: tool.description,
		url: `https://realcy.app/tools/${slug}/`,
		applicationCategory: applicationCategory(tool.href, tool.category),
		operatingSystem: "Web",
		offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
	};
}
