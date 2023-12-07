'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { themeJeju } from 'client-provider/jeju-theme/themeJeju';

interface ContextProps {
  children: React.ReactNode;
}

export default function JeJuProvider({ children }: ContextProps) {
  return (
    <div>
      <ThemeProvider theme={themeJeju}>{children}</ThemeProvider>
    </div>
  );
}
