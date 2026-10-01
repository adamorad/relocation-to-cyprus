import { EmailCapture } from "@/components/EmailCapture";

/**
 * The single newsletter/lead form design (logic lives in EmailCapture).
 * Rule: one email form per page. The footer form is always present, so only
 * place an EmailBox on a page that opts in (e.g. ArticleTemplate `showInlineEmail`).
 */
export function EmailBox({
	source,
	region,
	className = "",
}: {
	/** Analytics source label, e.g. "guide". */
	source: string;
	region?: string;
	className?: string;
}) {
	return (
		<section
			aria-label="Email sign-up"
			data-pagefind-ignore
			className={`rounded-panel border border-line bg-sky-strong p-5 md:p-6 ${className}`}
		>
			<EmailCapture source={source} region={region} />
		</section>
	);
}
