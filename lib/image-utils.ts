const COMPRESSIBLE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const OPTIMIZABLE_PREFIXES = [
	"/images/",
	"/events/",
	"/teamImages/",
	"/textures/",
];

function splitPathAndQuery(src: string) {
	const [pathPart, queryPart] = src.split("?");
	return {
		pathPart,
		queryPart: queryPart ? `?${queryPart}` : "",
	};
}

export function optimizeCloudinaryUrl(src: string): string {
	if (
		!src.includes("res.cloudinary.com") ||
		src.includes("/upload/f_auto,q_auto/")
	) {
		return src;
	}

	return src.replace("/upload/", "/upload/f_auto,q_auto/");
}

export function resolveOptimizedImageSrc(src: string): string {
	if (!src) {
		return "/placeholder.svg";
	}

	if (src.startsWith("http")) {
		return optimizeCloudinaryUrl(src);
	}

	if (!src.startsWith("/") || src.startsWith("/optimized/")) {
		return src;
	}

	// Keep framework-generated static URLs untouched (e.g. /_next/static/media/*)
	if (src.startsWith("/_next/")) {
		return src;
	}

	const { pathPart, queryPart } = splitPathAndQuery(src);

	if (!OPTIMIZABLE_PREFIXES.some((prefix) => pathPart.startsWith(prefix))) {
		return src;
	}

	const extensionMatch = pathPart.match(/\.[^.]+$/);
	const extension = extensionMatch ? extensionMatch[0].toLowerCase() : "";

	if (!COMPRESSIBLE_EXTENSIONS.includes(extension)) {
		return src;
	}

	const compressedPath = pathPart.replace(/\.[^.]+$/, ".webp");
	return `/optimized${compressedPath}${queryPart}`;
}
