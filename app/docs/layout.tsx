import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Random Access Components",
		default: "Home | Random Access Components",
	},
};

export default function Layout({ children }: LayoutProps<"/docs">) {
	return (
		<DocsLayout tree={source.pageTree} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
