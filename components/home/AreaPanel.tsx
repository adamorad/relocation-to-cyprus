import { Card } from "@/components/ui/Card";
import { HOME_AREA, HOME_CITIES } from "@/lib/home-content";

/**
 * 800w city scene for a /regions/{slug}/ href. Same files as REGIONS[].image.
 */
const cityCardImage = (href: string) =>
	`/images/cities/${href.split("/").filter(Boolean).pop()}-800.webp`;

export function AreaPanel() {
	return (
		<section
			aria-labelledby="area-title"
			className="rounded-panel bg-sky-strong p-5 md:p-6 desk:h-full"
		>
			<h2
				id="area-title"
				className="text-[clamp(26px,2.4vw,32px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink"
			>
				{HOME_AREA.heading}
			</h2>
			<p className="mt-3 text-base leading-normal text-muted">
				{HOME_AREA.subtitle}
			</p>
			<ul className="mt-4 grid grid-cols-2 gap-3">
				{HOME_CITIES.map((c) => (
					<li key={c.href} className="flex">
						<Card
							variant="photo"
							href={c.href}
							title={c.name}
							// The card title names the city, so the scene is decorative here.
							image={{ src: c.photo ?? cityCardImage(c.href), alt: "" }}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
