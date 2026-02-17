"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useHydration } from "@/hooks/use-hydration";
import { cn } from "@/lib/utils";

const h = { h: 0, m: 180 },
	v = { h: 270, m: 90 },
	tl = { h: 180, m: 270 },
	tr = { h: 0, m: 270 },
	bl = { h: 180, m: 90 },
	br = { h: 0, m: 90 },
	e = { h: 135, m: 135 };

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

const getTimeDigits = () => {
	const now = new Date();
	return [now.getHours(), now.getMinutes(), now.getSeconds()].flatMap((val) =>
		String(val).padStart(2, "0").split("").map(Number)
	);
};

interface ClockProps {
	h: number;
	m: number;
}

function Clock({ h, m }: ClockProps) {
	const prev = useRef({ h: 0, m: 0 });
	const hourAngle = normalizeAngle(h, prev.current.h);
	const minuteAngle = normalizeAngle(m, prev.current.m);
	prev.current = { h: hourAngle, m: minuteAngle };

	const handStyle = {
		width: "47%",
		height: "3px",
	};

	return (
		<div
			className={cn(
				"size-[var(--clock-size)] relative rounded-full flex-shrink-0 border-2 max-[700px]:border max-[500px]:border",
				"border-white bg-gradient-to-br from-[#d0d0d0] via-white to-white",
				"dark:border-black dark:from-[#111111] dark:via-[#222222] dark:to-[#222222]",
				"shadow-[-2px_2px_6px_#d0d0d0,_2px_-2px_6px_#ffffff] dark:shadow-[-2px_2px_6px_#111111,_2px_-2px_6px_#222222]"
			)}
		>
			{/* Hour hand */}
			<div
				className="absolute bg-black dark:bg-white rounded-full transition-transform ease-in-out max-[500px]:w-1/2"
				style={{
					...handStyle,
					top: "calc(50% - 1.5px)",
					left: "50%",
					transformOrigin: "0% 50%",
					transform: `rotate(${hourAngle}deg)`,
					transitionDuration: "0.4s",
				}}
			/>
			{/* Minute hand */}
			<div
				className="absolute bg-black dark:bg-white rounded-full transition-transform ease-in-out max-[500px]:w-1/2"
				style={{
					...handStyle,
					top: "calc(50% - 1.5px)",
					left: "50%",
					transformOrigin: "0% 50%",
					transform: `rotate(${minuteAngle}deg)`,
					transitionDuration: "0.4s",
				}}
			/>
		</div>
	);
};

interface CClockProps {
	className?: string;
}

const CClock: React.FC<CClockProps> = ({ className }) => {
	const [time, setTime] = useState(Array(6).fill(0));

	useEffect(() => {
		let updateTimerId: NodeJS.Timeout;
		const updateTime = () => {
			setTime(getTimeDigits());
			const now = Date.now();
			const delay = 1000 - (now % 1000);
			updateTimerId = setTimeout(updateTime, delay);
		};

		const initialTimerId = setTimeout(() => {
			updateTime();
		}, 600);

		return () => {
			clearTimeout(updateTimerId);
			clearTimeout(initialTimerId);
		};
	}, []);

	const isMounted = useHydration();

	if (!isMounted) return null;

	return (
		<div
			className={cn("flex items-center justify-center h-screen font-sans text-center", className)}
			style={
				{
					"--clock-size": "3vw",
					"--gap": "calc(var(--clock-size) * 0.05)",
					"--clock-segment-w": "calc(var(--clock-size) * 4 + var(--gap) * 5)",
					"--clock-segment-h": "calc(var(--clock-size) * 6 + var(--gap) * 5)",
					gap: "var(--gap)",
					paddingLeft: "calc(var(--clock-size) + var(--gap) * 2)",
				} as React.CSSProperties
			}
		>
			{time.map((t, i) => (
				<div
					key={i}
					className="flex flex-wrap"
					style={
						{
							gap: "var(--gap)",
							width: "var(--clock-segment-w)",
							height: "var(--clock-segment-h)",
							marginRight: i % 2 === 1 ? "var(--clock-size)" : undefined,
						} as React.CSSProperties
					}
				>
					{digits[t].map(({ h, m }, j) => (
						<Clock key={j} h={h} m={m} />
					))}
				</div>
			))}
		</div>
	);
};

export default CClock;
