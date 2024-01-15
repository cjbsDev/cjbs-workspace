import * as React from "react";
import "./globals.css";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
import DrawerProvider from "./DrawerProvider";
import { NextProgressBar } from "./NextProgressBar";
import Head from "next/head";

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
        <JeJuProvider>
          <Provider>
            <DrawerProvider>{children}</DrawerProvider>
            <NextProgressBar />
          </Provider>
        </JeJuProvider>
      </body>
    </html>
  );
}
