"use client";
import * as React from "react";
import {
  dashboardMonthData,
  dashboardYearData,
} from "../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { currentMonthAtom, currentYearAtom } from "../atom";

const YearMonthSelectBox = () => {
  const [year, setYear] = useRecoilState(currentYearAtom);
  const [month, setMonth] = useRecoilState(currentMonthAtom);

  const handleYear = (event: { target: { value: any } }) => {
    const getYear = event.target.value;
    setYear(getYear);
  };

  const handleMonth = (event: { target: { value: any } }) => {
    const getMonth = event.target.value;
    setMonth(getMonth);
  };

  return (
    <>
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
    </>
  );
};

export default YearMonthSelectBox;
