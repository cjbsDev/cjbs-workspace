'use client';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SWRConfig } from 'swr';
import StyledJsxRegistry from './styled-ssr/styledRegistry';

interface ContextProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ContextProps) {
  return (
    <>
      {/* {isBrowser && ( */}
      <CssBaseline />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
        theme='light'
      />
      <SessionProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}
        >
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
