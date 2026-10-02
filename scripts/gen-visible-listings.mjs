#!/usr/bin/env node
// Writes lib/data/listings.visible.json: the records of lib/data/listings.json
// that the site shows (coordinates present, not in a hidden classifier city;
// rule in lib/listingRegion.ts). Pages and client tools import only this file,
// so hidden listings never reach a JS chunk, page or RSC payload.
// lib/data/listings.json stays the untouched source of truth.
//
// Run after changing lib/data/listings.json or the classifier:
//   pnpm data:listings
// Check only (fails when the committed file is stale):
//   pnpm data:listings:check
// The build also fails when the file is stale (guard in lib/listings.ts).
// Uses Node's built-in TypeScript type stripping (Node 22.15+ / 24).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

registerHooks({
	resolve(spec, ctx, next) {
		let s = spec;
		if (s.startsWith("@/")) s = pathToFileURL(join(ROOT, s.slice(2))).href;
		if (
			(s.startsWith(".") || s.startsWith("file:")) &&
			!/\.[mc]?[jt]sx?$/.test(s)
		) {
			const base = s.startsWith("file:")
				? fileURLToPath(s)
				: fileURLToPath(new URL(s, ctx.parentURL));
			for (const ext of [".ts", ".tsx"]) {
				if (existsSync(base + ext))
					return next(pathToFileURL(base + ext).href, ctx);
			}
		}
		return next(s, ctx);
	},
});

const { isVisibleRecord } = await import(
	pathToFileURL(join(ROOT, "lib/listingRegion.ts")).href
);

const SRC = join(ROOT, "lib/data/listings.json");
const OUT = join(ROOT, "lib/data/listings.visible.json");

const all = JSON.parse(readFileSync(SRC, "utf8"));
const visible = all.filter(isVisibleRecord);
const text = `${JSON.stringify(visible, null, 2)}\n`;

if (process.argv.includes("--check")) {
	const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
	if (current !== text) {
		console.error(
			"lib/data/listings.visible.json is stale. Run: pnpm data:listings",
		);
		process.exit(1);
	}
	console.log(
		`listings.visible.json up to date: ${visible.length} of ${all.length} listings visible.`,
	);
} else {
	writeFileSync(OUT, text);
	console.log(
		`Wrote lib/data/listings.visible.json: ${visible.length} of ${all.length} listings visible (${all.length - visible.length} hidden or without coordinates).`,
	);
}
