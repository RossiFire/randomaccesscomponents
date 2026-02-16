"use client";
import { DemoBlock } from "@/components/demo-block";
import { useHydration } from "@/hooks/use-hydration";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { interFont } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Prata } from "next/font/google";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { RevealText, RevealTextLine } from "./animated-text-block";
import type { RevealTextHandle } from "./animated-text-block";

gsap.registerPlugin(ScrollTrigger);

const prata = Prata({ weight: '400', subsets: ['latin'], variable: '--font-prata' });

const textClasses = cn(
    "text-2xl md:text-4xl lg:text-6xl font-bold uppercase text-foreground -tracking-wider text-center leading-tight",
    interFont
);
const accentClasses = cn("text-[#e17055]", prata.className);

const demoLines = [<RevealTextLine className="bg-[#e17055]" key="0" />];

const DemoTextContent: React.FC = () => (
    <>
        <strong className={accentClasses}>Redefining</strong> Web, Chasing{' '}
        <strong className={accentClasses}>Performance</strong>, Bringing It All In All Ways. Defining A{' '}
        <strong className={accentClasses}>Standard</strong> With Random Access Components.
    </>
);


const RevealTextDemo: React.FC = () => {
    const isMounted = useHydration();
    const ref = useRef<RevealTextHandle>(null);
    const [animating, setAnimating] = useState(false);

    if (!isMounted) return null;

    return (
        <DemoBlock className="m-0">
            <div className="flex flex-col gap-12 justify-center items-center">
                <RevealText ref={ref} lines={demoLines} className={textClasses} startVisible>
                    <DemoTextContent />
                </RevealText>
                <Button
                    onClick={() => ref.current?.play({
                        onStart: () => setAnimating(true),
                        onComplete: () => setAnimating(false),
                    })}
                    disabled={animating}
                >
                    {animating ? "Animating..." : "Run animation"}
                </Button>
            </div>
        </DemoBlock>
    );
};


const RevealTextAlternativeDemo: React.FC = () => {
    const isMounted = useHydration();
    const ref = useRef<RevealTextHandle>(null);
    const [animating, setAnimating] = useState(false);

    if (!isMounted) return null;

    return (
        <DemoBlock containerClassName="py-12" className="m-0">
            <div className="flex flex-col gap-12 justify-center items-center">
                <RevealText ref={ref} className={textClasses} startVisible>
                    <DemoTextContent />
                </RevealText>
                <Button
                    onClick={() => ref.current?.play({
                        onStart: () => setAnimating(true),
                        onComplete: () => setAnimating(false),
                    })}
                    disabled={animating}
                >
                    {animating ? "Animating..." : "Run animation"}
                </Button>
            </div>
        </DemoBlock>
    );
};


const RevealTextWrongDemo: React.FC = () => {
    const isMounted = useHydration();
    const ref = useRef<RevealTextHandle>(null);
    const [animating, setAnimating] = useState(false);

    if (!isMounted) return null;

    return (
        <DemoBlock containerClassName="py-12" className="m-0">
            <div className="flex flex-col gap-12 justify-center items-center">
                <RevealText
                    ref={ref}
                    lines={demoLines}
                    className={textClasses}
                    textAnimation={{ duration: 0.3, stagger: 0.05, ease: "sine.inOut" }}
                    revealAnimation={{ duration: 1, stagger: 0.2 }}
                    startVisible
                >
                    <DemoTextContent />
                </RevealText>
                <Button
                    onClick={() => ref.current?.play({
                        onStart: () => setAnimating(true),
                        onComplete: () => setAnimating(false),
                    })}
                    disabled={animating}
                >
                    {animating ? "Animating..." : "Run animation"}
                </Button>
            </div>
        </DemoBlock>
    );
};


const RevealTextScrollingDemo: React.FC = () => {
    const ref = useRef<RevealTextHandle>(null);

    useGSAP(() => {
        if (!ref.current) return;
        ref.current.play({
            scrollTrigger: {
                trigger: ref.current.element,
                start: "top 70%",
            },
        });
    });

    return (
        <DemoBlock containerClassName="py-12 h-[400px] overflow-scroll relative" className="m-0">
            <div className="h-[400px] grid place-items-center">
                <span className="text-muted-foreground text-sm md:text-base">Scroll to see the animation</span>
            </div>
            <RevealText ref={ref} lines={demoLines} className={textClasses}>
                <DemoTextContent />
            </RevealText>
        </DemoBlock>
    );
};


export {
    RevealTextDemo,
    RevealTextAlternativeDemo,
    RevealTextWrongDemo,
    RevealTextScrollingDemo,
};
