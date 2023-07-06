"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { cjbsTheme } from "cjbsDSTM";

interface ContextProps {
  children: React.ReactNode;
}

export default function JeJuProvider({ children }: ContextProps) {
  return <ThemeProvider theme={cjbsTheme}>{children}</ThemeProvider>;
}
