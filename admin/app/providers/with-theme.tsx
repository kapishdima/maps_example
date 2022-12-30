import React from "react";
import { defaultTheme, mergeTheme, ThemeProvider } from "evergreen-ui";

const theme = mergeTheme(defaultTheme, {
    fontFamilies: {
        ui: "Inter",
        display: "Inter",
        mono: "Noto Sans Mono",
    },
});

export const withTheme = (Component: React.ComponentType<any>) => () => {
    return (
        <ThemeProvider value={theme}>
            <Component />
        </ThemeProvider>
    );
};
