"use client"

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
	{
		src: encodeURI(
			"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.51 PM (1).jpeg",
		),
		alt: "Bazaar event highlight 1",
		category: "Bazaar",
	},
	{
		src: encodeURI(
			"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.51 PM (2).jpeg",
		),
		alt: "Bazaar event highlight 2",
		category: "Bazaar",
	},
	{
		src: encodeURI(
			"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.52 PM (1).jpeg",
		),
		alt: "Bazaar event highlight 3",
		category: "Bazaar",
	},
	{
		src: encodeURI(
			"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.52 PM (2).jpeg",
		),
		alt: "Bazaar event highlight 4",
		category: "Bazaar",
	},
	{
		src: encodeURI(
			"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.53 PM.jpeg",
		),
		alt: "Bazaar event highlight 5",
		category: "Bazaar",
	},
];

export default function BazaarGallery() {
  const [ref, inView] = useInView({
			triggerOnce: true,
			threshold: 0.05,
			rootMargin: "0px 0px 100px 0px",
		});

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const totalPhotos = galleryImages.length;

  const featuredImages = galleryImages.slice(0, 5);

		useEffect(() => {
			const interval = setInterval(() => {
				setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
			}, 2500);

			return () => clearInterval(interval);
		}, [featuredImages.length]);

		const openLightbox = (imageSrc: string) => {
			const imageIndex = galleryImages.findIndex(
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
					setSelectedImage((selectedImage + 1) % galleryImages.length);
				} else {
					setSelectedImage(
						(selectedImage - 1 + galleryImages.length) % galleryImages.length,
					);
				}
			},
			[selectedImage],
		)

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
			<section
				className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#f8fafc_40%,#ffffff_100%)] font-sans"
				ref={ref}
			>
				<div className="relative h-[58vh] w-full overflow-hidden sm:h-[62vh]">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="absolute inset-0 h-full w-full"
						>
							<div className="relative h-full w-full">
								<Image
									fill
									src={featuredImages[currentSlide].src}
									alt={featuredImages[currentSlide].alt}
									className="object-cover"
									sizes="100vw"
									priority
								/>
							</div>
							<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 via-black/35 to-black/60">
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="mx-4 w-full max-w-4xl rounded-2xl border border-white/25 bg-white/10 px-5 py-6 backdrop-blur-md sm:px-8 sm:py-7"
								>
									<p className="mb-2 text-xs uppercase tracking-[0.24em] text-amber-200/90 sm:text-sm">
										Bazaar Archive
									</p>
									<h1 className="text-3xl font-semibold tracking-wide text-white sm:text-5xl">
										Gallery
									</h1>
									<p className="mt-3 text-sm text-white/85 sm:text-base">
										{totalPhotos} photos from Bazaar
									</p>
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>

					<div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
						{featuredImages.map((image, index) => (
							<button
								key={image.src}
								type="button"
								onClick={() => setCurrentSlide(index)}
								className={`h-2.5 rounded-full transition-all duration-300 ${
									currentSlide === index
										? "w-8 bg-amber-300"
										: "w-2.5 bg-white/60 hover:bg-white/90"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>

				<div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6 }}
						className="mb-10 text-center"
					>
						<h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							Bazaar Gallery
						</h2>
						<p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
							Glimpses from our previous Bazaar events
						</p>
					</motion.div>

					<div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-[0_8px_40px_-30px_rgba(15,23,42,0.5)] sm:p-5">
						<div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
							<h3 className="text-lg font-semibold uppercase tracking-wide text-slate-900 sm:text-xl">
								Bazaar
							</h3>
							<span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 sm:text-sm">
								{totalPhotos} photo(s)
							</span>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
							{galleryImages.map((image, index) => (
								<motion.div
									key={image.src}
									initial={{ y: 20 }}
									animate={inView ? { y: 0 } : {}}
									transition={{ duration: 0.4, delay: index * 0.03 }}
									className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10"
									onClick={() => openLightbox(image.src)}
								>
									<div className="relative h-full w-full">
										<Image
											src={image.src}
											alt={image.alt}
											fill
											className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
											loading="lazy"
											sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
										<div className="absolute bottom-0 p-3 text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
											<p className="text-sm font-medium">{image.alt}</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					<AnimatePresence>
						{selectedImage !== null && (
							<motion.div
								className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-md"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<button
									type="button"
									className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20"
									onClick={closeLightbox}
								>
									<X className="h-6 w-6" />
								</button>

								<div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs text-white">
									{selectedImage + 1} / {galleryImages.length}
								</div>

								<button
									type="button"
									className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20"
									onClick={() => navigateImage("prev")}
								>
									<ChevronLeft className="h-6 w-6" />
								</button>

								<button
									type="button"
									className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20"
									onClick={() => navigateImage("next")}
								>
									<ChevronRight className="h-6 w-6" />
								</button>

								<motion.div
									className="relative h-full max-h-[90vh] w-full max-w-[90vw] overflow-hidden rounded-2xl border border-white/15"
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.9, opacity: 0 }}
									transition={{ type: "spring", stiffness: 300, damping: 30 }}
								>
									<div className="relative h-full w-full">
										<Image
											src={galleryImages[selectedImage].src}
											alt={galleryImages[selectedImage].alt}
											fill
											className="object-contain"
											sizes="90vw"
											priority
										/>
									</div>
									<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
										<h3 className="font-semibold">
											{galleryImages[selectedImage].alt}
										</h3>
										<span className="mt-1 inline-block rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-xs">
											{galleryImages[selectedImage].category}
										</span>
									</div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</section>
		);
}

