import React from "react";
import { cjbsTheme } from "cjbsDSTM";
import { Box, Stack, Typography } from "@mui/material";

const AlertContentBox = () => {
  return (
    <Box
      sx={{
        p: "12px 20px",
        mb: 3,
        backgroundColor: `${cjbsTheme.palette.grey["50"]}`,
      }}
    >
      <Stack spacing={0.3}>
        <Typography variant="body2">
          · 데이터는 행을 기준으로 처리되며, 선택한 샘플 순서대로
          업데이트됩니다.
        </Typography>
        <Typography variant="body2">
          · 입력된 데이터가 선택한 샘플 개수를 초과하면, 샘플 개수만큼만
          업데이트됩니다.
        </Typography>
        {/*<Typography variant="body2">*/}
        {/*  · 변경 내용 없이 저장 할 경우 빈값으로 변경되어 저장 됩니다.*/}
        {/*</Typography>*/}
      </Stack>
    </Box>
  );
};

export default AlertContentBox;
