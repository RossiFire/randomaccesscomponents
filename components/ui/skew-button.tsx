import type { ComponentProps } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils";

const skewButtonVariants = cva("flex [corner-shape:squircle] whitespace-nowrap rounded-2xl border border-primary text-xs font-medium transition-all md:text-base hover:-translate-y-1 focus:-translate-y-1 active:translate-y-0 bg-background text-primary disabled:translate-y-0 disabled:rotate-0 disabled:text-secondary disabled:border-secondary disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary outline-none", {
    variants: {
        direction: {
            left: "origin-top-left -rotate-2 hover:-rotate-3 active:-rotate-1 hover:skew-y-2 active:skew-y-0",
            right: "origin-top-right rotate-2 hover:rotate-3 active:rotate-1 hover:-skew-y-2 active:skew-y-0",
            center: "origin-center -translate-y-1",
        },
        variant: {
            default: "px-12 py-3",
            icon: "p-3 w-fit",
        }
    },
    defaultVariants: {
        direction: "left",
        variant: "default",
    }
})

type SkewButtonGenericProps = {
    shadowClassName?: string;
}

type SkewButtonAsButton = { as?: "button" } & ComponentProps<"button">
type SkewButtonAsLink = { as: "link" } & ComponentProps<typeof Link>;

type SkewButtonProps = (SkewButtonAsButton | SkewButtonAsLink) & SkewButtonGenericProps & VariantProps<typeof skewButtonVariants>;

function SkewButton(props: SkewButtonProps) {
    const { as = "button", className, children, direction = "left", variant = "default", shadowClassName, ...rest } = props;



    return (
        <div className={cn("rounded-2xl transition-colors bg-primary w-auto [corner-shape:squircle]", shadowClassName)}>
            {as === "link" ? (
                <Link className={skewButtonVariants({ direction, variant, className })} {...(rest as ComponentProps<typeof Link>)}>
                    {children}
                </Link>
            ) : (
                <button type="button" className={skewButtonVariants({ direction, variant, className })} {...(rest as ComponentProps<"button">)}>
                    {children}
                </button>
            )}
        </div>
    );
}

export default SkewButton;