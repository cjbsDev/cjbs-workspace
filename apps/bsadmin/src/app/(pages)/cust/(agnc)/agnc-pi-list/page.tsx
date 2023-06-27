"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { Container } from "@mui/material";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyListAgnc = dynamic(() => import("./ListAgnc"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function ManagementPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyListAgnc />
    </ErrorContainer>
  );
}
