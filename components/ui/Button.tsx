import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

const VARIANT: Record<ButtonVariant, string> = {
	primary: "bg-primary text-white hover:bg-primary-hover",
	secondary:
		"border border-line bg-white text-ink hover:border-primary hover:bg-sky",
	ghost: "text-primary-hover hover:bg-sky",
};
const SIZE: Record<ButtonSize, string> = {
	md: "min-h-11 px-4 text-sm",
	lg: "min-h-12 px-6 text-base",
};

export function buttonClasses({
	variant = "primary",
	size = "md",
	fullWidth = false,
}: {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
} = {}) {
	return `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT[variant]} ${SIZE[size]} ${fullWidth ? "w-full" : ""}`;
}

type Common = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	children: ReactNode;
};

export function Button({
	variant,
	size,
	fullWidth,
	className = "",
	type = "button",
	children,
	...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type={type}
			className={`${buttonClasses({ variant, size, fullWidth })} ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
}

/** Link styled as a button. External URLs open in a new tab. */
export function ButtonLink({
	href,
	variant,
	size,
	fullWidth,
	className = "",
	children,
}: Common & { href: string; className?: string }) {
	const cls = `${buttonClasses({ variant, size, fullWidth })} ${className}`;
	if (/^https?:\/\//.test(href)) {
		return (
			<a href={href} className={cls} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		);
	}
	return (
		<Link href={href} className={cls}>
			{children}
		</Link>
	);
}
