import React from "react";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
const LazyDataTable = dynamic(() => import("./list"), {
  ssr: false,
  loading: () => <SkeletonLoading height={400} />,
});

const Index = () => {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataTable />
    </ErrorContainer>
  );
};

export default Index;
