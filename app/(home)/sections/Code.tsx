'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useHydration } from '@/hooks/use-hydration';
import { PreviewComponentEditor } from '../components/preview-component';
import { BGGrid } from '../components/beam-bg';

function CodeSection() {
    const isMounted = useHydration();

    useGSAP(() => {
        if (!isMounted) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#editor',
                start: 'top+=30% 90%',
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

    return (
        <section className="h-svh relative" id="editor">
            <div className="container flex flex-col items-center justify-center h-full gap-20 py-20 z-[3]">
                <h2 className="text-5xl font-serif z-[3]">Built exactly how you&apos;d use it</h2>
                <PreviewComponentEditor className="w-full z-[3] code-block" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background z-[1]" />
            <BGGrid />
        </section>
    );
}

export default CodeSection;
