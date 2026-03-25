"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link";

const tickerItems = [
	"Equity Research",
	"Macro Analysis",
	"Live Trading Games",
	"Case Competitions",
	"Finance Bootcamps",
	"Industry Mentorship",
];

const statCards = [
	{ label: "Active Members", value: "50+" },
	{ label: "Events Hosted", value: "30+" },
	{ label: "Industry Mentors", value: "12+" },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    let animationFrameId: number
    let time = 0

    const candlesticks: {
      x: number
      open: number
      close: number
      high: number
      low: number
      color: string
    }[] = []

    for (let i = 0; i < canvas.width / 20; i++) {
      const open = Math.random() * 100 + 100
      const close = Math.random() * 100 + 100
      const high = Math.max(open, close) + Math.random() * 20
      const low = Math.min(open, close) - Math.random() * 20

      candlesticks.push({
        x: i * 20,
        open,
        close,
        high,
        low,
        color: close > open ? "#4ade80" : "#ef4444",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1

      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      candlesticks.forEach((candle, index) => {
							ctx.beginPath();
							ctx.strokeStyle = candle.color;
							ctx.lineWidth = 1;
							ctx.moveTo(candle.x + 5, canvas.height - candle.high);
							ctx.lineTo(candle.x + 5, canvas.height - candle.low);
							ctx.stroke();

							ctx.fillStyle = candle.color;
							const bodyHeight = Math.abs(candle.close - candle.open);
							const y = canvas.height - Math.max(candle.close, candle.open);
							ctx.fillRect(candle.x, y, 10, bodyHeight);

							if (index > candlesticks.length - 10) {
								const noise = Math.sin(time * 0.1 + index) * 5;
								candle.close += noise * 0.2;
								candle.high = Math.max(candle.high, candle.close);
								candle.low = Math.min(candle.low, candle.close);
								candle.color =
									candle.close > candle.open ? "#4ade80" : "#ef4444";
							}
						});

      time += 0.1
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
			<section className="relative min-h-screen w-full overflow-hidden pt-24 md:pt-28">
				<div className="absolute inset-0 z-0">
					<Image
						src="/images/main.png"
						alt="Financial chart background"
						fill
						className="object-cover opacity-25 dark:opacity-20"
						priority
					/>
				</div>

				<motion.div
					className="absolute -left-32 top-16 z-0 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl"
					animate={{ x: [0, 30, -10, 0], y: [0, -15, 10, 0] }}
					transition={{
						duration: 14,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute -right-24 bottom-24 z-0 h-80 w-80 rounded-full bg-teal-500/15 blur-3xl"
					animate={{ x: [0, -35, 12, 0], y: [0, 12, -8, 0] }}
					transition={{
						duration: 16,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>

				<canvas
					ref={canvasRef}
					className="absolute inset-0 z-0 opacity-25 dark:opacity-30"
				/>

				<div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background" />

				<div className="relative z-10 container flex min-h-[calc(100vh-6rem)] items-center">
					<div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.85, delay: 0.2 }}
							className="text-center lg:text-left"
						>
							<motion.p
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.35 }}
								className="mb-5 inline-flex items-center rounded-full border border-amber-500/35 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300"
							>
								Market Minds in Motion
							</motion.p>

							<h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
								<span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
									Bulls and Bears
								</span>
							</h1>
							<p className="mb-4 text-lg font-semibold tracking-wide text-foreground/85 md:text-2xl">
								Finance Club of PDEU
							</p>
							<p className="mx-auto mb-8 max-w-2xl text-base text-foreground/70 md:text-lg lg:mx-0">
								We turn curiosity into conviction with dynamic workshops,
								simulation events, and real-world investing exposure.
							</p>

							<div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
								<Button
									asChild
									size="lg"
									className="bg-amber-600 text-white hover:bg-amber-700"
								>
									<Link href="/contact">Join The Club</Link>
								</Button>
								<Button
									asChild
									size="lg"
									variant="outline"
									className="border-teal-700 text-teal-700 hover:bg-teal-700/10 dark:border-teal-500 dark:text-teal-400"
								>
									<Link href="/events">Explore Events</Link>
								</Button>
							</div>

							<div className="grid gap-3 sm:grid-cols-3">
								{statCards.map((card, index) => (
									<motion.div
										key={card.label}
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.45, delay: 0.55 + index * 0.1 }}
										className="rounded-xl border border-border/70 bg-background/70 p-4 text-left shadow-sm backdrop-blur"
									>
										<p className="text-2xl font-bold text-foreground">
											{card.value}
										</p>
										<p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
											{card.label}
										</p>
									</motion.div>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.35 }}
							className="relative mx-auto w-full max-w-xl"
						>
							<div className="overflow-hidden rounded-2xl border border-border/80 bg-background/70 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.7)] backdrop-blur-xl">
								<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
									Live Focus Tracks
								</p>
								<div className="space-y-3">
									{tickerItems.slice(0, 4).map((item, index) => (
										<motion.div
											key={item}
											initial={{ x: 22, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 0.5, delay: 0.65 + index * 0.1 }}
											className="flex items-center justify-between rounded-lg border border-border/60 bg-background/65 px-3 py-2"
										>
											<span className="text-sm font-medium text-foreground/90">
												{item}
											</span>
											<span className="h-2 w-2 rounded-full bg-emerald-500" />
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				<div className="relative z-10 mt-4 overflow-hidden border-y border-border/70 bg-background/65 py-3 backdrop-blur">
					<motion.div
						className="flex w-max items-center gap-8 px-2"
						animate={{ x: [0, -600] }}
						transition={{
							duration: 18,
							ease: "linear",
							repeat: Number.POSITIVE_INFINITY,
						}}
					>
						{["a", "b", "c"].flatMap((prefix) =>
							tickerItems.map((item) => (
								<div
									key={`${prefix}-${item}`}
									className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground/75"
								>
									<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
									{item}
								</div>
							)),
						)}
					</motion.div>
				</div>

				<div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
					>
						<ArrowDown className="h-7 w-7 text-foreground/50" />
					</motion.div>
				</div>
			</section>
		);
}
