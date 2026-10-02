import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "~material/components";
import { colors } from "~styles/colors";
import { getThemeOptions } from "~ui/theme";

const ltrCache = createCache({
    key: "mui",
    stylisPlugins: [],
});

const fontFamily = '"Segoe UI", "Helvetica Neue", Arial, sans-serif';

const MaterialThemeProvider = ({ children }: PropsWithChildren) => {
    const theme = createTheme(
        getThemeOptions({
            direction: "ltr",
            fontFamily,
            palette: colors,
        }),
    );

    return (
        <CacheProvider value={ltrCache}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
    );
};

export default MaterialThemeProvider;
