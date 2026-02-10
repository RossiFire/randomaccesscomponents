import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

function ShimmerText({ className, asChild = false, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp 
        {...props} 
        className={cn("animate-shimmer [animation-duration:5s] [animation-iteration-count:infinite] [animation-timing-function:linear] bg-clip-text! text-transparent [background:radial-gradient(circle_at_center,var(--muted-foreground),transparent)_-200%_50%/200%_100%_no-repeat,var(--primary-foreground)]", className)} 
        />
    )
}

export { ShimmerText };