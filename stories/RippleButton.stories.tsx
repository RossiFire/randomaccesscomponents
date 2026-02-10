import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RippleButton from '@/demo/components/ripple-button/RippleButton';
import RippleButtonDesignSystem from '@/demo/components/ripple-button/RippleButtonDesignSystem';

/**
 * A button with a smooth animated ripple effect powered by GSAP.
 *
 * The ripple follows the cursor position and expands on hover, creating a fluid
 * interaction. It works with both a **native HTML `<button>`** and any **design system Button**
 * component (e.g., shadcn/ui).
 *
 * ### Props
 *
 * Extends all native `<button>` props, plus:
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `rippleClassName` | `string` | Custom classes for the ripple circle (size, color) |
 */
const meta = {
  title: 'Components/Ripple Button',
  component: RippleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label',
      table: { defaultValue: { summary: 'Button' } },
    },
    rippleClassName: {
      control: 'text',
      description: 'Custom classes for the ripple element (size, color)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof RippleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Source code strings shown in the "Show code" panel
// ---------------------------------------------------------------------------

const nativeSourceCode = `"use client";
import { useGSAP } from "@gsap/react";
import { FunctionComponent, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  rippleClassName?: string;
}

const RippleButton: FunctionComponent<ButtonProps> = ({
  className,
  children,
  rippleClassName,
  ...props
}) => {
  const rippleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    if (!rippleRef.current) return;

    const tl = gsap.timeline();

    const calculatedMousePosition = {
      x: mousePosition.x * (isHovered ? 1 : 1.2),
      y: mousePosition.y * (isHovered ? 1 : 1.2),
    };

    tl.to(rippleRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0,
    }).to(rippleRef.current, {
      scale: isHovered ? 2 : 0,
      x: calculatedMousePosition.x,
      y: calculatedMousePosition.y,
      duration: 0.4,
      ease: isHovered ? "power1.out" : "expo.out",
    });
  }, [isHovered, mousePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offset = (rippleRef.current?.offsetWidth || 2) / 2;
    const x = e.clientX - rect.left - offset;
    const y = e.clientY - rect.top - offset;
    setMousePosition({ x, y });
  };

  return (
    <button
      {...props}
      className={cn(
        "px-8 py-3 group font-medium border-2 border-white cursor-pointer rounded-full relative overflow-hidden",
        className
      )}
      onMouseEnter={(e) => {
        setIsHovered(true);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        props.onMouseLeave?.(e);
      }}
      onMouseMove={(e) => {
        handleMouseMove(e);
        props.onMouseMove?.(e);
      }}
    >
      <div
        ref={rippleRef}
        className={cn(
          "absolute pointer-events-none bg-white rounded-full scale-0 top-0 left-0 size-28",
          rippleClassName
        )}
      />
      <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
        {children}
      </span>
    </button>
  );
};

export default RippleButton;`;

const designSystemSourceCode = `"use client";
import { useGSAP } from "@gsap/react";
import { FunctionComponent, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Your design system

interface ButtonProps extends React.ComponentProps<"button"> {
  rippleClassName?: string;
}

const RippleButton: FunctionComponent<ButtonProps> = ({
  className,
  children,
  rippleClassName,
  ...props
}) => {
  const rippleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    if (!rippleRef.current) return;

    const tl = gsap.timeline();

    const calculatedMousePosition = {
      x: mousePosition.x * (isHovered ? 1 : 1.2),
      y: mousePosition.y * (isHovered ? 1 : 1.2),
    };

    tl.to(rippleRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0,
    }).to(rippleRef.current, {
      scale: isHovered ? 2 : 0,
      x: calculatedMousePosition.x,
      y: calculatedMousePosition.y,
      duration: 0.4,
      ease: isHovered ? "power1.out" : "expo.out",
    });
  }, [isHovered, mousePosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offset = (rippleRef.current?.offsetWidth || 2) / 2;
    const x = e.clientX - rect.left - offset;
    const y = e.clientY - rect.top - offset;
    setMousePosition({ x, y });
  };

  return (
    <Button
      {...props}
      className={cn("relative overflow-hidden group", className)}
      onMouseEnter={(e) => {
        setIsHovered(true);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        props.onMouseLeave?.(e);
      }}
      onMouseMove={(e) => {
        handleMouseMove(e);
        props.onMouseMove?.(e);
      }}
    >
      <div
        ref={rippleRef}
        className={cn(
          "absolute pointer-events-none bg-primary-foreground rounded-full scale-0 top-0 left-0 size-28",
          rippleClassName
        )}
      />
      <div className="z-20 relative group-hover:text-primary transition-colors duration-300">
        {children}
      </div>
    </Button>
  );
};

export default RippleButton;`;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * The default implementation uses a native HTML `<button>` element.
 * Fully self-contained — no design system dependency required.
 */
export const NativeButton: Story = {
  args: {
    children: 'Hover me',
    className: 'px-12',
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: nativeSourceCode,
      },
    },
  },
};

/**
 * The same ripple effect integrated with a design system `<Button>` component.
 * Replace the native `<button>` with your library's Button (e.g., shadcn/ui)
 * and keep only the classes essential for the ripple: `relative overflow-hidden group`.
 */
export const WithDesignSystem: Story = {
  args: {
    children: 'Hover me',
    className: 'bg-black/10 px-12',
    rippleClassName: 'bg-black/20',
  },
  render: (args) => (
    <RippleButtonDesignSystem {...args}>
      {args.children}
    </RippleButtonDesignSystem>
  ),
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: designSystemSourceCode,
      },
    },
  },
};
