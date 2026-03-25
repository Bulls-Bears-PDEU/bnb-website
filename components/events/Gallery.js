const galleryImagePaths = [
	"/events/WhatsApp Image 2026-03-24 at 11.47.55 PM (2).jpeg",
	"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.51 PM (1).jpeg",
	"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.51 PM (2).jpeg",
	"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.52 PM (1).jpeg",
	"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.52 PM (2).jpeg",
	"/events/Bazaar/WhatsApp Image 2026-03-24 at 11.47.53 PM.jpeg",
	"/events/DnD/WhatsApp Image 2026-03-24 at 11.47.57 PM (1).jpeg",
	"/events/DnD/WhatsApp Image 2026-03-24 at 11.47.57 PM.jpeg",
	"/events/DnD/WhatsApp Image 2026-03-24 at 11.47.58 PM (1).jpeg",
	"/events/DnD/WhatsApp Image 2026-03-24 at 11.47.58 PM (2).jpeg",
	"/events/DnD/WhatsApp Image 2026-03-24 at 11.47.58 PM (3).jpeg",
	"/events/DnD/WhatsApp Image 2026-03-24 at 11.47.58 PM.jpeg",
	"/events/DnD/WhatsApp Image 2026-03-24 at 11.47.59 PM.jpeg",
	"/events/Gestimate/WhatsApp Image 2026-03-24 at 11.47.55 PM.jpeg",
	"/events/Gestimate/WhatsApp Image 2026-03-24 at 11.47.56 PM (1).jpeg",
	"/events/Gestimate/WhatsApp Image 2026-03-24 at 11.47.56 PM (2).jpeg",
	"/events/Gestimate/WhatsApp Image 2026-03-24 at 11.47.56 PM.jpeg",
	"/events/Gestimate/WhatsApp Image 2026-03-24 at 11.47.57 PM (2).jpeg",
	"/events/Gestimate/WhatsApp Image 2026-03-24 at 11.47.59 PM (1).jpeg",
	"/events/Intro/WhatsApp Image 2026-03-24 at 11.47.54 PM (1).jpeg",
	"/events/Intro/WhatsApp Image 2026-03-24 at 11.47.54 PM (2).jpeg",
	"/events/Spend/WhatsApp Image 2026-03-24 at 11.47.50 PM (1).jpeg",
	"/events/Spend/WhatsApp Image 2026-03-24 at 11.47.51 PM.jpeg",
	"/events/Spend/WhatsApp Image 2026-03-24 at 11.47.52 PM.jpeg",
	"/events/Spend/WhatsApp Image 2026-03-24 at 11.47.55 PM (1).jpeg",
	"/events/ThemeLaunch/WhatsApp Image 2026-03-24 at 11.47.50 PM.jpeg",
	"/events/ThemeLaunch/WhatsApp Image 2026-03-24 at 11.47.53 PM (1).jpeg",
	"/events/ThemeLaunch/WhatsApp Image 2026-03-24 at 11.47.53 PM (2).jpeg",
	"/events/ThemeLaunch/WhatsApp Image 2026-03-24 at 11.47.54 PM (3).jpeg",
	"/events/ThemeLaunch/WhatsApp Image 2026-03-24 at 11.47.54 PM.jpeg",
];

const toTitle = (filename) =>
	filename
		.replace(/\.[^.]+$/, "")
		.replace(/[-_]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

const galleryImages = galleryImagePaths.map((src) => {
	const segments = src.split("/").filter(Boolean);
	const filename = segments[segments.length - 1] || "event image";
	const category = segments[segments.length - 2] || "events";

	return {
		src: encodeURI(src),
		alt: toTitle(filename),
		category,
	};
});

export default galleryImages;
