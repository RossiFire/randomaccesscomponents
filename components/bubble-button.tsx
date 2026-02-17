import type * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

function BubbleButton({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			className={cn(
				`
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md
            border border-muted-foreground/20 bg-linear-to-br from-background/80 to-muted
           px-3 py-1.5
           text-primary transition-[color,background-color,border-color,text-decoration-color,fill,stroke,scale] duration-300
            
            before:absolute before:inset-0
            before:-z-10 before:translate-y-[200%]
            before:scale-[2.5]
            before:rounded-[100%] before:bg-accent
            before:transition-transform before:duration-500
            before:content-[""]
    
            hover:scale-105 hover:text-accent-foreground
            hover:before:translate-y-0
            active:scale-100`,
				className
			)}
			{...props}
		/>
	);
}

export default BubbleButton;
