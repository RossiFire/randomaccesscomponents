"use client";

import { useRef } from "react";
import { GridBackground } from "../components/beam-bg";
import { Motion, RadixUI, React, TailwindCSS } from "@/components/ui/tech-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useHydration } from "@/hooks/use-hydration";
import useScreenSize from "@/hooks/use-screen-size";
import { Glow } from "@/components/glow";

function Features() {
	const gridRef = useRef<HTMLDivElement>(null);
	const isMounted = useHydration();
	const { width } = useScreenSize();

	useGSAP(() => {
		if (!isMounted) return;

		const cards = gsap.utils.toArray(".glow-card") as HTMLElement[];

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#features > div",
				start: width < 768 ? "top bottom" : "top+=10% 90%",
				end: width < 768 ? "bottom bottom" : "bottom 80%",
				scrub: true,
			},
		});

		tl.from("#features h2", {
			y: 20,
			filter: "blur(10px)",
			duration: 0.5,
			ease: "expo.out",
		}).from(cards, {
			opacity: 0,
			y: 100,
			filter: "blur(10px)",
			duration: 0.5,
			ease: "sine.inOut",
			stagger: 0.1,
		});
	}, [isMounted]);

	return (
		<section
			className="min-h-svh bg-background flex items-end justify-center mt-12 md:mt-0 mb-12 md:mb-52"
			aria-label="Features section"
			id="features"
		>
			<div className="container flex flex-col items-center justify-center gap-10 md:gap-14 lg:gap-20">
				<h2 className="text-2xl md:text-3xl lg:text-5xl font-serif">Built for the Web</h2>
				<div ref={gridRef} className="group/grid grid grid-cols-1 md:grid-cols-2 gap-4">
					<FeatureCard
						title="Easy"
						parentRef={gridRef}
						glowColor="#087EA4"
						description="Complex components are often hard to maintain, complex to understand and impossible to customize. With Random Access Components we've got you covered."
						icon={
							<React
								size="extra"
								className="absolute left-[65%] top-[10%] rotate-8 text-[#087EA4]/40 dark:text-muted-foreground/20"
							/>
						}
					/>
					<FeatureCard
						title="Customizable"
						parentRef={gridRef}
						glowColor="#9b59b6"
						description="Built on top of RadixUI and Shadcn/ui patterns, for standardized and customizable components."
						icon={
							<RadixUI
								size="extra"
								className="absolute left-[65%] top-[10%] rotate-32 text-black/40 dark:text-muted-foreground/20"
							/>
						}
					/>
					<FeatureCard
						title="Animated"
						parentRef={gridRef}
						glowColor="#FFDD01"
						description="Components don't have to be just performant, they need be emotional. That's why most of ours are animated with GSAP or Motion."
						icon={
							<Motion
								size="extra"
								className="absolute left-[70%] top-[10%] text-[#FFDD01]/40 dark:text-muted-foreground/20"
							/>
						}
					/>
					<FeatureCard
						title="Accessible"
						parentRef={gridRef}
						glowColor="#38bdf8"
						description="Components are built to be fully accessible, with ARIA attributes and keyboard navigation."
						icon={
							<TailwindCSS
								size="extra"
								className="absolute left-[70%] top-[10%] rotate-2 text-[#38bdf8]/40 dark:text-muted-foreground/20"
							/>
						}
					/>
				</div>
			</div>
		</section>
	);
}

function FeatureCard({
	title,
	description,
	icon,
	glowColor = "var(--primary)",
	parentRef,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	glowColor?: string;
	parentRef?: React.RefObject<HTMLDivElement | null> | null;
}) {
	return (
		<Glow
			parentRef={parentRef}
			glowColor={glowColor}
			className="rounded-lg bg-muted-foreground/20 glow-card"
			aria-label={`${title} card - ${description}`}
		>
			<div className="relative bg-muted min-h-50 font-sans rounded-[7px] px-6 py-8 flex flex-col items-start text-left gap-2 overflow-hidden">
				<GridBackground />
				{icon}
				<span className="text-2xl text-foreground font-serif z-2">{title}</span>
				<span className="text-muted-foreground text-base z-2">{description}</span>
			</div>
		</Glow>
	);
}

export default Features;
