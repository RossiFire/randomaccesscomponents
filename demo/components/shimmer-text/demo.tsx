import { DemoBlock } from "@/components/demo-block";
import { ShimmerText } from "@/components/shimmer-text";

function ShimmerTextDemo() {
	return (
		<DemoBlock>
			<p className="text-lg md:text-2xl text-center font-sans tracking-tight text-muted-foreground">
				This is a <ShimmerText className="font-medium">shimmer text</ShimmerText> component
			</p>
		</DemoBlock>
	);
}

export { ShimmerTextDemo };
