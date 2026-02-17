"use client";

import { DemoBlock } from "@/components/demo-block";
import { Ripple } from "./Ripple";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const RippleButtonDemo: React.FC = () => {
	const cardRef = useRef<HTMLDivElement>(null);

	const buttonRef = useRef<HTMLButtonElement>(null);

	return (
		<DemoBlock
			className="m-0"
			containerClassName="min-h-82 flex items-center justify-center gap-12"
		>
			<button
				id="myButton"
				className="px-6 py-2 group z-10 font-medium border-2 border-accent-demo cursor-pointer rounded-lg relative overflow-hidden"
			>
				<Ripple parent="#myButton" className="bg-accent-demo" />
				<span className="relative z-10">I&apos;m a button</span>
			</button>
			<div
				ref={cardRef}
				className="group relative w-64 rounded-2xl border border-[#2fc9da]/20 bg-[#2fc9da]/[0.03] px-6 py-5 overflow-hidden cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_24px_-4px_rgba(47,201,218,0.25)]"
			>
				<div className="absolute top-0 left-6 h-px w-12 bg-gradient-to-r from-transparent via-[#2fc9da] to-transparent" />
				<div className="relative z-10 flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<span className="text-[11px] font-medium uppercase tracking-widest text-[#2fc9da] group-hover:text-white transition-colors duration-300">
							Interactive
						</span>
						<span className="size-1.5 rounded-full bg-[#2fc9da] animate-pulse" />
					</div>
					<div>
						<h3 className="font-serif text-lg leading-tight group-hover:text-white transition-colors duration-300">
							I&apos;m a card
						</h3>
						<p className="mt-1 text-sm text-muted-foreground mb-0 group-hover:text-white transition-colors duration-300">
							Hover to reveal the ripple filling the container from cursor position.
						</p>
					</div>
					<div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-white transition-colors duration-300">
						<span>Try it</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
						>
							<path d="M5 12h14" />
							<path d="m12 5 7 7-7 7" />
						</svg>
					</div>
				</div>
				<Ripple parent={cardRef} className="bg-[#2fc9da]/80 size-52" />
			</div>
			<Button ref={buttonRef} className="relative overflow-hidden group">
				<div className="z-20 relative">Design System Button</div>
				<Ripple parent={buttonRef} className="bg-primary" />
			</Button>
		</DemoBlock>
	);
};

export { RippleButtonDemo };
