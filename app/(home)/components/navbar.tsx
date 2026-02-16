
import * as React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import { cn } from '@/lib/utils';
import CustomKbd from './custom-kbd';
import MobileNav from './mobile-nav';
import { MoveUpRight } from 'lucide-react';
import rac_logo from '@/public/assets/rac_logo.png';
import Image from 'next/image';

const navLinks = [
    { href: '/docs/getting-started', label: 'Getting Started' },
    { href: '/docs/components/glow-container', label: 'Components' },
    { href: 'https://github.com/RossiFire/randomaccesscomponents', label: 'Github', external: true },
];

function Navbar({ className, ...props }: React.ComponentProps<'header'>) {
    return (
        <header className={cn('fixed inset-x-0 top-0 z-50 py-4 md:py-8 bg-gradient-to-t from-transparent via-background/80 to-background', className)} {...props}>
            <div className='container mx-auto px-4'>
                <nav className='flex items-center justify-between'>
                    <div className='flex items-center gap-8 z-[2]'>
                        <Link
                            href='/'
                            className='text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80'
                        >
                            <Image src={rac_logo} alt='Rac UI Logo' className='size-10 object-contain' />
                        </Link>
                        <ul className='items-center gap-6 hidden md:flex'>
                            {navLinks.map((link) => (
                                <li key={link.href} className='flex items-center gap-2 group'>
                                    <NavLink
                                        href={link.href}
                                        text={link.label}
                                        target={link.external ? '_blank' : '_self'}
                                    />
                                    {link.external && (
                                        <MoveUpRight className='size-4 text-muted-foreground group-hover:text-primary-foreground transition-colors hover:duration-300' />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex items-center gap-2'>
                        <MobileNav navLinks={navLinks} />
                        <CustomKbd className='hidden md:block'/>
                        <ThemeSwitcher className='hidden md:block'/>
                    </div>
                </nav>
            </div>
        </header>
    );
}



function NavLink({ className, text, ...props }: Omit<React.ComponentProps<"a">, "children"> & { text: string }) {
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
  



export { Navbar };
