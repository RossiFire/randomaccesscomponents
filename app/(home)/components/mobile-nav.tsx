"use client";
import { KeyboardButton } from "@/components/keyboard-button";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion, stagger } from "motion/react";
import ThemeSwitcher from "@/components/ui/theme-switcher";

function MobileNav({ navLinks }: { navLinks: { href: string; label: string }[] }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	useEffect(() => {
		animate(
			".mobile-nav-list li",
			{ opacity: open ? 1 : 0, y: open ? 0 : -10 },
			{ delay: stagger(0.05) }
		);
	}, [open]);

	return (
		<div className="md:hidden">
			<KeyboardButton
				onClick={handleOpen}
				variant="icon"
				className="rounded-sm p-1 mb-2 text-primary border-muted-foreground/50 z-20"
			>
				<AnimatePresence mode="wait">
					{open ? (
						<motion.div
							key="x"
							initial={{ opacity: 0, rotate: -90 }}
							animate={{ opacity: 1, rotate: 0 }}
							exit={{ opacity: 0, rotate: -90 }}
							transition={{ duration: 0.2, ease: "backOut" }}
						>
							<XIcon className="size-4" />
						</motion.div>
					) : (
						<motion.div
							key="menu"
							initial={{ opacity: 0, rotate: 90 }}
							animate={{ opacity: 1, rotate: 0 }}
							exit={{ opacity: 0, rotate: 90 }}
							transition={{ duration: 0.2, ease: "backOut" }}
						>
							<MenuIcon className="size-4" />
						</motion.div>
					)}
				</AnimatePresence>
			</KeyboardButton>
			<motion.div
				className="absolute inset-x-1.5 inset-y-2 bg-muted/50 backdrop-blur-md rounded-lg h-fit px-2.5 py-2 z-[1] border border-muted-foreground/10"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
			>
				<ul className="flex flex-col gap-2 mt-12 mobile-nav-list">
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link href={link.href} className="font-sans text-muted-foreground font-semibold">
								{link.label}
							</Link>
						</li>
					))}
					<li className="mt-4">
						<ThemeSwitcher />
					</li>
				</ul>
			</motion.div>
		</div>
	);
}

export default MobileNav;
