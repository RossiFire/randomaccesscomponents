"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

type TextRevealHandle = {
	/** Resets state and plays the reveal animation. Accepts optional gsap.timeline() vars (e.g. scrollTrigger). */
	play: (timelineVars?: gsap.TimelineVars) => gsap.core.Timeline;
	/** Resets the animation to its initial hidden state. */
	reset: () => void;
	/** The container DOM element. */
	element: HTMLElement | null;
};

function createDefaultLineReveal(): HTMLDivElement {
	const div = document.createElement("div");
	div.className =
		"high-line-reveal absolute bottom-0 left-0 w-full h-full bg-primary will-change-transform origin-[right_center]";
	return div;
}

function splitAndPrepare(
	container: HTMLElement,
	linesContainer: HTMLElement | null,
	startVisible: boolean,
	asChild: boolean,
	lineClassName?: string
) {
	const targets = asChild
		? [container]
		: (gsap.utils.toArray(
				container.querySelectorAll('[data-slot="text-reveal-content"]')
			) as HTMLElement[]);

	const templates = linesContainer ? (Array.from(linesContainer.children) as HTMLElement[]) : [];

	targets.forEach((target) => {
		const split = new SplitText(target, { type: "lines", aria: "none" });
		split.lines.forEach((line, i) => {
			line.classList.add("faded-text", "relative", "w-fit");
			if (lineClassName) line.classList.add(...lineClassName.split(" ").filter(Boolean));

			if (templates.length > 0) {
				const reveal = templates[i % templates.length].cloneNode(true) as HTMLElement;
				reveal.classList.add("high-line-reveal");
				Object.assign(reveal.style, {
					position: "absolute",
					bottom: "0",
					left: "0",
					width: "100%",
					height: "100%",
					willChange: "transform",
					transformOrigin: "right center",
				});
				line.appendChild(reveal);
			} else {
				line.appendChild(createDefaultLineReveal());
			}
		});

		if (!startVisible) {
			gsap.set(split.lines, { clipPath: "inset(0 100% 0px 0px)" });
		}
	});

	gsap.set(container.querySelectorAll(".high-line-reveal"), {
		scaleX: startVisible ? 0 : 1,
	});
}

function resetState(container: HTMLElement) {
	gsap.set(container.querySelectorAll(".faded-text"), { clipPath: "inset(0 100% 0px 0px)" });
	gsap.set(container.querySelectorAll(".high-line-reveal"), { scaleX: 1 });
}

function TextReveal({
	children,
	className,
	asChild = false,
	startVisible = false,
	lines = [],
	lineClassName,
	textAnimation,
	revealAnimation,
	ref,
	...props
}: Omit<React.ComponentProps<"div">, "ref"> & {
	/** When true, renders the child element directly instead of wrapping in a div. */
	asChild?: boolean;
	/** When true, text is visible immediately. When false, text is hidden until the animation runs. */
	startVisible?: boolean;
	/** Custom line reveal elements. Cycles if fewer than text lines, slices extras. */
	lines?: React.ReactNode[];
	/** Classes applied to each SplitText line (e.g. "mx-auto" for centering). */
	lineClassName?: string;
	/** GSAP tween overrides for the text clip-path reveal. */
	textAnimation?: gsap.TweenVars;
	/** GSAP tween overrides for the line reveal overlay. Use `at` to set timeline position. */
	revealAnimation?: gsap.TweenVars & { at?: string };
	ref?: React.Ref<TextRevealHandle>;
}) {
	const containerRef = React.useRef<HTMLElement>(null);
	const linesRef = React.useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!containerRef.current) return;
		splitAndPrepare(containerRef.current, linesRef.current, startVisible, asChild, lineClassName);
	});

	React.useImperativeHandle(ref, () => {
		const play = (timelineVars?: gsap.TimelineVars) => {
			if (!containerRef.current) return gsap.timeline();
			resetState(containerRef.current);

			const fadedTexts = containerRef.current.querySelectorAll(".faded-text");
			const reveals = containerRef.current.querySelectorAll(".high-line-reveal");
			const { at, ...revealVars } = revealAnimation ?? {};

			return gsap
				.timeline(timelineVars)
				.to(fadedTexts, {
					clipPath: "inset(0px 0% 0px 0px)",
					duration: 0.6,
					stagger: 0.2,
					ease: "power2.inOut",
					...textAnimation,
				})
				.to(
					reveals,
					{
						scaleX: 0,
						duration: 0.6,
						stagger: 0.2,
						ease: "power4.inOut",
						...revealVars,
					},
					at ?? "<20%"
				);
		};

		const reset = () => {
			if (containerRef.current) resetState(containerRef.current);
		};

		return {
			play,
			reset,
			get element() {
				return containerRef.current;
			},
		};
	});

	const linesContainer =
		lines.length > 0 ? (
			<div ref={linesRef} className="hidden" aria-hidden="true">
				{lines}
			</div>
		) : null;

	if (asChild) {
		return (
			<>
				<Slot
					ref={containerRef as React.RefObject<HTMLElement>}
					data-slot="text-reveal"
					className={cn("relative", className)}
					{...props}
				>
					{children}
				</Slot>
				{linesContainer}
			</>
		);
	}

	return (
		<div
			data-slot="text-reveal"
			ref={containerRef as React.RefObject<HTMLDivElement>}
			className={cn("relative", className)}
			{...props}
		>
			<p data-slot="text-reveal-content">{children}</p>
			{linesContainer}
		</div>
	);
}
TextReveal.displayName = "TextReveal";

function TextRevealLine({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="text-reveal-line" className={cn("bg-accent", className)} {...props} />;
}
TextRevealLine.displayName = "TextRevealLine";

export { TextReveal, TextRevealLine, resetState };
export type { TextRevealHandle };
