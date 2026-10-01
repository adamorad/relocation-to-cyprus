"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { HOME_AREA, HOME_CITIES } from "@/lib/home-content";

/**
 * 800w city scene for a /regions/{slug}/ href. Same files as REGIONS[].image
 * (lib/regions.ts is too large to import into this client component).
 */
const cityCardImage = (href: string) =>
	`/images/cities/${href.split("/").filter(Boolean).pop()}-800.webp`;

export function AreaPanel() {
	const router = useRouter();
	const [city, setCity] = useState("");
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
			<form
				className="mt-4 flex gap-2"
				onSubmit={(e) => {
					e.preventDefault();
					if (city) router.push(city);
				}}
			>
				<label htmlFor="home-city" className="sr-only">
					{HOME_AREA.selectLabel}
				</label>
				<select
					id="home-city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className="h-12 min-w-0 flex-1 rounded-field border border-line bg-white px-3 text-base text-ink"
				>
					<option value="" disabled>
						{HOME_AREA.selectLabel}
					</option>
					{HOME_CITIES.map((c) => (
						<option key={c.href} value={c.href}>
							{c.name}
						</option>
					))}
				</select>
				<button
					type="submit"
					disabled={!city}
					className="h-12 min-w-[56px] rounded-field bg-primary px-5 text-base font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
				>
					Go
				</button>
			</form>
			<ul className="mt-3 grid grid-cols-2 gap-3">
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
