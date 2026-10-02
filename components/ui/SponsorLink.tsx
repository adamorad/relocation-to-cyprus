"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * The outbound link of a live sponsor unit (SponsorSlot). Client only so it
 * can fire the GA4 `sponsor_click` event; everything inside stays server
 * rendered.
 */
export function SponsorLink({
	href,
	spot,
	placement,
	sponsor,
	className,
	children,
}: {
	href: string;
	spot: string;
	placement: string;
	sponsor: string;
	className: string;
	children: ReactNode;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="sponsored noopener noreferrer"
			data-pagefind-ignore
			data-sponsor-spot={spot}
			className={className}
			onClick={() => trackEvent("sponsor_click", { spot, sponsor, placement })}
		>
			{children}
		</a>
	);
}
