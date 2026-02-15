'use client';

import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface RippleProps {
    /** React ref or CSS selector string pointing to the parent element. */
    parent: React.RefObject<HTMLElement | null> | string;
    className?: string;
}

const isRef = (value: RippleProps['parent']): value is React.RefObject<HTMLElement | null> =>
    typeof value !== 'string';

function Ripple({ parent, className }: RippleProps) {
    const rippleRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const el = isRef(parent) ? parent.current : document.querySelector<HTMLElement>(parent);
        if (!el) return;

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);
        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const offset = (rippleRef.current?.offsetWidth || 2) / 2;
            setMousePosition({
                x: e.clientX - rect.left - offset,
                y: e.clientY - rect.top - offset,
            });
        };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mousemove', handleMouseMove);

        return () => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            el.removeEventListener('mousemove', handleMouseMove);
        };
    }, [parent]);

    useGSAP(() => {
        if (!rippleRef.current) return;

        const exitMultiplier = 1.2;
        const calculatedPosition = {
            x: mousePosition.x * (isHovered ? 1 : exitMultiplier),
            y: mousePosition.y * (isHovered ? 1 : exitMultiplier),
        };

        gsap.timeline()
            .to(rippleRef.current, {
                x: mousePosition.x,
                y: mousePosition.y,
                duration: 0,
            })
            .to(rippleRef.current, {
                scale: isHovered ? 2 : 0,
                x: calculatedPosition.x,
                y: calculatedPosition.y,
                duration: 0.4,
                ease: isHovered ? 'power1.out' : 'expo.out',
            });
    }, [isHovered, mousePosition]);

    return (
        <div
            ref={rippleRef}
            className={cn(
                'absolute pointer-events-none rounded-full scale-0 top-0 left-0 size-28 z-[1]',
                className
            )}
        />
    );
}

export { Ripple };
