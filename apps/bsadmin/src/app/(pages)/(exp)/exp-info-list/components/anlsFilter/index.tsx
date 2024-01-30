import React from "react";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

const LazyAnlsSelectbox = dynamic(() => import("./alnsSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const Index = () => {
  const [resultObject, result] = useResultObject();

  console.log("RRRRRRRRRR", resultObject);

  const { anlsTypeMc } = resultObject;

  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyAnlsSelectbox defaultValue={anlsTypeMc} />
    </ErrorContainer>
  );
};

export default Index;
