import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Info, Check, AlertTriangle, AlertCircle } from "lucide-react";

const variants = {
	info: "bg-info/30 border border-info/50 text-info-foreground",
	success: "bg-success/30 border border-success/50 text-success-foreground",
	warning: "bg-warning/30 border border-warning/50 text-warning-foreground",
	error: "bg-error/30 border border-error/50 text-error-foreground",
} as const;

export const alertVariants = cva(
	"inline-flex items-center justify-start gap-4 rounded-xl px-4 text-sm",
	{
		variants: {
			variant: variants,
			// fumadocs use `color` instead of `variant`
			color: variants,
			size: {
				sm: "gap-1 px-2 py-1.5 text-xs",
				icon: "p-1.5 [&_svg]:size-5",
				"icon-sm": "p-1.5 [&_svg]:size-4.5",
				"icon-xs": "p-1 [&_svg]:size-4",
			},
		},
	}
);

export type AlertProps = VariantProps<typeof alertVariants> & {
	children: React.ReactNode;
	className?: string;
};

export const Alert = ({ variant, color, size, children, ...props }: AlertProps) => {
	return (
		<div className={cn(alertVariants({ variant, color, size }), props.className)}>
			<AlertIcon variant={variant} />
			{children}
		</div>
	);
};

function AlertIcon({ variant }: { variant: AlertProps["variant"] }) {
	return (
		<div className="flex items-center justify-start">
			{variant === "info" && <Info className="size-4" />}
			{variant === "success" && <Check className="size-4" />}
			{variant === "warning" && <AlertTriangle className="size-4" />}
			{variant === "error" && <AlertCircle className="size-4" />}
		</div>
	);
}
