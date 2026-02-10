import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import GlobalNoisyBackground from './components/GlobalNoisyBackground';
import { Analytics } from "@vercel/analytics/next"
import { cn } from '@/lib/utils';
import { dmSans, roslindale } from '@/lib/fonts';


export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={cn(dmSans.variable, roslindale.variable)} suppressHydrationWarning>
      <Analytics />
      <body className="flex flex-col min-h-svh">
        <GlobalNoisyBackground />
        <RootProvider
          theme={{
            defaultTheme: 'dark',
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
