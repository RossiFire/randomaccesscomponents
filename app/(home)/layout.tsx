import { Metadata } from "next";


export const metadata: Metadata = {
  title: "RAC | Random Access Components",
  description:
    "Random Access Components is a collection of reusable components, hooks, utilities and more",
  keywords: [
    "Random Access Components",
    "RAC UI",
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Web Development",
    "Gsap",
    "Framer Motion",
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
