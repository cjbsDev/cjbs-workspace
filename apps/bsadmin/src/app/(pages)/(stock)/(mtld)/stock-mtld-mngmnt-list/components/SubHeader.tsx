import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { FileDownloadBtn, SelectBox3 } from "cjbsDSTM";
import {
  dashboardMonthData,
  dashboardYearData,
} from "../../../../../data/inputDataLists";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { currentMonthAtom, currentYearAtom } from "../atom";

const qrtlLists = [
  {
    qrtl: "Q1",
    name: "1분기",
  },
  {
    qrtl: "Q2",
    name: "2분기",
  },
  {
    qrtl: "Q3",
    name: "3분기",
  },
  {
    qrtl: "Q4",
    name: "4분기",
  },
];

const SubHeader = () => {
  const [year, setYear] = useRecoilState(currentYearAtom);
  const [month, setMonth] = useRecoilState(currentMonthAtom);

  const handleYear = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setYear(value);
  };

  const handleMonth = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setMonth(value);
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Stack direction="row" spacing={3}>
        <Stack direction="row" spacing={1}>
          <SelectBox3
            options={dashboardYearData}
            value={year}
            onChange={handleYear}
          />
          <SelectBox3
            options={dashboardMonthData}
            value={month}
            onChange={handleMonth}
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          <FileDownloadBtn
            exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}`}
            iconName="xls3"
          />
          {qrtlLists.map((item) => {
            const { qrtl, name } = item;
            return (
              <FileDownloadBtn
                exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}&qrtl=${qrtl}`}
                iconName="xls3"
                buttonName={name}
              />
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SubHeader;
