"use client";
import { DemoBlock } from "@/components/demo-block";
import { Glow } from "@/components/glow";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

function GlowDemo() {
	const gridRef = useRef<HTMLDivElement>(null);

	return (
		<DemoBlock containerClassName="flex flex-col items-center justify-center h-fit p-8">
			<div className="flex flex-col items-center justify-center gap-4 w-full h-[600px]">
				<h2 className="text-2xl font-serif text-foreground mb-0 mt-4">Glow Card</h2>
				<p className="text-muted-foreground text-base">
					A card with a glow effect when you hover on it.
				</p>
				<div ref={gridRef} className="grid grid-cols-3 grid-rows-3 gap-2 size-full group/grid">
					<Glow
						parentRef={gridRef}
						glowColor="#087EA4"
						className="rounded-lg bg-muted-foreground/20 col-span-2 row-span-1"
					>
						<div className="relative bg-muted size-full font-sans rounded-[7px] p-4 flex flex-col items-start text-left gap-2 overflow-hidden">
							<span className="text-2xl text-foreground font-serif z-[2]">Efficient</span>
							<span className="text-muted-foreground text-base z-[2]">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
							</span>
							<ArrowRight className="size-4 mt-4 text-muted-foreground z-[2] group-hover/card:translate-x-2 group-hover/card:text-primary transition-transform duration-300" />
						</div>
					</Glow>
					<Glow
						parentRef={gridRef}
						glowColor="#9b59b6"
						className="rounded-lg bg-muted-foreground/20 col-span-1 row-span-2"
					>
						<div className="relative bg-muted size-full font-sans rounded-[7px] p-4 flex flex-col items-start text-left gap-2 overflow-hidden">
							<span className="text-2xl text-foreground font-serif z-[2]">Customizable</span>
							<span className="text-muted-foreground text-base z-[2]">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
							</span>
							<ArrowRight className="size-4 mt-4 text-muted-foreground z-[2] group-hover/card:translate-x-2 group-hover/card:text-primary transition-transform duration-300" />
						</div>
					</Glow>
					<Glow
						parentRef={gridRef}
						glowColor="#FFDD01"
						className="rounded-lg bg-muted-foreground/20 col-span-2 row-span-2"
					>
						<div className="relative bg-muted size-full font-sans rounded-[7px] p-4 flex flex-col items-start text-left gap-2 overflow-hidden">
							<span className="text-2xl text-foreground font-serif z-[2]">Animated</span>
							<span className="text-muted-foreground text-base z-[2]">
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
								Ipsum has been the industry's standard dummy text ever since the 1500s, when an
								unknown printer took a galley of type and scrambled it to make a type specimen book.
							</span>
							<ArrowRight className="size-4 mt-4 text-muted-foreground z-[2] group-hover/card:translate-x-2 group-hover/card:text-primary transition-transform duration-300" />
						</div>
					</Glow>
					<Glow
						parentRef={gridRef}
						glowColor="#38bdf8"
						className="rounded-lg bg-muted-foreground/20 col-span-1 row-span-1"
					>
						<div className="relative bg-muted size-full font-sans rounded-[7px] p-4 flex flex-col items-start text-left gap-2 overflow-hidden">
							<span className="text-2xl text-foreground font-serif z-[2]">Accessible</span>
							<span className="text-muted-foreground text-base z-[2]">Lorem ipsum.</span>
							<ArrowRight className="size-4 min-size- mt-4 text-muted-foreground z-[2] group-hover/card:translate-x-2 group-hover/card:text-primary transition-transform duration-300" />
						</div>
					</Glow>
				</div>
			</div>
		</DemoBlock>
	);
}

export { GlowDemo };
