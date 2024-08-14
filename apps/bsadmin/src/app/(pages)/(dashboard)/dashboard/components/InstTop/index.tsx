import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Header from "./Header";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";

const LazyInstTop = dynamic(() => import("./Contents"), {
  ssr: false,
  loading: () => <SkeletonLoading height={373} />,
});

const Index = () => {
  return (
    <SectionBox>
      <Header />
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyInstTop />
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
