import type { ReactNode, SVGProps } from "react";

/** Kit icon set (24px grid, 1.7 stroke, currentColor). Decorative by default. */
const PATHS = {
	budget: (
		<>
			<rect x="5" y="2" width="14" height="20" rx="2" />
			<path d="M8 6h8M8 10h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2" />
		</>
	),
	chevronDown: (
		<>
			<path d="m6 9 6 6 6-6" />
		</>
	),
	building: (
		<>
			<path d="M4 21V5l8-3v19M12 8h8v13M2 21h20M7 8h2m-2 4h2m-2 4h2m6-4h2m-2 4h2" />
		</>
	),
	checklist: (
		<>
			<rect x="4" y="4" width="16" height="18" rx="2" />
			<rect x="8" y="2" width="8" height="4" rx="1" />
			<path d="m8 11 2 2 5-5m-7 9h8" />
		</>
	),
	close: (
		<>
			<path d="m6 6 12 12M6 18 18 6" />
		</>
	),
	community: (
		<>
			<circle cx="12" cy="7" r="3" />
			<path d="M6 21v-3a6 6 0 0 1 12 0v3M4 5a3 3 0 0 0 0 6M20 5a3 3 0 0 1 0 6M2 20v-3a4 4 0 0 1 3-4M22 20v-3a4 4 0 0 0-3-4" />
		</>
	),
	healthcare: (
		<>
			<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z" />
		</>
	),
	heart: (
		<>
			<path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 7l-1.1-1.2a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
		</>
	),
	home: (
		<>
			<path d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9" />
		</>
	),
	info: (
		<>
			<circle cx="12" cy="12" r="9" />
			<path d="M12 11v6M12 7.5h.01" />
		</>
	),
	legal: (
		<>
			<path d="M12 3v18M5 21h14M4 7h16M7 7l-3 7a3 3 0 0 0 6 0Zm10 0-3 7a3 3 0 0 0 6 0Z" />
		</>
	),
	map: (
		<>
			<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2ZM9 3v16M15 5v16" />
		</>
	),
	menu: (
		<>
			<path d="M4 6h16M4 12h16M4 18h16" />
		</>
	),
	paperwork: (
		<>
			<path d="M6 2h8l4 4v16H6ZM14 2v5h4M9 11h6M9 15h6M9 19h4" />
		</>
	),
	phone: (
		<>
			<path d="m7 3 3 5-2 2a14 14 0 0 0 6 6l2-2 5 3-1 4C10 22 2 14 3 4Z" />
		</>
	),
	pin: (
		<>
			<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
			<circle cx="12" cy="10" r="2.5" />
		</>
	),
	school: (
		<>
			<path d="m2 9 10-5 10 5-10 5Z" />
			<path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6" />
		</>
	),
	search: (
		<>
			<circle cx="10" cy="10" r="7" />
			<path d="m15 15 6 6" />
		</>
	),
	shopping: (
		<>
			<path d="M4 8h16l-2 13H6ZM8 8V6a4 4 0 0 1 8 0v2M9 12v5m6-5v5" />
		</>
	),
	warning: (
		<>
			<path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
			<path d="M12 9v4M12 17h.01" />
		</>
	),
	suitcase: (
		<>
			<rect x="3" y="7" width="18" height="13" rx="2" />
			<path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18M10 13v2h4v-2" />
		</>
	),
	transport: (
		<>
			<rect x="4" y="3" width="16" height="15" rx="3" />
			<path d="M4 10h16M7 18v3m10-3v3M8 14h.01M16 14h.01" />
		</>
	),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

export function Icon({
	name,
	size = 24,
	...rest
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			{...rest}
		>
			{PATHS[name]}
		</svg>
	);
}
