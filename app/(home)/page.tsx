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
			<MoveUpRight className="size-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
		</Link>
	);
}
