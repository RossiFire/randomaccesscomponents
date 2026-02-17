"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useHydration } from "@/hooks/use-hydration";
import { cn } from "@/lib/utils";

const h = { a: 0, b: 180 },
	v = { a: 270, b: 90 },
	tl = { a: 180, b: 270 },
	tr = { a: 0, b: 270 },
	bl = { a: 180, b: 90 },
	br = { a: 0, b: 90 },
	e = { a: 135, b: 135 };

const digits = [
	[br, h, h, bl, v, br, bl, v, v, v, v, v, v, v, v, v, v, tr, tl, v, tr, h, h, tl],
	[br, h, bl, e, tr, bl, v, e, e, v, v, e, e, v, v, e, br, tl, tr, bl, tr, h, h, tl],
	[br, h, h, bl, tr, h, bl, v, br, h, tl, v, v, br, h, tl, v, tr, h, bl, tr, h, h, tl],
	[br, h, h, bl, tr, h, bl, v, e, br, tl, v, e, tr, bl, v, br, h, tl, v, tr, h, h, tl],
	[br, bl, br, bl, v, v, v, v, v, tr, tl, v, tr, h, bl, v, e, e, v, v, e, e, tr, tl],
	[br, h, h, bl, v, br, h, tl, v, tr, h, bl, tr, h, bl, v, br, h, tl, v, tr, h, h, tl],
	[br, h, h, bl, v, br, h, tl, v, tr, h, bl, v, br, bl, v, v, tr, tl, v, tr, h, h, tl],
	[br, h, h, bl, tr, h, bl, v, e, e, v, v, e, e, v, v, e, e, v, v, e, e, tr, tl],
	[br, h, h, bl, v, br, bl, v, v, tr, tl, v, v, br, bl, v, v, tr, tl, v, tr, h, h, tl],
	[br, h, h, bl, v, br, bl, v, v, tr, tl, v, tr, h, bl, v, br, h, tl, v, tr, h, h, tl],
];

const normalizeAngle = (next: number, prev: number) => {
	const delta = (((next - prev) % 360) + 360) % 360;
	return prev + delta;
};

interface DialProps {
	angle1: number;
	angle2: number;
}

function Dial({ angle1, angle2 }: DialProps) {
	const prev = useRef({ angle1: 0, angle2: 0 });
	const normalizedAngle1 = normalizeAngle(angle1, prev.current.angle1);
	const normalizedAngle2 = normalizeAngle(angle2, prev.current.angle2);
	prev.current = { angle1: normalizedAngle1, angle2: normalizedAngle2 };

	const handStyle = {
		width: "47%",
		height: "3px",
	};

	return (
		<div
			className={cn(
				"size-[var(--dial-size)] relative rounded-full flex-shrink-0 border-2 max-[700px]:border max-[500px]:border",
				"border-white bg-gradient-to-br from-[#d0d0d0] via-white to-white",
				"dark:border-black dark:from-[#111111] dark:via-[#222222] dark:to-[#222222]",
				"shadow-[-2px_2px_6px_#d0d0d0,_2px_-2px_6px_#ffffff] dark:shadow-[-2px_2px_6px_#111111,_2px_-2px_6px_#222222]"
			)}
		>
			{/* First hand */}
			<div
				className="absolute bg-black dark:bg-white rounded-full transition-transform ease-in-out max-[500px]:w-1/2"
				style={{
					...handStyle,
					top: "calc(50% - 1.5px)",
					left: "50%",
					transformOrigin: "0% 50%",
					transform: `rotate(${normalizedAngle1}deg)`,
					transitionDuration: "0.4s",
				}}
			/>
			{/* Second hand */}
			<div
				className="absolute bg-black dark:bg-white rounded-full transition-transform ease-in-out max-[500px]:w-1/2"
				style={{
					...handStyle,
					top: "calc(50% - 1.5px)",
					left: "50%",
					transformOrigin: "0% 50%",
					transform: `rotate(${normalizedAngle2}deg)`,
					transitionDuration: "0.4s",
				}}
			/>
		</div>
	);
};

interface ClockCounterProps {
	value: number;
	className?: string;
}

const ClockCounter: React.FC<ClockCounterProps> = ({ value, className }) => {
	const convertToDigits = (num: number) => {
		const absValue = Math.abs(Math.floor(num));
		const str = String(absValue);
		const targetLength = Math.max(1, str.length);
		return str.padStart(targetLength, "0").split("").map(Number);
	};

	const [displayValue, setDisplayValue] = useState(() => convertToDigits(value));

	useEffect(() => {
		setDisplayValue(convertToDigits(value));
	}, [value]);

	const isMounted = useHydration();

	if (!isMounted) return null;

	return (
		<div
			className={cn("flex items-center justify-center font-sans text-center", className)}
			style={
				{
					"--dial-size": "3vw",
					"--gap": "calc(var(--dial-size) * 0.05)",
					"--segment-w": "calc(var(--dial-size) * 4 + var(--gap) * 5)",
					"--segment-h": "calc(var(--dial-size) * 6 + var(--gap) * 5)",
					gap: "var(--gap)",
				} as React.CSSProperties
			}
		>
			{displayValue.map((digit, i) => (
				<div
					key={i}
					className="flex flex-wrap"
					style={
						{
							gap: "var(--gap)",
							width: "var(--segment-w)",
							height: "var(--segment-h)",
						} as React.CSSProperties
					}
				>
					{digits[digit].map(({ a, b }, j) => (
						<Dial key={j} angle1={a} angle2={b} />
					))}
				</div>
			))}
		</div>
	);
};

export default ClockCounter;
