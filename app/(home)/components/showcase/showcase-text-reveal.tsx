"use client";

import { TextReveal, type TextRevealHandle } from "@/components/text-reveal";
import { useRef, useState } from "react";
import { DemoCard } from "./demo-card";

export const ShowcaseTextReveal = () => {
	const ref = useRef<TextRevealHandle>(null);
	const [animating, setAnimating] = useState(false);

	const handleClick = () => {
		if (!ref.current || animating) return;
		ref.current?.play({
			onStart: () => setAnimating(true),
			onComplete: () => setAnimating(false),
		});
	};

	return (
		<DemoCard
			className="col-span-7"
			name="Text reveal"
			link="/docs/components/text-reveal"
		>
			<button type="button" onClick={handleClick}>
				<TextReveal ref={ref} startVisible asChild>
					<span className="font-medium dark:font-bold text-muted-foreground">
						I&apos;M A TEXT REVEAL, CLICK ME TO ANIMATE. <br /> WARNING: I&apos;M TOO COOL.
					</span>
				</TextReveal>
			</button>
		</DemoCard>
	);
};
