import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";

export type CardVariant = "icon" | "text" | "photo" | "row";

export type CardProps = {
	variant?: CardVariant;
	title: ReactNode;
	text?: ReactNode;
	/** Whole card becomes one link. Without it the card is a static article. */
	href?: string;
	icon?: IconName;
	/** Small label above the title (text, photo and row variants). */
	eyebrow?: ReactNode;
	/** Top image for `photo`; alt is required ("" when decorative). */
	image?: { src: string; alt: string };
	/** Extra line under the text (city, price, count). */
	meta?: ReactNode;
	/** Actions or contact links. Only rendered when the card has no href. */
	footer?: ReactNode;
	headingLevel?: "h2" | "h3" | "h4";
	className?: string;
};

const BASE =
	"rounded-card border border-line bg-white text-ink shadow-rc transition-colors";
const LINK = "hover:border-primary";

function IconTile({
	name,
	size = "md",
}: {
	name: IconName;
	size?: "sm" | "md";
}) {
	return (
		<span
			className={`flex shrink-0 items-center justify-center bg-sky-strong text-primary ${
				size === "md" ? "h-14 w-14 rounded-2xl" : "h-12 w-12 rounded-field"
			}`}
		>
			<Icon name={name} size={size === "md" ? 28 : 24} />
		</span>
	);
}

/**
 * Card in four variants. With `href` the whole card is a single link with a
 * focus ring and primary hover border; never nest buttons or links inside it.
 */
export function Card({
	variant = "text",
	title,
	text,
	href,
	icon,
	eyebrow,
	image,
	meta,
	footer,
	headingLevel = "h3",
	className = "",
}: CardProps) {
	const H = headingLevel;
	const heading = (
		<H className="text-base font-bold leading-snug text-ink">{title}</H>
	);
	const body = text ? (
		<p className="mt-1 text-base leading-normal text-muted">{text}</p>
	) : null;
	const metaEl = meta ? (
		<div className="mt-2 text-sm text-muted">{meta}</div>
	) : null;
	const eyebrowEl = eyebrow ? <div className="mb-2">{eyebrow}</div> : null;

	let inner: ReactNode;
	let layout: string;
	switch (variant) {
		case "icon":
			layout = "flex flex-col items-start p-5";
			inner = (
				<>
					{icon ? <IconTile name={icon} /> : null}
					<div className={icon ? "mt-4" : undefined}>
						{heading}
						{body}
						{metaEl}
					</div>
				</>
			);
			break;
		case "photo":
			layout = "flex flex-col overflow-hidden";
			inner = (
				<>
					<div className="relative aspect-video w-full shrink-0 bg-sky-strong">
						{image ? (
							<Image
								src={image.src}
								alt={image.alt}
								fill
								loading="lazy"
								sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
								className="object-cover"
							/>
						) : icon ? (
							<span className="absolute inset-0 flex items-center justify-center text-primary">
								<Icon name={icon} size={40} />
							</span>
						) : null}
					</div>
					<div className="flex-1 p-4">
						{eyebrowEl}
						{heading}
						{body}
						{metaEl}
					</div>
				</>
			);
			break;
		case "row":
			layout = "flex min-h-11 items-center gap-4 p-4";
			inner = (
				<>
					{icon ? <IconTile name={icon} size="sm" /> : null}
					<div className="min-w-0 flex-1">
						{eyebrowEl}
						{heading}
						{text ? (
							<p className="text-base leading-snug text-muted">{text}</p>
						) : null}
						{metaEl}
					</div>
				</>
			);
			break;
		default:
			layout = "flex flex-col p-5";
			inner = (
				<>
					{eyebrowEl}
					{heading}
					{body}
					{metaEl}
				</>
			);
	}

	if (href) {
		return (
			<Link
				href={href}
				className={`${BASE} ${LINK} ${layout} h-full w-full ${className}`}
			>
				{inner}
			</Link>
		);
	}
	return (
		<article className={`${BASE} ${layout} h-full w-full ${className}`}>
			{inner}
			{footer ? (
				<div className="mt-auto w-full border-t border-line pt-3 text-sm">
					{footer}
				</div>
			) : null}
		</article>
	);
}

const COLS = {
	1: "grid-cols-1",
	2: "grid-cols-1 sm:grid-cols-2",
	3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
	4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
} as const;

/** Responsive list of cards (1/2/3 columns by default). Renders a `ul`. */
export function CardGrid({
	cols = 3,
	className = "",
	children,
}: {
	cols?: keyof typeof COLS;
	className?: string;
	children: ReactNode;
}) {
	return (
		<ul className={`grid gap-4 ${COLS[cols]} ${className}`}>{children}</ul>
	);
}

/** Grid cell wrapper so cards stretch to equal height. */
export function CardGridItem({ children }: { children: ReactNode }) {
	return <li className="flex">{children}</li>;
}
