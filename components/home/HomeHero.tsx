import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { HOME_HERO } from "@/lib/home-content";

export function HomeHero() {
	return (
		<section
			aria-labelledby="home-title"
			className="relative isolate overflow-hidden bg-sky"
		>
			<div className="mx-auto max-w-[1280px] px-5 md:px-8">
				<div className="relative z-10 pb-4 pt-6 min-[1100px]:w-[56%] min-[1100px]:pb-12 min-[1100px]:pt-12">
					<h1
						id="home-title"
						className="max-w-[760px] text-balance text-[clamp(34px,9vw,40px)] font-extrabold leading-[1.12] tracking-[-0.035em] text-ink md:text-[clamp(40px,5vw,52px)] min-[1100px]:text-[clamp(52px,4.6vw,64px)] min-[1100px]:leading-[1.05]"
					>
						{HOME_HERO.headline}
					</h1>
					<p className="mt-3 text-lg leading-normal text-ink md:text-xl min-[1100px]:text-2xl">
						{HOME_HERO.subtitle}
					</p>
					<search className="mt-6 block">
						<form
							action="/explore/"
							method="get"
							className="flex flex-col gap-2 rounded-card bg-white p-2.5 shadow-rc min-[480px]:flex-row"
						>
							<label htmlFor="home-search" className="sr-only">
								{HOME_HERO.searchLabel}
							</label>
							<div className="relative min-w-0 flex-1">
								<Icon
									name="search"
									size={22}
									className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
								/>
								<input
									id="home-search"
									name="q"
									type="search"
									required
									minLength={2}
									autoComplete="off"
									placeholder={HOME_HERO.searchPlaceholder}
									className="h-12 w-full min-w-0 rounded-field border border-line bg-white pl-11 pr-3 text-base text-ink placeholder:text-muted"
								/>
							</div>
							<button
								type="submit"
								className="h-12 rounded-field bg-primary px-7 text-base font-semibold text-white hover:bg-primary-hover"
							>
								{HOME_HERO.searchButton}
							</button>
						</form>
					</search>
				</div>
			</div>
			{/* Decorative artwork: below the copy on mobile, right side on desktop */}
			<div className="relative h-[200px] w-full min-[1100px]:absolute min-[1100px]:inset-y-0 min-[1100px]:right-0 min-[1100px]:z-0 min-[1100px]:h-auto min-[1100px]:w-[58%]">
				<Image
					src="/images/home/hero-neighborhood.webp"
					alt=""
					width={1774}
					height={887}
					priority
					sizes="(min-width: 1100px) 58vw, 100vw"
					className="h-full w-full object-cover object-[78%_50%]"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-sky to-transparent min-[1100px]:block"
				/>
			</div>
		</section>
	);
}
