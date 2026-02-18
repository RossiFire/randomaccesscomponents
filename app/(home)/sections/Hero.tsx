"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useHydration } from "@/hooks/use-hydration";
import { useRef } from "react";
import { ShimmerText } from "@/components/shimmer-text";
import Device from "../components/showcase/device";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GridBackground } from "../components/beam-bg";
import BubbleButton from "@/components/bubble-button";
import useScreenSize from "@/hooks/use-screen-size";
import { TextReveal, type TextRevealHandle } from "@/components/text-reveal";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
	const isMounted = useHydration();
	const { width } = useScreenSize();
	const isMobile = width < 768;
	const deviceRef = useRef<HTMLDivElement>(null);
	const textRevealRef = useRef<TextRevealHandle>(null);

	useGSAP(() => {
		gsap.set(".hero-device", {
			scale: 0.9,
			skewY: 5,
			skewX: 1,
			perspective: 1200,
		});

		if (!isMounted) return;

		const tl = gsap.timeline({ delay: 0.25 });

		/* Initial Timeline */

		tl.from("h1", {
			y: 50,
			opacity: 0,
			delay: 0.25,
			stagger: 0.03,
			ease: "back.out(1.7)",
		})
			.call(
				() => { textRevealRef.current?.play() },
				[],
				"<50%"
			)
			.from(
				".hero-buttons > *",
				{
					opacity: 0,
					stagger: 0.03,
					ease: "power2.inOut",
				},
				"<20%"
			);

		if (!isMobile) {
			tl.from(".hero-device", {
				opacity: 0,
				translateY: "-20%",
				duration: 2,
				ease: "power3.out",
			});
		}

		/* Scroll Timeline */

		if (!isMobile) {
			const scrollTl = gsap.timeline({
				scrollTrigger: {
					trigger: "body",
					start: "top top",
					end: "+=400%",
					pin: ".hero-pin",
					scrub: true,
				},
				onUpdate: () => {
					if (deviceRef.current) {
						const addClass = scrollTl.progress() > 0.5;
						if (addClass) {
							deviceRef.current.classList.add("z-50");
						} else {
							deviceRef.current.classList.remove("z-50");
						}
					}
				},
			});

			scrollTl
				.to(
					".hero-main-content",
					{
						scale: 0.8,
						duration: 1,
						translateX: "-10%",
						ease: "power2.inOut",
					},
					"<"
				)
				.to(
					".hero-device",
					{
						scale: 0.8,
						duration: 1,
						ease: "power2.inOut",
					},
					"<"
				)
				.to(".hero-device", {
					left: "50%",
					top: "100%",
					scale: 1.5,
					skewY: 0,
					skewX: 0,
					duration: 1.2,
					ease: "power2.inOut",
				});
			// Hide main content on small screens since in those cases the device doesn't not cover completely the content
			if (width < 1500) {
				scrollTl.to(
					".hero-main-content",
					{
						translateX: "20%",
						duration: 0.5,
						ease: "power2.inOut",
					},
					"<50%"
				);
			}
		}
	}, [isMounted]);

	return (
		<section className="hero-pin relative min-h-svh w-full bg-background flex flex-col justify-center text-center z-20" aria-label="Hero section">
			<GridBackground />
			<div className="relative isolate container z-2">
				<Device
					ref={deviceRef}
					className="absolute left-3/4 top-1/2 z-0 hidden md:block hero-device"
				/>
				<div className="hero-main-content relative z-10 flex max-w-4xl flex-col items-start gap-8 pointer-events-none">
					<ShimmerText asChild className="[background:radial-gradient(circle_at_center,var(--muted-foreground),transparent)_-200%_50%/200%_100%_no-repeat,var(--primary-foreground)]">
						<h1 className="text-3xl md:text-4xl lg:text-7xl hero-text font-serif text-left">
							Random Access Components
						</h1>
					</ShimmerText>
					<TextReveal ref={textRevealRef} asChild>
						<h2
							className={cn(
								"text-base md:text-xl lg:text-2xl text-left font-light text-muted-foreground px-2 md:px-0 max-w-2xl font-sans"
							)}
						>
							A collection of animated, accessible and performant components. Made for the web.
						</h2>
					</TextReveal>
					<div className="mt-10 flex items-center gap-8 hero-buttons pointer-events-auto">
						<BubbleButton asChild>
							<Link href="/docs/getting-started">View docs</Link>
						</BubbleButton>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
