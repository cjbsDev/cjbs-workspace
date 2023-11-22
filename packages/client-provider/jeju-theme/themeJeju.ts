import React from 'react';
import { createTheme } from '@mui/material/styles';
import { default as dfStyle } from './tokens.json';
const themeSet = dfStyle; // 테마 세트

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1Bold: true;
    title1: true;
    title2: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    outlined2: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    xlarge: true;
  }
}

export const themeJeju = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  // status: {
  //   danger: themeSet.Blue['Blue 50'].value,
  // },
  palette: {
    mode: 'light',
    // neutral: {
    //   main: '#64748B',
    //   contrastText: '#fff',
    // },
    primary: {
      main: themeSet.Primary.Main.value,
      dark: themeSet.Primary.Dark.value,
      light: themeSet.Primary.Light.value,
    },
    secondary: {
      main: themeSet.Secondary.Main.value,
      dark: themeSet.Secondary.Dark.value,
      light: themeSet.Secondary.Light.value,
    },
    text: {
      primary: themeSet.Text.Primary.value,
      secondary: themeSet.Text.Secondary.value,
      disabled: themeSet.Text.Disabled.value,
    },
    success: {
      main: themeSet.Success.Main.value,
      dark: themeSet.Success.Dark.value,
      light: themeSet.Success.Light.value,
    },
    error: {
      main: themeSet.Error.Main.value,
      dark: themeSet.Error.Dark.value,
      light: themeSet.Error.Light.value,
    },
    info: {
      main: themeSet.Info.Main.value,
      dark: themeSet.Info.Dark.value,
      light: themeSet.Info.Light.value,
    },
    warning: {
      main: themeSet.Warning.Main.value,
      dark: themeSet.Warning.Dark.value,
      light: themeSet.Warning.Light.value,
    },
    grey: {
      50: themeSet.Gray['Gray 50'].value,
      100: themeSet.Gray['Gray 100'].value,
      200: themeSet.Gray['Gray 200'].value,
      300: themeSet.Gray['Gray 300'].value,
      400: themeSet.Gray['Gray 400'].value,
      500: themeSet.Gray['Gray 500'].value,
      600: themeSet.Gray['Gray 600'].value,
      700: themeSet.Gray['Gray 700'].value,
      800: themeSet.Gray['Gray 800'].value,
      900: themeSet.Gray['Gray 900'].value,
    },
  },
  // shadows: [
  //   'none',
  //   `${themeSet.Elevation[1].value.x}px ${themeSet.Elevation[1].value.y}px ${themeSet.Elevation[1].value.blur}px ${themeSet.Elevation[1].value.spread}px ${themeSet.Elevation[1].value.color}`,
  //   `${themeSet.Elevation[2].value.x}px ${themeSet.Elevation[2].value.y}px ${themeSet.Elevation[2].value.blur}px ${themeSet.Elevation[2].value.spread}px ${themeSet.Elevation[2].value.color}`,
  //   `${themeSet.Elevation[3].value.x}px ${themeSet.Elevation[3].value.y}px ${themeSet.Elevation[3].value.blur}px ${themeSet.Elevation[3].value.spread}px ${themeSet.Elevation[3].value.color}`,
  //   `${themeSet.Elevation[4].value.x}px ${themeSet.Elevation[4].value.y}px ${themeSet.Elevation[4].value.blur}px ${themeSet.Elevation[4].value.spread}px ${themeSet.Elevation[4].value.color}`,
  //   `${themeSet.Elevation[5].value.x}px ${themeSet.Elevation[5].value.y}px ${themeSet.Elevation[5].value.blur}px ${themeSet.Elevation[5].value.spread}px ${themeSet.Elevation[5].value.color}`,
  //   `${themeSet.Elevation[6].value.x}px ${themeSet.Elevation[6].value.y}px ${themeSet.Elevation[6].value.blur}px ${themeSet.Elevation[6].value.spread}px ${themeSet.Elevation[6].value.color}`,
  //   `${themeSet.Elevation[7].value.x}px ${themeSet.Elevation[7].value.y}px ${themeSet.Elevation[7].value.blur}px ${themeSet.Elevation[7].value.spread}px ${themeSet.Elevation[7].value.color}`,
  //   `${themeSet.Elevation[8].value.x}px ${themeSet.Elevation[8].value.y}px ${themeSet.Elevation[8].value.blur}px ${themeSet.Elevation[8].value.spread}px ${themeSet.Elevation[8].value.color}`,
  //   `${themeSet.Elevation[9].value.x}px ${themeSet.Elevation[9].value.y}px ${themeSet.Elevation[9].value.blur}px ${themeSet.Elevation[9].value.spread}px ${themeSet.Elevation[9].value.color}`,
  //   // `${themeSet.Elevation[10].value[1].x}px ${themeSet.Elevation[10].value[1].y}px ${themeSet.Elevation[10].value[1].blur}px ${themeSet.Elevation[10].value[1].spread}px ${themeSet.Elevation[10].value[1].color}`,
  //   // `${themeSet.Elevation[11].value[1].x}px ${themeSet.Elevation[11].value[1].y}px ${themeSet.Elevation[11].value[1].blur}px ${themeSet.Elevation[11].value[1].spread}px ${themeSet.Elevation[11].value[1].color}`,
  //   // `${themeSet.Elevation[12].value[1].x}px ${themeSet.Elevation[12].value[1].y}px ${themeSet.Elevation[12].value[1].blur}px ${themeSet.Elevation[12].value[1].spread}px ${themeSet.Elevation[12].value[1].color}`,
  //   // `${themeSet.Elevation[13].value[1].x}px ${themeSet.Elevation[13].value[1].y}px ${themeSet.Elevation[13].value[1].blur}px ${themeSet.Elevation[13].value[1].spread}px ${themeSet.Elevation[13].value[1].color}`,
  //   // `${themeSet.Elevation[14].value[1].x}px ${themeSet.Elevation[14].value[1].y}px ${themeSet.Elevation[14].value[1].blur}px ${themeSet.Elevation[14].value[1].spread}px ${themeSet.Elevation[14].value[1].color}`,
  //   // `${themeSet.Elevation[15].value[1].x}px ${themeSet.Elevation[15].value[1].y}px ${themeSet.Elevation[15].value[1].blur}px ${themeSet.Elevation[15].value[1].spread}px ${themeSet.Elevation[15].value[1].color}`,
  //   // `${themeSet.Elevation[16].value[1].x}px ${themeSet.Elevation[16].value[1].y}px ${themeSet.Elevation[16].value[1].blur}px ${themeSet.Elevation[16].value[1].spread}px ${themeSet.Elevation[16].value[1].color}`,
  //   // `${themeSet.Elevation[17].value[1].x}px ${themeSet.Elevation[17].value[1].y}px ${themeSet.Elevation[17].value[1].blur}px ${themeSet.Elevation[17].value[1].spread}px ${themeSet.Elevation[17].value[1].color}`,
  //   // `${themeSet.Elevation[18].value[1].x}px ${themeSet.Elevation[18].value[1].y}px ${themeSet.Elevation[18].value[1].blur}px ${themeSet.Elevation[18].value[1].spread}px ${themeSet.Elevation[18].value[1].color}`,
  //   // `${themeSet.Elevation[19].value[1].x}px ${themeSet.Elevation[19].value[1].y}px ${themeSet.Elevation[19].value[1].blur}px ${themeSet.Elevation[19].value[1].spread}px ${themeSet.Elevation[19].value[1].color}`,
  //   // `${themeSet.Elevation[20].value[1].x}px ${themeSet.Elevation[20].value[1].y}px ${themeSet.Elevation[20].value[1].blur}px ${themeSet.Elevation[20].value[1].spread}px ${themeSet.Elevation[20].value[1].color}`,
  //   // `${themeSet.Elevation[21].value[1].x}px ${themeSet.Elevation[21].value[1].y}px ${themeSet.Elevation[21].value[1].blur}px ${themeSet.Elevation[21].value[1].spread}px ${themeSet.Elevation[21].value[1].color}`,
  //   // `${themeSet.Elevation[22].value[1].x}px ${themeSet.Elevation[22].value[1].y}px ${themeSet.Elevation[22].value[1].blur}px ${themeSet.Elevation[22].value[1].spread}px ${themeSet.Elevation[22].value[1].color}`,
  //   // `${themeSet.Elevation[23].value[1].x}px ${themeSet.Elevation[23].value[1].y}px ${themeSet.Elevation[23].value[1].blur}px ${themeSet.Elevation[23].value[1].spread}px ${themeSet.Elevation[23].value[1].color}`,
  //   // `${themeSet.Elevation[24].value[1].x}px ${themeSet.Elevation[24].value[1].y}px ${themeSet.Elevation[24].value[1].blur}px ${themeSet.Elevation[24].value[1].spread}px ${themeSet.Elevation[24].value[1].color}`,
  // ],
  typography: {
    fontFamily: ['Inter'].join(','),
    h1: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-1'].value}`,
      lineHeight: `${themeSet.lineHeights['1'].value}px`,
      fontSize: `${themeSet.fontSize['10'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['0'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    h2: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-1'].value}`,
      lineHeight: `${themeSet.lineHeights['2'].value}px`,
      fontSize: `${themeSet.fontSize['9'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['0'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    // h3: {
    //   fontFamily: `${themeSet.fontFamilies['inter'].value}`,
    //   fontWeight: `${themeSet.fontWeights['inter-1'].value}`,
    //   lineHeight: `${themeSet.lineHeights['3'].value}px`,
    //   fontSize: `${themeSet.fontSize['8'].value}px`,
    //   letterSpacing: `${themeSet.letterSpacing['0'].value}px`,
    //   paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
    //   textCase: `${themeSet.textCase.none.value}`,
    //   textDecoration: `${themeSet.textDecoration.none.value}`,
    // },
    h3: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-1'].value}`,
      lineHeight: `${themeSet.lineHeights['2'].value}px`,
      fontSize: `${themeSet.fontSize['6'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['0'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    h4: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-1'].value}`,
      lineHeight: `${themeSet.lineHeights['4'].value}px`,
      fontSize: `${themeSet.fontSize['7'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['0'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    h5: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-1'].value}`,
      lineHeight: `${themeSet.lineHeights['4'].value}px`,
      fontSize: `${themeSet.fontSize['7'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['0'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    h6: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-1'].value}`,
      lineHeight: `${themeSet.lineHeights['5'].value}px`,
      fontSize: `${themeSet.fontSize['4'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    subtitle1: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-2'].value}`,
      lineHeight: `${themeSet.lineHeights['5'].value}px`,
      fontSize: `${themeSet.fontSize['2'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    subtitle2: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-2'].value}`,
      lineHeight: `${themeSet.lineHeights['6'].value}px`,
      fontSize: `${themeSet.fontSize['1'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    body1: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
      lineHeight: `${themeSet.lineHeights['5'].value}px`,
      fontSize: `${themeSet.fontSize['2'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    body2: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
      lineHeight: `${themeSet.lineHeights['6'].value}px`,
      fontSize: `${themeSet.fontSize['1'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    button: {
      fontFamily: `${themeSet['Button SM'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
      lineHeight: `${themeSet.lineHeights['8'].value}px`,
      fontSize: `${themeSet.fontSize['3'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      paragraphSpacing: `${themeSet.paragraphSpacing['0'].value}px`,
      textCase: `${themeSet.textCase.none.value}`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
      textTransform: 'none',
    },
    title1: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-2'].value}`,
      lineHeight: `${themeSet.lineHeights['3'].value}px`,
      fontSize: `${themeSet.fontSize['5'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
    title2: {
      fontFamily: `${themeSet.fontFamilies['inter'].value}`,
      fontWeight: `${themeSet.fontWeights['inter-2'].value}`,
      lineHeight: `${themeSet.lineHeights['4'].value}px`,
      fontSize: `${themeSet.fontSize['3'].value}px`,
      letterSpacing: `${themeSet.letterSpacing['1'].value}px`,
      textDecoration: `${themeSet.textDecoration.none.value}`,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          height: '1.0556em',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `${themeSet.fontFamilies['inter'].value}`,
          fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
          //lineHeight: `${themeSet.lineHeights[themeSet.Components["Input Label"].value.lineHeight.replace(/\D/g, "")].value}px`,
          fontSize: `${themeSet.fontSize[1].value}px`,
          letterSpacing: `${themeSet.letterSpacing[1].value}px`,
          paragraphSpacing: `${themeSet.paragraphSpacing[0].value}px`,
          textCase: `${themeSet.textCase.none.value}`,
          textDecoration: `${themeSet.textDecoration.none.value}`,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
        },
        sizeSmall: {
          height: `${themeSet['Button SM'].value}px`,
          fontFamily: `${themeSet.fontFamilies['inter'].value}`,
          fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
          lineHeight: `${themeSet.lineHeights[6].value}px`,
          fontSize: `${themeSet.fontSize[1].value}px`,
          letterSpacing: `${themeSet.letterSpacing[1].value}px`,
          paragraphSpacing: `${themeSet.paragraphSpacing[0].value}px`,
          textCase: `${themeSet.textCase.none.value}`,
          textDecoration: `${themeSet.textDecoration.none.value}`,
        },
        sizeMedium: {
          height: `${themeSet['Button MD'].value}px`,
        },
        sizeLarge: {
          fontFamily: `${themeSet.fontFamilies['inter'].value}`,
          fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
          lineHeight: `${themeSet.lineHeights[4].value}px`,
          fontSize: `${themeSet.fontSize[2].value}px`,
          letterSpacing: `${themeSet.letterSpacing[1].value}px`,
          paragraphSpacing: `${themeSet.paragraphSpacing[0].value}px`,
          textCase: `${themeSet.textCase.none.value}`,
          textDecoration: `${themeSet.textDecoration.none.value}`,
          height: `${themeSet['Button LG'].value}px`,
        },
      },
      variants: [
        {
          props: { variant: 'outlined2' },
          style: {
            border: `1px solid ${themeSet.Secondary.State['Outlined Resting Border'].value}`,
            // fontWeight: '600',
            paddingRight: '10px',
            paddingLeft: '10px',
            backgroundColor: 'white',
            alignItems: 'center',
            // fontSize: `${
            //   themeSet.fontSize[themeSet.Typography['Button MD'].value.fontSize.replace(/\D/g, '')].value
            // }px`,
          },
        },
        {
          props: { size: 'xlarge' },
          style: {
            minHeight: `${themeSet['Button XL'].value}px`,
            fontSize: `${themeSet.fontSize[3].value}px`,
            fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
            lineHeight: `${themeSet.lineHeights[7].value}px`,
            letterSpacing: `${themeSet.letterSpacing[1].value}px`,
          },
        },
      ],
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          fontFamily: `${themeSet.fontFamilies['inter'].value}`,
          fontWeight: `${themeSet.fontWeights['inter-3'].value}`,
          //lineHeight: `${themeSet.lineHeights[themeSet.Components["Badge Label"].value.lineHeight.replace(/\D/g, "")].value}px`,
          fontSize: `${themeSet.fontSize[0].value}px`,
          letterSpacing: `${themeSet.letterSpacing[1].value}px`,
          paragraphSpacing: `${themeSet.paragraphSpacing[0].value}px`,
          textCase: `${themeSet.textCase.none.value}`,
          textDecoration: `${themeSet.textDecoration.none.value}`,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        // @font-face{
        //   font-family:'Inter';
        //   src: url(/fonts/Inter-Bold.ttf);
        //   font-weight: 700;
        //   font-style: normal;
        // }
        // @font-face{
        //   font-family:'Inter';
        //   src: url(/fonts/Inter-Bold.ttf);
        //   font-weight: 600;
        //   font-style: normal;
        // }
        // @font-face{
        //   font-family:'Inter';
        //   src: url(/fonts/Inter-Bold.ttf);
        //   font-weight: 400;
        //   font-style: normal;
        // }
        @font-face {
          font-family: 'NotoSansKR';
          src: url('/fonts/NotoSansKR-Regular.ttf');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'NotoSansKR';
          src: url('/fonts/NotoSansKR-SemiBold.ttf');
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: 'NotoSansKR';
          src: url('/fonts/NotoSansKR-Bold.ttf');
          font-weight: 700;
          font-style: normal;
        }
      `,
    },
  },
  shape: {
    borderRadius: 2,
  },
});
