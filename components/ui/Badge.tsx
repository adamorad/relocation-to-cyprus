import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "success" | "warning" | "danger";

const TONE: Record<BadgeTone, string> = {
	neutral: "bg-sky-strong text-ink",
	success: "bg-emerald-50 text-emerald-900 ring-1 ring-inset ring-emerald-200",
	warning: "bg-amber-50 text-amber-900 ring-1 ring-inset ring-amber-200",
	danger: "bg-red-50 text-red-800 ring-1 ring-inset ring-red-200",
};

/** Small label. Use semantic tones only for real good/bad states. */
export function Badge({
	tone = "neutral",
	className = "",
	children,
}: {
	tone?: BadgeTone;
	className?: string;
	children: ReactNode;
}) {
	return (
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE[tone]} ${className}`}
		>
			{children}
		</span>
	);
}
