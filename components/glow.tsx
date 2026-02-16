"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function GlowCard({
    children,
    glowColor = 'var(--primary)',
    parentRef = null,
    className,
    glowRadius = "400px",
    glowTransparency = "40%",
    ...props
}: {
    glowColor?: string;
    parentRef?: React.RefObject<HTMLDivElement | null> | null;
    glowRadius?: string;
    /**
     * The transparency of the glow. More transparency means more glow.
     * 
     * - With **100%**, Almost all the glow is visible through the border
     * - With **0%**, No glow is visible through the border
     * @default "40%"
     */
    glowTransparency?: string;
} & React.ComponentProps<'div'>) {

    const isStandalone = !parentRef;
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const refToUse = parentRef ? parentRef.current : cardRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (!rect) return;
            cardRef.current?.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
            cardRef.current?.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
        };

        refToUse?.addEventListener('mousemove', handleMouseMove);
        return () => refToUse?.removeEventListener('mousemove', handleMouseMove);
    }, [cardRef, parentRef]);

    return (
        <div 
            ref={cardRef} 
            className={cn("relative p-px group/card", className)}
            {...props}
        >
            <div
                className={cn(
                    "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none",
                    isStandalone ? "group-hover/card:opacity-100" : "group-hover/grid:opacity-100"
                )}
                style={{
                    background: `radial-gradient(${glowRadius} circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent ${glowTransparency})`,
                }}
            />
            {children}
        </div>
    );
}

export { GlowCard };