"use client";
import { Inter } from "next/font/google";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
// import { Metadata } from "next";
import './globals.css'
import {cjbsTheme} from "cjbsDSTM";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import * as React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

// export const metadata: Metadata = {
//   title: "...",
//   description: "...",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <title>주문서</title>
      <link rel="icon" href="/favicon.ico" />
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
