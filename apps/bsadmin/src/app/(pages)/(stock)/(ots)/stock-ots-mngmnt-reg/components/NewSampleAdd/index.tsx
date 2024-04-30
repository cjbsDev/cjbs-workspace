import React from "react";
import { cjbsTheme, OutlinedButton } from "cjbsDSTM";
import { Stack, Typography } from "@mui/material";
import useCenteredPopup from "../../../../../../hooks/useNewCenteredPopup";

const Index = () => {
  const { isOpen, openPopup, closePopup } = useCenteredPopup({
    url: "/sampleSimpleListPopup",
    windowName: "샘플 검색",
    width: 800,
    height: 457,
    query: { samplePrevList: sampleKyList }, // 여기에 원하는 쿼리 파라미터를 추가
  });

  return (
    <>
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
    </>
  );
};

export default Index;
