/**
 * Prepend the GH Pages base path to root-relative asset URLs.
 * In dev the base is empty; in prod it's "/relocation-to-cyprus".
 * Pass-through for absolute URLs (http/https) and data URIs.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(src: string | null | undefined): string {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  if (!src.startsWith("/")) return src;
  return BASE + src;
}
