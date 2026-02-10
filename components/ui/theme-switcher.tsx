"use client";
import { motion } from "framer-motion";
import { Cloud, Star } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleWrapper = () => {


  const { theme, setTheme } = useTheme();

  return (
    <DarkModeToggle theme={theme as "light" | "dark"} setTheme={setTheme} />
  );
};

const DarkModeToggle = ({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (theme: "dark" | "light") => void;
}) => {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-1 w-14 rounded-full flex shadow-lg relative bg-gradient-to-b overflow-hidden ${
        theme === "light"
          ? "justify-end from-blue-500 to-sky-300"
          : "justify-start from-indigo-600 to-indigo-400"
      }`}
    >
      <Thumb theme={theme} />
      {theme === "light" && <Clouds />}
      {theme === "dark" && <Stars />}
    </button>
  );
};

const Thumb = ({ theme }: { theme: "light" | "dark" }) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.75,
        type: "spring",
      }}
      className="h-6 w-6 rounded-full overflow-hidden shadow-lg relative"
    >
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-slate-100"
            : "animate-pulse bg-gradient-to-tr from-amber-300 to-yellow-500 rounded-full"
        }`}
      />
      {theme === "light" && <SunCenter />}
      {theme === "dark" && <MoonSpots />}
    </motion.div>
  );
};

const SunCenter = () => (
  <div className="absolute inset-1 rounded-full bg-amber-300 z-2" />
);

const MoonSpots = () => (
  <>
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute right-2 bottom-1"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute left-1 bottom-3"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute right-1.5 top-1.5"
    />
  </>
);

const Stars = () => {
  return (
    <>
      <span
        className="text-white text-xs absolute -right-1 bottom-0 scale-200 z-1 opacity-20"
      >
        <Star className="rotate-12"/>
      </span>
    </>
  );
};
const Clouds = () => {
  return (
    <>
      <span
        className="text-white text-xs absolute left-0 bottom-0 scale-200 z-1 opacity-20"
      >
        <Cloud className="-rotate-20"/>
      </span>
    </>
  );
};

export default ToggleWrapper;