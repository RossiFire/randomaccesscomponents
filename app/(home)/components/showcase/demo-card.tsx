import { cn } from "@/lib/utils";
import Link from "next/link";

const DemoCard = ({
	children,
	className,
	name,
	link,
	...props
}: {
	children: React.ReactNode;
	className?: string;
	name?: string;
	link?: string;
} & React.ComponentProps<"div">) => (
	<div
		className={cn(
			"bg-background/80 rounded-4xl p-2 grid place-items-center relative group",
			className
		)}
		{...props}
	>
		{children}
		{name && link && (
			<Link
				href={link}
				className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute font-sans text-xs bottom-4 right-6 text-primary decoration-dashed underline underline-offset-3 focus-visible:opacity-100"
			>
				{name}
			</Link>
		)}
	</div>
);

export { DemoCard };
