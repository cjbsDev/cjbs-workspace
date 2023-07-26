"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { cjbsTheme } from "cjbsDSTM";
import CssBaseline from "@mui/material/CssBaseline";

interface ContextProps {
  children: React.ReactNode;
}

export default function JeJuProvider({ children }: ContextProps) {
  return (
    <div>
      <ThemeProvider theme={cjbsTheme}>{children}</ThemeProvider>
    </div>
  );
}
