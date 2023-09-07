"use client";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import CssBaseline from "@mui/material/CssBaseline";
import { SWRConfig } from "swr";
import StyledJsxRegistry from "./styled-ssr/styledRegistry";
import { RecoilRoot } from "recoil";

interface ContextProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ContextProps) {
  return (
    <>
      {/*<CssBaseline />*/}
      <ToastContainer
        position="bottom-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          background: "white",
        }}
        progressStyle={{
          background: "#FF2C34",
        }}
        style={{
          zIndex: 99999,
          fontSize: 13,
          whiteSpace: "pre-wrap",
        }}
        // theme="colored"
      />
      <SessionProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
              // 404에서 재시도 안함
              if (error.status === 404) return;
            },
          }}
        >
          <StyledJsxRegistry>
            <RecoilRoot>{children}</RecoilRoot>
          </StyledJsxRegistry>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
