export type TDirections = "ltr" | "rtl";

export interface IColorPaletteObject {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
    main: string;
    light: string;
    dark: string;
    contrastText: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
}

export interface IColorPalette {
    primary: IColorPaletteObject;
    secondary: IColorPaletteObject;
    error?: IColorPaletteObject;
    warning?: IColorPaletteObject;
    success?: IColorPaletteObject;
    info?: IColorPaletteObject;
    grey?: IColorPaletteObject;
}

export interface IThemeCreatorProps {
    direction: TDirections;
    palette: IColorPalette;
    fontFamily: string;
}
