import { useEffect, useRef, useState } from "react";

const DEFAULT_NAVBAR_WIDTH_PERCENT = 15;

type Dimensions = {
    contentWidth: number;
    navbarWidth: number;
    windowWidth: number;
};

export const useLayoutDimensions = () => {
    const [{ contentWidth, navbarWidth, windowWidth }, setDimensions] =
        useState<Dimensions>({
            contentWidth: 0,
            navbarWidth: 0,
            windowWidth: window.innerWidth,
        });

    const calculateContentWidth = () => {
        if (navbarWidth <= 0) {
            return;
        }

        const contentWidthPixels = windowWidth - navbarWidth;
        setDimensions((dimenstion) => ({
            ...dimenstion,
            contentWidth: contentWidthPixels,
        }));
    };

    const calculateNabarWidth = () => {
        const navbarWidthPixels =
            windowWidth * (DEFAULT_NAVBAR_WIDTH_PERCENT / 100);

        setDimensions((dimenstion) => ({
            ...dimenstion,
            navbarWidth: navbarWidthPixels,
        }));
    };

    const onWindowResize = () => {
        setDimensions((dimenstion) => ({
            ...dimenstion,
            windowWidth: window.innerWidth,
        }));
    };

    useEffect(() => {
        calculateNabarWidth();
        calculateContentWidth();
    }, [windowWidth, navbarWidth]);

    useEffect(() => {
        window.addEventListener("resize", onWindowResize);
        return () => window.removeEventListener("resize", onWindowResize);
    }, []);

    return {
        calculateContentWidth,
        calculateNabarWidth,
        contentWidth,
        navbarWidth,
        windowWidth,
    };
};
