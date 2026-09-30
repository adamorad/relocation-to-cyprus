import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { HOME_TOPICS, HOME_TOPICS_HEADING } from "@/lib/home-content";

export function TopicGrid() {
	return (
		<section
			aria-labelledby="topics-title"
			className="mx-auto max-w-[1280px] px-5 pt-8 md:px-8"
		>
			<h2
				id="topics-title"
				className="mb-5 text-[clamp(26px,2.4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink"
			>
				{HOME_TOPICS_HEADING}
			</h2>
			<ul className="grid grid-cols-2 gap-3 max-[359px]:grid-cols-1 md:grid-cols-3 desk:grid-cols-6">
				{HOME_TOPICS.map((t) => (
					<li key={t.id} className="flex">
						<Link
							href={t.href}
							className="flex w-full flex-col items-center rounded-card border border-line bg-white px-3 py-5 text-center text-ink shadow-rc transition-colors hover:border-primary"
						>
							<span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-strong text-primary">
								<Icon name={t.icon} size={30} />
							</span>
							<span className="mt-3 text-base font-bold leading-snug">
								{t.title}
							</span>
							<span className="mt-1 text-base leading-snug text-muted">
								{t.description}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
