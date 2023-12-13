import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dashboardTargetAtom,
  dashboardTypeCcAtom,
} from "../../../../dashboardAtom";
import {
  dashboardMonthData,
  quarterListData,
  halfListData,
} from "../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";

const PeriodTargetSelect = () => {
  const [target, setTarget] = useRecoilState(dashboardTargetAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);

  console.log("TypeCc Value ==>>", getTypeCc);
  console.log("Target Value ==>>", target);

  const handleHalfTarget = (event: { target: { value: any } }) => {
    const getTarget = event.target.value;
    setTarget({
      ...target,
      halfTarget: getTarget,
    });
  };

  const handleQuarterTarget = (event: { target: { value: any } }) => {
    const getTarget = event.target.value;
    setTarget({
      ...target,
      quarterTarget: getTarget,
    });
  };

  const handleMonthTarget = (event: { target: { value: any } }) => {
    const getTarget = event.target.value;
    setTarget({
      ...target,
      monthTarget: getTarget,
    });
  };

  if (getTypeCc === "BS_2100005") {
    return (
      <SelectBox2
        options={halfListData}
        value={target.halfTarget}
        onChange={handleHalfTarget}
      />
    );
  } else if (getTypeCc === "BS_2100004") {
    return (
      <SelectBox2
        options={quarterListData}
        value={target.quarterTarget}
        onChange={handleQuarterTarget}
      />
    );
  } else if (getTypeCc === "BS_2100003") {
    return (
      <SelectBox2
        options={dashboardMonthData}
        value={target.monthTarget}
        onChange={handleMonthTarget}
      />
    );
  } else {
    return (
      <SelectBox2
        disabled={true}
        sx={{ display: "none" }}
        options={dashboardMonthData}
        value={target.monthTarget}
        onChange={handleMonthTarget}
      />
    );
  }
};

export default PeriodTargetSelect;
