"use client";
import { DemoBlock } from "@/components/demo-block";
import { useBreakPoints } from "./use-breakpoints";
import { cn } from "@/lib/utils";

const UseBreakpointsDemo: React.FC = () => {
	const { isMobile, isTablet, isDesktop } = useBreakPoints();

	return (
		<DemoBlock>
			<div className="text-center space-y-4">
				<div className="text-lg font-semibold text-foreground">Current Breakpoints</div>
				<div className="flex gap-4 w-full items-center justify-center">
					<div className={cn("bg-muted/50 rounded-lg p-4", isMobile && "bg-primary/20")}>
						<div className={"text-base font-bold text-foreground whitespace-nowrap"}>
							Mobile Size
						</div>
					</div>
					<div className={cn("bg-muted/50 rounded-lg p-4", isTablet && "bg-primary/20")}>
						<div className="text-base font-bold text-foreground whitespace-nowrap">Tablet Size</div>
					</div>
					<div className={cn("bg-muted/50 rounded-lg p-4", isDesktop && "bg-primary/20")}>
						<div className="text-base font-bold text-foreground whitespace-nowrap">
							Desktop Size
						</div>
					</div>
				</div>
				<p className="text-sm text-muted-foreground">
					Resize your browser window to see the values update in real-time
				</p>
			</div>
		</DemoBlock>
	);
};

export { UseBreakpointsDemo };
