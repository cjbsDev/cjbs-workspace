"use client";
import * as React from "react";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { yellow } from "cjbsDSTM/themes/color";
import "./globals.css";
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
      <title>BS-Admin</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preload" href="/api/data" as="fetch" crossOrigin="anonymous" />
      <head />
      <body>
        <JeJuProvider>
          <Provider>
            {children}
            <ProgressBar
              height="6px"
              color={yellow["500"]}
              options={{ showSpinner: false }}
              shallowRouting
            />
          </Provider>
        </JeJuProvider>
      </body>
    </html>
  );
}
