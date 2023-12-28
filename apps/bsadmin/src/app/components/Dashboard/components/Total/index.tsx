import React from "react";
import { ErrorContainer, Fallback, SkeletonLineChart } from "cjbsDSTM";
import TotalHeader from "./TotalHeader";
import dynamic from "next/dynamic";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

const LazyTotalContents = dynamic(() => import("./TotalContents/index"), {
  ssr: false,
  loading: () => <SkeletonLineChart />,
});

const Index = () => {
  return (
    <SectionBox>
      <TotalHeader />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyTotalContents />
      </ErrorContainer>
    </SectionBox>
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
