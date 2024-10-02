"use client";

import DataTable from "./DataTable";
import dynamic from "next/dynamic";
import {
  ErrorContainer,
  Fallback,
  SkeletonLoading,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import React from "react";
const LazyDataTable = dynamic(() => import("./DataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataTable />
    </ErrorContainer>
  );
}
