import React from "react";
import { dashboardYearData } from "../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";
import { useRecoilState, useRecoilValue } from "recoil";
import { endYearAtom, startYearAtom } from "../../../../recoil/dashboardAtom";
import { toast } from "react-toastify";

const EndYearSelect = () => {
  const [endYear, setEndYear] = useRecoilState(endYearAtom);
  const getStartYear = useRecoilValue(startYearAtom);
  const handleYear = (event: { target: { value: any } }) => {
    const getYear = event.target.value;
    if (getStartYear > getYear) {
      toast("시작 연도 보다 작을 수 없습니다!", {
        position: "top-center",
      });
    } else {
      setEndYear(getYear);
    }
  };

  return (
    <SelectBox2
      options={dashboardYearData}
      value={endYear}
      onChange={handleYear}
    />
  );
};

export default EndYearSelect;
