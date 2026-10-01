import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicHub, topicCounts } from "@/components/templates/TopicHub";
import {
	DAILY_TOPICS,
	hubHref,
	topicBySlug,
	topicShareMetadata,
} from "@/lib/topics";

/**
 * Topic hubs at /{topic}/ for the seven everyday topics. Moving to Cyprus has
 * its own static route (/moving-to-cyprus/). Static segments such as /guides/
 * always win over this dynamic one, and only these seven params are built.
 */
export const dynamicParams = false;

export function generateStaticParams() {
	return DAILY_TOPICS.map((t) => ({ topic: t.slug }));
}

function dailyTopic(slug: string) {
	const t = topicBySlug(slug);
	return t && t.slug !== "moving-here" ? t : undefined;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ topic: string }>;
}): Promise<Metadata> {
	const { topic: slug } = await params;
	const topic = dailyTopic(slug);
	if (!topic) return {};
	const n = topicCounts(topic);
	const title = `${topic.name} in Cyprus`;
	const parts = [
		[n.guides, "guide", "guides"],
		[n.directories, "local directory", "local directories"],
		[n.tools, "tool", "tools"],
	]
		.filter(([count]) => Number(count) > 0)
		.map(([count, one, many]) => `${count} ${count === 1 ? one : many}`);
	const list =
		parts.length > 1
			? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}`
			: (parts[0] ?? "");
	const description = `${topic.description} ${list}.`;
	const url = hubHref(topic);
	return {
		title,
		description,
		alternates: { canonical: url },
		...topicShareMetadata(topic, {
			title,
			description,
			url: `https://realcy.app${url}`,
		}),
	};
}

export default async function TopicPage({
	params,
}: {
	params: Promise<{ topic: string }>;
}) {
	const { topic: slug } = await params;
	const topic = dailyTopic(slug);
	if (!topic) notFound();
	return <TopicHub topic={topic} />;
}
