import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";
import React from "react";
const LazySampleDataTable = dynamic(() => import("./SampleDataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazySampleDataTable />
    </ErrorContainer>
  );
}
