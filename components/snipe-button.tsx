import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const keyboardButtonVariants = cva(
    'relative inline-flex items-center justify-center px-6 py-2 text-primary-foreground font-light font-serif transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-muted-foreground shadow-[0px_4px_0px_var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0.5 active:shadow-none hover:bg-muted active:bg-muted disabled:shadow-none disabled:cursor-not-allowed disabled:pointer-events-none disabled:translate-y-0.5',
    {
        variants: {
            variant: {
                primary: 'px-6 py-2',
                icon: 'p-1.5 aspect-square',
            },
        },
    },)

function KeyboardButton({
    className,
    asChild = false,
    variant = 'primary',
    ...props
}: React.ComponentProps<'button'> & {
    asChild?: boolean;
    variant?: 'icon' | 'primary';
}) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot='button'
            className={cn(keyboardButtonVariants({ variant }), className)}
            {...props}
        />
    );
}

export { KeyboardButton };
