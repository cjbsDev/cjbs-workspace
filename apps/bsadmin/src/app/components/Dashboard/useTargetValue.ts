// useTargetValue.js
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { dashboardTargetAtom, dashboardTypeCcAtom } from "./dashboardAtom";

const useTargetValue = () => {
  const getTarget = useRecoilValue(dashboardTargetAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);

  const targetValue = useMemo(() => {
    switch (getTypeCc) {
      case "BS_2100005":
        return getTarget.halfTarget;
      case "BS_2100004":
        return getTarget.quarterTarget;
      case "BS_2100003":
        return getTarget.monthTarget;
      default:
        return 12;
    }
  }, [getTypeCc, getTarget]);

  return targetValue;
};

export default useTargetValue;
