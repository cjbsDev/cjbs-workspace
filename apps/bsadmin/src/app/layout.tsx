"use client";
import * as React from "react";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { cjbsTheme } from "cjbsDSTM";
import "./globals.css";
import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <title>BS-Admin</title>
      <link rel="icon" href="/favicon.ico" />
      <head />
      <body>
        <JeJuProvider>
          <Provider>
            {children}
            <ProgressBar
              height="6px"
              color={cjbsTheme.palette.primary.main}
              options={{ showSpinner: false }}
              shallowRouting
            />
          </Provider>
        </JeJuProvider>
      </body>
    </html>
  );
}
