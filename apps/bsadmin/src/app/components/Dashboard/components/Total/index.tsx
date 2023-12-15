import React, { useState } from "react";
import { ErrorContainer, Fallback, SkeletonLineChart } from "cjbsDSTM";
import { RecoilRoot, useRecoilValue } from "recoil";
import TotalHeader from "./TotalHeader";
import dynamic from "next/dynamic";
import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import Legend from "./Legend";
import { dashboardTypeCcAtom } from "../../recoil/dashboardAtom";

type TypeCcKey = "BS_2100003" | "BS_2100004" | "BS_2100005" | "BS_2100006";

const LazyTotalContents = dynamic(() => import("./TotalContents/index"), {
  ssr: false,
  loading: () => <SkeletonLineChart />,
});

const Index = () => {
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom) as TypeCcKey;
  return (
    <SectionBox>
      <TotalHeader />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyTotalContents />
      </ErrorContainer>
      {getTypeCc !== "BS_2100005" && getTypeCc !== "BS_2100006" && <Legend />}
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
