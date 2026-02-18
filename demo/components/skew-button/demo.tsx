import { DemoBlock } from "@/components/demo-block";
import SkewButton from "@/components/ui/skew-button";
import { SearchIcon } from "lucide-react";

function SkewButtonDemo() {
	return (
		<DemoBlock>
			<div className="flex items-center justify-center gap-4">
				<SkewButton>Skew button</SkewButton>
				<SkewButton as="link" href="#" direction="right" className="no-underline hover:opacity-100">
					I&apos;m a link
				</SkewButton>
				<SkewButton variant="icon" direction="center">
					<SearchIcon className="size-5" />
				</SkewButton>
			</div>
		</DemoBlock>
	);
}

export { SkewButtonDemo };
