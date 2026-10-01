import Image from "next/image";

export type Sponsor = {
	/** "featured" renders "Featured"; "sponsored" renders "Sponsored by {name}". */
	kind: "featured" | "sponsored";
	name: string;
	href: string;
	text?: string;
	logo?: { src: string; alt: string };
};

/** Native sponsor unit sold on /advertise/. Renders nothing without data. */
export function SponsorSlot({ sponsor }: { sponsor?: Sponsor | null }) {
	if (!sponsor) return null;
	const label =
		sponsor.kind === "featured" ? "Featured" : `Sponsored by ${sponsor.name}`;
	return (
		<a
			href={sponsor.href}
			target="_blank"
			rel="sponsored noopener noreferrer"
			data-pagefind-ignore
			className="flex items-center gap-4 rounded-card border border-line bg-white p-4 text-ink shadow-rc transition-colors hover:border-primary"
		>
			{sponsor.logo ? (
				<Image
					src={sponsor.logo.src}
					alt={sponsor.logo.alt}
					width={48}
					height={48}
					className="h-12 w-12 shrink-0 rounded-field object-contain"
				/>
			) : null}
			<span className="min-w-0">
				<span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
					{label}
				</span>
				<span className="mt-1 block text-base font-bold">{sponsor.name}</span>
				{sponsor.text ? (
					<span className="block text-base leading-snug text-muted">
						{sponsor.text}
					</span>
				) : null}
			</span>
		</a>
	);
}
