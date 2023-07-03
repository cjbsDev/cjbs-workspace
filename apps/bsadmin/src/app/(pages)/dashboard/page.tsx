"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";

const LazyListDashboard = dynamic(() => import("./ListDashboard"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function DashboardPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyListDashboard />
    </ErrorContainer>
  );
}
