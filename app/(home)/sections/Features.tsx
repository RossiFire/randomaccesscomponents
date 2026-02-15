'use client';

import { useRef, useEffect } from 'react';
import { GridBackground } from '../components/beam-bg';
import { Motion, RadixUI, React, TailwindCSS } from '@/components/ui/tech-icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useHydration } from '@/hooks/use-hydration';
import useScreenSize from '@/hooks/use-screen-size';

function Features() {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMounted = useHydration();
    const { width } = useScreenSize();

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const handleMouseMove = (e: MouseEvent) => {
            const cards = grid.querySelectorAll<HTMLElement>('[data-glow-card]');
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
            });
        };

        grid.addEventListener('mousemove', handleMouseMove);
        return () => grid.removeEventListener('mousemove', handleMouseMove);
    }, []);


    useGSAP(()=>{

        if(!isMounted) return;

        const cards = gsap.utils.toArray('[data-glow-card]') as HTMLElement[];

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#features > div",
                start: width < 768 ? "top bottom" : "top+=10% 90%",
                end: width < 768 ? "bottom bottom" : "bottom 80%",
                scrub: true,
            }
        });


        tl.from("#features h2", {
            y: 20,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "expo.out",
        })
        .from(cards, {
            opacity: 0,
            y: 100,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "sine.inOut",
            stagger: 0.1,
        })

    },[isMounted])

    return (
        <section className="min-h-svh bg-background flex items-end justify-center mt-12 md:mt-0 mb-12 md:mb-52" id="features">
            <div className="container flex flex-col items-center justify-center gap-10 md:gap-14 lg:gap-20">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif">Built for the Web</h2>
                <div ref={gridRef} className="group/grid grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureCard
                        title="Easy"
                        glowColor='#087EA4'
                        description="Complex components with canvas or rough animations are cool, but copying 1k lines of code isn't. How do you maintain them? What if you need small changes? With RacUI we've got you covered."
                        icon={<React size="extra" className="absolute left-[65%] top-[10%] rotate-8 text-[#087EA4]/40 dark:text-muted-foreground/20" />}
                    />
                    <FeatureCard
                        title="Customizable"
                        glowColor='#9b59b6'
                        description="Built on top of RadixUI and Shadcn/ui, for a standardized and customizable components."
                        icon={<RadixUI size="extra" className="absolute left-[65%] top-[10%] rotate-32 text-black/40 dark:text-muted-foreground/20" />}
                    />
                    <FeatureCard
                        title="Animated"
                        glowColor='#FFDD01'
                        description="Components don't have to be just performant, they need be express emotions. That's why most of them are animated with GSAP or Motion."
                        icon={<Motion size="extra" className="absolute left-[70%] top-[10%] text-[#FFDD01]/40 dark:text-muted-foreground/20" />}
                    />
                    <FeatureCard
                        title="Accessible"
                        glowColor='#38bdf8'
                        description="Components are built to be fully accessible, with ARIA attributes and keyboard navigation."
                        icon={<TailwindCSS size="extra" className="absolute left-[70%] top-[10%] rotate-2 text-[#38bdf8]/40 dark:text-muted-foreground/20" />}
                    />
                </div>
            </div>
        </section>
    );
}

function FeatureCard({
    title,
    description,
    icon,
    glowColor = 'var(--primary)',
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    glowColor?: string;
}) {
    return (
        <div data-glow-card className="relative rounded-lg p-px bg-muted-foreground/20">
            <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover/grid:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glowColor}, transparent 40%)`,
                }}
            />
            <div className="relative bg-muted min-h-50 font-sans rounded-[7px] px-6 py-8 flex flex-col items-start text-left gap-2 overflow-hidden">
                <GridBackground />
                {icon}
                <span className="text-2xl text-foreground font-serif z-[2]">{title}</span>
                <span className="text-muted-foreground text-base z-[2]">{description}</span>
            </div>
        </div>
    );
}

export default Features;
