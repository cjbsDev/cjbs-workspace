import React from "react";
import { Stack, Typography } from "@mui/material";
import { SelectBox2 } from "cjbsDSTM";
import { dashboardMonthData } from "../../../../../../data/inputDataLists";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dashboardMonthAtom,
  dashboardTypeCcAtom,
} from "../../../../dashboardAtom";
import YearSelect from "./YearSelect";
import PeriodTargetSelect from "./PeriodTargetSelect";
import QuarterSelect from "./QuarterSelect";
import HalfSelect from "./HalfSelect";

const Index = () => {
  const [month, setMonth] = useRecoilState(dashboardMonthAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);

  const handleMonth = (event: { target: { value: any } }) => {
    const getMonth = event.target.value;
    setMonth(getMonth);
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2">기간 선택</Typography>
      <YearSelect />
      <PeriodTargetSelect />
    </Stack>
  );
};

export default Index;
