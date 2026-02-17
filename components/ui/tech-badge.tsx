import * as TechIcons from "./tech-icons";
import { Glow } from "../glow";

const ICON_ALIASES = {
    nextjs: {
        icon: TechIcons.Nextjs,
        label: "Next.js",
        color: "#000000",
    },
    expressjs: {
        icon: TechIcons.Expressjs,
        label: "Express.js",
        color: "#000000",
    },
    react: {
        icon: TechIcons.React,
        label: "React",
        color: "#087EA4",
    },
    motion: {
        icon: TechIcons.Motion,
        label: "Motion",
        color: "#FFDD01",
    },
    tailwindcss: {
        icon: TechIcons.TailwindCSS,
        label: "Tailwind CSS",
        color: "#38bdf8",
    },
    supabase: {
        icon: TechIcons.Supabase,
        label: "Supabase",
        color: "#3CC98C",
    },
    shadcnui: {
        icon: TechIcons.ShadcnUi,
        label: "Shadcn UI",
        color: "#000000",
    },
    vercel: {
        icon: TechIcons.Vercel,
        label: "Vercel",
        color: "#000000",
    },
    gsap: {
        icon: TechIcons.Gsap,
        label: "GSAP",
        color: "#0ADE46",
    },
    npm: {
        icon: TechIcons.NPM,
        label: "NPM",
        color: "#CC3534",
    },
    pnpm: {
        icon: TechIcons.Pnpm,
        label: "PNPM",
        color: "#F9AD01",
    },
    yarn: {
        icon: TechIcons.Yarn,
        label: "Yarn",
        color: "#2890BD",
    },
    bun: {
        icon: TechIcons.Bun,
        label: "Bun",
        color: "#FBF0DF",
    },
    css: {
        icon: TechIcons.CSS,
        label: "CSS",
        color: "#639"
    },
    radix: {
        icon: TechIcons.RadixUI,
        label: "Radix UI",
        color: "#6263FA",
    },
    typescript: {
        icon: TechIcons.TypeScript,
        label: "TypeScript",
        color: "#3075C0",
    },
    json: {
        icon: TechIcons.JSON,
        label: "JSON",
        color: "#151515",
    },
  } as const;

export type Badge = keyof typeof ICON_ALIASES;


const TechBadge: React.FC<{ badge: Badge }> = ({ badge }) => {
    const bd = ICON_ALIASES[badge];

    if(!bd){ 
        return null;
    }

    const { icon, label, color } = ICON_ALIASES[badge];
    return (
        <Glow aria-label={`${label} badge`} glowColor={color} glowRadius="80px" glowTransparency="80%" className="rounded-lg bg-muted-foreground/20">
            <div className="flex items-center gap-2 rounded-lg px-3 py-1 bg-secondary overflow-hidden relative">
                {icon({ className: "size-2 md:size-4 lg:size-4" })}
                <span className="text-xs md:text-sm text-foreground whitespace-nowrap">{label}</span>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/0 to-background" aria-hidden="true" />
            </div>
        </Glow>
    );
}

export default TechBadge;