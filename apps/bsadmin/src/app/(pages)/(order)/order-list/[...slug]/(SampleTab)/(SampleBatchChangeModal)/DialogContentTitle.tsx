import React from "react";
import { Stack, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";

const DialogContentTitle = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="subtitle1">항목</Typography>

      <Stack direction="row" spacing={0.5}>
        <MyIcon
          icon="exclamation-circle"
          size={18}
          color={cjbsTheme.palette.error.main}
        />
        <Typography
          variant="body2"
          sx={{ color: cjbsTheme.palette.error.main }}
        >
          항목 이동 시 변경 내용이 저장되지 않습니다.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DialogContentTitle;
