import { breakpoints } from "./constants/breakpoints";
import { colors } from "./constants/colors";
import type { IThemeCreatorProps } from "./types";

export const getThemeOptions = ({
    palette,
    direction,
    fontFamily,
}: IThemeCreatorProps) => ({
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
        },
    },
    direction,
    cssVariables: {
        colorSchemeSelector: "class",
    },
    spacing: 4,
    typography: {
        htmlFontSize: 14,
        fontFamily: fontFamily,
    },
    palette: {
        error: colors.error,
        success: colors.success,
        warning: colors.warning,
        grey: colors.grey,
        common: {
            black: "#000",
            white: "#fff",
        },
        ...palette,
    },
    breakpoints: {
        values: {
            xs: breakpoints.xs,
            sm: breakpoints.sm,
            md: breakpoints.md,
            lg: breakpoints.lg,
            xl: breakpoints.xl,
        },
    },
});
