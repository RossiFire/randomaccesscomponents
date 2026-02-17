import localFont from "next/font/local";
import { DM_Sans, Inter } from "next/font/google";

const roslindale = localFont({
	src: "../public/fonts/Roslindale Font Family/RoslindaleVariable-VF-Testing.ttf",
	variable: "--font-roslindale",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-dm-sans",
});

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	variable: "--font-inter",
});

const interFont = inter.className;

export { roslindale, dmSans, interFont };
