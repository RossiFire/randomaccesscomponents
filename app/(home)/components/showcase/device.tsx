import * as React from "react";
import { cn } from "@/lib/utils";
import TechBadge from "@/components/ui/tech-badge";
import { Markee, MarkeeContent, MarkeeFade, MarkeeSpacer, MarkeeItem } from "@/components/markee";
import Magnet from "@/demo/components/magnet/magnet";
import { MousePointer2Icon } from "lucide-react";
import { Ripple } from "@/demo/components/ripple/Ripple";
import { DemoCard } from "./demo-card";
import { ShowcaseTextReveal } from "./showcase-text-reveal";
import SkewButton from "@/components/ui/skew-button";

const techBadges = [
	<TechBadge key="nextjs" badge="nextjs" />,
	<TechBadge key="gsap" badge="gsap" />,
	<TechBadge key="react" badge="react" />,
	<TechBadge key="typescript" badge="typescript" />,
	<TechBadge key="motion" badge="motion" />,
	<TechBadge key="tailwindcss" badge="tailwindcss" />,
	<TechBadge key="css" badge="css" />,
	<TechBadge key="radix" badge="radix" />,
];

function Device({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"relative h-[70vh] aspect-[1.2/1] rounded-[3.2rem] border border-border/70 bg-linear-to-br from-muted dark:from-muted",
				"to-muted dark:to-muted p-2 shadow-[0_55px_110px_-40px_color-mix(in_srgb,var(--foreground)_20%,transparent)] dark:shadow-[0_55px_110px_-40px_color-mix(in_srgb,var(--primary)_2%,transparent)] backdrop-blur-sm dark:from-muted",
				"dark:to-background/80 z-20",
				"-translate-x-1/2 -translate-y-1/2 overflow-ellipsis",
				className
			)}
			{...props}
		>
			<div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-[#a6cdb2] dark:bg-[#0A0A0A] p-4 grid grid-cols-12 gap-4">
				<DemoCard name="Markee" link="/docs/components/markee" className="col-span-8">
					<DemoMarkee />
				</DemoCard>
				<DemoCard className="col-span-4" name="Magnet" link="/docs/components/magnet">
					<Magnet className="rounded-full bg-accent cursor-pointer text-accent-foreground p-3 border border-accent-foreground/10">
						<MousePointer2Icon className="size-6" />
					</Magnet>
				</DemoCard>

				<DemoCard
					className="col-span-6"
					name="Skew button"
					link="/docs/components/skew-button"
				>
					<SkewButton shadowClassName="bg-[#396CB3]" 
					className="border-[#396CB3] text-[#396CB3]"
					>Skew button</SkewButton>
				</DemoCard>
				<DemoCard className="col-span-6" name="Lift text" link="/docs/components/lift-text">
					<LiftText text="Hover Me" />
				</DemoCard>
				<ShowcaseTextReveal />
				<DemoCard className="col-span-5" name="Ripple" link="/docs/components/ripple">
					<div
						id="device-demo-card"
						className="relative w-36 overflow-hidden rounded-xl border border-accent-demo/20 bg-accent-demo/5 backdrop-blur-sm cursor-pointer"
					>
						<Ripple parent="#device-demo-card" className="bg-accent-demo/30" />
						<div className="relative z-10 flex flex-col gap-2 p-3 will-change-transform">
							<div className="flex items-center gap-2">
								<div className="size-7 rounded-full bg-accent-demo/15 flex items-center justify-center text-sm">👋🏻</div>
								<div className="flex flex-col items-start">
									<span className="text-[11px] font-semibold text-accent-demo">Hey folks!</span>
									<span className="text-[9px] text-muted-foreground">Hover me</span>
								</div>
							</div>
							<div className="h-px w-full bg-accent-demo/10" />
							<div className="flex gap-1.5">
								<div className="h-1 flex-1 rounded-full bg-accent-demo/20" />
								<div className="h-1 w-8 rounded-full bg-accent-demo/10" />
							</div>
						</div>
					</div>
				</DemoCard>
			</div>
		</div>
	);
}

function DemoMarkee() {
	return (
		<Markee className="w-full">
			<MarkeeFade position="left" className="from-background/80" />
			<MarkeeContent duration={20}>
				{techBadges.map((badge, index) => (
					<React.Fragment key={index}>
						<MarkeeItem>{badge}</MarkeeItem>
						<MarkeeSpacer className="w-2 md:w-4" />
					</React.Fragment>
				))}
			</MarkeeContent>
			<MarkeeFade position="right" className="from-background/80" />
		</Markee>
	);
}

function LiftText({
	className,
	text,
	...props
}: Omit<React.ComponentProps<"a">, "children"> & { text: string }) {
	return (
		<div className="overflow-hidden">
			<a
				className={cn(
					"text-muted-foreground hover:text-primary-foreground transition-colors duration-300 no-underline leading-none cursor-pointer",
					"group/lift",
					className
				)}
				style={{
					textShadow: "0 2.7ex 0",
				}}
				{...props}
			>
				{text.split("").map((char, index) => {
					if (char === " ") {
						return <span key={index}> </span>;
					}
					return (
						<span
							key={index}
							className="relative inline-block group-hover/lift:animate-[lift-text-up-home_0.2s_forwards]"
							style={{
								animationDelay: "calc(sibling-index() * 0.02s)",
							}}
						>
							{char}
						</span>
					);
				})}
			</a>
		</div>
	);
}

export default Device;
