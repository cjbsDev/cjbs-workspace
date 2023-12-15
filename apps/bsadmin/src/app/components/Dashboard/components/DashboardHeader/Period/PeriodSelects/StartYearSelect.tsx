import React from "react";
import { dashboardYearData } from "../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";
import { useRecoilState } from "recoil";
import { startYearAtom } from "../../../../recoil/dashboardAtom";

const StartYearSelect = () => {
  const [year, setYear] = useRecoilState(startYearAtom);
  const handleYear = (event: { target: { value: any } }) => {
    const getYear = event.target.value;
    setYear(getYear);
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
