import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import type { NextPage } from 'next'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from "recoil";
import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

const theme = createTheme({

})

function MyApp({Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
