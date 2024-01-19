import React from "react";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import { Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
const LazyPrepSelectbox = dynamic(
  () => import("../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const Research = (props: { required: boolean }) => {
  const { required } = props;
  const { getValues } = useFormContext();
  const prjcCode = getValues("prjtCodeMc");
  return (
    <Stack direction="row" spacing={0.5} alignItems="flex-start">
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyPrepSelectbox
          url={`/code/orsh/prjtDetail/list?type=${prjcCode}`}
          inputName={`prjtDetailCodeMc`}
          required={required}
        />
      </ErrorContainer>
    </Stack>
  );
};

export default Research;
