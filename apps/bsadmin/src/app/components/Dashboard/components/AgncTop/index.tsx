import React from "react";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import SectionHeader from "../SectionHeader";
import Header from "./Header";

const LazyAgncTop = dynamic(() => import("./Contents"), {
  ssr: false,
  loading: () => <SkeletonLoading height={373} />,
});

const Index = () => {
  return (
    <SectionBox>
      <Header />

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyAgncTop />
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
