import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import NoisyBackground from "../components/noisy-background";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import { dmSans, roslindale } from "@/lib/fonts";

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={cn("dark",dmSans.variable, roslindale.variable)} suppressHydrationWarning>
			<body className="flex flex-col min-h-svh">
				<NoisyBackground />
				<RootProvider
					theme={{
						defaultTheme: "dark",
					}}
				>
					{children}
				</RootProvider>
				<Analytics />
			</body>
		</html>
	);
}
