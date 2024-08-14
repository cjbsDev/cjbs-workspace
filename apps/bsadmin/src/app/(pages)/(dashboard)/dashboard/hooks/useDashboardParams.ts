import { useRecoilValue } from "recoil";
import {
  startYearAtom,
  endYearAtom,
  startMonthAtom,
  endMonthAtom,
  dashboardTypeCcAtom,
} from "../recoil/dashboardAtom";

const useDashboardParams = () => {
  const startYear = useRecoilValue(startYearAtom);
  const endYear = useRecoilValue(endYearAtom);
  const startMonth = useRecoilValue(startMonthAtom);
  const endMonth = useRecoilValue(endMonthAtom);
  const typeCc = useRecoilValue(dashboardTypeCcAtom);

  return { startYear, endYear, startMonth, endMonth, typeCc };
};

export default useDashboardParams;
