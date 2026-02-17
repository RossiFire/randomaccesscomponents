"use client";
import { cn } from "@/lib/utils";
import useNoisyBackgroundStore from "../store/noisy-background-store";

interface NoisyBackgroundProps {
	className?: string;
}

const NoisyBackground: React.FC<NoisyBackgroundProps> = ({ className }) => {
	const { isAnimationActive, active, opacity } = useNoisyBackgroundStore();

	return (
		active && (
			<div
				className={cn(
					"pointer-events-none fixed inset-[0%] flex items-center justify-center z-[9999] overflow-hidden",
					className
				)}
			>
				<div
					style={{
						backgroundImage: "url('/assets/noisy-background/noisy_texture.webp')",
						flex: "none",
						width: "300%",
						maxWidth: "none",
						height: "300%",
						position: "absolute",
						backgroundSize: "256px",
						animation: isAnimationActive ? "noise 1s steps(1) infinite" : "none",
						opacity: opacity,
					}}
				></div>
			</div>
		)
	);
};

export default NoisyBackground;
