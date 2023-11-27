import React from "react";
import { RecoilRoot } from "recoil";
import IdleHeader from "./IdleHeader";
import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";
const LazyIdleTop = dynamic(() => import("./IdleTop"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});
const Index = () => {
  return (
    <RecoilRoot override={false}>
      <IdleHeader />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyIdleTop />
      </ErrorContainer>
    </RecoilRoot>
  );
};

export default Index;
