import { docs } from '@/.source';
import { ShimmerText } from '@/components/shimmer-text';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { FlameIcon, icons } from 'lucide-react';
import { createElement } from 'react';

const random = () => {
  return Math.floor(Math.random() * 5) + 6;
}


// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [
    lucideIconsPlugin(),
    {
      transformPageTree: {
        file(node, file) {
          if(file){
            const fileData = this.storage.read(file);
            if(fileData && (fileData.data as unknown as { hot_item?: boolean }).hot_item) {
              node.name = <div className='flex gap-2 items-center'>
                <ShimmerText asChild style={{ animationDuration: `${random()}s !important` }} className='[background:radial-gradient(circle_at_center,var(--primary),transparent)_-200%_50%/250%_100%_no-repeat,var(--muted-foreground)]'>
                  <span>{node.name}</span>
                </ShimmerText>
                <div className='size-2 bg-gradient-to-r from-primary to-accent-foreground rounded-full' />
              </div>
            }
          }
          return node;
        },
      },
    },
  ],
  icon(icon) {
    if (!icon) {
      return;
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
