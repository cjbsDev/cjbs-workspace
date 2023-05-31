import * as React from 'react';
import {Typography, TypographyProps} from '@mui/material';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title1: true;
  }
}


const theme = createTheme ({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'title1' },
          style: {
            color: 'black',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: '-0.5px'
          },
        },
      ],
    }
  }
})

interface Title1Props extends TypographyProps{
  titleName: string
}

export const Title1 = ({titleName, ...props}: Title1Props) => {
  return <ThemeProvider theme={theme}>
    <Typography variant='title1' {...props}>
      {titleName}
    </Typography>
  </ThemeProvider>
};
