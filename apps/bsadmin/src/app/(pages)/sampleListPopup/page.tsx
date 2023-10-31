"use client";

import SampleDataTable from "./SampleDataTable";
import dynamic from "next/dynamic";
import {
  ErrorContainer,
  Fallback,
  SkeletonLoading,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import React from "react";
const LazySampleDataTable = dynamic(() => import("./SampleDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={510} />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazySampleDataTable />
    </ErrorContainer>
  );
}
