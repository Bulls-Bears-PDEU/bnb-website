"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

import galleryImages from "./Gallery";

export default function EventGallerySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px 100px 0px",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");
	const totalPhotos = galleryImages.length;

  const featuredImages = galleryImages.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [featuredImages.length]);

  const categoryCounts: Record<string, number> = galleryImages.reduce(
    (acc, img) => {
      const category = img.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const categories = [
			"All",
			...Object.keys(categoryCounts).sort((a, b) => a.localeCompare(b)),
		];

  const filteredImages =
			filter === "All"
				? galleryImages
				: galleryImages.filter((img) => img.category === filter);

		const groupedFilteredImages = filteredImages.reduce(
			(acc, img) => {
				const category = img.category;
				if (!acc[category]) {
					acc[category] = [];
				}
				acc[category].push(img);
				return acc;
			},
			{} as Record<string, typeof filteredImages>,
		);

  const visibleCategories = Object.keys(groupedFilteredImages).sort((a, b) =>
			a.localeCompare(b),
		);

		const openLightbox = (imageSrc: string) => {
			const imageIndex = filteredImages.findIndex(
				(image) => image.src === imageSrc,
			);
			if (imageIndex === -1) {
				return;
			}

			setSelectedImage(imageIndex);
			document.body.style.overflow = "hidden";
		};

  const closeLightbox = useCallback(() => {
			setSelectedImage(null);
			document.body.style.overflow = "auto";
		}, []);

  const navigateImage = useCallback(
			(direction: "next" | "prev") => {
				if (selectedImage === null) return;

				if (direction === "next") {
					setSelectedImage((selectedImage + 1) % filteredImages.length);
				} else {
					setSelectedImage(
						(selectedImage - 1 + filteredImages.length) % filteredImages.length,
					);
				}
			},
			[filteredImages.length, selectedImage],
		);

  useEffect(() => {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (selectedImage === null) return;
				if (e.key === "Escape") closeLightbox();
				if (e.key === "ArrowRight") navigateImage("next");
				if (e.key === "ArrowLeft") navigateImage("prev");
			};

			window.addEventListener("keydown", handleKeyDown);
			return () => window.removeEventListener("keydown", handleKeyDown);
		}, [closeLightbox, navigateImage, selectedImage]);

  return (
			<div
				className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#f8fafc_40%,#ffffff_100%)] font-sans flex flex-col"
				ref={ref}
			>
				{/* Hero Slideshow */}
				<div className="relative h-[58vh] sm:h-[62vh] w-full overflow-hidden">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="absolute inset-0 w-full h-full"
						>
							<div className="relative w-full h-full">
								<Image
									fill
									src={featuredImages[currentSlide].src}
									alt={featuredImages[currentSlide].alt}
									className="object-cover"
									sizes="100vw"
									priority
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/60 flex items-center justify-center">
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="mx-4 w-full max-w-4xl rounded-2xl border border-white/25 bg-white/10 px-5 py-6 sm:px-8 sm:py-7 backdrop-blur-md"
								>
									<p className="mb-2 text-xs sm:text-sm uppercase tracking-[0.24em] text-amber-200/90">
										Events Archive
									</p>
									<h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-wide">
										Gallery
									</h1>
									<p className="mt-3 text-sm sm:text-base text-white/85">
										{totalPhotos} photos across {categories.length - 1}{" "}
										categories
									</p>
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Slide Indicators */}
					<div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
						{featuredImages.map((_, index) => (
							<button
								key={featuredImages[index]?.src || `slide-${index}`}
								type="button"
								onClick={() => setCurrentSlide(index)}
								className={`h-2.5 rounded-full transition-all duration-300 ${
									currentSlide === index
										? "bg-amber-300 w-8"
										: "bg-white/60 hover:bg-white/90 w-2.5"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>

				{/* Gallery Section */}
				<div className="w-full max-w-6xl mx-auto px-4 py-10 sm:py-14">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6 }}
						className="text-center mb-10"
					>
						<h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-slate-900">
							Event Gallery
						</h2>
						<p className="text-slate-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
							Glimpses from our previous events
						</p>

						<div className="sticky top-2 z-20 flex flex-wrap justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/85 p-2 shadow-sm backdrop-blur-sm">
							{categories.map((category) => (
								<motion.button
									key={category}
									type="button"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setFilter(category)}
									className={`px-3.5 py-2 text-xs sm:text-sm uppercase tracking-wide border transition-all rounded-full ${
										filter === category
											? "bg-slate-900 text-white border-slate-900 shadow"
											: "border-slate-300 text-slate-700 bg-white hover:bg-slate-100"
									}`}
								>
									{category}
									{category !== "All" && (
										<span className="ml-1">
											({categoryCounts[category] || 0})
										</span>
									)}
								</motion.button>
							))}
						</div>
					</motion.div>

					{/* Category-wise image groups */}
					<div className="space-y-10">
						{visibleCategories.map((category) => (
							<div
								key={category}
								className="rounded-2xl border border-slate-200 bg-white/85 p-4 sm:p-5 shadow-[0_8px_40px_-30px_rgba(15,23,42,0.5)]"
							>
								<div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
									<h3 className="text-lg sm:text-xl font-semibold tracking-wide uppercase text-slate-900">
										{category}
									</h3>
									<span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs sm:text-sm text-slate-600">
										{groupedFilteredImages[category].length} photo(s)
									</span>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{groupedFilteredImages[category].map((image, index) => (
										<motion.div
											key={image.src}
											initial={{ y: 20 }}
											animate={inView ? { y: 0 } : {}}
											transition={{ duration: 0.4, delay: index * 0.03 }}
											className="group relative overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-900/10 cursor-pointer aspect-[4/3] bg-slate-100 transition-all duration-300"
											onClick={() => openLightbox(image.src)}
										>
											<div className="relative w-full h-full">
												<Image
													src={image.src}
													alt={image.alt}
													fill
													className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
													loading="lazy"
													sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
												/>
											</div>
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
											<div className="absolute bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
												<p className="text-sm font-medium">{image.alt}</p>
											</div>
										</motion.div>
									))}
								</div>
							</div>
						))}
					</div>

					{filteredImages.length === 0 && (
						<div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 bg-white/75">
							<p className="text-slate-500">No images found in this category</p>
							<button
								type="button"
								onClick={() => setFilter("All")}
								className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors"
							>
								Show All Photos
							</button>
						</div>
					)}
				</div>

				{/* Lightbox Modal */}
				<AnimatePresence>
					{selectedImage !== null && (
						<motion.div
							className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<button
								type="button"
								className="absolute top-4 right-4 p-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20"
								onClick={closeLightbox}
							>
								<X className="w-6 h-6" />
							</button>

							<div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 text-white px-4 py-1 rounded-full text-xs">
								{selectedImage + 1} / {filteredImages.length}
							</div>

							<button
								type="button"
								className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20"
								onClick={() => navigateImage("prev")}
							>
								<ChevronLeft className="w-6 h-6" />
							</button>

							<button
								type="button"
								className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20"
								onClick={() => navigateImage("next")}
							>
								<ChevronRight className="w-6 h-6" />
							</button>

							<motion.div
								className="relative w-full h-full max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/15"
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
							>
								<div className="relative w-full h-full">
									<Image
										src={filteredImages[selectedImage].src}
										alt={filteredImages[selectedImage].alt}
										fill
										className="object-contain"
										sizes="90vw"
										priority
									/>
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
									<h3 className="font-semibold">
										{filteredImages[selectedImage].alt}
									</h3>
									<span className="text-xs mt-1 inline-block rounded-full bg-white/15 px-2 py-0.5 border border-white/20">
										{filteredImages[selectedImage].category}
									</span>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Footer */}
				<footer className="bg-slate-100/80 text-center text-slate-500 text-xs sm:text-sm py-6 border-t border-slate-200">
					<p>Copyright © {new Date().getFullYear()} All rights reserved</p>
				</footer>
			</div>
		);
}
