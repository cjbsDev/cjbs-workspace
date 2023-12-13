import React from "react";
import { useRecoilState } from "recoil";
import { dashboardQuarterAtom } from "../../../../dashboardAtom";
import { SelectBox2 } from "cjbsDSTM";
import { quarterListData } from "../../../../../../data/inputDataLists";

const QuarterSelect = () => {
  const [quarter, setQuarter] = useRecoilState(dashboardQuarterAtom);

  const handleQuarter = (event: { target: { value: any } }) => {
    const getQuarter = event.target.value;
    setQuarter(getQuarter);
  };
  return (
    <SelectBox2
      options={quarterListData}
      value={quarter}
      onChange={handleQuarter}
    />
  );
};

export default QuarterSelect;
