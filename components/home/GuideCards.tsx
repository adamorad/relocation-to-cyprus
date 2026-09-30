import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { GUIDES } from "@/lib/guides";
import {
	HOME_GUIDE_SLUGS,
	HOME_GUIDES_HEADING,
	HOME_GUIDES_SUBTITLE,
} from "@/lib/home-content";

export function GuideCards() {
	const items = HOME_GUIDE_SLUGS.flatMap((cfg) => {
		const g = GUIDES.find((x) => x.slug === cfg.slug);
		return g ? [{ cfg, g }] : [];
	});
	return (
		<section aria-labelledby="guides-title" className="flex flex-col">
			<h2
				id="guides-title"
				className="text-[clamp(26px,2.4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink"
			>
				{HOME_GUIDES_HEADING}
			</h2>
			<p className="mb-5 mt-3 text-base leading-normal text-muted">
				{HOME_GUIDES_SUBTITLE}
			</p>
			<ul className="grid gap-4 md:grid-cols-3 desk:flex-1">
				{items.map(({ cfg, g }) => (
					<li key={g.slug} className="flex">
						<Link
							href={`/guides/${g.slug}/`}
							className="grid w-full grid-cols-[88px_minmax(0,1fr)] overflow-hidden rounded-card border border-line bg-white text-ink shadow-rc transition-colors hover:border-primary md:flex md:flex-col"
						>
							<div className="flex h-full min-h-[104px] items-center justify-center bg-sky-strong text-primary md:h-[164px] md:min-h-0 md:shrink-0 desk:h-[176px]">
								{cfg.photo ? (
									<Image
										src={cfg.photo}
										alt=""
										width={640}
										height={360}
										loading="lazy"
										className="h-full w-full object-cover"
									/>
								) : (
									<span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 shadow-rc md:h-16 md:w-16">
										<Icon name={cfg.icon} size={34} />
									</span>
								)}
							</div>
							<div className="min-w-0 p-3.5 md:flex-1 md:p-4">
								<h3 className="text-base font-bold leading-snug">{g.title}</h3>
								<p className="mt-1 line-clamp-2 text-base leading-normal text-muted md:line-clamp-3 md:leading-snug">
									{g.description}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
