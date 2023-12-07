import React from "react";
import { RecoilRoot } from "recoil";
import IdleHeader from "./IdleHeader";
import {
  ErrorContainer,
  Fallback,
  SkeletonLoading,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import dynamic from "next/dynamic";
const LazyIdleTop = dynamic(() => import("./IdleTop"), {
  ssr: false,
  loading: () => <SkeletonLoading height={373} />,
});
const Index = () => {
  return (
    <RecoilRoot>
      <IdleHeader />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyIdleTop />
      </ErrorContainer>
    </RecoilRoot>
  );
};

export default Index;
