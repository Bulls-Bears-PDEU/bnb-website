import AboutHero from "@/components/about/about-hero"
import WhatWeDoSection from "@/components/about/what-we-do-section"
import VisionMissionSection from "@/components/about/vision-mission-section"
import EventGallerySection from "@/components/events/event-gallery-section";
import HistorySection from "@/components/about/history-section"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata = {
  title: "About Us - Bulls & Bears Finance Club",
  description: "Learn about Bulls & Bears Finance Club of PDEU, our mission, vision, and activities",
}

export default function AboutPage() {
  return (
			<main className="min-h-screen">
				<Header />
				<AboutHero />
				<WhatWeDoSection />
				<VisionMissionSection />
				<EventGallerySection />
				<HistorySection />
				<Footer />
			</main>
		);
}

