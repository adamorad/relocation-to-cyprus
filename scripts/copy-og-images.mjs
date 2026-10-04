// Copies build-time guide cards (out/guides/<slug>/opengraph-image, no extension)
// to out/og/guides/<slug>.png so they are served as image/png without the
// trailing-slash redirect. Guide metadata points at these .png URLs.
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const src = "out/guides";
const dest = "out/og/guides";
mkdirSync(dest, { recursive: true });
let n = 0;
for (const slug of readdirSync(src)) {
	const file = join(src, slug, "opengraph-image");
	if (existsSync(file)) {
		copyFileSync(file, join(dest, `${slug}.png`));
		n++;
	}
}
console.log(`copy-og-images: ${n} guide cards`);
