"use client"

import { motion } from "framer-motion"
import {
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	Clock3,
	MapPin,
	Sparkles,
	Users,
} from "lucide-react";

export default function BazaarHero() {
  const quickFacts = [
			{ icon: CalendarDays, label: "Date", value: "October 19, 2024" },
			{ icon: Clock3, label: "Duration", value: "9:00 AM - 4:00 PM" },
			{ icon: MapPin, label: "Venue", value: "BLT-1, PDEU Campus" },
		];

		const eventPillars = [
			{
				icon: BriefcaseBusiness,
				title: "Case-Driven Rounds",
				description:
					"Navigate curated market events with strategy-first decision making.",
			},
			{
				icon: Users,
				title: "Collaborative Play",
				description:
					"Compete with top student teams and sharpen communication under pressure.",
			},
			{
				icon: Sparkles,
				title: "Expert Exposure",
				description:
					"Learn from mentors and judges from finance and consulting domains.",
			},
		];

		return (
			<section className="relative isolate min-h-[100svh] w-full overflow-hidden pb-14 pt-36 md:pb-20 md:pt-40">
				<motion.div
					className="absolute inset-0 -z-20"
					initial={{ scale: 1.08, opacity: 0.8 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1.2, ease: "easeOut" }}
				>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.24)_0%,transparent_55%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,hsl(var(--chart-2)/0.2)_0%,transparent_46%)]" />
					<div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background)/0.96)_45%,hsl(var(--background))_100%)]" />
					<div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.18)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.18)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_50%_42%,black_15%,transparent_75%)]" />
				</motion.div>

				<div className="absolute inset-x-0 top-[18%] -z-10 h-44 bg-[conic-gradient(from_130deg_at_50%_50%,hsl(var(--primary)/0.22),transparent_45%,hsl(var(--chart-2)/0.2),transparent_78%)] blur-3xl" />

				<div className="container px-4">
					<div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
						<motion.div
							initial={{ opacity: 0, y: 28 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.75, delay: 0.12 }}
							className="max-w-3xl"
						>
							<div className="mb-6 inline-flex items-center rounded-full border border-primary/35 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary backdrop-blur">
								Bulls & Bears Signature Event
							</div>

							<h1 className="text-5xl font-black leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl xl:text-8xl">
								Bazaar
								<span className="block bg-[linear-gradient(120deg,hsl(var(--primary))_0%,hsl(var(--chart-2))_100%)] bg-clip-text text-transparent">
									Trading Arena
								</span>
							</h1>

							<p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
								Step into a fast-paced market simulator where every decision
								moves your P&L. Build strategy, react to live scenarios, and
								compete for the top spot with the sharpest finance minds at
								PDEU.
							</p>

							<div className="mt-8 flex flex-wrap items-center gap-4">
								<motion.a
									href="#register"
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.98 }}
									className="inline-flex items-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
								>
									Reserve Your Slot
									<ArrowRight className="ml-2 h-4 w-4" />
								</motion.a>

								<a
									href="#bazaar-info"
									className="inline-flex items-center rounded-full border border-border bg-background/75 px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/45 hover:text-primary"
								>
									Explore Event Format
								</a>
							</div>

							<div className="mt-10 grid gap-3 sm:grid-cols-3">
								{quickFacts.map((fact, index) => {
									const Icon = fact.icon;

									return (
										<motion.div
											key={fact.label}
											initial={{ opacity: 0, y: 14 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
											className="rounded-2xl border border-border/75 bg-background/70 p-4 backdrop-blur"
										>
											<div className="mb-2 inline-flex rounded-full bg-primary/12 p-2 text-primary">
												<Icon className="h-4 w-4" />
											</div>
											<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
												{fact.label}
											</p>
											<p className="mt-1 text-sm font-semibold text-foreground">
												{fact.value}
											</p>
										</motion.div>
									);
								})}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 24 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.75, delay: 0.22 }}
							className="relative"
						>
							<div className="absolute -left-6 -top-5 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur">
								Event Snapshot
							</div>

							<div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/85 p-6 shadow-2xl backdrop-blur-xl">
								<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,hsl(var(--primary)/0.14),transparent_45%,hsl(var(--chart-2)/0.12))]" />

								<div className="relative">
									<div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
										<div>
											<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
												What To Expect
											</p>
											<h2 className="mt-2 text-2xl font-bold">
												High-Impact Experience
											</h2>
										</div>
										<span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
											Open To All Years
										</span>
									</div>

									<div className="space-y-3">
										{eventPillars.map((item, index) => {
											const Icon = item.icon;

											return (
												<motion.div
													key={item.title}
													initial={{ opacity: 0, x: 16 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{
														duration: 0.45,
														delay: 0.35 + index * 0.1,
													}}
													className="rounded-xl border border-border/75 bg-background/65 px-4 py-3"
												>
													<div className="flex items-start gap-3">
														<div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
															<Icon className="h-4 w-4" />
														</div>
														<div>
															<p className="text-sm font-semibold text-foreground">
																{item.title}
															</p>
															<p className="text-xs text-muted-foreground">
																{item.description}
															</p>
														</div>
													</div>
												</motion.div>
											);
										})}
									</div>

									<div className="mt-5 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3">
										<p className="text-xs uppercase tracking-[0.16em] text-primary">
											Event Note
										</p>
										<p className="mt-1 text-sm text-foreground/85">
											Registrations are reviewed in batches. Early sign-ups get
											priority communication for updates.
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				<div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
						className="flex flex-col items-center"
					>
						<span className="mb-2 text-sm text-foreground/70">
							Scroll to explore
						</span>
						<div className="h-10 w-1.5 rounded-full bg-primary/30">
							<motion.div
								animate={{ y: [0, 20, 0] }}
								transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
								className="h-4 w-1.5 rounded-full bg-primary"
							/>
						</div>
					</motion.div>
				</div>
			</section>
		);
}

