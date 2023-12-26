import React from "react";
import { dashboardYearData } from "../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";
import { useRecoilState } from "recoil";
import { dashboardYearAtom } from "../../../../recoil/dashboardAtom";

const YearSelect = () => {
  const [year, setYear] = useRecoilState(dashboardYearAtom);
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

export default YearSelect;
