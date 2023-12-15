import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import StartYearSelect from "./StartYearSelect";
import EndYearSelect from "./EndYearSelect";
import StartMonthSelect from "./StartMonthSelect";
import EndMonthSelect from "./EndMonthSelect";

const Index = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2">기간 선택</Typography>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <StartYearSelect />
        <StartMonthSelect />
      </Stack>
      <Box>&#126;</Box>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <EndYearSelect />
        <EndMonthSelect />
      </Stack>
    </Stack>
  );
};

export default Index;
