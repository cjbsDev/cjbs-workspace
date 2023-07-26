import { createTheme } from "@mui/material";
import { palette } from "@mui/system";

declare module "@mui/material/styles" {
  interface Theme {}
  interface ThemeOptions {}

  interface Palette {
    neutral: Palette["primary"];
    danger: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    danger: Palette["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface TypographyVariants {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    buttonMD: React.CSSProperties;
  }

  interface ButtonVariants {}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    buttonMD?: React.CSSProperties;
  }

  interface ButtonVariantsOptions {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
    buttonMD: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
    xSmall: true;
  }
}

export const cjbsTheme = createTheme({
  palette: {
    text: {
      primary: "#00000",
      secondary: "#666666",
      disabled: "#999FA4",
    },
    primary: {
      main: "#006ECD",
      dark: "#004C8E",
      light: "#80B6E6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#868E95",
      dark: "#495056",
      light: "#CED4DA",
      contrastText: "#fff",
    },
    tertiary: {
      main: "#FF9700",
      dark: "#CC7800",
      light: "#FFCA7F",
      contrastText: "#fff",
    },
    error: {
      main: "#EF151E",
      dark: "#B50D0D",
      light: "#EF9A9A",
      contrastText: "#ffff",
    },
    warning: {
      main: "#FF5722",
      dark: "#D84315",
      light: "#ffaa90",
      contrastText: "#fff",
    },
    info: {
      main: "#00BCD4",
      dark: "#0097A7",
      light: "#80deea",
      contrastText: "#fff",
    },
    success: {
      main: "#4CAF50",
      dark: "#357A38",
      light: "#a5d6a7",
      contrastText: "#fff",
    },
    blue: {
      blue50: "#E6F0FA",
      blue100: "#CCE2F5",
      blue200: "#99C5EB",
      blue300: "#66A8E1",
      blue400: "#338BD7",
      blue500: "#006ECD",
      blue600: "#0063BA",
      blue700: "#005AA8",
      blue800: "#004C8E",
      blue900: "#001242",
    },
    gray: {
      gray50: "#F8F9FA",
      gray100: "#F1F3F5",
      gray200: "#E9ECEF",
      gray300: "#DEE2E6",
      gray400: "#CED4DA",
      gray500: "#ADB5BD",
      gray600: "#868E95",
      gray700: "#495056",
      gray800: "#343A40",
      gray900: "#222529",
    },
    yellow: {
      yellow50: "#FFF3E0",
      yellow100: "#FFE0B2",
      yellow200: "#FFCC80",
      yellow300: "#FFB74D",
      yellow400: "#FFA726",
      yellow500: "#FF9700",
      yellow600: "#E58700",
      yellow700: "#CC7800",
      yellow800: "#995A00",
      yellow900: "#663C00",
    },
    red: {
      red50: "#FEEBEE",
      red100: "#FECDD2",
      red200: "#EF9A9A",
      red300: "#F57278",
      red400: "#EF5350",
      red500: "#F44336",
      red600: "#E53935",
      red700: "#D32F2F",
      red800: "#B50D0D",
      red900: "#A10606",
    },
    green: {
      green50: "#F1F9F1",
      green100: "#C8E6C9",
      green200: "#A5D6A7",
      green300: "#81C784",
      green400: "#66BB6A",
      green500: "#4CAF50",
      green600: "#43A047",
      green700: "#388E3C",
      green800: "#2E7D32",
      green900: "#1B5E20",
    },
    cyan: {
      cyan50: "#E0F7FA",
      cyan100: "#B2EBF2",
      cyan200: "#80DEEA",
      cyan300: "#4DD0E1",
      cyan400: "#26C6DA",
      cyan500: "#00BCD4",
      cyan600: "#00ACC1",
      cyan700: "#0097A7",
      cyan800: "#00838F",
      cyan900: "#006064",
    },
    orange: {
      orange50: "#FBE9E7",
      orange100: "#FFCCBC",
      orange200: "#FFAB91",
      orange300: "#FF8A65",
      orange400: "#FF7043",
      orange500: "#FF5722",
      orange600: "#F4511E",
      orange700: "#E64A19",
      orange800: "#D84315",
      orange900: "#BF360C",
    },
    common: {
      white: "#FFFFFF",
      black: "#00000",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontFamily: "Inter",
      fontSize: 36,
      fontWeight: 700,
      letterSpacing: "0em",
      lineHeight: 1.16,
    },
    h2: {
      fontSize: 32,
      fontWeight: 700,
      fontFamily: "Inter",
      letterSpacing: "0em",
      lineHeight: 1.2,
    },
    h3: {
      // fontFamily: "Inter",
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: "0em",
      lineHeight: 1.16,
    },
    title1: {
      // fontFamily: "Inter",
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: "0em",
      lineHeight: 1.75,
    },
    title2: {
      fontFamily: "Inter",
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: "0em",
      lineHeight: 1.75,
    },
    subtitle1: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: "0em",
      lineHeight: 1.75,
    },
    subtitle2: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: "0em",
      lineHeight: 1.57,
    },
    body1: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: "0em",
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: "0em",
    },
    buttonxl: {
      fontFamily: "Inter",
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    buttonlg: {
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    buttonmd: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    buttonsm: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    helptxt: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    inputtxt: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    chip: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    tooltip: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0em",
    },
    alert: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    tableheader: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: "0em",
    },
    badge: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: "0em",
    },
    caption: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0em",
    },
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: 14,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        input: {
          paddingTop: 5.2,
          paddingBottom: 5.2,
          ":read-only": {
            backgroundColor: "#F1F3F5",
            textFillColor: "rgba(0, 0, 0, 0.6)",
            // outline: "none",
            // ":hover": {
            //   outline: "none",
            // },
          },
          "&.Mui-disabled": {
            backgroundColor: "#F1F3F5",
            textFillColor: "rgba(0, 0, 0, 0.6)",
          },
        },
      },
      defaultProps: {
        style: {
          borderRadius: 2,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
        style: {
          boxShadow: "none",
          borderRadius: 2,
          textTransform: "initial",
          minWidth: "fit-content",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          "&.MuiButton-outlinedSizeSmall": {
            padding: "3px 10px",
          },
          "&.MuiButton-outlinedSizeMedium": {
            padding: "6px 12px",
          },
          "&.MuiButton-outlinedSizeLarge": {
            padding: "8px 16px",
            fontSize: 16,
          },
        },
        contained: {
          "&.MuiButton-containedSizeSmall": {
            padding: "3px 10px",
          },
          "&.MuiButton-containedSizeMedium": {
            padding: "6px 12px",
          },
          "&.MuiButton-containedSizeLarge": {
            padding: "8px 16px",
            fontSize: 16,
          },
        },
        text: {
          "&.MuiButton-textSizeSmall": {
            padding: "3px 10px",
          },
          "&.MuiButton-textSizeMedium": {
            padding: "6px 12px",
          },
          "&.MuiButton-textSizeLarge": {
            padding: "8px 16px",
            fontSize: 16,
          },
        },
      },
      variants: [
        {
          props: { variant: "dashed" },
          style: {
            textTransform: "none",
            border: `2px dashed blue`,
          },
        },
        {
          props: { variant: "xSmall", color: "secondary" },
          style: {
            padding: "0 10px",
            border: "1px solid #CED4DA",
            borderRadius: "2px",
            fontSize: 14,
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTypography: {
      variants: [
        // {
        //   props: { variant: "title1" },
        //   style: {
        //     color: "black",
        //     fontFamily: "Inter",
        //     fontStyle: "normal",
        //     fontWeight: 600,
        //     fontSize: 28,
        //     letterSpacing: "-0.5px",
        //   },
        // },
        {
          props: { variant: "title2" },
          style: {
            color: "rgba(0, 0, 0, 0.87)",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "-0.5px",
          },
        },
        {
          props: { variant: "buttonMD" },
          style: {
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: -0.25,
          },
        },
      ],
    },
    MuiNativeSelect: {
      styleOverrides: {
        select: {
          "&.MuiNativeSelect-select": {
            fontSize: 14,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: 14,
          paddingBottom: "3.5px",
          paddingTop: "3.5px",
        },
      },
    },
  },
});
