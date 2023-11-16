"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";

const LazyListDashboard = dynamic(() => import("./list-dashboard"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function Page() {
  return (
    <>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyListDashboard />
      </ErrorContainer>
    </>
  );
}
