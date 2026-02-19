import Hero from "./sections/Hero";
import { Navbar } from "./components/navbar";
import Features from "./sections/Features";
import CodeSection from "./sections/Code";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import LenisProvider from "@/providers/LenisProvider";

export default function HomePage() {

	const rightsText = `© ${new Date().getFullYear()} Random Access Components. All rights reserved.`

	return (
		<>
			<LenisProvider />
			<Navbar />
			<Hero />
			<Features />
			<CodeSection />
			<footer className="container mx-auto my-8 flex flex-col-reverse md:flex-row gap-y-8 items-center justify-between">
				<span className="text-center text-sm text-muted-foreground">
					{rightsText}
				</span>
				<ul className="flex items-center justify-center gap-6" aria-label="Footer links">
					<li>
						<ExternalLink href="https://github.com/RossiFire/randomaccesscomponents">
							Github
						</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://www.linkedin.com/in/daniele-rossino-a9a297188/">
							LinkedIn
						</ExternalLink>
					</li>
					<li>
						<ExternalLink href="mailto:daniele10@gmail.com">Email</ExternalLink>
					</li>
				</ul>
			</footer>
		</>
	);
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			target="_blank"
			className="text-sm text-muted-foreground group hover:text-primary-foreground transition-colors duration-300 flex items-center gap-2"
		>
			{children}
			<div className="relative overflow-hidden">
				<MoveUpRight className="size-4 text-muted-foreground group-hover:transition-all group-hover:duration-300 group-hover:-translate-y-full group-hover:translate-x-full " />
				<MoveUpRight className="absolute text-muted-foreground group-hover:text-primary-foreground size-4 top-[160%] group-hover:top-1/2 -translate-y-1/2 -left-[60%] group-hover:left-1/2 -translate-x-1/2 group-hover:transition-all group-hover:duration-300" />
			</div>
		</Link>
	);
}
