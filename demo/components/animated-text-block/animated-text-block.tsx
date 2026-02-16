"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

type RevealTextHandle = {
    /** Resets state and plays the reveal animation. Accepts optional gsap.timeline() vars (e.g. scrollTrigger). */
    play: (timelineVars?: gsap.TimelineVars) => gsap.core.Timeline;
    /** Resets the animation to its initial hidden state. */
    reset: () => void;
    /** The container DOM element. */
    element: HTMLDivElement | null;
};

function createDefaultLineReveal(): HTMLDivElement {
    const div = document.createElement("div");
    div.className = "high-line-reveal absolute bottom-0 left-0 w-full h-full bg-accent will-change-transform origin-[right_center]";
    return div;
}

function splitAndPrepare(
    container: HTMLElement,
    linesContainer: HTMLElement | null,
    startVisible: boolean
) {
    const targets = gsap.utils.toArray(
        container.querySelectorAll('[data-slot="reveal-text-content"]')
    ) as HTMLElement[];

    const templates = linesContainer
        ? (Array.from(linesContainer.children) as HTMLElement[])
        : [];

    targets.forEach(target => {
        const split = new SplitText(target, { type: "lines", aria: "none" });
        split.lines.forEach((line, i) => {
            line.classList.add("faded-text", "relative", "w-fit", "mx-auto");

            if (templates.length > 0) {
                const reveal = templates[i % templates.length].cloneNode(true) as HTMLElement;
                reveal.classList.add("high-line-reveal");
                Object.assign(reveal.style, {
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    willChange: "transform",
                    transformOrigin: "right center",
                });
                line.appendChild(reveal);
            } else {
                line.appendChild(createDefaultLineReveal());
            }
        });

        if (!startVisible) {
            gsap.set(split.lines, { clipPath: "inset(0 100% 0px 0px)" });
        }
    });

    gsap.set(container.querySelectorAll(".high-line-reveal"), {
        scaleX: startVisible ? 0 : 1,
    });
}

function resetState(container: HTMLElement) {
    gsap.set(container.querySelectorAll(".faded-text"), { clipPath: "inset(0 100% 0px 0px)" });
    gsap.set(container.querySelectorAll(".high-line-reveal"), { scaleX: 1 });
}

function RevealText({
    children,
    className,
    startVisible = false,
    lines = [],
    textAnimation,
    revealAnimation,
    ref,
    ...props
}: Omit<React.ComponentProps<"div">, "ref"> & {
    /** When true, text is visible immediately. When false, text is hidden until the animation runs. */
    startVisible?: boolean;
    /** Custom line reveal elements. Cycles if fewer than text lines, slices extras. */
    lines?: React.ReactNode[];
    /** GSAP tween overrides for the text clip-path reveal. */
    textAnimation?: gsap.TweenVars;
    /** GSAP tween overrides for the line reveal overlay. Use `at` to set timeline position. */
    revealAnimation?: gsap.TweenVars & { at?: string };
    ref?: React.Ref<RevealTextHandle>;
}) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const linesRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        splitAndPrepare(containerRef.current, linesRef.current, startVisible);
    });

    React.useImperativeHandle(ref, () => {
        const play = (timelineVars?: gsap.TimelineVars) => {
            if (!containerRef.current) return gsap.timeline();
            resetState(containerRef.current);

            const fadedTexts = containerRef.current.querySelectorAll(".faded-text");
            const reveals = containerRef.current.querySelectorAll(".high-line-reveal");
            const { at, ...revealVars } = revealAnimation ?? {};

            return gsap.timeline(timelineVars)
                .to(fadedTexts, {
                    clipPath: "inset(0px 0% 0px 0px)",
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.inOut",
                    ...textAnimation,
                })
                .to(reveals, {
                    scaleX: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power4.inOut",
                    ...revealVars,
                }, at ?? "<20%");
        };

        const reset = () => {
            if (containerRef.current) resetState(containerRef.current);
        };

        return {
            play,
            reset,
            get element() { return containerRef.current; },
        };
    });

    return (
        <div
            data-slot="reveal-text"
            ref={containerRef}
            className={cn("relative", className)}
            {...props}
        >
            <p data-slot="reveal-text-content">
                {children}
            </p>
            {lines.length > 0 && (
                <div ref={linesRef} className="hidden" aria-hidden="true">
                    {lines}
                </div>
            )}
        </div>
    );
}
RevealText.displayName = "RevealText";

function RevealTextLine({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="reveal-text-line"
            className={cn("bg-accent", className)}
            {...props}
        />
    );
}
RevealTextLine.displayName = "RevealTextLine";

export { RevealText, RevealTextLine, resetState };
export type { RevealTextHandle };
