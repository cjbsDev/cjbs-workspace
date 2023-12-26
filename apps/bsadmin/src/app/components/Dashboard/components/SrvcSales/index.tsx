import React from "react";
import SectionHeader from "../SectionHeader";
import { ErrorContainer, Fallback, SkeletonPieChart } from "cjbsDSTM";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const LazySrvcSalesChart = dynamic(() => import("./SrvcSalesChart"), {
  ssr: false,
  loading: () => <SkeletonPieChart />,
});

const Index = () => {
  return (
    <SectionBox>
      <SectionHeader>
        <SectionHeader.Title>분석 종류별 매출</SectionHeader.Title>
      </SectionHeader>

      <ErrorContainer FallbackComponent={Fallback}>
        <LazySrvcSalesChart />
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
`;
