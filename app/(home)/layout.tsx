import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Random Access Components | Built for the web",
  description:
    "Random Access Components is a collection of reusable components, hooks, utilities and more",
  keywords: [
    "Random Access Components",
    "Nextjs UI Kit",
    "React UI Kit",
    "Components library",
    "RAC UI",
    "Animated components",
    "Tailwind CSS components",
    "TypeScript",
    "Gsap Components",
    "Framer Motion components",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};


export default function Layout({ children }: LayoutProps<'/'>) {
  return <div className='min-h-svh w-full overflow-hidden'>
    {children}
  </div>;
}
