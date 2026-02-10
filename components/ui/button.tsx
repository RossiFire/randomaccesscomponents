import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "px-4 py-2 w-fit rounded-md transition-all duration-150 outline-none text-sm cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
        secondary: "bg-accent cursor-pointer text-accent-foreground hover:bg-accent/70 hover:shadow-md hover:shadow-accent/50 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Button({
  className,
  asChild = false,
  variant = "primary",
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost"
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}

      {...props}
    />
  );
}

export { Button };
