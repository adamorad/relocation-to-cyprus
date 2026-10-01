import type { ElementType, ReactNode } from "react";

export type ContainerWidth = "reading" | "wide";

const WIDTH: Record<ContainerWidth, string> = {
	reading: "max-w-3xl",
	wide: "max-w-[1200px]",
};

/** The only two page widths: `reading` (about 720px) and `wide` (1200px). */
export function Container({
	width = "wide",
	as: Tag = "div",
	className = "",
	children,
}: {
	width?: ContainerWidth;
	as?: ElementType;
	className?: string;
	children: ReactNode;
}) {
	return (
		<Tag className={`mx-auto w-full px-5 md:px-6 ${WIDTH[width]} ${className}`}>
			{children}
		</Tag>
	);
}
