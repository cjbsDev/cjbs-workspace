import React, { useState } from "react";
import {
  ErrorContainer,
  Fallback,
  SelectBox2,
  SkeletonLineChart,
  SkeletonLoading,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import { RecoilRoot } from "recoil";
import TotalHeader from "./TotalHeader";
import dynamic from "next/dynamic";

const LazyTotalChart = dynamic(() => import("./TotalLineChart"), {
  ssr: false,
  loading: () => <SkeletonLineChart />,
});

const Index = () => {
  return (
    <RecoilRoot>
      <TotalHeader />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyTotalChart />
      </ErrorContainer>
    </RecoilRoot>
  );
};

export default Index;
