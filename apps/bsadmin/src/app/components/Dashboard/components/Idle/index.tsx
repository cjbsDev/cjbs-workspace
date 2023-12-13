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
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
const LazyIdleTop = dynamic(() => import("./IdleTop"), {
  ssr: false,
  loading: () => <SkeletonLoading height={373} />,
});
const Index = () => {
  return (
    <RecoilRoot override={false}>
      <SectionBox>
        <IdleHeader />
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyIdleTop />
        </ErrorContainer>
      </SectionBox>
    </RecoilRoot>
  );
};

export default Index;

const SectionBox = styled(Box)`
  padding: 30px;
  background: white;
  border-radius: 10px;
  min-height: fit-content;
  height: 100%;
  position: relative;
`;
