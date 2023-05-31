'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { themeJeju } from '../../public/theme/themeJeju';

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
