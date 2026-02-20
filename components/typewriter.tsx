"use client";

import { type HTMLAttributes, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type TypewriterPhase = "delay" | "typing" | "waiting" | "deleting" | "paused" | "done";

type TypewriterState = {
	phase: TypewriterPhase;
	textIndex: number;
	charIndex: number;
	displayText: string;
};

type PhaseDurations = {
	initialDelayMs: number;
	speedMs: number;
	waitTimeMs: number;
	deleteSpeedMs: number;
};

interface TypewriterProps extends HTMLAttributes<HTMLElement> {
	text: string | string[];
	as?: keyof HTMLElementTagNameMap;
    /**
     * The speed at which the text is typed.
     * The value is expressed in milliseconds and represent the time it takes to type one character.
     * 
     * Example: 
     * 
     * __"hello world"__ (11 characters) with _speed_ of **100**
     * will take **100 * 11 = 1100ms** (or **1.1s**) to type the entire text.
     * 
     * @default 50
     * 
     */
	speedMs?: number;
    /**
     * The time to wait before the first text is typed, expressed in milliseconds.
     * @default 0
     */
	initialDelayMs?: number;
    /**
     * The time to wait before the next text is typed, expressed in milliseconds.
     * @default 2000
     */
	waitTimeMs?: number;
    /**
     * The speed at which the text is deleted.
     * The value is expressed in milliseconds and represent the time it takes to delete one character.
     * 
     * Example: 
     * __"hello world"__ (11 characters) with _deleteSpeedMs_ of **100**
     * will take **100 * 11 = 1100ms** (or **1.1s**) to delete the entire text.
     * 
     * @default 30
     */
	deleteSpeedMs?: number;
    /**
     * Whether to loop the text
     * @default true
     */
	loop?: boolean;
    /**
     * Whether to show the cursor
     * @default true
     */
	showCursor?: boolean;
	hideCursorOnType?: boolean;
    /**
     * The character to use for the cursor
     * @default "|"
     */
	cursorChar?: ReactNode;
    /**
     * The animation variants for the cursor
     * @default { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.01, repeat: Infinity, repeatDelay: 0.4, repeatType: "reverse" } } }
     */
	cursorAnimationVariants?: Variants;
    /**
     * The class name to use for the cursor
     * @default "ml-1"
     */
	cursorClassName?: string;
}

const defaultCursorAnimationVariants: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 0.01,
			repeat: Infinity,
			repeatDelay: 0.4,
			repeatType: "reverse",
		},
	},
};

const getNormalizedTexts = (text: string | string[]) => {
	if (Array.isArray(text) && text.length === 0) {
		return [""];
	}
	return Array.isArray(text) ? text : [text];
};

const getCurrentText = (texts: string[], textIndex: number) => {
	return texts[textIndex] ?? "";
};

const getPhaseDelay = (phase: TypewriterPhase, durations: PhaseDurations) => {
	switch (phase) {
		case "delay":
			return durations.initialDelayMs;
		case "typing":
			return durations.speedMs;
		case "waiting":
		case "paused":
			return durations.waitTimeMs;
		case "deleting":
			return durations.deleteSpeedMs;
		case "done":
			return null;
	}
};

const advanceTypewriterState = (
	state: TypewriterState,
	texts: string[],
	loop: boolean
): TypewriterState => {
	const currentText = getCurrentText(texts, state.textIndex);

	switch (state.phase) {
		case "delay":
			return { ...state, phase: "typing" };
		case "typing": {
			if (state.charIndex < currentText.length) {
				const nextCharIndex = state.charIndex + 1;
				return {
					...state,
					charIndex: nextCharIndex,
					displayText: currentText.slice(0, nextCharIndex),
				};
			}

			if (texts.length > 1) {
				return { ...state, phase: "waiting" };
			}

			return { ...state, phase: "done" };
		}
		case "waiting":
			return { ...state, phase: "deleting" };
		case "deleting": {
			if (state.charIndex > 0) {
				const nextCharIndex = state.charIndex - 1;
				return {
					...state,
					charIndex: nextCharIndex,
					displayText: currentText.slice(0, nextCharIndex),
				};
			}

			if (!loop && state.textIndex >= texts.length - 1) {
				return { ...state, phase: "done" };
			}

			return {
				phase: "paused",
				textIndex: (state.textIndex + 1) % texts.length,
				charIndex: 0,
				displayText: "",
			};
		}
		case "paused":
			return { ...state, phase: "typing" };
		case "done":
			return state;
	}
};

const createInitialState = (): TypewriterState => {
	return {
		phase: "delay",
		textIndex: 0,
		charIndex: 0,
		displayText: "",
	};
};

const Typewriter = ({
	text,
	as: Tag = "span",
	speedMs = 50,
	initialDelayMs = 0,
	waitTimeMs = 2000,
	deleteSpeedMs = 40,
	loop = true,
	className,
	showCursor = true,
	hideCursorOnType = false,
	cursorChar = "|",
	cursorClassName,
	cursorAnimationVariants = defaultCursorAnimationVariants,
	...props
}: TypewriterProps) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const texts = useMemo(() => getNormalizedTexts(text), [text]);
	const [state, setState] = useState<TypewriterState>(() => createInitialState());

	useEffect(() => {
		setState(createInitialState());
	}, [texts, initialDelayMs, waitTimeMs, speedMs, deleteSpeedMs, loop]);

	useEffect(() => {
		const delay = getPhaseDelay(state.phase, {
			initialDelayMs,
			speedMs,
			waitTimeMs,
			deleteSpeedMs,
		});
		if (delay === null) {
			return;
		}

		timeoutRef.current = setTimeout(() => {
			setState((previousState) => advanceTypewriterState(previousState, texts, loop));
		}, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [
		state.phase,
		state.textIndex,
		state.charIndex,
		initialDelayMs,
		speedMs,
		waitTimeMs,
		deleteSpeedMs,
		texts,
		loop,
	]);

	const isAnimating = state.phase === "typing" || state.phase === "deleting";

	return (
		<Tag className={cn("inline whitespace-pre-wrap", className)} {...props}>
			<span>{state.displayText}</span>
			{showCursor && (
				<motion.span
                    aria-hidden="true"
					variants={cursorAnimationVariants}
					className={cn(cursorClassName, hideCursorOnType && isAnimating ? "hidden" : "")}
					initial="initial"
					animate="animate"
				>
					{cursorChar}
				</motion.span>
			)}
		</Tag>
	);
};

export default Typewriter;