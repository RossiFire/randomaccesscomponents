"use client";
import { motion, type Transition } from "motion/react";
import useScreenSize from "@/demo/hooks/use-screen-size/use-screen-size";
import { cn } from "@/lib/utils";

function GridBackground({
	hideFade = false,
	className,
}: {
	hideFade?: boolean;
	className?: string;
}) {
	return (
		<div
			style={{
				backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--muted-foreground) 5%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--muted-foreground) 5%, transparent) 1px, transparent 1px)
          `,
			}}
			className={cn("absolute bottom-0 left-0 right-0 top-0 bg-size-[32px_32px]", className)}
		>
			{!hideFade && (
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/0 to-background" />
			)}
			<Beams />
		</div>
	);
}

function Beams() {
	const { width } = useScreenSize();

	const numColumns = width ? Math.floor(width / gridBoxSize) : 0;

	const placements = [
		{
			top: gridBoxSize * 0,
			left: Math.floor(numColumns * 0.05) * gridBoxSize,
			transition: {
				duration: 3.5,
				repeatDelay: 5,
				delay: 2,
			},
		},
		{
			top: gridBoxSize * 12,
			left: Math.floor(numColumns * 0.15) * gridBoxSize,
			transition: {
				duration: 3.5,
				repeatDelay: 10,
				delay: 4,
			},
		},
		{
			top: gridBoxSize * 3,
			left: Math.floor(numColumns * 0.25) * gridBoxSize,
		},
		{
			top: gridBoxSize * 9,
			left: Math.floor(numColumns * 0.75) * gridBoxSize,
			transition: {
				duration: 2,
				repeatDelay: 7.5,
				delay: 3.5,
			},
		},
		{
			top: 0,
			left: Math.floor(numColumns * 0.7) * gridBoxSize,
			transition: {
				duration: 3,
				repeatDelay: 2,
				delay: 1,
			},
		},
		{
			top: gridBoxSize * 2,
			left: Math.floor(numColumns * 1) * gridBoxSize - gridBoxSize,
			transition: {
				duration: 5,
				repeatDelay: 5,
				delay: 5,
			},
		},
	];

	return (
		<>
			{placements.map((p, i) => (
				<Beam key={i} top={p.top} left={p.left - beamWidthOffset} transition={p.transition || {}} />
			))}
		</>
	);
}

function Beam({
	top,
	left,
	transition = {},
}: {
	top: number;
	left: number;
	transition?: Transition;
}) {
	return (
		<motion.div
			initial={{
				y: 0,
				opacity: 0,
			}}
			animate={{
				opacity: [0, 1, 0],
				y: 32 * 8,
			}}
			transition={{
				ease: "easeInOut",
				duration: 3,
				repeat: Infinity,
				repeatDelay: 1.5,
				...transition,
			}}
			style={{
				top,
				left,
			}}
			className="absolute z-[1] h-[64px] w-[1px] bg-gradient-to-b from-primary/0 to-primary"
		/>
	);
}

const gridBoxSize = 32;
const beamWidthOffset = 1;

export { GridBackground };
