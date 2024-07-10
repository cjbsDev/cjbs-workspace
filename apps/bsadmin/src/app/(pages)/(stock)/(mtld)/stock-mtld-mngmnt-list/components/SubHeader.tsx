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
    id: "Q1",
    qrtl: "Q1",
    name: "1분기",
  },
  {
    id: "Q2",
    qrtl: "Q2",
    name: "2분기",
  },
  {
    id: "Q3",
    qrtl: "Q3",
    name: "3분기",
  },
  {
    id: "Q4",
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
          {qrtlLists.map((item, index) => {
            const { id, qrtl, name } = item;
            return (
              <Box key={id}>
                <FileDownloadBtn
                  exportUrl={`/stock/mtld/list/download?year=${year}&month=${month}&qrtl=${qrtl}`}
                  iconName="xls3"
                  buttonName={name}
                />
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SubHeader;
