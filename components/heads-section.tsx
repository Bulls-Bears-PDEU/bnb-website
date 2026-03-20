"use client";

import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MemberCard from "./member-card";

import Prayag from "@/public/teamImages/Prayag Prajapati.jpg";
import Aditya from "@/public/teamImages/Aditya Sevak.jpg";
import Aayushi from "@/public/teamImages/Aayushi Patel.jpg";
import Anand from "@/public/teamImages/Anand Zanzmeriya.jpg";
import Mishthi from "@/public/teamImages/Mishthi Shah.jpg";
import Sonit from "@/public/teamImages/Sonit Agrawal.jpg";
import Parva from "@/public/teamImages/Parva Shah.jpg";
// import Shreya from "@/public/teamImages/Shreya Nair.jpg";
import placeholder from "@/public/bull-logo.png";

const departmentHeads = [
	{
		name: "Prayag Prajapati",
		position: "Head of Tech and IT",
		image: Prayag,
		bio: "Leads the research team in analyzing market trends and creating insightful reports for club members.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Aditya Sevak",
		position: "Head of Marketing",
		image: Aditya,
		bio: "Organizes workshops, seminars, and competitions to enhance members' practical knowledge of finance.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Aayushi Patel",
		position: "Head of Digital Marketing",
		image: Aayushi,
		bio: "Manages the club's brand image and promotes events to maximize student engagement and participation.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Anand Zanzmeriya",
		position: "Head of Event Management",
		image: Anand,
		bio: "Creates educational content on finance topics and manages the club's newsletter and social media.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Mishthi Shah",
		position: "Head of Research",
		image: Mishthi,
		bio: "Manages the club's technical infrastructure and develops tools for financial analysis and learning.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Sonit Agrawal",
		position: "Head of Research",
		image: Sonit,
		bio: "Builds and maintains relationships with industry professionals and other finance clubs.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Parva Shah",
		position: "Head of Sponsorship",
		image: Parva,
		bio: "Leads the sponsorship team in securing partnerships and managing sponsor relationships.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Shreya Nair",
		position: "Head of Graphic Design",
		image: placeholder,
		bio: "Maintains connections with alumni and organizes networking events to benefit current members.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
	{
		name: "Arjun Prajapati",
		position: "Head of Graphic Design",
		image: placeholder,
		bio: "Maintains connections with alumni and organizes networking events to benefit current members.",
		linkedin: "https://linkedin.com",
		instagram: "https://instagram.com",
	},
];

export default function HeadsSection() {
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
		<section className="bg-muted/30 py-24 dark:bg-muted/10" ref={ref}>
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
								<MemberCard
									name={head.name}
									position={head.position}
									image={head.image}
									bio={head.bio}
									linkedin={head.linkedin}
									instagram={head.instagram}
									delay={0.1 * index}
								/>
							</div>
						))}
					</div>

					<Button
						variant="outline"
						size="icon"
						className={`absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm ${
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
						className={`absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm ${
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
