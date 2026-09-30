"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { HOME_AREA, HOME_CITIES } from "@/lib/home-content";

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
						<Link
							href={c.href}
							className="flex w-full flex-col overflow-hidden rounded-card border border-line bg-white text-ink transition-colors hover:border-primary"
						>
							<span className="flex aspect-[16/8] items-center justify-center bg-sky text-primary">
								{c.photo ? (
									<Image
										src={c.photo}
										alt={c.photoAlt ?? ""}
										width={320}
										height={180}
										loading="lazy"
										className="h-full w-full object-cover"
									/>
								) : (
									<span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70">
										<Icon name="pin" size={24} />
									</span>
								)}
							</span>
							<span className="flex min-h-11 items-center px-3 py-2 text-base font-bold leading-snug">
								{c.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
