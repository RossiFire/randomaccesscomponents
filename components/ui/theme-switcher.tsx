"use client";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { SnipeButton } from "../snipe-button";

const ToggleWrapper = () => {


  const { theme, setTheme } = useTheme();

  return (
    <SnipeButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="min-h-0 p-1 bg-background text-primary border-muted-foreground/50 rounded-sm mb-2">
      {theme === "dark" ? <SunIcon className="size-4 text-warning" /> : <MoonIcon className="size-4 text-info" />}
    </SnipeButton>
  );
};

export default ToggleWrapper;