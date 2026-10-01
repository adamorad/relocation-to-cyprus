import type { Metadata } from "next";
import Link from "next/link";
import { TopicHub } from "@/components/templates/TopicHub";
import { topicBySlug, topicShareMetadata } from "@/lib/topics";

const title = "Moving to Cyprus: Visas, Tax and Property Guides";
const description =
	"Guides for planning a move to Cyprus: visas and residency, tax, buying property and setting up a business.";

// biome-ignore lint/style/noNonNullAssertion: the topic is defined in lib/topics.ts
const TOPIC = topicBySlug("moving-here")!;

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical: "/moving-to-cyprus/" },
	...topicShareMetadata(TOPIC, {
		title,
		description,
		url: "https://realcy.app/moving-to-cyprus/",
	}),
};

/** The Moving to Cyprus topic hub (keeps its original URL). */
export default function MovingToCyprusPage() {
	return (
		<TopicHub
			topic={TOPIC}
			intro={
				<>
					Planning a move? Start with residency and tax, then property and
					business. Already here? See the everyday topics on the{" "}
					<Link
						href="/"
						className="text-primary-hover underline hover:text-ink"
					>
						homepage
					</Link>
					.
				</>
			}
		/>
	);
}
