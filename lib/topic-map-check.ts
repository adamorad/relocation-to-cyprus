import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { GUIDES } from "./guides";
import { PROPERTY_ITEMS } from "./property";
import { TOOLS } from "./tools-index";
import {
	DIRECTORIES,
	DIRECTORY_TOPICS,
	GUIDE_TOPICS,
	TOOL_TOPICS,
	type TopicAssignment,
	toolSlug,
} from "./topic-map";
import { CITY_SLUGS, PROPERTY_SLUG, TOPIC_SLUGS } from "./topics";

/**
 * Build-time guard (called from app/sitemap.ts, so `pnpm build` fails):
 * every guide, every directory route under app/sections/ and every live tool
 * has exactly one valid primary topic, at most two valid secondary topics,
 * only known city slugs, and no mapping points at an item that does not exist.
 * The Property area ("property") is a valid primary but never a secondary,
 * and the items mapped to it must be exactly the ones in lib/property.ts
 * (PROPERTY_ITEMS), each of which must exist.
 * Server only (reads the app/sections directory).
 */
export function topicMapProblems(): string[] {
	const problems: string[] = [];
	const topics = new Set<string>(TOPIC_SLUGS);
	const primaries = new Set<string>([...TOPIC_SLUGS, PROPERTY_SLUG]);
	const cities = new Set<string>(CITY_SLUGS);

	const sectionsDir = join(process.cwd(), "app", "sections");
	const sectionRoutes = readdirSync(sectionsDir, { withFileTypes: true })
		.filter(
			(d) =>
				d.isDirectory() && existsSync(join(sectionsDir, d.name, "page.tsx")),
		)
		.map((d) => d.name);

	const sets: Array<[string, string[], Record<string, TopicAssignment>]> = [
		["guide", GUIDES.map((g) => g.slug), GUIDE_TOPICS],
		["directory", sectionRoutes, DIRECTORY_TOPICS],
		["tool", TOOLS.map((t) => toolSlug(t.href)), TOOL_TOPICS],
	];

	for (const [type, slugs, map] of sets) {
		const known = new Set(slugs);
		for (const slug of slugs) {
			const a = map[slug];
			if (!a) {
				problems.push(`${type} "${slug}" has no topic`);
				continue;
			}
			if (!primaries.has(a.topic))
				problems.push(`${type} "${slug}": unknown topic "${a.topic}"`);
			const also = a.also ?? [];
			if (also.length > 2)
				problems.push(`${type} "${slug}": more than 2 secondary topics`);
			for (const t of also) {
				if (!topics.has(t))
					problems.push(`${type} "${slug}": unknown secondary topic "${t}"`);
				if (t === a.topic)
					problems.push(`${type} "${slug}": secondary repeats primary`);
			}
			for (const c of a.cities ?? [])
				if (!cities.has(c))
					problems.push(`${type} "${slug}": unknown city "${c}"`);
		}
		for (const slug of Object.keys(map))
			if (!known.has(slug))
				problems.push(`${type} mapping "${slug}" matches no ${type}`);
	}

	// Property area: PROPERTY_ITEMS and the "property" mappings must agree.
	const known: Record<string, Set<string>> = {
		guide: new Set(sets[0][1]),
		directory: new Set(sets[1][1]),
		tool: new Set(sets[2][1]),
	};
	const maps: Record<string, Record<string, TopicAssignment>> = {
		guide: GUIDE_TOPICS,
		directory: DIRECTORY_TOPICS,
		tool: TOOL_TOPICS,
	};
	const listed = new Set<string>();
	for (const p of PROPERTY_ITEMS) {
		const key = `${p.type}:${p.slug}`;
		if (listed.has(key))
			problems.push(`PROPERTY_ITEMS lists ${p.type} "${p.slug}" twice`);
		listed.add(key);
		if (!known[p.type].has(p.slug))
			problems.push(
				`PROPERTY_ITEMS ${p.type} "${p.slug}" matches no ${p.type} (lib/property.ts)`,
			);
		else if (maps[p.type][p.slug]?.topic !== PROPERTY_SLUG)
			problems.push(
				`PROPERTY_ITEMS ${p.type} "${p.slug}" is not mapped to topic "property"`,
			);
	}
	for (const [type, map] of Object.entries(maps))
		for (const [slug, a] of Object.entries(map))
			if (a.topic === PROPERTY_SLUG && !listed.has(`${type}:${slug}`))
				problems.push(
					`${type} "${slug}" is mapped to "property" but missing from PROPERTY_ITEMS (lib/property.ts)`,
				);

	const dirSlugs = new Set(DIRECTORIES.map((d) => d.slug));
	for (const r of sectionRoutes)
		if (!dirSlugs.has(r))
			problems.push(`directory route "${r}" missing from DIRECTORIES`);

	return problems;
}

export function assertTopicMapComplete(): void {
	const problems = topicMapProblems();
	if (problems.length > 0) {
		throw new Error(
			`Topic mapping incomplete (lib/topic-map.ts):\n  ${problems.join("\n  ")}`,
		);
	}
}
