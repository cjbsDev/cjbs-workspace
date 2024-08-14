import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dashboardTargetAtom,
  dashboardTypeCcAtom,
} from "../../../../recoil/dashboardAtom";
import {
  dashboardMonthData,
  quarterListData,
  halfListData,
} from "../../../../../../../data/inputDataLists";
import { SelectBox2 } from "cjbsDSTM";

const PeriodTargetSelect = () => {
  const [target, setTarget] = useRecoilState(dashboardTargetAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);

  const handleTargetChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    targetKey: keyof typeof target,
  ) => {
    setTarget({
      ...target,
      [targetKey]: event.target.value,
    });
  };

  const getOptions = () => {
    switch (getTypeCc) {
      case "BS_2100005":
        return { options: halfListData, targetKey: "halfTarget" };
      case "BS_2100004":
        return { options: quarterListData, targetKey: "quarterTarget" };
      case "BS_2100003":
        return { options: dashboardMonthData, targetKey: "monthTarget" };
      default:
        return { options: [], targetKey: "monthTarget" }; // 기본값 설정
    }
  };

  const { options, targetKey } = getOptions();

  return (
    <SelectBox2
      options={options}
      value={target[targetKey]}
      onChange={(e) => handleTargetChange(e, targetKey)}
      disabled={
        getTypeCc !== "BS_2100003" &&
        getTypeCc !== "BS_2100004" &&
        getTypeCc !== "BS_2100005"
      }
      sx={{ display: getTypeCc === "BS_2100006" && "none" }}
    />
  );
};

export default PeriodTargetSelect;
