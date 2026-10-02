import Image from "next/image";
import { SponsorLink } from "./SponsorLink";

export type SponsorUnit = {
	/** Label above the name: "featured" reads "Featured", "sponsored" reads "Sponsored by". */
	kind: "featured" | "sponsored";
	name: string;
	href: string;
	text?: string;
	logo?: { src: string; alt: string };
};

/** Where a unit sits; sent as `spot` with the GA4 `sponsor_click` event. */
export type SponsorSpot = "directory" | "guide" | "topic";

const BASE =
	"flex items-center gap-4 rounded-card bg-white p-4 text-ink shadow-rc";
/** Featured directory unit reads as a highlighted entry. */
const KIND_CLASS: Record<SponsorUnit["kind"], string> = {
	featured: "border-2 border-primary",
	sponsored: "border border-line",
};

/**
 * Native sponsor unit sold on /advertise/ (data: lib/sponsors.ts). Renders
 * nothing without data. `preview` renders the same unit as a non-link
 * mock-up (used on /advertise/ to show what buyers get).
 */
export function SponsorSlot({
	sponsor,
	spot,
	placement = "",
	preview = false,
	className = "",
}: {
	sponsor?: SponsorUnit | null;
	spot: SponsorSpot;
	/** The page's slug (directory, guide or topic), sent with the click event. */
	placement?: string;
	preview?: boolean;
	className?: string;
}) {
	if (!sponsor) return null;
	const label = sponsor.kind === "featured" ? "Featured" : "Sponsored by";
	const cls = `${BASE} ${KIND_CLASS[sponsor.kind]} ${className}`;
	if (preview) {
		return (
			<div data-pagefind-ignore className={cls}>
				<SlotBody sponsor={sponsor} label={label} />
			</div>
		);
	}
	return (
		<SponsorLink
			href={sponsor.href}
			spot={spot}
			placement={placement}
			sponsor={sponsor.name}
			className={`${cls} transition-colors hover:bg-sky`}
		>
			<SlotBody sponsor={sponsor} label={label} />
		</SponsorLink>
	);
}

function SlotBody({ sponsor, label }: { sponsor: SponsorUnit; label: string }) {
	return (
		<>
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
				<span
					className={`block text-xs font-semibold uppercase tracking-[0.2em] ${sponsor.kind === "featured" ? "text-primary-hover" : "text-muted"}`}
				>
					{label}
				</span>
				<span className="mt-1 block text-base font-bold">{sponsor.name}</span>
				{sponsor.text ? (
					<span className="block text-base leading-snug text-muted">
						{sponsor.text}
					</span>
				) : null}
			</span>
		</>
	);
}
