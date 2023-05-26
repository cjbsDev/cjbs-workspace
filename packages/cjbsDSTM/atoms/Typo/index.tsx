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
            //lineHeight: 28,
            letterSpacing: '-0.5px'
          },
        },
        // {
        //   props: { variant: 'dashed', color: 'secondary' },
        //   style: {
        //     border: `4px dashed ${red[500]}`,
        //   },
        // },
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
