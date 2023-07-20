"use client";
import * as React from "react";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { cjbsTheme } from "cjbsDSTM";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
