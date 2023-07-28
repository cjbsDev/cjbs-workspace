"use client";
import * as React from "react";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { cjbsTheme } from "cjbsDSTM";
// Color
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
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
