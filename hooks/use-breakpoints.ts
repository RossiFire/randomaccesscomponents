import useScreenSize from "./use-screen-size";

const mobileWidth = 768;
const tabletWidth = 1024;

export type BreakPoints = {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
};

export const useBreakPoints = (): BreakPoints => {
	const { width } = useScreenSize();

	const isMobile = width < mobileWidth;
	const isTablet = width >= mobileWidth && width < tabletWidth;
	const isDesktop = width >= tabletWidth;

	return { isMobile, isTablet, isDesktop };
};
