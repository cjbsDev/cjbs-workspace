import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const Legend = () => {
  return (
    <Box sx={{ position: "absolute", bottom: 30, left: 30 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ backgroundColor: "#6366F1;", width: 12, height: 12 }} />
          <Typography variant="body2">올해</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ backgroundColor: "#8BDCD7;", width: 12, height: 12 }} />
          <Typography variant="body2">작년</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ backgroundColor: "#FFB8A2;", width: 12, height: 12 }} />
          <Typography variant="body2">재작년</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Legend;
