"use client";
import React, { useEffect, useState } from "react";
import { motion, Transition } from "motion/react";
import useScreenSize from "@/demo/hooks/use-screen-size/use-screen-size";
import { cn } from "@/lib/utils";
  
  
const GridBackground = ({ hideFade = false, className }: { hideFade?: boolean, className?: string }) => {
    return (
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--muted-foreground) 5%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--muted-foreground) 5%, transparent) 1px, transparent 1px)
          `,
        }}
        className={cn("absolute bottom-0 left-0 right-0 top-0 bg-size-[32px_32px]", className)}
      >
        {!hideFade && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/0 to-background" />}
        <Beams />
      </div>
    );
  };
  
  const Beams = () => {
    const { width } = useScreenSize();
  
    const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;
  
    const placements = [
      {
        top: GRID_BOX_SIZE * 0,
        left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
        transition: {
          duration: 3.5,
          repeatDelay: 5,
          delay: 2,
        },
      },
      {
        top: GRID_BOX_SIZE * 12,
        left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
        transition: {
          duration: 3.5,
          repeatDelay: 10,
          delay: 4,
        },
      },
      {
        top: GRID_BOX_SIZE * 3,
        left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
      },
      {
        top: GRID_BOX_SIZE * 9,
        left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
        transition: {
          duration: 2,
          repeatDelay: 7.5,
          delay: 3.5,
        },
      },
      {
        top: 0,
        left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
        transition: {
          duration: 3,
          repeatDelay: 2,
          delay: 1,
        },
      },
      {
        top: GRID_BOX_SIZE * 2,
        left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
        transition: {
          duration: 5,
          repeatDelay: 5,
          delay: 5,
        },
      },
    ];
  
    return (
      <>
        {placements.map((p, i) => (
          <Beam
            key={i}
            top={p.top}
            left={p.left - BEAM_WIDTH_OFFSET}
            transition={p.transition || {}}
          />
        ))}
      </>
    );
  };
  
  const Beam = ({
    top,
    left,
    transition = {},
  }: {
    top: number;
    left: number;
    transition?: Transition;
  }) => {
    return (
      <motion.div
        initial={{
          y: 0,
          opacity: 0,
        }}
        animate={{
          opacity: [0, 1, 0],
          y: 32 * 8,
        }}
        transition={{
          ease: "easeInOut",
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1.5,
          ...transition,
        }}
        style={{
          top,
          left,
        }}
        className="absolute z-[1] h-[64px] w-[1px] bg-gradient-to-b from-primary/0 to-primary"
      />
    );
  };

  
  type WindowSize = {
    width: number | undefined;
    height: number | undefined;
  };
  
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      const handleResize = () =>
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  
      window.addEventListener("resize", handleResize);
  
      handleResize();
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    return windowSize;
  };
  
  const GRID_BOX_SIZE = 32;
  const BEAM_WIDTH_OFFSET = 1;
  


export {
  GridBackground,
}