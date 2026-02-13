'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { createHighlighter } from 'shiki';
import { motion, AnimatePresence } from 'motion/react';
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from '@/components/ui/resizable';
import { Markee, MarkeeContent, MarkeeFade, MarkeeItem, MarkeeSpacer } from '@/components/markee';
import { CSS, Gsap, Motion, TypeScript, Nextjs, RadixUI, React as ReactIcon, TailwindCSS } from '@/components/ui/tech-icons';
import { ShimmerText } from '@/components/shimmer-text';
import { GripVertical } from 'lucide-react';

const icons = [
    <TailwindCSS />,
    <ReactIcon />,
    <RadixUI />,
    <Motion />,
    <Nextjs />,
    <Gsap />,
    <TypeScript />,
    <CSS />,
];

const DEMO_CODE = `<Markee className='w-full'>
    <MarkeeContent>
    {icons.map((icon, index) => (
        <React.Fragment key={index}>
            {icon}
            <MarkeeSpacer className='w-8'/>
        </React.Fragment>
    ))}
    </MarkeeContent>
</Markee>`;

const DEMO_CODE_TWO = `<Markee className='w-full'>
    <MarkeeContent>
    {icons.map((icon, index) => (
        <React.Fragment key={index}>
            {icon}
            <MarkeeSpacer className='mx-4'>
                ✦
            </MarkeeSpacer>
        </React.Fragment>
    ))}
    </MarkeeContent>
</Markee>`;

const DEMO_CODE_THREE = `<Markee className='w-full'>
    <MarkeeFade position="left" />
    <MarkeeContent>
    {icons.map((icon, index) => (
        <React.Fragment key={index}>
            {icon}
            <MarkeeSpacer className='w-8'/>
        </React.Fragment>
    ))}
    </MarkeeContent>
    <MarkeeFade position="right" />
</Markee>`;

const CODE_SNIPPETS = [DEMO_CODE, DEMO_CODE_TWO, DEMO_CODE_THREE];
const CYCLE_MS = 6000;

interface TokenizedLine {
    key: string;
    tokens: Array<{ content: string; color?: string }>;
}

function getLineKeys(lines: string[]): string[] {
    const seen = new Map<string, number>();
    return lines.map((line) => {
        const trimmed = line.trim();
        const idx = seen.get(trimmed) ?? 0;
        seen.set(trimmed, idx + 1);
        return `${trimmed}::${idx}`;
    });
}

function DemoOne() {
    return (
        <Markee className='w-full mx-auto'>
            <MarkeeContent>
                {icons.map((icon, index) => (
                    <React.Fragment key={index}>
                        <MarkeeItem>{icon}</MarkeeItem>
                        <MarkeeSpacer className='w-8' />
                    </React.Fragment>
                ))}
            </MarkeeContent>
        </Markee>
    );
}

function DemoTwo() {
    return (
        <Markee className='w-full mx-auto'>
            <MarkeeContent>
                {icons.map((icon, index) => (
                    <React.Fragment key={index}>
                        <MarkeeItem>{icon}</MarkeeItem>
                        <MarkeeSpacer className='mx-6 flex items-center justify-center text-2xl'>✦</MarkeeSpacer>
                    </React.Fragment>
                ))}
            </MarkeeContent>
        </Markee>
    );
}

function DemoThree() {
    return (
        <Markee className='w-full mx-auto'>
            <MarkeeFade position="left" />
            <MarkeeContent>
                {icons.map((icon, index) => (
                    <React.Fragment key={index}>
                        <MarkeeItem>{icon}</MarkeeItem>
                        <MarkeeSpacer className='w-8' />
                    </React.Fragment>
                ))}
            </MarkeeContent>
            <MarkeeFade position="right" />
        </Markee>
    );
}

const DEMOS = [DemoOne, DemoTwo, DemoThree];

