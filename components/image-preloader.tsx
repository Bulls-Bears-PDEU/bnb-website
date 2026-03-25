"use client";

import { useEffect } from "react";
import { resolveOptimizedImageSrc } from "@/lib/image-utils";

type ImagePreloaderProps = {
	sources: string[];
};

function preloadImage(src: string) {
	const image = new window.Image();
	image.decoding = "async";
	image.loading = "eager";
	image.src = resolveOptimizedImageSrc(src);
}

export default function ImagePreloader({ sources }: ImagePreloaderProps) {
	useEffect(() => {
		if (!sources.length) {
			return;
		}

		const [first, second, ...rest] = sources;

		if (first) {
			preloadImage(first);
		}

		if (second) {
			preloadImage(second);
		}

		const preloadRemaining = () => {
			rest.forEach(preloadImage);
		};

		const idleWindow = window as Window & {
			requestIdleCallback?: (callback: IdleRequestCallback) => number;
			cancelIdleCallback?: (handle: number) => void;
		};

		if (typeof idleWindow.requestIdleCallback === "function") {
			const callbackId = idleWindow.requestIdleCallback(() =>
				preloadRemaining(),
			);
			return () => idleWindow.cancelIdleCallback?.(callbackId);
		}

		const timeoutId = globalThis.setTimeout(preloadRemaining, 250);
		return () => globalThis.clearTimeout(timeoutId);
	}, [sources]);

	return null;
}
