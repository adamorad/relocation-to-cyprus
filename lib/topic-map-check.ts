import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { GUIDES } from "./guides";
import { TOOLS } from "./tools-index";
import {
	DIRECTORIES,
	DIRECTORY_TOPICS,
	GUIDE_TOPICS,
	TOOL_TOPICS,
	type TopicAssignment,
	toolSlug,
} from "./topic-map";
import { CITY_SLUGS, TOPIC_SLUGS } from "./topics";

/**
 * Build-time guard (called from app/sitemap.ts, so `pnpm build` fails):
 * every guide, every directory route under app/sections/ and every live tool
 * has exactly one valid primary topic, at most two valid secondary topics,
 * only known city slugs, and no mapping points at an item that does not exist.
 * Server only (reads the app/sections directory).
 */
export function topicMapProblems(): string[] {
	const problems: string[] = [];
	const topics = new Set<string>(TOPIC_SLUGS);
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
			if (!topics.has(a.topic))
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
