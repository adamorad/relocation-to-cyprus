/**
 * Display formatting for listing and developer data. The data files keep the
 * source values (ALL CAPS names, "€1.650.000 +VAT"); pages format at render.
 */

const KEEP_UPPER = new Set(["GPA", "IZI", "VIP", "II", "III", "IV", "VI"]);
const SMALL_WORDS = new Set(["and", "of", "the", "in", "at", "on"]);

function titleToken(tok: string, first: boolean): string {
	// Only touch fully upper-case tokens: mixed case is already a deliberate brand spelling.
	if (!/[A-Z]/.test(tok) || /[a-z]/.test(tok)) return tok;
	if (KEEP_UPPER.has(tok)) return tok;
	// Single letters ("BLOCK A") and initials ("F.G", "K&P", "Z&C").
	if (/^[A-Z]$/.test(tok) || /^[A-Z]([.&][A-Z])+\.?$/.test(tok)) return tok;
	// Short consonant-only acronyms (BBF, HKCY, CCS, MAWJ, TLV, WJ).
	if (/^[BCDFGHJKLMNPQRSTVWXZ]{2,4}$/.test(tok)) return tok;
	const lower = tok.toLowerCase();
	if (!first && SMALL_WORDS.has(lower)) return lower;
	return lower.replace(
		/(^|[-/(])([a-z])/g,
		(_m, p: string, c: string) => p + c.toUpperCase(),
	);
}

/** "LEMONMARIA DEVELOPERS" -> "Lemonmaria Developers". Mixed-case names are untouched. */
export function titleCaseName(name: string): string {
	return name
		.split(/(\s+)/)
		.map((part, i) => (/^\s+$/.test(part) ? part : titleToken(part, i === 0)))
		.join("")
		.replace(/\bLtd\b/g, "Ltd");
}

/** "€1.650.000 +VAT" -> "€1,650,000 + VAT"; ranges keep their en dash. */
export function formatPrice(s: string | null | undefined): string | null {
	if (!s) return null;
	return s
		.replace(/\d{1,3}(?:[.,]\d{3})+/g, (m) => m.replace(/[.,]/g, ","))
		.replace(/\s*\+\s*VAT/i, " + VAT")
		.replace(/\s+/g, " ")
		.trim();
}

export const CITY_SLUGS = {
	limassol: "Limassol",
	paphos: "Paphos",
	larnaca: "Larnaca",
	"ayia-napa": "Ayia Napa",
} as const;

export type CitySlug = keyof typeof CITY_SLUGS;

export function citySlugFor(regionCity: string): string {
	return regionCity.toLowerCase().replace(/\s+/g, "-");
}
