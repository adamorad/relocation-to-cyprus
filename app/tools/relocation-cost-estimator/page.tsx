import Link from "next/link";

const NEW_PATH = "/tools/relocation-cost-calculator/";

export const metadata = {
	title: "Moved",
	robots: { index: false, follow: true },
	alternates: { canonical: `https://realcy.app${NEW_PATH}` },
};

export default function MovedPage() {
	return (
		<>
			<meta httpEquiv="refresh" content={`0; url=${NEW_PATH}`} />
			<main id="main" className="max-w-xl mx-auto px-6 py-16 text-center">
				<p className="text-slate-700">
					This tool has moved.{" "}
					<Link
						href={NEW_PATH}
						className="text-[#35cdc4] font-semibold underline"
					>
						Continue to the new page →
					</Link>
				</p>
			</main>
		</>
	);
}
