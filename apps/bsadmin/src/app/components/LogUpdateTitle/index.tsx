import React from "react";
import { Typography } from "@mui/material";

interface LogUpdateTitleProps {
  logTitle: string;
}
const LogUpdateTitle = ({ logTitle }: LogUpdateTitleProps) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 5 }}>
        {logTitle}정보 수정 로그
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {logTitle} 수정 로그는 최근 1년간 데이터만 표시되며, 1년이 지난 로그는
        자동으로 삭제됩니다.
      </Typography>
    </>
  );
};

export default LogUpdateTitle;
