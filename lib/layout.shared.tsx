import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { cn } from "fumadocs-ui/utils/cn";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<span
					className={cn(
						"text-sm text-muted-foreground font-sans hover:text-primary-foreground transition-colors duration-300"
					)}
				>
					Random Access Components
				</span>
			),
		},
		githubUrl: "https://github.com/RossiFire/randomaccesscomponents",
		// see https://fumadocs.dev/docs/ui/navigation/links
		links: [],
	};
}
