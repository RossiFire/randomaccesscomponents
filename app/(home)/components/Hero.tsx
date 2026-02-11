"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { useHydration } from "@/hooks/use-hydration";
import React, { useRef } from "react";
import { SnipeButton } from "@/components/snipe-button";
import { ShimmerText } from "@/components/shimmer-text";
import Device from "./device";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BGGrid } from "./beam-bg";
import LenisProvider from "@/providers/LenisProvider";
import BubbleButton from "@/components/bubble-button";


gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero: React.FC = () => {

    const isMounted = useHydration();
    
    const deviceRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {

        gsap.set(".hero-device", {
            scale: 0.9,
            skewY: 5,
            skewX: 1,
            perspective: 1200,
        });

        if(!isMounted) return;
        
        
        const tl = gsap.timeline({ delay: 0.25 });
        const splittedH2 = new SplitText("h2", {type: "lines"});

        /* Initial Timeline */
        
        tl.from("h1", {
            y: 50,
            opacity: 0,
            delay: 0.25,
            stagger: 0.03,
            ease: "back.out(1.7)"
        })
        .from(splittedH2.lines, {
            y: 50,
            opacity: 0,
            delay: 0.25,
            stagger: 0.03,
            ease: "back.out(1.7)"
        },'<20%')
        .from(".hero-buttons > *", {
            opacity: 0,
            stagger: 0.03,
            ease: "power2.inOut"
        },'<20%')
        .from(".hero-device", {
            opacity: 0,
            translateY: "-20%",
            duration: 2,
            ease: "power3.out"
        });


        /* Scroll Timeline */

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "+=400%",
                pin: ".hero-pin",
                scrub: true,
            },
            onUpdate:() => {
                if(deviceRef.current){
                    const addClass = scrollTl.progress() > 0.5;
                    if(addClass){
                        deviceRef.current.classList.add("z-50");
                    } else {
                        deviceRef.current.classList.remove("z-50");
                    }
                }
            }
        });

        scrollTl.to(".hero-main-content", {
            scale: 0.8,
            duration: 1,
            translateX: "-10%",
            ease: "power2.inOut"
        },'<')
        .to('.hero-device', {
            scale: 0.8,
            duration: 1,
            ease: "power2.inOut",
        },'<')
        .to('.hero-device', {
            left: "50%",
            top: "100%",
            scale: 1.5,
            skewY: 0,
            skewX: 0,
            duration: 1.2,
            ease: "power2.inOut"
        })

    }, [isMounted]);

    if(!isMounted) return null;
    return (

    <LenisProvider>
        <div className='hero-pin relative h-svh w-full bg-background flex flex-col justify-center text-center z-20'>
            <BGGrid />
            <div className="relative isolate container z-[2]">
                <Device ref={deviceRef} className="absolute left-3/4 top-1/2 z-0 hidden md:block hero-device" />
                <div className="hero-main-content relative z-10 flex max-w-4xl flex-col items-start gap-8 pointer-events-none">
                    <ShimmerText asChild>
                        <h1 className={cn("text-3xl md:text-4xl lg:text-7xl hero-text font-serif")}>Random Access Components</h1>
                    </ShimmerText>
                    <h2 className={cn("text-base md:text-xl lg:text-2xl text-left font-light text-muted-foreground px-2 md:px-0 max-w-2xl font-sans")}>A collection of animated, accessible and performant components. Made for the web.</h2>
                    <div className="mt-10 flex items-center gap-8 hero-buttons pointer-events-auto">
                        <BubbleButton asChild>
                            <Link href="/docs/getting-started">View docs</Link>
                        </BubbleButton>
                    </div>
                </div>
            </div>
        </div>
    </LenisProvider>
    );
}
 
export default Hero;