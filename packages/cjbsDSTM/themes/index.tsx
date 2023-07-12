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
    primary: {
      main: "#006ecd",
      light: "#4ba2ed",
      dark: "#004c8e",
      // contrastText: ""
    },
    secondary: {
      main: "#868e95",
      light: "#ced4da",
      dark: "#495056",
      // contrastText: ""
    },
    error: {
      main: "#f44336",
      light: "#f88078",
      dark: "#b50d0d",
    },
    warning: {
      main: "#ff5722",
      light: "#ff784e",
      dark: "#d84315",
    },
    info: {
      main: "#00bcd4",
      light: "#33c9dc",
      dark: "#0097a7",
    },
    success: {
      main: "#4caf50",
      light: "#6fbf73",
      dark: "#357a38",
    },
    grey: {
      50: "#f8f9fa",
      100: "#f1f3f5",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#868e95",
      700: "#495056",
      800: "#343a40",
      900: "#222529",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    danger: {
      main: "#EF151E",
      contrastText: "#fff",
    },
  },
  typography: {
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: -0.25,
      marginBottom: 1,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 14,
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
            padding: "0 6px",
            border: "1px solid #CED4DA",
            borderRadius: "2px",
            fontSize: 14,
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "title1" },
          style: {
            color: "black",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: "-0.5px",
          },
        },
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
