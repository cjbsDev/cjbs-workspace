import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title1: React.CSSProperties;
    buttonMD: React.CSSProperties;
  }

  interface ButtonVariants {}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    buttonMD?: React.CSSProperties;
  }

  interface ButtonVariantsOptions {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
    buttonMD: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

export const cjbsTheme = createTheme({
  palette: {
    primary: {
      main: "#006ECD",
      light: "",
      dark: "",
    },
  },
  typography: {
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: -0.25,
    },
    button: {
      fontSize: 14,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
        style: {
          fontSize: 14,
          boxShadow: "none",
          borderRadius: 2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {},
        contained: {},
        text: {},
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
          props: { variant: "dashed", color: "secondary" },
          style: {
            border: `4px dashed red`,
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
          props: { variant: "buttonMD" },
          style: {
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: -0.25,
          },
        },
      ],
    },
  },
});
