"use client";
import { DemoBlock } from "@/components/demo-block";
import { useHydration } from "@/hooks/use-hydration";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { interFont } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Prata } from "next/font/google";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { TextReveal, TextRevealLine, TextRevealHandle } from "@/components/text-reveal";

gsap.registerPlugin(ScrollTrigger);

const prata = Prata({ weight: "400", subsets: ["latin"], variable: "--font-prata" });

const textClasses = cn(
	"text-2xl md:text-4xl lg:text-6xl font-bold uppercase text-foreground -tracking-wider text-center leading-tight flex",
	interFont
);
const accentClasses = cn("text-primary", prata.className);

const demoLines = [<TextRevealLine className="bg-primary" key="0" />];

const DemoTextContent: React.FC = () => (
	<>
		<strong className={accentClasses}>Redefining</strong> Web, Chasing
		<strong className={accentClasses}>Performance</strong>, Bringing It All In All Ways. Defining A
		<strong className={accentClasses}>Standard</strong> With Random Access Components.
	</>
);

const TextRevealDemo: React.FC = () => {
	const isMounted = useHydration();
	const ref = useRef<TextRevealHandle>(null);
	const [animating, setAnimating] = useState(false);

	if (!isMounted) return null;

	return (
		<DemoBlock className="m-0">
			<div className="flex flex-col gap-12 justify-center items-center">
				<TextReveal
					ref={ref}
					lines={demoLines}
					lineClassName="mx-auto"
					className={textClasses}
					startVisible
				>
					<DemoTextContent />
				</TextReveal>
				<Button
					onClick={() =>
						ref.current?.play({
							onStart: () => setAnimating(true),
							onComplete: () => setAnimating(false),
						})
					}
					disabled={animating}
				>
					{animating ? "Animating..." : "Run animation"}
				</Button>
			</div>
		</DemoBlock>
	);
};

const TextRevealAlternativeDemo: React.FC = () => {
	const isMounted = useHydration();
	const ref = useRef<TextRevealHandle>(null);
	const [animating, setAnimating] = useState(false);

	if (!isMounted) return null;

	return (
		<DemoBlock containerClassName="py-12" className="m-0">
			<div className="flex flex-col gap-12 justify-center items-center">
				<TextReveal
					ref={ref}
					lines={demoLines}
					lineClassName="mx-auto"
					className={textClasses}
					textAnimation={{ duration: 0.8, stagger: 0.05, ease: "power2.out" }}
					revealAnimation={{ duration: 0.8, stagger: 0.05 }}
					startVisible
				>
					<DemoTextContent />
				</TextReveal>
				<Button
					onClick={() =>
						ref.current?.play({
							onStart: () => setAnimating(true),
							onComplete: () => setAnimating(false),
						})
					}
					disabled={animating}
				>
					{animating ? "Animating..." : "Run animation"}
				</Button>
			</div>
		</DemoBlock>
	);
};

const TextRevealWrongDemo: React.FC = () => {
	const isMounted = useHydration();
	const ref = useRef<TextRevealHandle>(null);
	const [animating, setAnimating] = useState(false);

	if (!isMounted) return null;

	return (
		<DemoBlock containerClassName="py-12" className="m-0">
			<div className="flex flex-col gap-12 justify-center items-center">
				<TextReveal
					ref={ref}
					lines={demoLines}
					lineClassName="mx-auto"
					className={textClasses}
					textAnimation={{ duration: 0.3, stagger: 0.05, ease: "sine.inOut" }}
					revealAnimation={{ duration: 1, stagger: 0.2 }}
					startVisible
				>
					<DemoTextContent />
				</TextReveal>
				<Button
					onClick={() =>
						ref.current?.play({
							onStart: () => setAnimating(true),
							onComplete: () => setAnimating(false),
						})
					}
					disabled={animating}
				>
					{animating ? "Animating..." : "Run animation"}
				</Button>
			</div>
		</DemoBlock>
	);
};

const TextRevealScrollingDemo: React.FC = () => {
	const ref = useRef<TextRevealHandle>(null);

	useGSAP(() => {
		if (!ref.current) return;
		ref.current.play({
			scrollTrigger: {
				trigger: ref.current.element,
				start: "top 70%",
			},
		});
	});

	return (
		<DemoBlock containerClassName="py-12 h-[400px] overflow-scroll relative" className="m-0">
			<div className="h-[400px] grid place-items-center">
				<span className="text-muted-foreground text-sm md:text-base">
					Scroll to see the animation
				</span>
			</div>
			<TextReveal ref={ref} lines={demoLines} lineClassName="mx-auto" className={textClasses}>
				<DemoTextContent />
			</TextReveal>
		</DemoBlock>
	);
};

export { TextRevealDemo, TextRevealAlternativeDemo, TextRevealWrongDemo, TextRevealScrollingDemo };
