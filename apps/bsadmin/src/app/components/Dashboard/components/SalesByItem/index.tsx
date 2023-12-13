import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import {
  ErrorContainer,
  Fallback,
  SkeletonLoading,
  SkeletonPieChart,
} from "cjbsDSTM";
import Header from "./Header";
const LazySalesByItemChart = dynamic(() => import("./Contents"), {
  ssr: false,
  loading: () => <SkeletonLoading height={200} />,
});

const Index = () => {
  return (
    <SectionBox>
      <Header />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazySalesByItemChart />
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
