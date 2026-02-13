'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useHydration } from '@/hooks/use-hydration';
import { PreviewComponentEditor } from '../components/preview-component';
import { BGGrid } from '../components/beam-bg';
import useScreenSize from '@/hooks/use-screen-size';

function CodeSection() {
    const isMounted = useHydration();

    const { width } = useScreenSize();

    const isMobile = width <= 768;

    useGSAP(() => {
        if (!isMounted) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#editor',
                start: 'top+=10% 90%',
                end: 'bottom bottom',
                scrub: true,
            }
        });

        tl.from('#editor h2', {
            y: 20,
            filter: 'blur(10px)',
            duration: 0.5,
            ease: 'expo.out',
        });
        tl.from('.code-block', {
            opacity: 0,
            y: 100,
            filter: 'blur(10px)',
            duration: 0.5,
            ease: 'sine.inOut',
        });
    }, [isMounted]);

    if (!isMounted) return null;

    return (
        <section className="min-h-svh relative" id="editor">
            <div className="container flex flex-col items-center justify-center h-full gap-10 md:gap-14 lg:gap-20 py-20 z-[3]">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif z-[3] text-center">Exactly how you&apos;d use it</h2>
                <PreviewComponentEditor className="w-full z-[3] code-block shadow-[0_0_10px_0_rgba(0,0,0,0.1)]" isMobile={isMobile} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background z-[1]" />
            <BGGrid />
        </section>
    );
}

export default CodeSection;
