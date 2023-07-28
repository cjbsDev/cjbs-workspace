import { createTheme } from "@mui/material";
import { green, cyan, blue, red, grey, orange, yellow } from "./color";

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
  }

  interface ButtonVariants {}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
  }

  interface ButtonVariantsOptions {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
    xSmall: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }

  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
  }
}

export const cjbsTheme = createTheme({
  palette: {
    text: {
      primary: "#000000",
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
    common: {
      white: "#FFFFFF",
      black: "#00000",
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
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
      fontFamily: "Inter",
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: "0em",
      lineHeight: 1.16,
    },
    title1: {
      fontFamily: "Inter",
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
    // buttonxl: {
    //   fontFamily: "Inter",
    //   fontSize: 18,
    //   fontWeight: 400,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // buttonlg: {
    //   fontFamily: "Inter",
    //   fontSize: 16,
    //   fontWeight: 400,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // buttonmd: {
    //   fontFamily: "Inter",
    //   fontSize: 14,
    //   fontWeight: 400,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // buttonsm: {
    //   fontFamily: "Inter",
    //   fontSize: 14,
    //   fontWeight: 400,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // helptxt: {
    //   fontFamily: "Inter",
    //   fontSize: 14,
    //   fontWeight: 400,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // inputtxt: {
    //   fontFamily: "Inter",
    //   fontSize: 14,
    //   fontWeight: 400,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // chip: {
    //   fontFamily: "Inter",
    //   fontSize: 14,
    //   fontWeight: 400,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // tooltip: {
    //   fontFamily: "Inter",
    //   fontSize: 12,
    //   fontWeight: 400,
    //   lineHeight: 1.5,
    //   letterSpacing: "0em",
    // },
    // alert: {
    //   fontFamily: "Inter",
    //   fontSize: 14,
    //   fontWeight: 600,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // tableheader: {
    //   fontFamily: "Inter",
    //   fontSize: 14,
    //   fontWeight: 600,
    //   lineHeight: 1.75,
    //   letterSpacing: "0em",
    // },
    // badge: {
    //   fontFamily: "Inter",
    //   fontSize: 12,
    //   fontWeight: 600,
    //   lineHeight: 1.5,
    //   letterSpacing: "0em",
    // },
    // caption: {
    //   fontFamily: "Inter",
    //   fontSize: 12,
    //   fontWeight: 400,
    //   lineHeight: 1.5,
    //   letterSpacing: "0em",
    // },
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
          // minWidth: 74,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          "&.MuiButton-outlinedSizeSmall": {
            padding: "4px 10px",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
          },
          "&.MuiButton-outlinedSizeMedium": {
            padding: "6px 12px",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "22px",
          },
          "&.MuiButton-outlinedSizeLarge": {
            padding: "8px 16px",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "24px",
          },
        },
        contained: {
          "&.MuiButton-containedSizeSmall": {
            padding: "4px 10px",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
          },
          "&.MuiButton-containedSizeMedium": {
            padding: "6px 12px",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "22px",
          },
          "&.MuiButton-containedSizeLarge": {
            padding: "8px 16px",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "24px",
          },
        },
        text: {
          "&.MuiButton-textSizeSmall": {
            padding: "4px 10px",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
          },
          "&.MuiButton-textSizeMedium": {
            padding: "6px 12px",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "22px",
          },
          "&.MuiButton-textSizeLarge": {
            padding: "8px 16px",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "24px",
          },
        },
      },
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
        // {
        //   props: { variant: "title2" },
        //   style: {
        //     color: "rgba(0, 0, 0, 0.87)",
        //     fontFamily: "Inter",
        //     fontStyle: "normal",
        //     fontWeight: 600,
        //     fontSize: 18,
        //     letterSpacing: "-0.5px",
        //   },
        // },
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
          paddingBottom: "3px",
          paddingTop: "3px",
        },
      },
    },
  },
});
