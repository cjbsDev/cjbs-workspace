import React from "react";
import { useRecoilState } from "recoil";
import { startMonthAtom } from "../../../../recoil/dashboardAtom";
import { SelectBox2 } from "cjbsDSTM";
import { dashboardMonthData } from "../../../../../../data/inputDataLists";

const StartMonthSelect = () => {
  const [strMonth, setStrMonth] = useRecoilState(startMonthAtom);

  const handleMonth = (event: { target: { value: any } }) => {
    const getMonth = event.target.value;
    setStrMonth(getMonth);
  };
  return (
    <SelectBox2
      options={dashboardMonthData}
      value={strMonth}
      onChange={handleMonth}
    />
  );
};

export default StartMonthSelect;
