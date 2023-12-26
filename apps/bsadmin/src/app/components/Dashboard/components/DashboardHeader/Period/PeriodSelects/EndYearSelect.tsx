import React from "react";
import { dashboardYearData } from "../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";
import { useRecoilState, useRecoilValue } from "recoil";
import { endYearAtom, startYearAtom } from "../../../../recoil/dashboardAtom";
import { FormHelperText, Stack } from "@mui/material";
import { toast } from "react-toastify";

const EndYearSelect = () => {
  const [endYear, setEndYear] = useRecoilState(endYearAtom);
  const getStartYear = useRecoilValue(startYearAtom);

  console.log("GETSTARTYEAR", getStartYear);
  const handleYear = (event: { target: { value: any } }) => {
    const getYear = event.target.value;
    if (getStartYear > getYear) {
      // console.log("다시 선택해 주세요.!");
      toast("시작 년 보다 작을 수 없습니다!", {
        position: "top-center",
      });
    } else {
      setEndYear(getYear);
    }
  };

  return (
    <Stack spacing={0}>
      <SelectBox2
        options={dashboardYearData}
        value={endYear}
        onChange={handleYear}
      />
      {/*{getStartYear > endYear && (*/}
      {/*  <FormHelperText>시작년도 큰 년도를 선택해주세요.</FormHelperText>*/}
      {/*)}*/}
    </Stack>
  );
};

export default EndYearSelect;
