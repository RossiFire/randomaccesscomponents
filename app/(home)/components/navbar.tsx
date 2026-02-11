
import * as React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ui/theme-switcher';
import { cn } from '@/lib/utils';
import { GithubInfo } from 'fumadocs-ui/components/github-info';
import CustomKbd from './custom-kbd';
import { SnipeButton } from '@/components/snipe-button';

const navLinks = [
    { href: '/docs/getting-started', label: 'Docs' },
    { href: '/docs/components', label: 'Components' },
    { href: '/docs/hooks', label: 'Hooks' },
];

function Navbar({ className, ...props }: React.ComponentProps<'header'>) {
    return (
        <header className={cn('fixed inset-x-0 top-0 z-50 py-8', className)} {...props}>
            <div className='container mx-auto px-4'>
                <nav className='flex items-center justify-between'>
                    <div className='flex items-center gap-8'>
                        <Link
                            href='/'
                            className='text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80'
                        >
                            Rac UI
                        </Link>
                        <ul className='flex items-center gap-4'>
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <NavLink
                                        href={link.href}
                                        text={link.label}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex items-center gap-2'>
                        <GithubInfo
                            owner="rossifire"
                            repo="randomui"
                            token={process.env.GITHUB_TOKEN}
                        />
                        <CustomKbd />
                        <ThemeSwitcher />
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
