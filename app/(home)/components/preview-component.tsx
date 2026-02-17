"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { createHighlighter } from "shiki";
import { motion, AnimatePresence } from "motion/react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Markee, MarkeeContent, MarkeeFade, MarkeeItem, MarkeeSpacer } from "@/components/markee";
import { ShimmerText } from "@/components/shimmer-text";
import TechBadge from "@/components/ui/tech-badge";
import Link from "next/link";

const icons = [
	<TechBadge key="nextjs" badge="nextjs" />,
	<TechBadge key="gsap" badge="gsap" />,
	<TechBadge key="react" badge="react" />,
	<TechBadge key="motion" badge="motion" />,
	<TechBadge key="tailwindcss" badge="tailwindcss" />,
];

const demoCode = `<Markee className='w-full'>
    <MarkeeContent>
    {icons.map((icon, index) => (
        <React.Fragment key={index}>
            {icon}
            <MarkeeSpacer className='w-4'/>
        </React.Fragment>
    ))}
    </MarkeeContent>
</Markee>`;

const demoCodeTwo = `<Markee className='w-full'>
    <MarkeeContent>
    {icons.map((icon, index) => (
        <React.Fragment key={index}>
            {icon}
            <MarkeeSpacer className='mx-4'>
                ✦
            </MarkeeSpacer>
        </React.Fragment>
    ))}
    </MarkeeContent>
</Markee>`;

const demoCodeThree = `<Markee className='w-full'>
    <MarkeeFade position="left" />
    <MarkeeContent>
    {icons.map((icon, index) => (
        <React.Fragment key={index}>
            {icon}
            <MarkeeSpacer className='w-4'/>
        </React.Fragment>
    ))}
    </MarkeeContent>
    <MarkeeFade position="right" />
</Markee>`;

const codeSnippets = [demoCode, demoCodeTwo, demoCodeThree];
const cycleMs = 6000;

interface TokenizedLine {
	key: string;
	tokens: Array<{ content: string; color?: string }>;
}

function getLineKeys(lines: string[]): string[] {
	const seen = new Map<string, number>();
	return lines.map((line) => {
		const trimmed = line.trim();
		const idx = seen.get(trimmed) ?? 0;
		seen.set(trimmed, idx + 1);
		return `${trimmed}::${idx}`;
	});
}

function DemoOne() {
	return (
		<Markee className="w-full mx-auto">
			<MarkeeContent>
				{icons.map((icon, index) => (
					<React.Fragment key={index}>
						<MarkeeItem>{icon}</MarkeeItem>
						<MarkeeSpacer className="w-4" />
					</React.Fragment>
				))}
			</MarkeeContent>
		</Markee>
	);
}

function DemoTwo() {
	return (
		<Markee className="w-full mx-auto">
			<MarkeeContent>
				{icons.map((icon, index) => (
					<React.Fragment key={index}>
						<MarkeeItem>{icon}</MarkeeItem>
						<MarkeeSpacer className="mx-2 md:mx-6 flex items-center justify-center text-xs md:text-2xl">
							✦
						</MarkeeSpacer>
					</React.Fragment>
				))}
			</MarkeeContent>
		</Markee>
	);
}

function DemoThree() {
	return (
		<Markee className="w-full mx-auto">
			<MarkeeFade position="left" />
			<MarkeeContent>
				{icons.map((icon, index) => (
					<React.Fragment key={index}>
						<MarkeeItem>{icon}</MarkeeItem>
						<MarkeeSpacer className="w-4" />
					</React.Fragment>
				))}
			</MarkeeContent>
			<MarkeeFade position="right" />
		</Markee>
	);
}

const demos = [DemoOne, DemoTwo, DemoThree];

