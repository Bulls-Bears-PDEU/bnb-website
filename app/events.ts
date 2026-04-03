export type EventShape = {
	title: string;
	date: string;
	dateTime: string;
	participants?: string[];
	description: string;
	image: string | { src: string };
	highlights?: string[];
};

export const events: EventShape[] = [
	{
		title: "SPEND",
		date: "10th October 2025",
		dateTime: "2025-10-10T18:00:00",
		participants: ["65+"],
		description:
			"Spend was a team-based portfolio management event designed to simulate real-life investment decision-making. Participants were given a virtual capital of ₹7,50,000 and allocated funds across assets like stocks, gold, real estate, and fixed deposits based on market news. Each round required quick analysis and strategic thinking under time constraints, with outcomes reflecting gains or losses. A key highlight was the auction round, where participants bid on luxury items using their earnings, introducing a behavioral dimension to financial decisions. The event encouraged teamwork, adaptability, and critical thinking throughout. By blending structured investing with interactive elements, Spend provided a practical and engaging understanding of portfolio management and market behavior.",
		image: "/posters/SPEND.jpeg",
		highlights: [
			"Virtual capital allocation",
			"Auction round",
			"Team strategy under pressure",
		],
	},
	{
		title: "BAZAAR 7.0",
		date: "11th October 2025",
		dateTime: "2025-10-11T18:00:00",
		participants: ["140+"],
		description:
			"Bazaar 7.0, the flagship event of Bulls&Bears, delivered one of the most realistic stock market simulation experiences for students. Conducted on a custom-built trading platform, participants engaged in live buying and selling driven by continuous news updates and market fluctuations. The event stood out for its real-time environment, with dynamic inputs through platform updates and WhatsApp voice notes replicating real-world trading conditions. Features like the IPO round and Tip Chits added strategic depth and uncertainty. With a live leaderboard and intense competition throughout, participants experienced the pace, pressure, and decision-making challenges of actual markets. Bazaar 7.0 successfully combined realism with engagement, making it a standout learning experience.",
		image: "/posters/BAZAAR.jpg",
		highlights: [
			"Custom trading platform",
			"Live news-driven market shifts",
			"IPO round and Tip Chits",
		],
	},
	{
		title: "GUESSTIMATE WORKSHOP",
		date: "16th January 2026",
		dateTime: "2026-01-16T18:00:00",
		participants: ["55+"],
		description:
			"The Guesstimate Workshop was an interactive session focused on building structured thinking and estimation skills. Participants were introduced to systematic approaches for solving complex, data-limited problems using logical assumptions and step-by-step breakdowns. The workshop emphasized learning through collaboration, with students actively discussing methods and refining their reasoning across various estimation scenarios. As a strong learning-oriented session, it highlighted the importance of clarity, structured frameworks, and justification of assumptions, skills widely used in consulting and business contexts. Participants gained confidence in approaching open-ended problems, making the workshop both practical and intellectually enriching.",
		image: "/posters/GUESSTIMATE.jpeg",
		highlights: [
			"Structured estimation",
			"Collaborative problem solving",
			"Consulting-style reasoning",
		],
	},
	{
		title: "DUNGEONS & DRAGONS",
		date: "13th February 2026",
		dateTime: "2026-02-13T18:00:00",
		participants: ["50+"],
		description:
			"Dungeons & Dragons was a uniquely designed concept-based event that combined storytelling with strategic decision-making. Participants worked in teams, guided through narrative-driven scenarios where each choice impacted their points and progress. What set the event apart was its blend of strategy and unpredictability, with dice rolls determining the magnitude of outcomes and introducing real-time uncertainty. Role-based abilities within teams added another layer of planning, requiring careful coordination and timing. By integrating elements of risk management, probability, and resource allocation into an immersive format, the event delivered a distinctive and engaging experience beyond traditional finance events.",
		image: "/posters/DND.jpg",
		highlights: [
			"Narrative-driven gameplay",
			"Dice-based uncertainty",
			"Role-based team strategy",
		],
	},
	{
		title: "CASIFIED - THE CASE COMPETITION",
		date: "11th April 2026",
		dateTime: "2026-04-11T18:00:00",
		participants: ["Team-based", "2-4 members"],
		description:
			"CASIFIED, the case competition by Bulls & Bears, is an upcoming opportunity to experience real-world business and financial decision-making under the theme Edge of Change. Designed to reflect high-stakes scenarios, the competition challenges participants to analyze a dynamic case and uncover strategic insights. The event begins with team registrations, followed by a screening quiz to shortlist the top 20 teams for the offline round. These selected teams will engage in an intensive case-solving experience, developing structured solutions and presenting them through a professional deck. Final presentations will be evaluated by industry experts, offering valuable feedback and exposure. With its focus on practical application, CASIFIED pushes participants beyond theory-testing their analytical thinking, strategy, and ability to perform under pressure.",
		image: "/posters/CASIFIED.jpeg",
		highlights: [
			"Screening quiz",
			"Offline case-solving round",
			"Industry expert evaluation",
		],
	},
];
