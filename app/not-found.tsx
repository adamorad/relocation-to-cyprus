import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false },
};

export default function NotFound() {
	return (
		<main id="main" className="max-w-3xl mx-auto px-6 py-16 md:py-24">
			<p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
				404
			</p>
			<h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-ink">
				This page could not be found.
			</h1>
			<p className="mt-4 text-lg text-slate-700 leading-relaxed">
				The link may be out of date. Try the{" "}
				<Link href="/" className="underline hover:text-ink">
					home page
				</Link>{" "}
				or{" "}
				<Link href="/explore/" className="underline hover:text-ink">
					search the site
				</Link>
				.
			</p>
		</main>
	);
}
