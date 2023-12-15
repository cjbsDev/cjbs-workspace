import React from "react";
import { useRecoilState } from "recoil";
import { dashboardQuarterAtom } from "../../../../recoil/dashboardAtom";
import { SelectBox2 } from "cjbsDSTM";
import { halfListData } from "../../../../../../data/inputDataLists";

const HalfSelect = () => {
  const [half, setHalf] = useRecoilState(dashboardQuarterAtom);

  const handleQuarter = (event: { target: { value: any } }) => {
    const getHalf = event.target.value;
    setHalf(getHalf);
  };
  return (
    <SelectBox2 options={halfListData} value={half} onChange={handleQuarter} />
  );
};

export default HalfSelect;