function PreviewComponentEditor({
	className,
	isMobile,
	...props
}: React.ComponentProps<"div"> & { isMobile: boolean }) {
	const [allTokenized, setAllTokenized] = useState<TokenizedLine[][]>([]);
	const [codeIndex, setCodeIndex] = useState(0);

	// Tokenize every code snippet once with Shiki
	useEffect(() => {
		let cancelled = false;
		createHighlighter({
			themes: ["github-dark"],
			langs: ["tsx"],
		})
			.then((hl) => {
				if (cancelled) return;
				const tokenized = codeSnippets.map((code) => {
					const result = hl.codeToTokens(code, { lang: "tsx", theme: "github-dark" });
					const rawLines = code.split("\n");
					const keys = getLineKeys(rawLines);
					return result.tokens.map((lineTokens, i) => ({
						key: keys[i],
						tokens: lineTokens.map((t) => ({ content: t.content, color: t.color })),
					}));
				});
				setAllTokenized(tokenized);
			})
			.catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);

	// Cycle through snippets
	useEffect(() => {
		if (allTokenized.length === 0) return;
		const id = setInterval(() => {
			setCodeIndex((i) => (i + 1) % codeSnippets.length);
		}, cycleMs);
		return () => clearInterval(id);
	}, [allTokenized]);

	const currentLines = allTokenized[codeIndex] ?? [];

	const snippetLabel = `Example ${codeIndex + 1} of ${codeSnippets.length}`;

	return (
		<section
			aria-roledescription="code preview carousel"
			aria-label="Markee component interactive code preview"
			className={cn(
				"w-full min-w-0 rounded-2xl border border-border overflow-hidden h-[500px] md:h-auto",
				className
			)}
			{...props}
		>
			<span className="sr-only" aria-live="polite" aria-atomic="true">
				{snippetLabel}
			</span>
			<ResizablePanelGroup orientation={isMobile ? "vertical" : "horizontal"} disabled={isMobile}>
				{/* Code panel — animated read-only */}
				<ResizablePanel defaultSize={isMobile ? 70 : 50}>
					<section
						aria-label={`Source code — ${snippetLabel}`}
						className="h-full md:h-fit py-12 md:py-20 px-4 md:px-12 bg-muted dark grid place-items-center relative overflow-x-auto min-w-0"
					>
						<ShimmerText asChild>
							<Link
								href="/docs/components/markee"
								aria-label="View Markee component documentation"
								className="absolute top-4 left-4 font-sans text-sm [background:radial-gradient(circle_at_center,var(--primary),transparent)_-200%_50%/200%_100%_no-repeat,var(--primary-foreground)] text-primary"
							>
								Markee Component
							</Link>
						</ShimmerText>
						{/* Fallback while Shiki loads */}
						{currentLines.length === 0 && (
							<figure aria-label="Markee component source code">
								<pre className="w-full">
									<code className="block font-mono text-[10px] md:text-[13px] leading-[1.7] text-[#e1e4e8] whitespace-pre">
										{codeSnippets[0]}
									</code>
								</pre>
							</figure>
						)}

						{currentLines.length > 0 && (
							<figure aria-label="Markee component source code">
								<pre className="w-full">
								<motion.code
									layout
									className="block relative font-mono text-[10px] md:text-[13px] leading-[1.7] [tab-size:4]"
									aria-hidden="true"
								>
									<AnimatePresence mode="popLayout" initial={false}>
										{currentLines.map(({ key, tokens }) => (
											<motion.span
												key={key}
												layout
												initial={{
													opacity: 0,
													filter: "blur(4px)",
												}}
												animate={{
													opacity: 1,
													filter: "blur(0px)",
												}}
												exit={{
													opacity: 0,
													filter: "blur(4px)",
												}}
												transition={{
													layout: {
														duration: 0.5,
														ease: [0.25, 0.1, 0.25, 1],
													},
													opacity: { duration: 0.35 },
													filter: { duration: 0.35 },
												}}
												className="block whitespace-pre rounded-sm"
											>
												{tokens.map((token, j) => (
													<span key={j} style={{ color: token.color }}>
														{token.content}
													</span>
												))}
											</motion.span>
										))}
									</AnimatePresence>
								</motion.code>
								<code className="sr-only">{codeSnippets[codeIndex]}</code>
								</pre>
							</figure>
						)}
					</section>
				</ResizablePanel>

				<ResizableHandle withHandle aria-label="Resize code and preview panels" className="hidden md:flex" />

				{/* Preview panel — synced with code */}
				<ResizablePanel defaultSize={isMobile ? 30 : 50} minSize={0}>
					<section
						aria-label="Live preview"
						className="h-full w-full bg-background flex items-center justify-center overflow-hidden relative contain-[inline-size]"
					>
						<AnimatePresence mode="wait">
							<motion.div
								key={codeIndex}
								initial={{ opacity: 0, filter: "blur(6px)" }}
								animate={{ opacity: 1, filter: "blur(0px)" }}
								exit={{ opacity: 0, filter: "blur(6px)" }}
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="w-full min-w-0 overflow-hidden"
							>
								{React.createElement(demos[codeIndex])}
							</motion.div>
						</AnimatePresence>
					</section>
				</ResizablePanel>
			</ResizablePanelGroup>
		</section>
	);
}

export { PreviewComponentEditor };
