"use client";

import type { ReactNode } from "react";

/** Filter chip: one selected style site-wide, 44px tall, `aria-pressed`. */
export function Chip({
	selected = false,
	onClick,
	count,
	children,
}: {
	selected?: boolean;
	onClick?: () => void;
	/** Optional count shown after the label, e.g. "Tax (12)". */
	count?: number;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={selected}
			className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors ${
				selected
					? "border-primary bg-primary text-white hover:bg-primary-hover"
					: "border-line bg-white text-ink hover:bg-sky"
			}`}
		>
			{children}
			{count !== undefined ? (
				<span
					className={`ml-1.5 font-medium ${selected ? "text-white" : "text-muted"}`}
				>
					({count})
				</span>
			) : null}
		</button>
	);
}

export type ChipOption<T extends string> = {
	value: T;
	label: ReactNode;
	count?: number;
};

/**
 * Single-select group of filter chips with a visible label. Pass `value` and
 * `onChange`; the group is a labelled `role="group"`.
 */
export function ChipGroup<T extends string>({
	label,
	options,
	value,
	onChange,
	hideLabel = false,
}: {
	label: string;
	options: ChipOption<T>[];
	value: T;
	onChange: (value: T) => void;
	hideLabel?: boolean;
}) {
	return (
		<fieldset className="min-w-0">
			<legend
				className={
					hideLabel ? "sr-only" : "mb-2 text-sm font-semibold text-ink"
				}
			>
				{label}
			</legend>
			<div className="flex flex-wrap gap-2">
				{options.map((o) => (
					<Chip
						key={o.value}
						selected={o.value === value}
						onClick={() => onChange(o.value)}
						count={o.count}
					>
						{o.label}
					</Chip>
				))}
			</div>
		</fieldset>
	);
}
