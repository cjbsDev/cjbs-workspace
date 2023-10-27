import React, { useState } from "react";
import {
  cjbsTheme,
  ContainedButton,
  ErrorContainer,
  Fallback,
  SkeletonLoading,
} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import {
  Box,
  Stack,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
// import SampleAllList from "./SampleAllList";
import dynamic from "next/dynamic";
const LazySampleAllListModal = dynamic(() => import("./SampleAllList"), {
  ssr: false,
  loading: () => (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ),
});

const SampleAddSection = () => {
  const [state, setState] = useState<boolean>(false);
  const sampleAllListModalClose = () => {
    setState(false);
  };
  return (
    <>
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          py: 8,
          border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
        }}
      >
        <Typography variant="body2">
          해당 영역을 클릭하면 샘플을 추가 할 수 있습니다.
        </Typography>
        <ContainedButton
          buttonName="샘플 추가"
          startIcon={<MyIcon icon="plus" size={18} />}
          onClick={() => setState(true)}
        />
      </Stack>

      {state && (
        <ErrorContainer FallbackComponent={Fallback}>
          <LazySampleAllListModal
            onClose={sampleAllListModalClose}
            open={state}
            modalWidth={1200}
          />
        </ErrorContainer>
      )}
    </>
  );
};

export default SampleAddSection;
