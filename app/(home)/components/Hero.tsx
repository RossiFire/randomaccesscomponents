"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { dmSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SplitText } from "gsap/SplitText";
import RippleButton from "@/app/components/RippleButton";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Markee, MarkeeContent, MarkeeFade, MarkeeSpacer, MarkeeItem } from "@/components/markee";
import TechBadge from "@/components/ui/tech-badge";
import { useHydration } from "@/hooks/use-hydration";
import React from "react";


const techBadges = [
    <TechBadge key="nextjs" badge="nextjs" />,
    <TechBadge key="gsap" badge="gsap" />,
    <TechBadge key="react" badge="react" />,
    <TechBadge key="typescript" badge="typescript" />,
    <TechBadge key="framer_motion" badge="framer_motion" />,
    <TechBadge key="tailwind" badge="tailwind" />,
    <TechBadge key="css" badge="css" />,
    <TechBadge key="radix_ui" badge="radix_ui" />,
]

gsap.registerPlugin(SplitText);

const Hero: React.FC = () => {

    const isMounted = useHydration();

    useGSAP(() => {
        if(!isMounted) return;
        
        
        const tl = gsap.timeline({ delay: 0.25 });
        
        const splittedH1 = new SplitText(".hero-text", { type: "chars" });

        tl.from(splittedH1.chars, {
            y: 50,
            opacity: 0,
            delay: 0.25,
            stagger: 0.03,
            ease: "back.out(1.7)"
        });


        const splittedH2 = new SplitText("h2", {type: "lines"});

        tl.from(splittedH2.lines, {
            y: 50,
            opacity: 0,
            delay: 0.25,
            stagger: 0.03,
            ease: "back.out(1.7)"
        },'<20%');


        tl.from(".hero-buttons > *", {
            opacity: 0,
            stagger: 0.03,
            ease: "power2.inOut"
        },'<20%');


    }, [isMounted]);

    if(!isMounted) return null;
    return (
        <div className="flex flex-col items-start gap-8 z-[2] container">
            <h1 className={cn("text-3xl md:text-4xl lg:text-6xl text-foreground hero-text font-serif",)}>Random Access Components</h1>
            <h2 className={cn("text-base md:text-xl lg:text-2xl text-left font-light text-muted-foreground px-2 md:px-0 max-w-xl font-sans")}>A collection of animated, accessible and performant components. Made for the web.</h2>
            <div className="mt-10 flex items-center gap-8 hero-buttons">
                <div className="relative group">
                    <RippleButton 
                        rippleClassName="bg-primary-foreground"
                        className={cn("bg-primary text-primary-foreground border-none rounded-lg z-10 md:px-4 font-sans")} 
                    >
                        <Link href="/docs/getting-started" className="text-primary-foreground group-hover:text-primary transition-colors duration-300">View docs</Link>
                    </RippleButton>
                    <span className="pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-primary to-primary/20 opacity-20 blur-xl transition-all duration-300 group-hover:opacity-70 group-active:opacity-50" />
                </div>
            </div>
        </div>
    );
}
 
export default Hero;