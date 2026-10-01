import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NEW_PATH = "/guides/gesy-registration-guide/";
export const metadata = {
	title: "Moved",
	robots: { index: false, follow: true },
	alternates: { canonical: `https://realcy.app${NEW_PATH}` },
};
export default function MovedPage() {
	return (
		<>
			<meta httpEquiv="refresh" content={`0; url=${NEW_PATH}`} />
			<main id="main">
				<Container width="reading" className="py-16 text-center">
					<p className="text-muted">
						This has moved to our GeSY guide.{" "}
						<Link
							href={NEW_PATH}
							className="text-primary font-semibold underline"
						>
							Read the guide
						</Link>
					</p>
				</Container>
			</main>
		</>
	);
}
