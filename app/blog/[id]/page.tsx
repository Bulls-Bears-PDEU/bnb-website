import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer";
import Breadcrumb from "@/components/ui/breadcrumb"
import { CalendarDays, User, Tag, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { blogs } from "@/app/blogs";
import PostActions from "@/components/blog/post-actions";

type BlogRouteParams = {
	id: string;
};

type BlogSection = {
	title: string;
	subtitle?: string;
	paragraphs: string[];
	bullets?: string[];
};

const sectionTitles = [
	"Context",
	"Market Shift",
	"Why It Matters",
	"Risk Layer",
	"Behavioral Angle",
	"System Impact",
	"What To Watch",
	"Investor View",
	"Final Take",
];

const splitIntoParagraphs = (content: string) => {
	const byLineBreak = content
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	if (byLineBreak.length > 1) {
		return byLineBreak;
	}

	return content
		.split(/(?<=[.!?])\s+(?=[A-Z])/)
		.reduce<string[]>((chunks, sentence) => {
			const trimmed = sentence.trim();
			if (!trimmed) {
				return chunks;
			}

			const lastChunk = chunks[chunks.length - 1];
			if (!lastChunk) {
				chunks.push(trimmed);
				return chunks;
			}

			const sentenceCount = lastChunk.split(/(?<=[.!?])\s+/).length;
			if (sentenceCount >= 3) {
				chunks.push(trimmed);
			} else {
				chunks[chunks.length - 1] = `${lastChunk} ${trimmed}`;
			}

			return chunks;
		}, []);
};

const createSections = (content: string) => {
	const paragraphs = splitIntoParagraphs(content);
	const sections: BlogSection[] = [];

	for (let i = 0; i < paragraphs.length; i += 2) {
		const pair = paragraphs.slice(i, i + 2);
		const title =
			sectionTitles[Math.min(Math.floor(i / 2), sectionTitles.length - 1)];

		sections.push({
			title,
			subtitle:
				pair.length > 1 ? `Section ${Math.floor(i / 2) + 1}` : undefined,
			paragraphs: pair,
		});
	}

	const lastSection = sections[sections.length - 1];
	if (lastSection) {
		const keyPoints = paragraphs
			.slice(-3)
			.map((paragraph) => paragraph.split(/[.!?]/)[0]?.trim())
			.filter((point): point is string => Boolean(point));

		if (keyPoints.length > 0) {
			lastSection.bullets = keyPoints;
		}
	}

	return sections;
};

const getReadTime = (content: string) => {
	const words = content.trim().split(/\s+/).length;
	return `${Math.max(3, Math.ceil(words / 220))} min read`;
};

export async function generateStaticParams() {
  return blogs.map((post) => ({
			id: post.id.toString(),
		}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<BlogRouteParams>;
}) {
	const { id } = await params;
	const post = blogs.find((blog) => blog.id.toString() === id);

	if (!post) {
		return {
			title: "Post Not Found",
			description: "The requested blog post could not be found",
		};
	}

	return {
		title: `${post.title} | Bulls & Bears Insights`,
		description: post.excerpt,
		openGraph: {
			title: `${post.title} | Bulls & Bears Insights`,
			description: post.excerpt,
			images: [
				{
					url: post.image,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${post.title} | Bulls & Bears Insights`,
			description: post.excerpt,
			images: [{ url: post.image }],
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<BlogRouteParams>;
}) {
	const { id } = await params;
	const post = blogs.find((blog) => blog.id.toString() === id);

	if (!post) {
		notFound();
	}

	const sections = createSections(post.content);

	return (
		<main className="min-h-screen bg-background text-foreground">
			<Header />
			<div className="container px-4 pt-28 pb-16 max-w-6xl">
				<Breadcrumb
					items={[
						{ label: "Home", href: "/" },
						{ label: "Blog", href: "/blog" },
						{ label: post.title, href: `/blog/${post.id}`, active: true },
					]}
					//className="mb-8"
				/>

				<article className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
					{/* Featured Image */}
					<div className="h-96 w-full relative">
						<Image
							src={post.image}
							alt={post.title}
							fill
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					</div>

					{/* Article Header */}
					<div className="px-8 py-6">
						<div className="flex items-center gap-4 mb-4">
							<span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
								{post.category ?? "Blog"}
							</span>
							<div className="flex items-center gap-2 text-muted-foreground">
								<CalendarDays className="h-4 w-4" />
								<span className="text-sm">{post.date}</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<User className="h-4 w-4" />
								<span className="text-sm">
									By {post.author ?? "Bulls & Bears"}
								</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Clock className="h-4 w-4" />
								<span className="text-sm">{getReadTime(post.content)}</span>
							</div>
						</div>

						<h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
							{post.title}
						</h1>

						<p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

						<div className="flex flex-wrap gap-2 mb-6">
							{(post.tags ?? []).map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground"
								>
									<Tag className="h-3 w-3" />
									{tag}
								</span>
							))}
						</div>
					</div>

					<Separator className="my-4" />

					{/* Article Content */}
					<div className="px-6 py-8 sm:px-8 sm:py-10">
						<div className="mx-auto max-w-3xl space-y-10">
							{sections.map((section, index) => (
								<section
									key={`${section.title}-${index}`}
									className="space-y-4"
								>
									<h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
										{section.title}
									</h2>
									{section.subtitle && (
										<h3 className="text-base font-semibold uppercase tracking-wide text-amber-700">
											{section.subtitle}
										</h3>
									)}
									<div className="space-y-4">
										{section.paragraphs.map((paragraph, paragraphIndex) => (
											<p
												key={`${section.title}-p-${paragraphIndex}`}
												className="text-base leading-8 text-foreground/90 sm:text-[1.06rem]"
											>
												{paragraph}
											</p>
										))}
									</div>
									{section.bullets && section.bullets.length > 0 && (
										<ul className="list-disc space-y-2 pl-6 text-foreground/90 marker:text-amber-600">
											{section.bullets.map((bullet) => (
												<li key={bullet} className="leading-7">
													{bullet}
												</li>
											))}
										</ul>
									)}
								</section>
							))}
						</div>
					</div>

					{/* Article Footer */}
					<div className="px-8 py-6 border-t">
						<div className="flex justify-between items-center">
							<Button variant="outline" asChild>
								<Link href="/blog">← Back to Blog</Link>
							</Button>
							<PostActions postId={post.id} postTitle={post.title} />
						</div>
					</div>
				</article>

				{/* Related Posts */}
				<div className="mt-16">
					<h2 className="mb-8 text-2xl font-bold text-foreground">
						Related Articles
					</h2>
					{/* <RelatedPosts currentPostId={post.id} allPosts={blogPosts} /> */}
				</div>
			</div>
			<Footer />
		</main>
	);
}