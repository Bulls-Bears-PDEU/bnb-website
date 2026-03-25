"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils";

interface NavItem {
  name: string
  href: string
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "team", href: "/team" },
    { name: "events", href: "/events" },
  ]

  const secondaryNavItems: NavItem[] = [
    { name: "bazaar", href: "/bazaar" },
    { name: "blog", href: "/blog" },
    { name: "contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
			<header
				className={cn(
					"fixed inset-x-0 top-0 z-50 transition-all duration-300",
					isScrolled ? "pt-3" : "pt-4",
				)}
			>
				<div className="container mx-auto px-4">
					<div
						className={cn(
							"flex h-16 items-center justify-between rounded-2xl border px-3 md:px-4",
							"bg-background/70 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.45)] backdrop-blur-xl",
							isScrolled ? "border-border/80" : "border-border/60",
						)}
					>
						<Link
							href="/"
							className="group flex items-center gap-3 rounded-xl px-2 py-1.5"
						>
							<motion.div
								className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-primary/25"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								<Image
									src="/bull-logo.png"
									height={64}
									width={64}
									alt="Bulls and Bears logo"
									className="h-full w-full object-cover"
									priority
								/>
							</motion.div>
							<div className="leading-tight">
								<p className="text-sm font-semibold tracking-[0.14em] text-foreground">
									BULLS AND BEARS
								</p>
								<p className="text-[10px] tracking-[0.2em] text-muted-foreground">
									FINANCE CLUB
								</p>
							</div>
						</Link>

						<nav className="hidden items-center md:flex">
							<div className="relative flex items-center gap-1 rounded-xl border border-border/80 bg-background/75 p-1">
								{navItems.map((item) => {
									const active = isActive(item.href);

									return (
										<Link
											key={item.name}
											href={item.href}
											className={cn(
												"relative rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors",
												active
													? "text-foreground"
													: "text-muted-foreground hover:text-foreground",
											)}
										>
											{active && (
												<motion.span
													layoutId="desktop-active-nav"
													className="absolute inset-0 -z-10 rounded-lg bg-primary/12"
													transition={{
														type: "spring",
														stiffness: 380,
														damping: 32,
													}}
												/>
											)}
											{item.name}
										</Link>
									);
								})}
							</div>
						</nav>

						<div className="hidden items-center gap-2 md:flex">
							{secondaryNavItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors",
										isActive(item.href)
											? "bg-primary/12 text-primary"
											: "text-muted-foreground hover:bg-muted hover:text-foreground",
									)}
								>
									{item.name}
								</Link>
							))}
							<ThemeToggle />
						</div>

						<div className="flex items-center gap-2 md:hidden">
							<ThemeToggle />
							<button
								type="button"
								onClick={() => setMobileMenuOpen((prev) => !prev)}
								className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background/70 text-foreground"
								aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
							>
								{mobileMenuOpen ? (
									<X className="h-5 w-5" />
								) : (
									<Menu className="h-5 w-5" />
								)}
							</button>
						</div>
					</div>
				</div>

				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, y: -8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.2 }}
							className="container mx-auto mt-2 px-4 md:hidden"
						>
							<div className="rounded-2xl border border-border/80 bg-background/95 p-3 shadow-xl backdrop-blur-xl">
								<nav className="flex flex-col gap-1">
									{[...navItems, ...secondaryNavItems].map((item) => (
										<Link
											key={item.name}
											href={item.href}
											onClick={() => setMobileMenuOpen(false)}
											className={cn(
												"rounded-lg px-3 py-2.5 text-sm font-medium capitalize transition-colors",
												isActive(item.href)
													? "bg-primary/12 text-primary"
													: "text-foreground/80 hover:bg-muted hover:text-foreground",
											)}
										>
											{item.name}
										</Link>
									))}
								</nav>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</header>
		);
}

