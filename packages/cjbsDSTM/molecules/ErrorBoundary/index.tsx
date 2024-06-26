"use client";

import React from "react";
import {
  ErrorBoundary,
  ErrorBoundaryProps,
  FallbackProps,
} from "react-error-boundary";
import { Alert, AlertTitle, Box, Container, Stack } from "@mui/material";
import { ContainedButton } from "../../atoms/Buttons";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

type ErrorContainerProps = ErrorBoundaryProps & {
  children?: React.ReactNode;
};

export const ErrorContainer = ({ ...props }: ErrorContainerProps) => {
  return <ErrorBoundary {...props}>{props.children}</ErrorBoundary>;
};

export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { mutate } = useSWRConfig();
  const reTry = () => {
    console.log("dddddd");
    resetErrorBoundary();
  };
  return (
    <Container>
      <Alert
        severity="error"
        sx={{ mb: 3 }}
        action={
          <ContainedButton
            fullWidth={false}
            buttonName="다시 시도"
            onClick={reTry}
            sx={{ mt: 1 }}
          />
        }
      >
        <AlertTitle>잠시 후 다시 시도해주세요.</AlertTitle>
        <strong>{error.message}</strong>
      </Alert>
    </Container>
  );
};
