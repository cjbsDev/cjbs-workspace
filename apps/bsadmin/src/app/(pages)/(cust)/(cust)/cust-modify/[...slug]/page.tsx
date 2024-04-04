"use client";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import dynamic from "next/dynamic";
import * as React from "react";
import SkeletonLoading from "../../../../../components/SkeletonLoading";

const LazyModifyTable = dynamic(() => import("./ModifyTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});

export default function CustModifyPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyModifyTable />
    </ErrorContainer>
  );
}
