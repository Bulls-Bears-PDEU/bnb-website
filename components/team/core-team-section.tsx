"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import TeamMemberCard from "@/components/team/team-member-card";
import coreMembers from "@/app/core";

export default function CoreTeamSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="bg-background/80 backdrop-blur-sm py-24" ref={ref}>
			<div className="container px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.6 }}
					className="mb-12 text-center"
				>
					<h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
						Core Team
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Meet the dedicated team leading Bulls & Bears to new heights
					</p>
				</motion.div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{coreMembers.map((member, index) => (
						<TeamMemberCard
							key={member.name}
							name={member.name}
							position={member.position}
							image={member.image}
							bio={member.bio}
							linkedin={member.linkedin}
							//instagram={member.//instagram}
							delay={0.1 * index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
