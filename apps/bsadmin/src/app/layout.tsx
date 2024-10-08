import * as React from "react";
import "./globals.css";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
import DrawerProvider from "./DrawerProvider";
import { NextProgressBar } from "./NextProgressBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import RecoilRootProvider from "./recoilRootProvider";
import SProviders from "./sessionProvider";
// import { Inter } from "next/font/google";
// const inter = Inter({
//   weight: ["400", "600", "700"],
//
//   subsets: ["latin"],
//   display: "swap",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>BS-Admin</title>
        <link rel="icon" href="/favicon.ico" />
        {/*<link*/}
        {/*  rel="preload"*/}
        {/*  href="/api/data"*/}
        {/*  as="fetch"*/}
        {/*  crossOrigin="anonymous"*/}
        {/*/>*/}
      </head>
      <body>
        <AppRouterCacheProvider>
          <JeJuProvider>
            <RecoilRootProvider>
              <SProviders>
                <Provider>
                  {/*<DrawerProvider>{children}</DrawerProvider>*/}
                  {children}
                  <NextProgressBar />
                </Provider>
              </SProviders>
            </RecoilRootProvider>
          </JeJuProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
