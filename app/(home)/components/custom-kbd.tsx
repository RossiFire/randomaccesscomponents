"use client";

import { KeyboardButton } from "@/components/keyboard-button";
import { useOs } from "@/hooks/use-os";
import { cn } from "@/lib/utils";

interface CustomKbdProps {
	className?: string;
}

function CustomKbd({ className }: CustomKbdProps) {
	const simulate = () => {
		const isMac = /Mac|iPod|iPhone|iPad/i.test(navigator.platform);

		const keyboardEvent = new KeyboardEvent("keydown", {
			key: "k",
			code: "KeyK",
			bubbles: true,
			cancelable: true,
			metaKey: isMac,
			ctrlKey: !isMac,
		});

		document.dispatchEvent(keyboardEvent);
	};

	const os = useOs();

	return (
		<KeyboardButton
			aria-label="Open searchbar documentation"
			className={cn(
				"text-primary border-muted-foreground/50 mb-2 bg-background min-h-0 flex items-center p-1 h-fit rounded-sm border text-xs md:px-2 font-sans font-medium",
				className
			)}
			onClick={simulate}
		>
			<div>{os === "macos" ? "⌘K" : "Ctrl + K"}</div>
		</KeyboardButton>
	);
}

export default CustomKbd;
