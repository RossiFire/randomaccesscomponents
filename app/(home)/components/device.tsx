import * as React from 'react';
import { cn } from '@/lib/utils';
import TechBadge from '@/components/ui/tech-badge';
import { Markee, MarkeeContent, MarkeeFade, MarkeeSpacer, MarkeeItem } from "@/components/markee";
import RippleButton from '@/demo/components/ripple-button/RippleButton';


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

function Device({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            aria-hidden='true'
            className={cn(
                'relative h-[70vh] aspect-[1.2/1] rounded-[3.2rem] border border-border/70 bg-gradient-to-br from-zinc-100/80',
                'to-zinc-300/70 p-2 shadow-[0_55px_110px_-40px_rgba(15,23,42,0.4)] backdrop-blur-sm dark:from-zinc-800/70',
                'dark:to-zinc-950/80 z-20',
                "-translate-x-1/2 -translate-y-1/2 overflow-ellipsis",
                className
            )}
            {...props}
        >
            <div className='relative h-full w-full overflow-hidden rounded-[2.7rem] bg-black p-4 grid grid-cols-12 gap-4'>
                <div className='col-span-8 bg-background/80 rounded-4xl p-2 grid place-items-center'>
                    <DemoMarkee />
                </div>
                <DemoCard className='col-span-4'>
                    <LiftText text="Hover Me" />
                </DemoCard>
                
                <DemoCard className='col-span-6'>
                    Altro component
                </DemoCard>
                <DemoCard className='col-span-6'>
                    <RippleButton>Ripple Button</RippleButton>
                </DemoCard>

                <DemoCard className='col-span-7'>
                    Altro component
                </DemoCard>
                <DemoCard className='col-span-5'>
                    <RippleButton>Ripple Button</RippleButton>
                </DemoCard>
                
            </div>

        </div>
    );
}

const DemoCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn('bg-background/80 rounded-4xl p-2 grid place-items-center', className)}>
        {children}
    </div>
)


const DemoMarkee = () => {
    return (
        <Markee className='w-full'>
            <MarkeeFade position="left" />
            <MarkeeContent duration={20} pauseOnHover={true}>
                {techBadges.map((badge, index) => (
                    <>
                        <MarkeeItem key={index}>
                            {badge}
                        </MarkeeItem>
                        <MarkeeSpacer className="w-2 md:w-4" />
                    </>
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
            "group",
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
                className="relative inline-block group-hover:animate-[lift-text-up-home_0.2s_forwards]"
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