import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import { blogs } from "@/app/blogs";

export const metadata = {
  title: "Blog - Bulls & Bears Finance Club",
  description: "Financial insights, market analysis, and event updates from Bulls & Bears Finance Club of PDEU",
}

const getReadTime = (content: string) => {
	const words = content.trim().split(/\s+/).length;
	return `${Math.max(3, Math.ceil(words / 220))} min read`;
};

export default function BlogPage() {
  const featured = blogs[0];
		const latest = blogs.slice(1);

		return (
			<main className="min-h-screen bg-background text-foreground">
				<Header />

				<section className="relative overflow-hidden border-b border-amber-200/60 dark:border-amber-500/20">
					<div className="container px-4 pt-32 pb-16">
						<p className="text-xs font-semibold tracking-[0.24em] uppercase text-amber-700">
							Insights Journal
						</p>
						<h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
							Real market thinking for students, builders, and future investors.
						</h1>
						<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
							Explore deep dives on economics, risk, and strategy written by
							Bulls & Bears. No fluff, only clear ideas you can use.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<span className="rounded-full border border-amber-300/70 bg-amber-100/80 px-4 py-1.5 text-sm font-medium text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-200">
								Finance
							</span>
							<span className="rounded-full border border-sky-300/70 bg-sky-100/80 px-4 py-1.5 text-sm font-medium text-sky-900 dark:border-sky-500/40 dark:bg-sky-500/15 dark:text-sky-200">
								Policy
							</span>
							<span className="rounded-full border border-emerald-300/70 bg-emerald-100/80 px-4 py-1.5 text-sm font-medium text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-200">
								Global Markets
							</span>
						</div>
					</div>
				</section>

				<section className="container px-4 py-12">
					{featured && (
						<article className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_80px_-30px_rgba(15,23,42,0.25)] dark:shadow-[0_20px_80px_-35px_rgba(0,0,0,0.65)] md:grid-cols-2">
							<div className="relative min-h-[280px] md:min-h-[420px]">
								<Image
									src={featured.image}
									alt={featured.title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-tr from-slate-900/55 via-slate-900/20 to-transparent" />
							</div>

							<div className="flex flex-col justify-between p-7 sm:p-10">
								<div>
									<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
										<Tag className="h-3.5 w-3.5" />
										Featured
									</div>
									<h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
										{featured.title}
									</h2>
									<p className="mt-4 text-base leading-relaxed text-muted-foreground">
										{featured.excerpt}
									</p>
								</div>

								<div className="mt-8 flex items-center justify-between gap-4">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<CalendarDays className="h-4 w-4" />
										<span>{featured.date}</span>
										<span className="text-border">|</span>
										<span>{getReadTime(featured.content)}</span>
									</div>
									<Link
										href={`/blog/${featured.id}`}
										className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
									>
										Read article
										<ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							</div>
						</article>
					)}
				</section>

				<section className="container px-4 pb-20">
					<div className="mb-8 flex items-end justify-between gap-4">
						<h2 className="text-2xl font-black text-foreground sm:text-3xl">
							Latest Posts
						</h2>
						<p className="text-sm text-muted-foreground">
							{blogs.length} articles
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{latest.map((post) => (
							<article
								key={post.id}
								className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-30px_rgba(15,23,42,0.4)] dark:hover:shadow-[0_18px_50px_-35px_rgba(0,0,0,0.7)]"
							>
								<div className="relative h-52 w-full overflow-hidden">
									<Image
										src={post.image}
										alt={post.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 to-transparent" />
									<div className="absolute bottom-3 left-3 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
										{post.category ?? "Blog"}
									</div>
								</div>

								<div className="p-6">
									<h3 className="text-xl font-bold leading-snug text-foreground">
										{post.title}
									</h3>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{post.excerpt}
									</p>

									<div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
										<span>{post.date}</span>
										<span>{getReadTime(post.content)}</span>
									</div>

									<Link
										href={`/blog/${post.id}`}
										className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800"
									>
										Continue reading
										<ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							</article>
						))}
					</div>
				</section>

				<Footer />
			</main>
		);
}

