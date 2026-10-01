import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";

export type CalloutTone = "info" | "warning" | "legal";

const TONE: Record<
	CalloutTone,
	{ box: string; icon: IconName; iconColor: string }
> = {
	info: {
		box: "border-line bg-sky text-ink text-base",
		icon: "info",
		iconColor: "text-primary-hover",
	},
	warning: {
		box: "border-amber-200 bg-amber-50 text-amber-900 text-base",
		icon: "warning",
		iconColor: "text-amber-800",
	},
	legal: {
		box: "border-line bg-sky-strong text-ink text-sm",
		icon: "legal",
		iconColor: "text-ink",
	},
};

/** Boxed note with an icon. `legal` is the small-print disclaimer style. */
export function Callout({
	tone = "info",
	title,
	className = "",
	children,
}: {
	tone?: CalloutTone;
	title?: ReactNode;
	className?: string;
	children: ReactNode;
}) {
	const t = TONE[tone];
	return (
		<aside
			className={`flex gap-3 rounded-card border p-4 leading-relaxed ${t.box} ${className}`}
		>
			<Icon
				name={t.icon}
				size={20}
				className={`mt-0.5 shrink-0 ${t.iconColor}`}
			/>
			<div className="min-w-0">
				{title ? <p className="mb-1 font-semibold">{title}</p> : null}
				<div>{children}</div>
			</div>
		</aside>
	);
}
