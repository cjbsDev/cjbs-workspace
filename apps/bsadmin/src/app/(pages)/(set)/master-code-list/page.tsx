"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyListMaster = dynamic(() => import("./ListMaster"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function ManagementPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyListMaster />
    </ErrorContainer>
  );
}
