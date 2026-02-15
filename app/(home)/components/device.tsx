import * as React from 'react';
import { cn } from '@/lib/utils';
import TechBadge from '@/components/ui/tech-badge';
import { Markee, MarkeeContent, MarkeeFade, MarkeeSpacer, MarkeeItem } from "@/components/markee";
import { KeyboardButton } from '@/components/keyboard-button';
import Magnet from '@/demo/components/magnet/magnet';
import { MousePointer2Icon } from 'lucide-react';
import { Ripple } from '@/demo/components/ripple-button/Ripple';


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
        'relative h-[70vh] aspect-[1.2/1] rounded-[3.2rem] border border-border/70 bg-gradient-to-br from-muted',
        'to-muted p-2 shadow-[0_55px_110px_-40px_rgba(15,23,42,0.4)] backdrop-blur-sm dark:from-muted',
        'dark:to-background/80 z-20',
        "-translate-x-1/2 -translate-y-1/2 overflow-ellipsis",
        className
      )}
      {...props}
    >
      <div className='relative h-full w-full overflow-hidden rounded-[2.7rem] bg-primary/50 dark:bg-[#0A0A0A] p-4 grid grid-cols-12 gap-4'>
        <div className='col-span-8 bg-background/80 rounded-4xl p-2 grid place-items-center'>
          <DemoMarkee />
        </div>
        <DemoCard className='col-span-4'>
          <button id="device-demo-button" className="px-6 py-2 group z-10 font-medium border-2 border-accent-demo cursor-pointer rounded-lg relative overflow-hidden">
            <Ripple parent="#device-demo-button" className="bg-accent-demo" />
            <span className="relative z-10">I&apos;m a button</span>
          </button>
        </DemoCard>

        <DemoCard className='col-span-6'>
          <KeyboardButton>
            Keyboard button
          </KeyboardButton>
        </DemoCard>
        <DemoCard className='col-span-6'>
          <LiftText text="Hover Me" />
        </DemoCard>

        <DemoCard className='col-span-7'>
          <button id="device-demo-ripple-button" className="px-6 py-2 group z-10 font-medium border-2 border-accent-demo cursor-pointer rounded-lg relative overflow-hidden">
            <Ripple parent="#device-demo-ripple-button" className="bg-accent-demo" />
            <span className="relative z-10">I&apos;m a ripple button</span>
          </button>
        </DemoCard>
        <DemoCard className='col-span-5'>
          <Magnet className='rounded-full bg-accent cursor-pointer text-accent-foreground p-3 border border-accent-foreground/10'>
            <MousePointer2Icon className="size-6" />
          </Magnet>
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