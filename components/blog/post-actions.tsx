"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type PostActionsProps = {
	postId: number;
	postTitle: string;
};

const SAVED_BLOGS_KEY = "bnb:saved-blogs";

function getSavedBlogs(): number[] {
	if (typeof window === "undefined") {
		return [];
	}

	try {
		const raw = window.localStorage.getItem(SAVED_BLOGS_KEY);
		if (!raw) {
			return [];
		}

		const parsed = JSON.parse(raw);
		return Array.isArray(parsed)
			? parsed.filter((id) => Number.isInteger(id))
			: [];
	} catch {
		return [];
	}
}

function setSavedBlogs(ids: number[]) {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(SAVED_BLOGS_KEY, JSON.stringify(ids));
}

export default function PostActions({ postId, postTitle }: PostActionsProps) {
	const [isSaved, setIsSaved] = useState(false);
	const [shareLabel, setShareLabel] = useState("Share");

	useEffect(() => {
		const saved = getSavedBlogs();
		setIsSaved(saved.includes(postId));
	}, [postId]);

	const handleToggleSave = () => {
		const saved = getSavedBlogs();

		if (saved.includes(postId)) {
			const next = saved.filter((id) => id !== postId);
			setSavedBlogs(next);
			setIsSaved(false);
			return;
		}

		const next = Array.from(new Set([...saved, postId]));
		setSavedBlogs(next);
		setIsSaved(true);
	};

	const handleShare = async () => {
		const shareUrl = window.location.href;

		try {
			if (navigator.share) {
				await navigator.share({
					title: postTitle,
					text: `Check out this article: ${postTitle}`,
					url: shareUrl,
				});
				setShareLabel("Shared");
			} else {
				await navigator.clipboard.writeText(shareUrl);
				setShareLabel("Link copied");
			}
		} catch {
			try {
				await navigator.clipboard.writeText(shareUrl);
				setShareLabel("Link copied");
			} catch {
				setShareLabel("Copy failed");
			}
		}

		window.setTimeout(() => setShareLabel("Share"), 1800);
	};

	return (
		<div className="flex gap-2">
			<Button variant="outline" size="sm" onClick={handleShare}>
				<Share2 className="h-4 w-4" />
				{shareLabel}
			</Button>
			<Button
				variant={isSaved ? "default" : "outline"}
				size="sm"
				onClick={handleToggleSave}
			>
				{isSaved ? (
					<BookmarkCheck className="h-4 w-4" />
				) : (
					<Bookmark className="h-4 w-4" />
				)}
				{isSaved ? "Saved" : "Save"}
			</Button>
		</div>
	);
}
