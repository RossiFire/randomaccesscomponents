import * as React from 'react';
import { cn } from '@/lib/utils';
import TechBadge from '@/components/ui/tech-badge';
import { Markee, MarkeeContent, MarkeeFade, MarkeeSpacer, MarkeeItem } from "@/components/markee";
import { KeyboardButton } from '@/components/keyboard-button';
import Magnet from '@/demo/components/magnet/magnet';
import { MousePointer2Icon } from 'lucide-react';
import { Ripple } from '@/demo/components/ripple/Ripple';
import Link from 'next/link';
import { TextReveal } from '@/components/text-reveal';
import { DemoCard } from './showcase-card';
import { ShowcaseTextReveal } from './showcase-text-reveal';


const techBadges = [
  <TechBadge key="nextjs" badge="nextjs" />,
  <TechBadge key="gsap" badge="gsap" />,
  <TechBadge key="react" badge="react" />,
  <TechBadge key="typescript" badge="typescript" />,
  <TechBadge key="motion" badge="motion" />,
  <TechBadge key="tailwindcss" badge="tailwindcss" />,
  <TechBadge key="css" badge="css" />,
  <TechBadge key="radix" badge="radix" />,
]

function Device({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden='true'
      className={cn(
        'relative h-[70vh] aspect-[1.2/1] rounded-[3.2rem] border border-border/70 bg-gradient-to-br from-muted dark:from-muted',
        'to-muted dark:to-muted p-2 shadow-[0_55px_110px_-40px_color-mix(in_srgb,var(--foreground)_20%,transparent)] dark:shadow-[0_55px_110px_-40px_color-mix(in_srgb,var(--primary)_2%,transparent)] backdrop-blur-sm dark:from-muted',
        'dark:to-background/80 z-20',
        "-translate-x-1/2 -translate-y-1/2 overflow-ellipsis",
        className
      )}
      {...props}
    >
      <div className='relative h-full w-full overflow-hidden rounded-[2.7rem] bg-[#a6cdb2] dark:bg-[#0A0A0A] p-4 grid grid-cols-12 gap-4'>
        <DemoCard name="Markee" link="/docs/components/markee" className='col-span-8'>
          <DemoMarkee />
        </DemoCard>
        <DemoCard className='col-span-4' name="Ripple" link="/docs/components/ripple">
          <button id="device-demo-button" className="px-6 py-2 group z-10 font-medium border-2 text-accent-demo hover:text-white border-accent-demo cursor-pointer rounded-lg relative overflow-hidden focus-visible:outline-accent-demo focus-visible:outline-offset-4">
            <Ripple parent="#device-demo-button" className="bg-accent-demo" />
            <span className="relative z-10">👋🏻 Hey folks!</span>
          </button>
        </DemoCard>

        <DemoCard className='col-span-6' name="Keyboard button" link="/docs/components/keyboard-button">
          <KeyboardButton>
            Keyboard button
          </KeyboardButton>
        </DemoCard>
        <DemoCard className='col-span-6' name="Lift text" link="/docs/components/lift-text">
          <LiftText text="Hover Me" />
        </DemoCard>
        <ShowcaseTextReveal />
        <DemoCard className='col-span-5' name="Magnet" link="/docs/components/magnet">
          <Magnet className='rounded-full bg-accent cursor-pointer text-accent-foreground p-3 border border-accent-foreground/10'>
            <MousePointer2Icon className="size-6" />
          </Magnet>
        </DemoCard>

      </div>

    </div>
  );
}


const DemoMarkee = () => {
  return (
    <Markee className='w-full'>
      <MarkeeFade position="left" />
      <MarkeeContent duration={20}>
        {techBadges.map((badge, index) => (
          <React.Fragment key={index}>
            <MarkeeItem>
              {badge}
            </MarkeeItem>
            <MarkeeSpacer className="w-2 md:w-4" />
          </React.Fragment>
        ))}
      </MarkeeContent>
      <MarkeeFade position="right" />
    </Markee>
  )
}


function LiftText({ className, text, ...props }: Omit<React.ComponentProps<"a">, "children"> & { text: string }) {
  return (
    <div className="overflow-hidden">
      <a
        className={cn(
          "text-muted-foreground hover:text-primary-foreground transition-colors duration-300 no-underline leading-none cursor-pointer",
          "group/lift",
          className
        )}
        style={{
          textShadow: "0 2.7ex 0",
        }}
        {...props}
      >
        {text.split("").map((char, index) => {
          if (char === " ") {
            return <span key={index}> </span>;
          }
          return (
            <span
              key={index}
              className="relative inline-block group-hover/lift:animate-[lift-text-up-home_0.2s_forwards]"
              style={{
                animationDelay: 'calc(sibling-index() * 0.02s)'
              }}
            >
              {char}
            </span>
          );
        })}
      </a>
    </div>
  );
}


export default Device;