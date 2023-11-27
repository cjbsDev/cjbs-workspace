import React from "react";
import { Box, Stack } from "@mui/material";
import { SelectBox2 } from "cjbsDSTM";
import {
  dashboardMonthData,
  dashboardYearData,
} from "../../../../data/inputDataLists";
import SectionHeader from "../SectionHeader";
import { useRecoilState } from "recoil";
import { totalMonthAtom, totalYearAtom } from "./totalAtom";

const TotalHeader = () => {
  const [year, setYear] = useRecoilState(totalYearAtom);
  const [month, setMonth] = useRecoilState(totalMonthAtom);
  const handleYear = (event) => {
    const getYear = event.target.value;
    setYear(getYear);
  };

  const handleMonth = (event) => {
    const getMonth = event.target.value;
    setMonth(getMonth);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ position: "absolute", top: -77, left: -28 }}
      >
        <SelectBox2
          options={dashboardYearData}
          value={year}
          onChange={handleYear}
        />

        <SelectBox2
          options={dashboardMonthData}
          value={month}
          onChange={handleMonth}
        />
      </Stack>
      <SectionHeader>
        <SectionHeader.Title>총 매출</SectionHeader.Title>
      </SectionHeader>
    </Box>
  );
};

export default TotalHeader;
