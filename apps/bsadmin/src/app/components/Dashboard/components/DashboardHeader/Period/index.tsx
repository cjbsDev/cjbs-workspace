import React from "react";
import { Stack } from "@mui/material";
import PeriodBtnList from "./PeriodBtnList";
import PeriodSelects from "./PeriodSelects";

const Index = () => {
  return (
    <Stack direction="row" spacing={3.8} alignItems="center">
      <PeriodBtnList />
      <PeriodSelects />
    </Stack>
  );
};

export default Index;