function PreviewComponentEditor({ className, isMobile, ...props }: React.ComponentProps<'div'> & { isMobile: boolean }) {
    const [allTokenized, setAllTokenized] = useState<TokenizedLine[][]>([]);
    const [codeIndex, setCodeIndex] = useState(0);

    // Tokenize every code snippet once with Shiki
    useEffect(() => {
        let cancelled = false;
        createHighlighter({
            themes: ['github-dark'],
            langs: ['tsx'],
        }).then((hl) => {
            if (cancelled) return;
            const tokenized = CODE_SNIPPETS.map((code) => {
                const result = hl.codeToTokens(code, { lang: 'tsx', theme: 'github-dark' });
                const rawLines = code.split('\n');
                const keys = getLineKeys(rawLines);
                return result.tokens.map((lineTokens, i) => ({
                    key: keys[i],
                    tokens: lineTokens.map((t) => ({ content: t.content, color: t.color })),
                }));
            });
            setAllTokenized(tokenized);
        }).catch(() => { });
        return () => { cancelled = true; };
    }, []);

    // Cycle through snippets
    useEffect(() => {
        if (allTokenized.length === 0) return;
        const id = setInterval(() => {
            setCodeIndex((i) => (i + 1) % CODE_SNIPPETS.length);
        }, CYCLE_MS);
        return () => clearInterval(id);
    }, [allTokenized]);

    const currentLines = allTokenized[codeIndex] ?? [];

    return (
        <div
            className={cn(
                'w-full rounded-2xl border border-border overflow-hidden h-[500px] md:h-auto',
                className
            )}
            {...props}
        >
            <ResizablePanelGroup orientation={isMobile ? 'vertical' : 'horizontal'} disabled={isMobile}>
                {/* Code panel — animated read-only */}
                <ResizablePanel defaultSize={isMobile ? 75 :50}>
                    <div
                        className="h-fit py-20 px-12 bg-muted dark grid place-items-center p-4 relative overflow-x-auto"
                    >
                        <ShimmerText asChild>
                            <span className='absolute top-4 left-4 font-sans text-sm [background:radial-gradient(circle_at_center,var(--muted),transparent)_-200%_50%/200%_100%_no-repeat,var(--primary-foreground)]'>
                                Markee Component
                            </span>
                        </ShimmerText>
                        {/* Fallback while Shiki loads */}
                        {currentLines.length === 0 && (
                            <code className="block font-mono text-[13px] leading-[1.7] text-[#e1e4e8] whitespace-pre">
                                {CODE_SNIPPETS[0]}
                            </code>
                        )}

                        {currentLines.length > 0 && (
                            <pre className="w-full">
                                <motion.code
                                    layout
                                    className="block relative font-mono text-[13px] leading-[1.7] [tab-size:4]"
                                >
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        {currentLines.map(({ key, tokens }) => (
                                            <motion.span
                                                key={key}
                                                layout
                                                initial={{
                                                    opacity: 0,
                                                    filter: 'blur(4px)',
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    filter: 'blur(0px)',
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    filter: 'blur(4px)',
                                                }}
                                                transition={{
                                                    layout: {
                                                        duration: 0.5,
                                                        ease: [0.25, 0.1, 0.25, 1],
                                                    },
                                                    opacity: { duration: 0.35 },
                                                    filter: { duration: 0.35 },
                                                }}
                                                className="block whitespace-pre rounded-sm"
                                            >
                                                {tokens.map((token, j) => (
                                                    <span
                                                        key={j}
                                                        style={{ color: token.color }}
                                                    >
                                                        {token.content}
                                                    </span>
                                                ))}
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                </motion.code>
                            </pre>
                        )}
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle className='hidden md:flex' />

                {/* Preview panel — synced with code */}
                <ResizablePanel defaultSize={isMobile ? 25 : 50} minSize={0}>
                    <div className="h-full bg-background flex items-center justify-center overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={codeIndex}
                                initial={{ opacity: 0, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, filter: 'blur(6px)' }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="w-full"
                            >
                                {React.createElement(DEMOS[codeIndex])}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export { PreviewComponentEditor };
