import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { z } from "zod";

// Custom frontmatter schema that includes hot_item property
const customFrontmatterSchema = frontmatterSchema.extend({
	hot_item: z.boolean().optional(),
});

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
	docs: {
		schema: customFrontmatterSchema,
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
	meta: {
		schema: metaSchema,
	},
});

export default defineConfig({
	mdxOptions: {
		rehypeCodeOptions: {
			transformers: [
				...(rehypeCodeDefaultOptions.transformers ?? []),
				{
					name: "codeblock-icon-meta",
					pre(node) {
						const meta = this.options.meta;
						const fromObject = typeof meta?.icon === "string" ? meta.icon : undefined;
						const raw =
							typeof meta === "string" ? meta : typeof meta?.__raw === "string" ? meta.__raw : "";

						const match = raw.match(/(?:^|\s)icon=(?:"([^"]+)"|'([^']+)'|([^\s]+))/);
						const fromRaw = match?.[1] ?? match?.[2] ?? match?.[3];
						const icon = fromObject ?? fromRaw;
						if (!icon) return;

						node.properties["data-icon"] = icon;
					},
				},
			],
		},
	},
});
