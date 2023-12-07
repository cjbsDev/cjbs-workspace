"use client";

import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";

const LazyDataList = dynamic(() => import("./ListRun"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataList />
    </ErrorContainer>
  );
};