import Typewriter from "@/components/typewriter";
import { DemoBlock } from "@/components/demo-block";

function TypewriterDemo() {
	return (
		<DemoBlock>
			<p className="text-center text-xl font-semibold tracking-tight md:text-5xl font-serif">
				Built for the web,&nbsp;
				<Typewriter
					text={["Efficient", "Interactive", "Customizable"]}
					speedMs={45}
					deleteSpeedMs={30}
					waitTimeMs={1200}
					initialDelayMs={200}
					cursorClassName="ml-1 text-primary"
					className="text-primary"
				/>
			</p>
		</DemoBlock>
	);
}

export { TypewriterDemo };
