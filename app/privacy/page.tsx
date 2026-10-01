import type { Metadata } from "next";
import { TemplateMain } from "@/components/templates/TemplateMain";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "How RealCy.app collects and uses your data.",
	alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
	return (
		<TemplateMain>
			<PageHeader
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Privacy Policy" },
				]}
				eyebrow="Legal"
				title="Privacy Policy"
				meta="Last updated: May 2026"
				width="reading"
			/>
			<Container width="reading" className="pt-8">
				<section className="mt-10 prose prose-slate max-w-none text-sm leading-relaxed space-y-8">
					<div>
						<h2 className="text-lg font-bold text-ink mb-2">1. Who we are</h2>
						<p className="text-slate-700">
							RealCy.app is an independent Cyprus relocation portal. We are not
							affiliated with any real-estate agency, law firm, or government
							body. For privacy questions, contact us at{" "}
							<a
								href="mailto:privacy@realcy.app"
								className="text-primary hover:text-primary-hover underline"
							>
								privacy@realcy.app
							</a>
							.
						</p>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">
							2. Data we collect
						</h2>
						<p className="text-slate-700 mb-3">
							We collect data only when you give consent via the cookie banner.
						</p>
						<ul className="list-disc pl-5 space-y-2 text-slate-700">
							<li>
								<strong>Analytics (Google Analytics 4):</strong> Anonymised
								pageview data: pages visited, session duration, country-level
								location, device type. IP addresses are anonymised before
								processing. We do not use GA4 for advertising or cross-site
								tracking.
							</li>
							<li>
								<strong>Conversion events (Meta Pixel):</strong> If you consent,
								a Meta Pixel fires on page load and on key interactions (e.g.
								viewing a guide or listing). This may link your visit to a Meta
								(Facebook/Instagram) account if you are logged in. We use this
								to measure the reach of our content.
							</li>
							<li>
								<strong>Contact form submissions:</strong> If you contact us, we
								store the message and email address you provide. We do not share
								this with third parties.
							</li>
						</ul>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">
							3. Cookies and local storage
						</h2>
						<p className="text-slate-700 mb-3">We use the following storage:</p>
						<div className="overflow-x-auto">
							<table className="w-full text-xs border-collapse">
								<thead>
									<tr className="border-b border-slate-200">
										<th className="text-left py-2 pr-4 font-semibold text-slate-700">
											Key
										</th>
										<th className="text-left py-2 pr-4 font-semibold text-slate-700">
											Type
										</th>
										<th className="text-left py-2 font-semibold text-slate-700">
											Purpose
										</th>
									</tr>
								</thead>
								<tbody className="text-slate-600">
									<tr className="border-b border-slate-100">
										<td className="py-2 pr-4 font-mono">realcy_consent</td>
										<td className="py-2 pr-4">localStorage</td>
										<td className="py-2">
											Stores your cookie consent decision (accepted/declined).
											Never expires until you clear browser storage.
										</td>
									</tr>
									<tr className="border-b border-slate-100">
										<td className="py-2 pr-4 font-mono">_ga, _ga_*</td>
										<td className="py-2 pr-4">Cookie (GA4)</td>
										<td className="py-2">
											Set by Google Analytics. Only created if you accept
											cookies. 2-year expiry.
										</td>
									</tr>
									<tr>
										<td className="py-2 pr-4 font-mono">_fbp</td>
										<td className="py-2 pr-4">Cookie (Meta)</td>
										<td className="py-2">
											Set by Meta Pixel. Only created if you accept cookies.
											90-day expiry.
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">
							4. Legal basis (GDPR)
						</h2>
						<p className="text-slate-700">
							We process analytics data under <strong>consent</strong> (Article
							6(1)(a) GDPR). You may withdraw consent at any time. We do not
							process data under legitimate interest for tracking purposes.
						</p>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">
							5. How to withdraw consent
						</h2>
						<p className="text-slate-700 mb-3">
							To withdraw consent and stop analytics cookies from being set:
						</p>
						<ol className="list-decimal pl-5 space-y-1 text-slate-700">
							<li>
								Open your browser&apos;s developer tools (F12 → Application →
								Local Storage → realcy.app)
							</li>
							<li>
								Delete the{" "}
								<code className="font-mono bg-slate-100 px-1 rounded">
									realcy_consent
								</code>{" "}
								key
							</li>
							<li>
								Reload the page: the cookie banner will reappear and you can
								choose Decline
							</li>
						</ol>
						<p className="text-slate-700 mt-3">
							Alternatively, clear all cookies and site data for realcy.app in
							your browser settings.
						</p>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">
							6. Third-party services
						</h2>
						<ul className="list-disc pl-5 space-y-2 text-slate-700">
							<li>
								<strong>Google Analytics 4</strong>: operated by Google LLC.
								Data may be processed in the US under Standard Contractual
								Clauses.{" "}
								<a
									href="https://policies.google.com/privacy"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									Google Privacy Policy
								</a>
							</li>
							<li>
								<strong>Meta Pixel</strong>: operated by Meta Platforms, Inc.
								Data may be processed in the US under Standard Contractual
								Clauses.{" "}
								<a
									href="https://www.facebook.com/privacy/policy/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline"
								>
									Meta Privacy Policy
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">7. Your rights</h2>
						<p className="text-slate-700">
							Under GDPR you have the right to access, rectify, erase, restrict,
							and port your personal data, and to object to processing. To
							exercise any of these rights, email{" "}
							<a
								href="mailto:privacy@realcy.app"
								className="text-primary hover:text-primary-hover underline"
							>
								privacy@realcy.app
							</a>
							. We will respond within 30 days.
						</p>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">
							8. Data retention
						</h2>
						<p className="text-slate-700">
							GA4 analytics data is retained for 14 months (Google default
							setting). Contact form messages are retained for as long as
							necessary to resolve the enquiry, then deleted.
						</p>
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink mb-2">
							9. Changes to this policy
						</h2>
						<p className="text-slate-700">
							We will update the "Last updated" date at the top of this page
							when material changes are made. Continued use of the site after
							changes constitutes acceptance of the updated policy.
						</p>
					</div>
				</section>
			</Container>
		</TemplateMain>
	);
}
