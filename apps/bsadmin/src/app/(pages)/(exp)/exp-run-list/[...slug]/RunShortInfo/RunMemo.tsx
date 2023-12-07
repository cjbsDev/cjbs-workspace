import React from "react";
import { Box, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

const RunMemo = (props) => {
  const { memo } = props;
  return (
    <Box>
      <Typography variant="subtitle1">메모</Typography>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
          minHeight: 92.5,
          overflowY: "auto",
          minWidth: 300,
          whiteSpace: "pre-wrap",
        }}
      >
        {memo}
      </Box>
    </Box>
  );
};

export default RunMemo;
