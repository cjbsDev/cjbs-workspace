"use client";
import { Inter } from "next/font/google";
import Provider from "client-provider";
import JeJuProvider from "./jejuProvider";
// import { Metadata } from "next";
import './globals.css'
import {cjbsTheme} from "cjbsDSTM";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import * as React from "react";
import {useEffect} from "react";
import {Logger} from "sass";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "600", "700"],
// });

// export const metadata: Metadata = {
//   title: "...",
//   description: "...",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    console.log(navigator)
    const isWindows = navigator.userAgentData.platform.indexOf('Win') > -1;
    if (isWindows) {
      document.body.classList.add('windowOS');
      const windowOSElements = document.querySelectorAll('.windowOS *');
      windowOSElements.forEach(element => {
        const fontWeight = window.getComputedStyle(element).getPropertyValue('font-weight');
        if (fontWeight === '400') {
          element.style.fontWeight = '500';
          // element.style.transform = 'rotate(0.03deg)';
        }
        if (fontWeight === '600') {
          element.style.fontWeight = '700';
          // element.style.transform = 'rotate(0.03deg)';
        }
        if (fontWeight === '700') {
          element.style.fontWeight = '800';
          // element.style.transform = 'rotate(0.03deg)';
        }
      });
    }
  }, []);


  return (
    <html lang="en">
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
