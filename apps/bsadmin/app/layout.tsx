"use client"

import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import {  RecoilRoot } from 'recoil';

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
    <title>bsadmin</title>
    <body>
      {children}
    </body>
    </html>
  );
}
