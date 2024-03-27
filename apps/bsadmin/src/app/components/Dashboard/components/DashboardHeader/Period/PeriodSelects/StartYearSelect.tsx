import React from "react";
import { dashboardYearData } from "../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";
import { useRecoilState, useRecoilValue } from "recoil";
import { endYearAtom, startYearAtom } from "../../../../recoil/dashboardAtom";
import { toast } from "react-toastify";

const StartYearSelect = () => {
  const [year, setYear] = useRecoilState(startYearAtom);
  const getEndYear = useRecoilValue(endYearAtom);
  const handleYear = (event: { target: { value: any } }) => {
    const getYear = event.target.value;
    if (getYear > getEndYear) {
      toast("마지막 연도 보다 클 수는 없습니다.", {
        position: "top-center",
      });
    } else {
      setYear(getYear);
    }
  };
  return (
    <SelectBox2
      options={dashboardYearData}
      value={year}
      onChange={handleYear}
    />
  );
};

export default StartYearSelect;
