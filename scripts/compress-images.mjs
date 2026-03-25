import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "optimized");
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function readFilesRecursively(directoryPath) {
	const directoryEntries = await fs.readdir(directoryPath, {
		withFileTypes: true,
	});
	const files = [];

	for (const entry of directoryEntries) {
		const fullPath = path.join(directoryPath, entry.name);

		if (entry.isDirectory()) {
			if (fullPath.startsWith(OUTPUT_DIR)) {
				continue;
			}

			files.push(...(await readFilesRecursively(fullPath)));
			continue;
		}

		files.push(fullPath);
	}

	return files;
}

async function ensureDirectory(filePath) {
	await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function isFresh(sourcePath, outputPath) {
	try {
		const [sourceStats, outputStats] = await Promise.all([
			fs.stat(sourcePath),
			fs.stat(outputPath),
		]);
		return outputStats.mtimeMs >= sourceStats.mtimeMs;
	} catch {
		return false;
	}
}

async function compressFile(sourcePath) {
	const relativePath = path.relative(PUBLIC_DIR, sourcePath);
	const parsedPath = path.parse(relativePath);
	const targetWebp = path.join(
		OUTPUT_DIR,
		parsedPath.dir,
		`${parsedPath.name}.webp`,
	);
	const targetAvif = path.join(
		OUTPUT_DIR,
		parsedPath.dir,
		`${parsedPath.name}.avif`,
	);

	await Promise.all([ensureDirectory(targetWebp), ensureDirectory(targetAvif)]);

	const canSkipWebp = await isFresh(sourcePath, targetWebp);
	const canSkipAvif = await isFresh(sourcePath, targetAvif);

	try {
		if (!canSkipWebp) {
			await sharp(sourcePath)
				.rotate()
				.webp({ quality: 75, effort: 5 })
				.toFile(targetWebp);
		}

		if (!canSkipAvif) {
			await sharp(sourcePath)
				.rotate()
				.avif({ quality: 60, effort: 4 })
				.toFile(targetAvif);
		}
	} catch {
		console.warn(`Skipped unsupported image: ${sourcePath}`);
		return {
			generatedWebp: false,
			generatedAvif: false,
			skipped: true,
		};
	}

	return {
		generatedWebp: !canSkipWebp,
		generatedAvif: !canSkipAvif,
		skipped: false,
	};
}

async function run() {
	const allFiles = await readFilesRecursively(PUBLIC_DIR);
	const imageFiles = allFiles.filter((filePath) =>
		SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
	);

	let generatedWebpCount = 0;
	let generatedAvifCount = 0;
	let skippedCount = 0;

	for (const imageFile of imageFiles) {
		const result = await compressFile(imageFile);

		if (result.generatedWebp) {
			generatedWebpCount += 1;
		}

		if (result.generatedAvif) {
			generatedAvifCount += 1;
		}

		if (result.skipped) {
			skippedCount += 1;
		}
	}

	console.log(
		`Compressed ${imageFiles.length} image(s). Generated ${generatedWebpCount} webp and ${generatedAvifCount} avif file(s). Skipped ${skippedCount} file(s).`,
	);
}

run().catch((error) => {
	console.error("Image compression failed:", error);
	process.exitCode = 1;
});
