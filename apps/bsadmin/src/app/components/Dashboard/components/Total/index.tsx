import React, { useState } from "react";
import { ErrorContainer, Fallback, SkeletonLineChart } from "cjbsDSTM";
import { RecoilRoot } from "recoil";
import TotalHeader from "./TotalHeader";
import dynamic from "next/dynamic";

const LazyTotalContents = dynamic(() => import("./TotalContents/index"), {
  ssr: false,
  loading: () => <SkeletonLineChart />,
});

const Index = () => {
  return (
    <RecoilRoot>
      <TotalHeader />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyTotalContents />
      </ErrorContainer>
    </RecoilRoot>
  );
};

export default Index;
