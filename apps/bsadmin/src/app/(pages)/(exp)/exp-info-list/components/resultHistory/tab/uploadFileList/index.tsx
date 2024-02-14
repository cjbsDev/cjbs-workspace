import React from "react";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";

const LazyFileList = dynamic(() => import("./fileList"), {
  ssr: false,
  loading: () => <SkeletonLoading height={400} />,
});

const Index = () => {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyFileList />
    </ErrorContainer>
  );
};

export default Index;
