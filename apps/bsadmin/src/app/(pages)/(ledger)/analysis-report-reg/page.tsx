"use client";

import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";

const LazyOrderRegView = dynamic(() => import("./AnalysisRegView"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyOrderRegView />
    </ErrorContainer>
  );
};