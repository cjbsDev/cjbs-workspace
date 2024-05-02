"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { cjbsTheme, ErrorContainer, Fallback, OutlinedButton } from "cjbsDSTM";
import { Box, Stack, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { sampleAddAtom, sampleAddDataAtom } from "./sampleAddAtom";
import dynamic from "next/dynamic";

const LazyReinaDataTable = dynamic(() => import("./ReinaDataTable"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const SampleAddList = ({ openPopup }) => {
  const { getValues, setValue, watch } = useFormContext();
  const [sampleData, setSampleData] = useRecoilState(sampleAddDataAtom);

  const sampleUkeyList = watch("sampleUkeyList");
  console.log("TYTYTYTYTY", sampleUkeyList);

  if (sampleUkeyList === undefined) {
    return (
      <Stack
        sx={{ backgroundColor: cjbsTheme.palette.grey["200"], py: 5, mb: 1 }}
        spacing={0.5}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>버튼을 클릭하면 샘플을 추가 할 수 있습니다.</Typography>
        <OutlinedButton
          buttonName="샘플 추가"
          size="small"
          onClick={openPopup}
        />
      </Stack>
    );
  }

  return (
    <Box sx={{ display: "grid", mb: 1.5 }}>
      {/*{JSON.stringify(sampleUkeyList)}*/}

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyReinaDataTable openPopup={openPopup} />
      </ErrorContainer>
    </Box>
  );
};

export default SampleAddList;
