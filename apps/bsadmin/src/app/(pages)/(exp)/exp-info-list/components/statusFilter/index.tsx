import React from "react";
import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

const LazyToggleBtnGrp = dynamic(() => import("./toggleBtnGrp"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const Index = () => {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyToggleBtnGrp />
    </ErrorContainer>
  );
};

export default Index;
