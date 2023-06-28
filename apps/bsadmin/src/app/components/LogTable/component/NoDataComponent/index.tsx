import React from "react";
import { Box, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

const NoDataComponent = () => {
  return (
    <Box
      sx={{
        border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: 5,
      }}
    >
      <Typography variant="subtitle1">수정 로그 데이터가 없습니다.</Typography>
    </Box>
  );
};

export default NoDataComponent;
