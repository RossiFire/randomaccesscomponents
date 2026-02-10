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
import { SnipeButton } from "@/components/snipe-button";
import { ShimmerText } from "@/components/shimmer-text";


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
        

        tl.from("h1", {
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
            <ShimmerText asChild>
                <h1 className={cn("text-3xl md:text-4xl lg:text-7xl hero-text font-serif")}>Random Access Components</h1>
            </ShimmerText>
            <h2 className={cn("text-base md:text-xl lg:text-2xl text-left font-light text-muted-foreground px-2 md:px-0 max-w-2xl font-sans")}>A collection of animated, accessible and performant components. Made for the web.</h2>
            <div className="mt-10 flex items-center gap-8 hero-buttons">
                <SnipeButton asChild>
                    <Link href="/docs/getting-started" className="text-primary-foreground group-hover:text-primary transition-colors duration-300">View docs</Link>
                </SnipeButton>
            </div>
        </div>
    );
}
 
export default Hero;