import Link from "next/link";
import { EmailCapture } from "./EmailCapture";

type LinkItem = { href: string; title: string; desc?: string };

/**
 * "Next steps" block for otherwise dead-end pages (listings, regions):
 * curated related guides + tool chips + an email capture. Server component
 * that renders the client-side EmailCapture inline.
 */
export function RelatedContent({
	heading,
	blurb,
	guides,
	tools,
	emailSource,
	emailRegion,
}: {
	heading: string;
	blurb?: string;
	guides: LinkItem[];
	tools?: LinkItem[];
	emailSource: string;
	emailRegion?: string;
}) {
	return (
		<section className="mt-12 border-t border-line pt-8">
			<h2 className="text-xl font-bold text-ink mb-1">{heading}</h2>
			{blurb ? <p className="text-sm text-muted mb-5">{blurb}</p> : null}
			<div className="grid gap-3 sm:grid-cols-2">
				{guides.map((g) => (
					<Link
						key={g.href}
						href={g.href}
						className="block rounded-2xl border border-line bg-white p-4 hover:border-primary hover:shadow-rc transition-all"
					>
						<div className="font-semibold text-sm text-ink">{g.title}</div>
						{g.desc ? (
							<div className="text-xs text-muted mt-0.5">{g.desc}</div>
						) : null}
					</Link>
				))}
			</div>
			{tools && tools.length > 0 ? (
				<div className="mt-4 flex flex-wrap gap-2">
					{tools.map((t) => (
						<Link
							key={t.href}
							href={t.href}
							className="inline-flex items-center gap-1 rounded-full border border-line bg-sky px-3 py-1.5 text-xs font-medium text-ink hover:border-primary hover:bg-sky-strong transition-colors"
						>
							{t.title} →
						</Link>
					))}
				</div>
			) : null}
			<div className="mt-8">
				<EmailCapture source={emailSource} region={emailRegion} />
			</div>
		</section>
	);
}
