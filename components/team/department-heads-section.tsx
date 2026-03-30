"use client";

import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamMemberCard from "@/components/team/team-member-card";
import departmentHeads from "@/app/heads";

export default function DepartmentHeadsSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const checkScrollability = () => {
		const container = scrollContainerRef.current;
		if (container) {
			setCanScrollLeft(container.scrollLeft > 0);
			setCanScrollRight(
				container.scrollLeft <
					container.scrollWidth - container.clientWidth - 10,
			);
		}
	};

	const scroll = (direction: "left" | "right") => {
		const container = scrollContainerRef.current;
		if (container) {
			const scrollAmount = container.clientWidth * 0.8;
			if (direction === "left") {
				container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
			} else {
				container.scrollBy({ left: scrollAmount, behavior: "smooth" });
			}
			setTimeout(checkScrollability, 500);
		}
	};

	return (
		<section
			className="bg-muted/30 backdrop-blur-sm py-24 dark:bg-muted/10"
			ref={ref}
		>
			<div className="container px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
						Department Heads
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Meet our specialized team leaders driving excellence in each
						department
					</p>
				</motion.div>

				<div className="relative">
					<div
						ref={scrollContainerRef}
						className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide"
						onScroll={checkScrollability}
					>
						{departmentHeads.map((head, index) => (
							<div key={head.name} className="min-w-[280px] max-w-[280px]">
								<TeamMemberCard
									name={head.name}
									position={head.position}
									image={head.image}
									bio={head.bio}
									linkedin={head.linkedin}
									//instagram={head.//instagram}
									delay={0.1 * index}
								/>
							</div>
						))}
					</div>

					<Button
						variant="outline"
						size="icon"
						className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm md:-left-4 md:left-auto ${
							!canScrollLeft ? "opacity-0" : "opacity-100"
						} transition-opacity duration-300`}
						onClick={() => scroll("left")}
						disabled={!canScrollLeft}
					>
						<ChevronLeft className="h-5 w-5" />
					</Button>

					<Button
						variant="outline"
						size="icon"
						className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm md:-right-4 md:right-auto ${
							!canScrollRight ? "opacity-0" : "opacity-100"
						} transition-opacity duration-300`}
						onClick={() => scroll("right")}
						disabled={!canScrollRight}
					>
						<ChevronRight className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</section>
	);
}
