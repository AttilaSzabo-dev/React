import {
  createTheme,
  type CSSVariablesResolver,
  DEFAULT_THEME,
  mergeMantineTheme,
} from "@mantine/core";
//import classes from "./App.module.css";

const themeOverride = createTheme({
  fontFamily: "Open Sans, sans-serif",
  black: "#2D2D2D",
  other: {
    backgroundColor: "#EDEDED",
    dropdownColor: "#E2E2E2",
    iconColor: "#BFBFBF",
    iconGrayColor: "#A2A2A2",
    redColor: "#FF4F4F",
    focusedInputColor: "#EAEAEA",
    iconGreenColor: "#2BB673",
    minButtonWidthInPixels: "100px",
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export const cssVariableResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-background": theme.other.backgroundColor as string,
    "--mantine-color-dropdown": theme.other.dropdownColor as string,
    "--mantine-color-icon": theme.other.iconColor as string,
    "--mantine-color-icon-gray": theme.other.iconGrayColor as string,
    "--mantine-color-red": theme.other.redColor as string,
    "--mantine-color-focused-input": theme.other.focusedInputColor as string,
    "--mantine-color-icon-green": theme.other.iconGreenColor as string,

    "--mantine-min-button-width-in-pixels": theme.other
      .minButtonWidthInPixels as string,
  },
  light: {},
  dark: {},
});
